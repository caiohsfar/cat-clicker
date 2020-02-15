/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';
import Cat from '../../components/cat';
import { increaseCount, getCats, setSelected } from '../../store/ducks/cats';

const catPlaceholder = require('../../assets/cat-placeholder.png');

function Main(props) {
  const classes = useStyles();
  const { selected, cats, loading } = props;

  useEffect(() => {
    props.getCats(10);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Cat Clicker | Click on the cat!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {cats.map((cat, index) => (
            <ListItem
              onClick={() => props.setSelected(index)}
              button
              key={cat.id}
            >
              <ListItemAvatar>
                <Avatar alt={cat.id} src={loading ? catPlaceholder : cat.url} />
              </ListItemAvatar>
              <ListItemText
                primary={cat.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.subtitle}
                      color="textPrimary"
                    >
                      clicks: {cat.clicks}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {cats.length > 0 && (
          <Cat data={cats[selected]} increaseCount={props.increaseCount} />
        )}
      </main>
    </div>
  );
}

const mapDispathToProps = dispatch =>
  bindActionCreators({ increaseCount, getCats, setSelected }, dispatch);

const mapStateToProps = ({ cats }) => ({
  cats: cats.cats,
  loading: cats.loading,
  error: cats.error,
  selected: cats.selectedIndex
});
export default connect(mapStateToProps, mapDispathToProps)(Main);
