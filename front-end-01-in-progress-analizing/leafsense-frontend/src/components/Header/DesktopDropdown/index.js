import { useState, useMemo, useCallback, useContext } from 'react'

import { Menu, Badge, MenuItem, IconButton } from '@material-ui/core'
import { AccountCircle, Notifications, Settings } from '@material-ui/icons'

import { AuthContext } from '../../../contexts/AuthContext'

import { useStyles } from '../styles'

export function DesktopDropdown() {
  const styles = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const { signOut } = useContext(AuthContext)

  const isVisible = useMemo(() => !!anchorEl, [anchorEl])

  const handleOpenClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  )

  const handleCloseClick = useCallback(() => setAnchorEl(null), [])

  return (
    <>
      <div className={styles.container}>
        <IconButton
          edge="end"
          className={styles.icon}
          onClick={handleOpenClick}
        >
          <AccountCircle />
        </IconButton>

        <IconButton className={styles.icon}>
          <Badge badgeContent={0} color="primary">
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton className={styles.icon}>
          <Settings />
        </IconButton>
      </div>

      <Menu
        keepMounted
        elevation={0}
        open={isVisible}
        anchorEl={anchorEl}
        onClose={handleCloseClick}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </Menu>
    </>
  )
}
