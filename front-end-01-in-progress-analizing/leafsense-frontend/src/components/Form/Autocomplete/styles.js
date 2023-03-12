import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  buttonsGroup: {
    display: 'flex',
    flexDirection: 'column'
  },

  butttonPrimary: {
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 0
  },

  buttonSecondary: {
    borderRadius: 0
  },

  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
}))
