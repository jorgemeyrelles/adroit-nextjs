import { useState, useCallback, useEffect, useRef } from 'react'

import { useStyles } from './styles'

export function DropDown({ children, button: Button }) {
  const styles = useStyles()

  const dropdownRef = useRef(null)

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  function handleDropdownVisibility() {
    setIsDropdownVisible(true)
  }

  const handleCloseDropdown = useCallback(
    (event) => {
      if (dropdownRef.current?.contains(event.target)) {
        return
      }

      setIsDropdownVisible(false)
    },
    [setIsDropdownVisible]
  )

  useEffect(() => {
    document.addEventListener('mouseout', handleCloseDropdown, true)

    return () => {
      document.removeEventListener('mouseout', handleCloseDropdown, true)
    }
  }, [handleCloseDropdown])

  return (
    <div className={styles.container} onMouseOver={handleDropdownVisibility}>
      {!!Button && Button}

      <div
        ref={dropdownRef}
        className={styles.content}
        style={{
          ...(isDropdownVisible && {
            opacity: 1,
            visibility: 'visible'
          })
        }}
      >
        {children}
      </div>
    </div>
  )
}
