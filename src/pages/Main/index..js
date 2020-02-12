import React, { useEffect, useState } from 'react';
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
import api from '../../services/api';
import catNames from '../../assets/catNames';
import Cat from '../../components/cat';

export default function Main() {
  const classes = useStyles();
  const [cats, setCats] = useState([]);
  const [selected, setSelected] = useState(0);
  const randomIndex = () => Math.floor(Math.random() * 100 + 1);

  function setClicks() {
    const newArray = [...cats];
    newArray[selected].clicks = cats[selected].clicks + 1;
    setCats(newArray);
  }
  useEffect(() => {
    function updateNames(data) {
      return data.map(value => {
        const name = catNames[randomIndex()];
        const clicks = 0;
        return { ...value, name, clicks };
      });
    }
    async function getCats(limit = 0) {
      let { data } = await api.getCats(limit);
      data = updateNames(data);
      setCats(oldCats => [...oldCats, ...data]);
    }
    getCats(10);
  }, []);

  useEffect(() => {
    console.log('cat mudou');
  }, [cats]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Cat Clicker
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
            <ListItem onClick={() => setSelected(index)} button key={cat.id}>
              <ListItemAvatar>
                <Avatar alt={cat.id} src={cat.url} />
              </ListItemAvatar>
              <ListItemText
                primary={cat.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.subtitle}
                      color="textPrimary"
                    >
                      clicks: {cat.clicks}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {cats.length > 0 && (
          <Cat
            setClicks={setClicks}
            clicks={cats[selected].clicks}
            uriImage={cats[selected].url}
            name={cats[selected].name}
          />
        )}
      </main>
    </div>
  );
}
