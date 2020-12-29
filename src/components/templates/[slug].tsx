import { css } from '@linaria/core'
import { VFC } from 'react'
import Head, { HeadProps } from '~/components/common/Head'
import Header from '~/components/common/Header'
import Layout from '~/components/common/Layout'
import PostMeta from '~/components/common/PostMeta'
import { colors } from '~/utils/theme'
import { Post } from '~/utils/types'

export type TemplateProps = HeadProps & {
  post: Post
}

const Template: VFC<TemplateProps> = (props) => (
  <>
    <Head title={props.title} description={props.description} />
    <Header />
    <Layout>
      <h1 className={title}>{props.post.title}</h1>
      <PostMeta date={props.post.date} readingTime={props.post.readingTime} />
      <div
        className={body}
        dangerouslySetInnerHTML={{ __html: props.post.body }}
      />
    </Layout>
  </>
)

const title = css`
  color: ${colors.primary};
  margin: 0 0 12px 0;
`

const body = css`
  margin: 40px 0;
`

export default Template
