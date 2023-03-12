import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(() => ({
  tabRoot: {
    backgroundColor: '#FFF',
    '&selected': {
      backgroundColor: 'blue'
    }
  },
  tabRootList: {
    width: '100%',
    maxWidth: 500,
    border: '2px solid #F5F5F5',
    borderRadius: 16
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100%',
    height: '100%',

    marginTop: 40
  },

  navbar: {
    display: 'flex',
    justifyContent: 'center',

    width: '100%',

    marginTop: 24
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    maxWidth: 250,

    marginTop: 44
  },

  description: {
    marginTop: 44,
    marginBottom: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  img: {
    marginTop: 44,
    marginBottom: 44
  },

  table: {
    minWidth: 650
  }
}))
