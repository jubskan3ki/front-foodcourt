import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';
import { AppBar, Toolbar, Button } from '@mui/material';
import { AuthContext } from '../../../context/auth.context';
import { useLogout } from '../../../utils/logout.utils';
import {
    adminNavItems,
    sellerNavItems,
    userNavItems,
} from '../../../data/nav.data';

function Navbar({ user }: { user: any }) {
    const { isLoggedIn } = useContext(AuthContext);
    const logout = useLogout();
    let navItems: any[] = [];

    // Determine which set of navigation items to use based on the user role
    switch (user?.roles) {
        case 3:
            navItems = adminNavItems;
            break;
        case 2:
            navItems = sellerNavItems;
            break;
        case 1:
            navItems = userNavItems;
            break;
        default:
            navItems = []; // or some default nav items
            break;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {navItems
                    .filter((item) => item.show)
                    .map((item) => (
                        <Button
                            color="inherit"
                            key={item.name}
                            component={Link}
                            to={item.path}
                        >
                            {React.createElement(item.icon)}
                            {item.name}
                        </Button>
                    ))}
                {isLoggedIn && (
                    <Button
                        color="inherit"
                        onClick={() => {
                            logout();
                        }}
                    >
                        <MdExitToApp />
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
