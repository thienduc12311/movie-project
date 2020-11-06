import React, {useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  Home,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
} from 'react-feather';
import {Theaters} from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import NavItem from './NavItem';
import LocalStorageUtils from '../../../../utils/LocalStorageUtils';

const items = [
  {
    href: '/admin/customers',
    icon: UsersIcon,
    title: 'Customers',
  },
  {
    href: '/admin/movies',
    icon: ShoppingBagIcon,
    title: 'Movies',
  },
  {
    href: '/admin/theaters',
    icon: Theaters,
    title: 'Theaters',
  },
  {
    href: '/home',
    icon: Home,
    title: 'Home',
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

const NavBar = ({onMobileClose, openMobile}) => {
  const classes = useStyles();
  const location = useLocation();
  const user = LocalStorageUtils.getItem('user');
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.hoTen}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Admin
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="right"
          classes={{paper: classes.mobileDrawer}}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{paper: classes.desktopDrawer}}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
