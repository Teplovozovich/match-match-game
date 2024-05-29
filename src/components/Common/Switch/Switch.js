import React from 'react';
import './Switch.scss'

const Switch = ({text, onChange, id}) => {
    return (
        <div className='switch_container'>
            <p>{text}</p>
            <input onChange={onChange} type="checkbox" id={id}></input>
            <label htmlFor={id} className="switch-label"></label>
        </div>
    );
}

export default Switch;