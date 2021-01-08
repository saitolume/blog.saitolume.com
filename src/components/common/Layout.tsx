import { css } from '@linaria/core'
import { FC } from 'react'

const Layout: FC = ({ children }) => (
  <>
    <main className={container}>{children}</main>
    <footer className={footer}>
      <small>
        このサイトではアクセス解析のために Cookie を使用した
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          {` `}Google Analytics{` `}
        </a>
        を使用しています。
      </small>
      <small>© 2020 - 2021 saitolume</small>
    </footer>
  </>
)

const container = css`
  width: 100%;
  margin-bottom: 64px;
`

const footer = css`
  width: 100%;
  min-height: 120px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: auto;

  @media (max-width:480px) {
    min-height: 160px;
  }
`

export default Layout
