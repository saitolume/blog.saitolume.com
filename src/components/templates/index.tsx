import { VFC } from 'react'
import Head, { HeadProps } from '~/components/common/Head'
import Header from '~/components/common/Header'
import Layout from '~/components/common/Layout'
import PostCard from '~/components/common/PostCard'
import { Post } from '~/utils/types'

export type TemplateProps = HeadProps & {
  posts: Post[]
}

const Template: VFC<TemplateProps> = (props) => (
  <>
    <Head title={props.title} description={props.description} />
    <Header />
    <Layout>
      {props.posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </Layout>
  </>
)

export default Template
