import React from 'react'
import '../Switch.css'

export function Switch({ isOn, handleToggle }) {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                type="checkbox"
                className="react-switch-checkbox"
                id={`react-switch-new`}
            />
            <label
                style={{backgroundColor: isOn && '#007542'}}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={'react-switch-button'}></span>
            </label>
        </>
    )
}
