/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { CircularProgress } from '@material-ui/core'

import { useStyles } from './styles'

export function ChartButton({
  children,
  loading,
  selected,
  disabled,
  onClick
}) {
  const styles = useStyles()

  return (
    <button
      className={styles.container}
      style={{
        color: selected ? 'white' : 'black',
        backgroundColor: selected ? '#A5C9EA' : '#ffffff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.2 : 1
      }}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <div style={{ position: 'relative' }}>
        <img
          style={{
            position: loading ? 'absolute' : 'relative',
            marginBottom: 8,
            opacity: loading ? 0.2 : 1
          }}
          src="/assets/bar-chart.png"
        />

        {loading && <CircularProgress />}
      </div>

      {children}
    </button>
  )
}
