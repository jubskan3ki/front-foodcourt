export interface NavItem {
    path: string;
    icon: React.ElementType;
    name: string;
}

export interface NavIconProps {
    item: NavItem;
}
