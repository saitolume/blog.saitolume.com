import { css, cx } from '@linaria/core'
import Prism from 'prismjs'
import { useLayoutEffect, VFC } from 'react'
import Head, { HeadProps } from '~/components/common/Head'
import Header from '~/components/common/Header'
import Layout from '~/components/common/Layout'
import PostMeta from '~/components/common/PostMeta'
import SocialShare from '~/components/common/SocialShare'
import { colors } from '~/utils/theme'
import { Post } from '~/utils/types'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

export type TemplateProps = Required<HeadProps> & {
  post: Post
}

const Template: VFC<TemplateProps> = (props) => {
  useLayoutEffect(Prism.highlightAll, [])

  return (
    <>
      <Head
        slug={props.slug}
        title={props.title}
        description={props.description}
      />
      <Header />
      <Layout>
        <h1 className={title}>{props.post.title}</h1>
        <PostMeta date={props.post.date} readingTime={props.post.readingTime} />
        <div
          className={cx(body, 'line-numbers')}
          dangerouslySetInnerHTML={{ __html: props.post.body }}
        />
        <SocialShare title={props.title} slug={props.post.slug} />
      </Layout>
    </>
  )
}

const title = css`
  color: ${colors.primary};
  line-height: 40px;
  margin: 0 0 12px 0;
`

const body = css`
  margin: 40px 0 64px 0;

  code[class*='language-'] {
    font-size: 12px;
  }

  code:not([class*='language-']) {
    border-radius: 4px;
    background-color: rgba(135, 131, 120, 0.15);
    color: #d23669;
    padding: 4px;
  }

  span.token {
    max-height: 12px;
    line-height: 12px;
  }

  code[class*='language-'] {
    * {
      line-height: 26px !important;
    }
  }

  pre[class*='language-'].line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
  }

  pre[class*='language-'].line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: -4px;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 1px solid #ccc;
    user-select: none;
  }

  .line-numbers-rows > span {
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #ccc;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
`

export default Template
