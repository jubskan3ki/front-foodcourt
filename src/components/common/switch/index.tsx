import { SwitchProps } from '../../../interface/components/common/switch.interface';

function Switch({ isChecked, onChange }: SwitchProps) {
    return (
        <label htmlFor="switch-input" className="switch">
            <input
                id="switch-input"
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
            />
            <span className="slider" />
        </label>
    );
}

export default Switch;
