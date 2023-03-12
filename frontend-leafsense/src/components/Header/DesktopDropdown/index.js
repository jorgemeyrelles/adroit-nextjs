import { useState, useMemo, useCallback } from 'react'

import { Menu, Badge, MenuItem, IconButton } from '@mui/material';
import { AccountCircle, Notifications, Settings } from '@mui/icons-material';

// import { AuthContext } from '../../../contexts/AuthContext'

import { useStyles } from '../styles';

export function DesktopDropdown() {
  const styles = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  // const { signOut } = useContext(AuthContext)

  const isVisible = useMemo(() => !!anchorEl, [anchorEl])

  const handleOpenClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  )

  const handleCloseClick = useCallback(() => setAnchorEl(null), [])

  const signOut = (e) => {
    console.log('signOut', e);
    // retornar a login
    // elminar cookies e localstorage
    // atualizar o DB com timestamps da saida
  }

  return (
    <>
      <div className={styles.container}>
        <IconButton
          edge="end"
          onClick={ () => handleOpenClick() }
        >
          <AccountCircle className={styles.icon} />
        </IconButton>

        <IconButton>
          <Badge
            badgeContent={0}
            color="primary"
          >
            <Notifications className={ styles.icon } />
          </Badge>
        </IconButton>

        <IconButton>
          <Settings className={ styles.icon } />
        </IconButton>
      </div>

      <Menu
        keepMounted
        elevation={0}
        open={isVisible}
        anchorEl={anchorEl}
        onClose={ () => handleCloseClick() }
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => signOut()}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
