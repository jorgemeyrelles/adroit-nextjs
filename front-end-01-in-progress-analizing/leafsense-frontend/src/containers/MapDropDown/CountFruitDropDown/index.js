import { useState, useCallback } from 'react'

import { Button, IconButton } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons'

import { useStyles } from './styles'

export function CountFruitDropDown({ data, children }) {
  const styles = useStyles()

  const [isDropdownVisible, setIsVisibleDropdown] = useState(false)

  const handleVisibilityToggle = useCallback((event) => {
    event.stopPropagation()

    setIsVisibleDropdown((prevState) => !prevState)
  }, [])

  return (
    <div style={{ marginBottom: 10 }}>
      <Button
        className={styles.container}
        style={{
          ...(!!isDropdownVisible && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }),
          ...(data.disabled && {
            cursor: 'not-allowed',
            opacity: 0.2
          })
        }}
        variant="contained"
        disabled={data.disabled}
      >
        <span>{data.name}</span>

        <IconButton size="small" onClick={handleVisibilityToggle}>
          {isDropdownVisible ? (
            <ArrowDropUp fontSize="small" />
          ) : (
            <ArrowDropDown fontSize="small" />
          )}
        </IconButton>
      </Button>

      {isDropdownVisible && <div className={styles.content}>{children}</div>}
    </div>
  )
}
