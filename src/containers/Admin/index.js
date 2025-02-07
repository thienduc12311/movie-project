import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import Customers from './Customers';
import MoviesDashboard from './MoviesDashboard';
import TheatersDashboard from './TheatersDashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {
              <Switch>
                <Route path="/admin/customers" component={Customers} />
                <Route path="/admin/movies" component={MoviesDashboard} />
                <Route path="/admin/theaters" component={TheatersDashboard} />
              </Switch>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
