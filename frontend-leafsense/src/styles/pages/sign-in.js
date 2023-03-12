import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    fill: '#b6b6b6',
    width: '0.7em',
    borderWidth: '2px',
    '& label.MuiDialogActions-root': {
      padding: '0px'
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 4.5px rgba(187, 193, 227, 0.57)'
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    width: '257px',
    margin: 'auto',
    paddingTop: '30px',
    paddingBottom: '25px',
    textAlign: 'center'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // marginTop: theme.spacing(1),
    // '& .MuiFormControlLabel-root': {
    //   width: '100%'
    // }
  },
  submit: {
    height: '41px',
    // margin: theme.spacing(3, 0, 2),
    textTransform: 'uppercase'
  },
  memorize: {
    textAlign: 'left'
  },
  title: {
    fontSize: '1.15rem',
    textTransform: 'uppercase'
  },
  subtitle: {
    padding: '16px 0px'
  },
  errorMessage: {
    fontWeight: 400,
    color: '#d72027'
  },
  input: {
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 15,
    backgroundColor: '#fff',
    '& input': {
      height: 40,
      padding: 0
    }
  }
}))
