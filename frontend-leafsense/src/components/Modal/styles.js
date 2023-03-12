import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 46
  },

  footer: {
    padding: '8px 24px !important'
  },

  button: {
    marginRight: '10px',
    alignSelf: 'flex-end',
    // position: 'absolute',
    // right: '1px',
    // top: theme.spacing(1),
    // color: theme.palette.grey[500]
  },

  formControl: {
    marginLeft: 10
  },

  chip: {
    marginRight: 10,
    marginBottom: 10
  }
}))
