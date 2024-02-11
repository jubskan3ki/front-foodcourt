import { ReactNode } from 'react';

export interface ModalProps {
    title?: string;
    backgroundDark?: boolean;
    position?:
        | 'center'
        | 'top-left'
        | 'top-right'
        | 'bottom-right'
        | 'bottom-left'
        | 'top'
        | 'left'
        | 'right'
        | 'bottom';
    isOpen: boolean;
    onClose?: () => void;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children: ReactNode;
}
