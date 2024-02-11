import { Link, useLocation } from 'react-router-dom';
import { NavIconProps } from '../../../interface/components/layout/navIcon.interface';

function NavIcon({ item }: NavIconProps) {
    const location = useLocation();
    const Icon = item.icon;

    const pathSegments = location.pathname.split('/');

    const basePath = `/${pathSegments[1]}`;

    const isActive = basePath === item.path;

    return (
        <Link to={item.path}>
            <div className={isActive ? 'NavIon Selected' : 'NavIon'}>
                <Icon />
            </div>
        </Link>
    );
}

export default NavIcon;
