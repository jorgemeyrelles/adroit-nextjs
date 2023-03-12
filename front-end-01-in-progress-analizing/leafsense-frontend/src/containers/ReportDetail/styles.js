import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '105px 1fr',
    gap: 16,

    width: '100%'
  },
  sidebar: {
    width: 105,
    padding: 10,
    border: '1px solid #EEEEEE',
    borderRadius: 16,
    backgroundColor: '#ffffff'
  },
  contentEmpty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: '570px',
    gap: 16
  },
  table: {
    minWidth: 650
  }
}))
