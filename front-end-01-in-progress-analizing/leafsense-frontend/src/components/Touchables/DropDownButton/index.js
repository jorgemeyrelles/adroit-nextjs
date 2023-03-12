import { CircularProgress } from '@material-ui/core'

import { useStyles } from './styles'

export function DropDownButton({
  children,
  loading,
  selected,
  disabled,
  onClick
}) {
  const styles = useStyles()

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.container}
      style={{
        border: selected ? '1px solid #A5C9EA' : '1px solid #2B4976',
        color: selected ? '#ffffff' : '#2B4976',
        backgroundColor: selected ? '#A5C9EA' : '#ffffff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.2 : 1
      }}
    >
      <div style={{ position: 'relative' }}>
        {loading && <CircularProgress />}
      </div>

      {children}
    </button>
  )
}
