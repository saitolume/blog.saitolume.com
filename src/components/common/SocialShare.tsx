import { css } from '@linaria/core'
import { VFC } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  PocketIcon,
  PocketShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

type Props = {
  title: string
  slug: string
}

const SocialShare: VFC<Props> = (props) => (
  <nav className={container}>
    <div className={list}>
      <TwitterShareButton
        title={props.title}
        related={['saitolume']}
        url={`https://blog.saitolume.com/${props.slug}`}
      >
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <FacebookShareButton url={`https://blog.saitolume.com/${props.slug}`}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <PocketShareButton url={`https://blog.saitolume.com/${props.slug}`}>
        <PocketIcon size={40} round />
      </PocketShareButton>
      <HatenaShareButton url={`https://blog.saitolume.com/${props.slug}`}>
        <HatenaIcon size={40} round />
      </HatenaShareButton>
    </div>
  </nav>
)

const container = css`
  display: flex;
  justify-content: center;
`

const list = css`
  width: 30%;
  display: flex;
  justify-content: space-between;
`

export default SocialShare
