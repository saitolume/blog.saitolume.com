---
title: Vercel のプレビューデプロイを monorepo の特定のパッケージが変更されたときだけ実行する
date: 2021/6/6
description: Ignored Build Step を使えば任意の条件でデプロイを中断できて便利
---

## 結論

Vercel の対象プロジェクトの `Settings > Git > Ignored Build Step` に次のコードを入力する。

```
git diff --exit-code --quiet @{0}..main{0} -- blob
```

`blob` は対象のパッケージへのパスに置き換えてください。

## 背景

Vercel には単一の Git リポジトリから複数のプロジェクトを作る機能があります。

[Monorepos – Vercel](https://vercel.com/blog/monorepos)

この機能を利用すれば、monorepo (モノレポ、モノリポ) でも PR 作成時に自動的にプレビュー環境を生成することができます。

しかし、1 つのパッケージしか変更していない PR でも、同じリポジトリに対応している全てのプロジェクトのプレビュー環境を生成するという問題点があります。

無料枠で Vercel を使用している場合は、複数のデプロイを同時に実行することができないため、開発速度の低下に繋がります。今回はこの問題を解決します。

## 方法

Vercel の `Ignore Build Step` で、対象のパッケージに変更がない場合はビルドをスキップします。

[Projects - Vercel Documentation](https://vercel.com/docs/platform/projects#ignored-build-step)

`Ignore Build Step` は設定されたコマンドの exit code を参照して、`1` で終了したときはビルドを続行して、`0` で終了したときはビルドをスキップしてデプロイ状態を `Canceled` にする機能です。

公式ドキュメントには、スクリプトや環境変数、フォルダ及びワークスペースを参照する例が載っています。

[How do I use the "Ignored Build Step" field on Vercel? - Vercel Support Article](https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel)

## やること

対象プロジェクトの `Settings > Git > Ignored Build Step` を開きます。

<img width="100%" src="https://storage.googleapis.com/zenn-user-upload/3c2acbab22aee94f93e44a14.png" alt="Ignored Build Step" />

今回は、`COMMAND` に次のコマンドを入力することで、指定したパッケージが main ブランチの状態から変更されているときだけ exit code を `1` にします。

```
git diff --exit-code --quiet @{0}..main{0} -- blob
```

### コマンド解説

- `--exit-code` オプション: 差分が存在するときに exit code を `1` にして終了するオプション
- `--quit` オプション: すべての出力を表示しないオプション
- `@{0}`: 最新の変更の参照 ([公式ドキュメント](https://www.git-scm.com/docs/gitrevisions#Documentation/gitrevisions.txt-emltngtemegem1em))
- `main{0}`:メインブランチの最新の変更の参照 ([公式ドキュメント](https://www.git-scm.com/docs/gitrevisions#Documentation/gitrevisions.txt-emltrefnamegtltngtemegemmaster1em))
- `--`: 以降はファイルパスであることを示す
- `blob`: 対象のパッケージへのパス

対象のパッケージが依存しているパッケージの変更も検知したいときは、blob を `packages/{main,deps}` のように書くことで対応できます。

### 結果

Status が `Canceled` と表示されていたら成功です。

<img width="100%" src="https://storage.googleapis.com/zenn-user-upload/7ad457b9aca2a2b7c80de0de.png" alt="Vercel のデプロイ Overview" />
