import React from "react";
import "./assets/checkbox.scss";

interface Props{
    readonly name: string;
    readonly leftLabel?: string;
    readonly rightLabel?: string;
    readonly value?: any;
    readonly className?: string;
    readonly checkboxClassName?: string;
    readonly style?:  any;
    readonly onChange: (event: any) => void;
}

export default function CheckBox({name, leftLabel, rightLabel, className, value, checkboxClassName, style, onChange}:Props){
    return (
        <div className={`${className} checkbox-container`}>
           {leftLabel && (
            <div className="left-label">
                <label htmlFor={name}>{leftLabel}</label>
            </div>
           )}
                <input 
                    className={`${checkboxClassName}`} 
                    checked={value} 
                    type="checkbox" 
                    id={name} 
                    onChange={(event)=>onChange(event.target.checked)}/>
           {rightLabel && (
            <div className="right-label">
                 <label htmlFor={name}>{rightLabel}</label>
            </div>
           )}
        </div>
    )
}