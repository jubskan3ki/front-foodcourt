import { ButtonProps } from '../../../interface/components/common/button.interface';

function Button({
    text,
    icon: Icon = undefined,
    onClick,
    submit = false,
    disabled = false,
    variant = 'primary',
    outline = false,
}: ButtonProps) {
    const buttonClasses = `button ${
        outline ? `outline outline-${variant}` : variant
    }`;

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
            disabled={disabled}
        >
            {text && <span>{text}</span>}
            {Icon && <Icon />}
        </button>
    );
}

export default Button;
