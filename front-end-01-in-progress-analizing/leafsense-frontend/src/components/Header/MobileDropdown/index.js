import { useState, useMemo, useCallback } from 'react'

import { Menu, Badge, MenuItem, IconButton } from '@material-ui/core'
import {
  AccountCircle,
  Notifications,
  Settings,
  MoreVert
} from '@material-ui/icons'

import { useStyles } from '../styles'

export function MobileDropdown() {
  const styles = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const isVisible = useMemo(() => !!anchorEl, [anchorEl])

  const handleOpenClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  )

  const handleCloseClick = useCallback(() => setAnchorEl(null), [])

  return (
    <>
      <div className={styles.container}>
        <IconButton onClick={handleOpenClick} color="inherit">
          <MoreVert />
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
        <MenuItem>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <p>Messages</p>
        </MenuItem>

        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>

        <MenuItem onClick={() => {}}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </>
  )
}
