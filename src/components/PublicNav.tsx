import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AppsIcon from '@mui/icons-material/Apps';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import LogoutIcon from '@mui/icons-material/Logout';
import { getUser, logout } from '../api.ts';
import { userContext } from '../userContext/userContext.tsx';
import { toast } from 'react-toastify';
const drawerWidth = 300;

interface Props {

  window?: () => Window;
}

 function PublicNav(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate=useNavigate()
  const {setUser,user}=React.useContext(userContext)!

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>

        <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FilterAltIcon/>
              </ListItemIcon>
              <ListItemText primary="Authentication" />
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton
            component={NavLink}
            to="/signup"
            >
              <ListItemIcon>
                <ChecklistIcon/>
              </ListItemIcon>
              <ListItemText primary="sign up" />
            </ListItemButton>
          </ListItem>

          
          
          <ListItem  disablePadding>
            <ListItemButton 
            component={NavLink}
            to="/signup"
            >
              <ListItemIcon>
                <PendingActionsIcon/>
              </ListItemIcon>
              <ListItemText primary="Log in" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton 
            component={NavLink}
            to="/login"
            >
              <ListItemIcon>
                <DoneAllIcon/>
              </ListItemIcon>
              <ListItemText primary="Send Verification Link" />
            </ListItemButton>
          </ListItem>
        {/* ))} */}
      </List>
      <Divider />
      
      
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TaskFlow
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
        
    </Box>
  );
}


export default PublicNav