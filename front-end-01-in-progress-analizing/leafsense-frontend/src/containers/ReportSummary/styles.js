import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 16,

    width: '100%'
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: 16
  }
}))
