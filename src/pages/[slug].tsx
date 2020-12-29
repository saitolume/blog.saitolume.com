import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import Template from '~/components/templates/[slug]'
import { getAllPostSlugs, parseMarkDown } from '~/utils/helper'
import { Post } from '~/utils/types'

type Props = {
  post: Post
}

const Page: NextPage<Props> = (props) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    script.setAttribute('async', 'true')
    document.head.appendChild(script)
  }, [])

  return (
    <Template
      description={props.post.description}
      post={props.post}
      slug={props.post.slug}
      title={props.post.title}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs()
  const paths = slugs.map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  if (typeof slug !== 'string') throw new Error()

  const post = await parseMarkDown(slug)

  return {
    props: {
      post,
    },
  }
}

export default Page
