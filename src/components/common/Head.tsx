import NextHead from 'next/head'
import { VFC } from 'react'

export type HeadProps = {
  description: string
  slug?: string
  title?: string
}

const Head: VFC<HeadProps> = (props) => {
  const title = props.title ? `${props.title} - Overotakuted` : 'Overotakuted'
  const ogImageUrl = props.title
    ? `https://og-image.saitolume.com/${encodeURI(props.title)}`
    : `https://og-image.saitolume.com/Overotakuted`

  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://blog.saitolume.com/${props.slug ?? ''}`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@saitolume" />
      <meta name="twitter:description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}

export default Head
