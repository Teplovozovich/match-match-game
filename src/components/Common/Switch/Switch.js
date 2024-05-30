import React from 'react';
import './Switch.scss';

const Switch = ({ text, onClick, id, checked }) => {
    return (
        <div className='switch_container' onClick={onClick}>
            <p className='textSwitch'>{text}</p>
            <input
                type="checkbox"
                id="switch"
                checked={checked}
                onChange={() => {}} // Pass the onChange prop
            />
            <label htmlFor={id} className="switch-label"></label>
        </div>
    );
};

export default Switch;