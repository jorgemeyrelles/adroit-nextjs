import MaterialButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

export const Button = withStyles(() => ({
  root: {
    '&:disabled': {
      backgroundColor: '#F0F0F0'
    }
  }
}))(MaterialButton)
