import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase'
  },

  content: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: '130%',
    width: 290,
    minHeight: 400,
    padding: 20,
    backgroundColor: '#fff',
    border: '2px solid #F5F5F5',
    borderRadius: 16,
    visibility: 'hidden',
    opacity: 0,
    boxShadow: 'rgb(0 0 0 / 60%) 0 0.5rem 2rem',
    transition: 'opacity 0.2s ease 0s, visibility 0.2s ease 0s'
  }
}))
