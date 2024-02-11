import { MdExitToApp } from 'react-icons/md';
import NavIcon from '../navIcon';
import navItems from '../../../data/nav.data';
import { useLogout } from '../../../utils/logout.utils';
import useWindowSize from '../../../hooks/useWindowSize';

function Navbar() {
    const { width } = useWindowSize();
    const logout = useLogout();
    const isMobile = width < 720;

    return (
        <div className="NavBar">
            {isMobile ? (
                navItems.map((item) => <NavIcon key={item.name} item={item} />)
            ) : (
                <div>
                    {navItems.map((item) => (
                        <NavIcon key={item.name} item={item} />
                    ))}
                </div>
            )}
            <button
                className="NavIon Selected"
                type="button"
                onClick={logout}
                aria-label="Logout"
            >
                <MdExitToApp />
            </button>
        </div>
    );
}

export default Navbar;
