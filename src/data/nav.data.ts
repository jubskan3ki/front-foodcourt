import { MdDashboard, MdList, MdSettings, MdStore } from 'react-icons/md';

export const adminNavItems = [
    { path: '/', name: 'Dashboard', icon: MdDashboard },
    { path: '/settings', name: 'Settings', icon: MdSettings },
];

export const sellerNavItems = [
    { path: '/', name: 'Orders', icon: MdList },
    { path: '/dashboard', name: 'Dashboard', icon: MdDashboard },
    { path: '/settings', name: 'Settings', icon: MdSettings },
];

export const userNavItems = [
    { path: '/', name: 'Order List', icon: MdList },
    { path: '/sellers', name: 'Sellers', icon: MdStore },
    { path: '/settings', name: 'Settings', icon: MdSettings },
];
