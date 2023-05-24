import React, {ReactNode} from "react"
import "./assets/app-input-group.scss";

interface Props{
    readonly children: ReactNode;
    readonly label?: string;
}

export default function InputGroup({children, label}:Props){
    return (
        <div className="input-group-container">
            <div className="input-group-label">
                {label}
            </div>
            <div className="custom-input-group">
                {children}
            </div>
        </div>
    )
}