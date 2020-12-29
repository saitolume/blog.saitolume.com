import NextHead from 'next/head'
import { VFC } from 'react'

export type HeadProps = {
  description: string
  title?: string
}

const Head: VFC<HeadProps> = (props) => (
  <NextHead>
    <title>{props.title && `${props.title} - `}Overotakuted</title>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@saitolume" />
    <meta name="twitter:description" content={props.description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;900&display=swap"
      rel="stylesheet"
    />
  </NextHead>
)

export default Head
