import { useCallback } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'

import { Toolbar, useTheme, useMediaQuery } from '@material-ui/core'

import { Can } from '../Can'
import { MobileDropdown } from './MobileDropdown'
import { DesktopDropdown } from './DesktopDropdown'

import { useStyles } from './styles'

export function Header() {
  const theme = useTheme()
  const styles = useStyles()

  const router = useRouter()

  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const handleBackToHome = useCallback(
    () => router.push(`/dashboard`),
    [router]
  )

  return (
    <Toolbar>
      <div style={{ cursor: 'pointer' }} onClick={handleBackToHome}>
        <Image
          width="109px"
          height="109px"
          src="/assets/header-logo.png"
          alt="Leafsense"
        />
      </div>

      <div className={styles.flexGrow} />

      <Can isRenderable={!matches}>
        <MobileDropdown />
      </Can>

      <Can isRenderable={matches}>
        <DesktopDropdown />
      </Can>
    </Toolbar>
  )
}
