import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 48,
    padding: 5,
    border: '1px solid #2B4976',
    color: '#2B4976',
    backgroundColor: '#ffff',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase'
  },

  content: {
    display: 'flex',
    flexDirection: 'column',

    padding: 16,
    border: '1px solid #2B4976',

    borderTop: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    backgroundColor: '#ffffff'
  }
}))
