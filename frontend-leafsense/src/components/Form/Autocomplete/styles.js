import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  buttonsGroup: {
    display: 'flex',
    width: '100%',
    // flexDirection: 'column'
  },

  butttonPrimary: {
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 0,
    width: '100%',
  },

  buttonSecondary: {
    borderRadius: 0,
    width: '100%',
  },

  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
}))
