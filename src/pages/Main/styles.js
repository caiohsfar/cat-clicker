import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 150;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    color: 'white'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    color: 'white',
    backgroundColor: '#282c34'
  },
  content: {
    backgroundColor: '#282c34',
    flexGrow: 1,
    height: '100vmin',
    padding: theme.spacing(3)
  },
  subtitle: {
    color: '#ddd'
  },
  toolbar: theme.mixins.toolbar
}));
