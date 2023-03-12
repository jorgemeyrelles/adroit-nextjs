import { CircularProgress } from '@material-ui/core'

import { Button as ButtonBase } from './styles'

export function Button({ children, loading, ...props }) {
  return (
    <ButtonBase variant="contained" fullWidth {...props}>
      {loading ? <CircularProgress size={20} /> : children}
    </ButtonBase>
  )
}
