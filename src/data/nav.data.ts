import { MdHome, MdChat, MdPeople, MdPerson } from 'react-icons/md';
import { NavItem } from '../interface/components/layout/navIcon.interface';

const navItems: NavItem[] = [
    { path: '/', icon: MdHome, name: 'Home' },
    { path: '/Channel', icon: MdChat, name: 'Channel' },
    { path: '/Friend', icon: MdPeople, name: 'Friend' },
    { path: '/User', icon: MdPerson, name: 'User' },
];

export default navItems;
