import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 16,
    marginTop: '20px'
  },

  formControl: {
    marginLeft: 10
  },

  chip: {
    marginRight: 10,
    marginBottom: 10,

    color: '#FA376C',
    backgroundColor: '#FAE3E9'
  }
}))
