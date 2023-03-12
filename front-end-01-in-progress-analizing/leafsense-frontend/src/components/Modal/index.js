import {
  Dialog,
  Button,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'

import { Close } from '@material-ui/icons'

import { useStyles } from './styles'

export function Modal({ children, visible, onClose, onSubmit, disabled }) {
  const styles = useStyles()

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={visible}
      classes={{ paperFullWidth: styles.container }}
      onClose={onClose}
    >
      <IconButton onClick={onClose} className={styles.button}>
        <Close />
      </IconButton>

      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>

      <DialogActions classes={{ root: styles.footer }}>
        <Button onClick={onClose}>CANCELAR</Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={disabled}
          color="primary"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
