---
title: Vercel のプレビューデプロイを monorepo の特定のパッケージが変更されたときだけ実行する
date: 2021/6/6
description: Ignored Build Step を使えば任意の条件でデプロイを中断できて便利
---

## 背景

Vercel には単一の Git リポジトリから複数のプロジェクトを作る機能があります。

[Monorepos – Vercel](https://vercel.com/blog/monorepos)

この機能を利用すれば、monorepo (モノレポ、モノリポ) でも Pull Request 作成時に自動的にプレビュー環境を生成することができます。

しかし、**1 つのパッケージしか変更していない Pull Request でも、同じリポジトリに対応している全てのプロジェクトのプレビュー環境を生成する**という問題があります。

無料枠で Vercel を使用している場合は、複数のデプロイを同時に実行することができないため、開発速度の低下に繋がります。今回はこの問題を解決します。

## 方法

Vercel の **Ignore Build Step** で、対象のパッケージに変更がない場合はビルドをスキップします。

[Projects - Vercel Documentation](https://vercel.com/docs/platform/projects#ignored-build-step)

`Ignore Build Step` は設定されたコマンドの exit code を参照して、`1` で終了したときはビルドを続行して、`0` で終了したときはビルドをスキップしてデプロイ状態を `Canceled` にする機能です。

公式ドキュメントには、スクリプトや環境変数、フォルダ及びワークスペースを参照する例が載っています。

[How do I use the "Ignored Build Step" field on Vercel? - Vercel Support Article](https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel)

## やること

### 1. 変更を検知するシェルスクリプトを作成

```bash
#!/bin/bash

if [[ "$VERCEL_ENV" != "preview" ]]; then
    exit 1;
fi

GLOB=${@}
PREV_MERGE_COMMIT=`git rev-list --grep "Merge pull request" -n 1 HEAD`

eval "git diff --quiet $PREV_MERGE_COMMIT HEAD -- $GLOB"
```

`git rev-list` によるコミットログの検索によって前回の merge commit を取得して、そこから最新状態までの差分を確認するスクリプトです。
本番環境にデプロイするときはビルドを実行したいので、プレビュー環境のときだけスクリプトを実行します。

`--quit` オプションを有効にすることで、すべての出力を表示せず、差分が存在するときは exit code を `1` にして終了することができます。

### 2. Ignored Build Step にシェルスクリプトを設定

対象プロジェクトの **Settings > Git > Ignored Build Step** を開きます。

<img width="100%" src="https://storage.googleapis.com/zenn-user-upload/3c2acbab22aee94f93e44a14.png" alt="Ignored Build Step" />

COMMAND にスクリプトを実行するコマンドを入力することで、`glob` で指定したパスのパッケージが前回の merge commit から変更されていないときはビルドをスキップすることができます。

```bash
bash ../../scripts/check_ignore_build_step.sh glob
```

対象のパッケージが依存しているパッケージの変更も検知したいときは、`glob` を `. ../{deps1, deps2}` のように書くことで対応できます。

### 3. デプロイを実行

デプロイ実行後のコンソールに **"The Deployment has been canceled as a result of running the command defined in the "Ignored Build Step" setting."** というメッセージが表示されていたら成功です。

<img width="100%" src="https://i.gyazo.com/06f2e5b62ac45c939cdf72616a2826dd.png" alt="Vercel のデプロイ Overview" />
