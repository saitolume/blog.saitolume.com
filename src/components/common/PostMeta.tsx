import { VFC } from 'react'
import { Post } from '~/utils/types'

type Props = {
  date: Post['date']
  readingTime: Post['readingTime']
}

const PostMeta: VFC<Props> = (props) => (
  <small>{`📅 ${props.date} ・ ☕ ${props.readingTime}`}</small>
)

export default PostMeta
