import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  flexGrow: {
    flexGrow: 1
  },
  container: {
    display: 'flex'
  },
  icon: {
    margin: theme.spacing(1.5)
  }
}))
