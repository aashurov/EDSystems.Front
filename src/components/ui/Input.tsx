import { useState } from "react";
import { InputProps as NativeInputProps, SizeType } from "../../api/AppDto"
import cx from "classnames";
import EyeIcon from "../icons/EyeIcon";
import CloseEyeIcon from "../icons/CloseEyeIcon";

export interface InputProps extends Omit<NativeInputProps, "size" | "placeholder" | "className">{
    readonly width?: number;
    readonly height?: number;
    readonly size?: SizeType;
    readonly maxWidth?: number;
    readonly minWidht?: number;
    readonly hintText?: string;
    readonly mintText?: string;
    readonly hasError?: boolean;
    readonly className?: string;
    readonly editable?: boolean;
    readonly inputClassName?: string;
    readonly label?: string;
    readonly placeholder?: string;
}

export function Input({
    size = SizeType.Medium,
    width,
    height,
    label,
    hintText,
    maxWidth,
    minWidht,
    disabled,
    hasError,
    editable = true,
    className,
    placeholder,
    inputClassName,
    ...props
}:InputProps){

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div
            className={cx("d-flex flex-column input-control", className)}
            style={{width: `${width}px`, maxWidth: `${maxWidth}px`, minWidth: `${minWidht}px`}}
            >
                {Boolean(label) && (
                    <label className="text-ellipsis mb-1">{label}</label>
                )}
                <div className="input-box">
                    <input  
                        autoComplete="off"
                        {...props}
                        type={passwordVisible? "text": props.type}
                        placeholder={placeholder}
                        disabled={disabled || !editable}
                        style={{ height: `${height}px` }}
                        className={cx("lh-6 form-control my-1", inputClassName, {
                            "is-invalid": hasError,
                            "form-control-sm": size === SizeType.Small,
                            "form-control-lg": size === SizeType.Large,
                            "border border-grey-light text-gray": !hasError,
                            "disabled-editing-input": !editable && !disabled
                        })}
                    />
                    {props.type === "password" ? (
                        <div className="eye-icon" onClick={() => setPasswordVisible((prev) => !prev)}>
                            {!passwordVisible ? <EyeIcon/>:<CloseEyeIcon/>}
                        </div>
                    ):(
                        <span/>
                    )}
                </div>
        </div>
    )
}