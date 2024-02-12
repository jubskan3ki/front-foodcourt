import { MdDashboard, MdList, MdSettings, MdStore } from 'react-icons/md';

export const adminNavItems = [
    { path: '/', name: 'Dashboard', show: true, icon: MdDashboard },
    { path: '/settings', name: 'Settings', show: true, icon: MdSettings },
];

export const sellerNavItems = [
    { path: '/', name: 'Orders', show: true, icon: MdList },
    { path: '/dashboard', name: 'Dashboard', show: true, icon: MdDashboard },
    { path: '/settings', name: 'Settings', show: true, icon: MdSettings },
];

export const userNavItems = [
    { path: '/', name: 'Order List', show: true, icon: MdList },
    { path: '/sellers', name: 'Sellers', show: true, icon: MdStore },
    { path: '/menu', name: 'Menu', show: false, icon: MdStore },
    { path: '/settings', name: 'Settings', show: true, icon: MdSettings },
];
