import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {
    border: 0,
    borderRadius: 15,
    backgroundColor: 'white'
  },
  rootTextArea: {
    borderRadius: 5,
    backgroundColor: 'white'
  },
  errorMessage: {
    color: '#6ee6b2',
    fontWeight: 400
  }
}))
