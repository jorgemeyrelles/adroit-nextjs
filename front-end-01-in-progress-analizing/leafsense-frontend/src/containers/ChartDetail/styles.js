import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    padding: 20,

    border: '1px solid #EEEEEE',
    borderRadius: 10
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))
