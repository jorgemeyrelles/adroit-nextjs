import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 46
  },

  footer: {
    padding: '8px 24px !important'
  },

  button: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },

  formControl: {
    marginLeft: 10
  },

  chip: {
    marginRight: 10,
    marginBottom: 10
  }
}))
