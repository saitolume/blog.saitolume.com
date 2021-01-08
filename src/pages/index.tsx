import dayjs from 'dayjs'
import { GetStaticProps, NextPage } from 'next'
import Template from '~/components/templates/index'
import { getAllPostSlugs, parseMarkDown } from '~/utils/helper'
import { Post } from '~/utils/types'

type Props = {
  posts: Post[]
}

const Page: NextPage<Props> = (props) => (
  <Template description="" posts={props.posts} />
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const slugs = await getAllPostSlugs()
  const posts = await Promise.all(slugs.map(parseMarkDown))

  return {
    props: {
      posts: posts.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()),
    },
  }
}

export default Page
