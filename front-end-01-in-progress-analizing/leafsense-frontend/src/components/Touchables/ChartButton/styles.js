import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    minHeight: 85,
    marginBottom: 10,
    padding: 5,
    border: 0,
    borderRadius: 10,
    textAlign: 'center',
    textDecoration: 'none'
  }
}))
