import { css } from '@linaria/core'
import { FC } from 'react'

const Layout: FC = ({ children }) => (
  <>
    <main className={container}>{children}</main>
    <footer className={footer}>
      <small>© 2020 saitolume</small>
    </footer>
  </>
)

const container = css`
  width: 100%;
  margin-bottom: 64px;
`

const footer = css`
  width: 100%;
  min-height: 64px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: auto;
`

export default Layout
