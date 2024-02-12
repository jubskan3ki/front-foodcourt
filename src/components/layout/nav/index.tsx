import { useContext } from 'react';
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

function Navbar(userRole: any) {
    const { isLoggedIn } = useContext(AuthContext);
    let navItems: any[] = [];

    switch (userRole) {
        case 3:
            navItems = adminNavItems;
            console.log(userRole);
            break;
        case 2:
            navItems = sellerNavItems;
            console.log(userRole);
            break;
        case 1:
            navItems = userNavItems;
            console.log(userRole);
            break;
        default:
            navItems = [];
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {navItems.map((item) => (
                    <Button
                        color="inherit"
                        key={item.name}
                        component={Link}
                        to={item.path}
                    >
                        {item.icon}
                        {item.name}
                    </Button>
                ))}
                {isLoggedIn && (
                    <Button
                        color="inherit"
                        onClick={useLogout}
                        component={Link}
                        to="/logout"
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
