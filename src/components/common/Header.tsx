import { css } from '@linaria/core'
import Image from 'next/image'
import Link from 'next/link'
import { VFC } from 'react'

const Header: VFC = () => (
  <header className={container}>
    <h1 className={title}>
      <Link href="/">Overotakuted</Link>
    </h1>
    <div className={flexbox}>
      <small className={author}>by saitolume</small>
      <Image
        className={photo}
        src="/profile.jpg"
        width={40}
        height={40}
        alt="saitolume"
      />
    </div>
  </header>
)

const container = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 40px 0 64px 0;
`

const title = css`
  font-weight: 900;
  margin: 0;
`

const flexbox = css`
  align-items: center;
  display: flex;
`

const author = css`
  margin-right: 8px;
`

const photo = css`
  border-radius: 50%;
`

export default Header
