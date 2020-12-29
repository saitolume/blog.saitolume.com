import { css } from '@linaria/core'
import Link from 'next/link'
import { VFC } from 'react'
import { colors } from '~/utils/theme'

const Header: VFC = () => (
  <header className={container}>
    <h1 className={title}>
      <Link href="/">Overotakuted</Link>
    </h1>
    <a
      href="https://twitter.com/saitolume"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={flexbox}>
        <small className={author}>by saitolume</small>
        <img
          className={photo}
          src="/profile.webp"
          width={40}
          height={40}
          alt="saitolume"
        />
      </div>
    </a>
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
  color: ${colors.text1};
`

const author = css`
  margin-right: 8px;
`

const photo = css`
  border-radius: 50%;
`

export default Header
