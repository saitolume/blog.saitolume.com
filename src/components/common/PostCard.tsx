import { css } from '@linaria/core'
import Link from 'next/link'
import { VFC } from 'react'
import { Post } from '~/utils/types'
import PostMeta from './PostMeta'

type Props = {
  date: Post['date']
  description: Post['description']
  slug: Post['slug']
  readingTime: Post['readingTime']
  title: Post['title']
}

const PostCard: VFC<Props> = (props) => (
  <article className={container}>
    <header>
      <h2 className={title}>
        <Link href={`/${props.slug}`}>{props.title}</Link>
      </h2>
      <PostMeta date={props.date} readingTime={props.readingTime} />
    </header>
    <p
      className={description}
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
  </article>
)

const container = css`
  margin-bottom: 40px;
`

const title = css`
  font-weight: bold;
  line-height: 40px;
  margin: 0;
`

const description = css`
  margin: 0;
`

export default PostCard
