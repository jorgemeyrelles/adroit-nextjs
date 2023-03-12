import { useCallback } from 'react'

import { Toolbar, useTheme, useMediaQuery } from '@mui/material';

// import { Can } from '../Can'
// import { MobileDropdown } from './MobileDropdown'
import { DesktopDropdown } from './DesktopDropdown';

import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const theme = useTheme()
  const styles = useStyles()

  const navigate = useNavigate();

  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const handleBackToHome = useCallback(
    () => navigate('/dashboard'),
    []
  )

  return (
    <Toolbar>
      <div
        style={{ cursor: 'pointer' }}
        onClick={handleBackToHome}
      >
        <img
          width="79px"
          height="79px"
          src="/assets/header-logo.png"
          alt="Leafsense"
        />
      </div>

      <div className={styles.flexGrow} />

      {/* <Can isRenderable={!matches}>
        <MobileDropdown />
      </Can>

      <Can isRenderable={matches}>
      </Can> */}
      <DesktopDropdown />
    </Toolbar>
  )
}
