import { css } from '@linaria/core'
import { VFC } from 'react'
import Head, { HeadProps } from '~/components/common/Head'
import Header from '~/components/common/Header'
import Layout from '~/components/common/Layout'
import PostMeta from '~/components/common/PostMeta'
import SocialShare from '~/components/common/SocialShare'
import { colors } from '~/utils/theme'
import { Post } from '~/utils/types'
import 'highlight.js/styles/ocean.css'

export type TemplateProps = Required<HeadProps> & {
  post: Post
}

const Template: VFC<TemplateProps> = (props) => (
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
        className={body}
        dangerouslySetInnerHTML={{ __html: props.post.body }}
      />
      <SocialShare title={props.title} slug={props.post.slug} />
    </Layout>
  </>
)

const title = css`
  color: ${colors.primary};
  line-height: 40px;
  margin: 0 0 12px 0;
`

const body = css`
  margin: 40px 0 64px 0;

  code:not(.hljs) {
    border-radius: 4px;
    /* background-color: #e5e5e5; */
    background-color: rgba(135, 131, 120, 0.15);
    color: #d23669;
    padding: 4px;
  }
`

export default Template
