import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  title: {
    margin: '8px 0',
    color: '#4A4A4A',
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#4A4A4A',
    fontSize: 18,
    fontWeight: 'normal'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 16,
    border: 0,
    background: 0,
    fontSize: 14,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.38)'
  }
}))
