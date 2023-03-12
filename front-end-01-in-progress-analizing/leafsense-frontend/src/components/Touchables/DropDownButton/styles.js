import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 48,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase'
  }
}))
