import { useCallback } from "react";
import Select, { Props } from "react-select";
import { PositionType, SizeType } from "../../api/AppDto";
import cx from "classnames"

export interface SelectPrickerProps extends Props{
    readonly fluid?: boolean;
    
    readonly width?: number;
    readonly minWidth?: number;
    
    readonly disabled?: boolean;
    readonly placeholderSelect?: string;
    readonly size?: SizeType;
    readonly hintText?: string;
    readonly hasError?: boolean;
    readonly className?: string;
    readonly inputClassName?: string;
    readonly label?: string;
    readonly labelPosition?: PositionType;
    readonly onChange?: (value: any) => void
}

export function SelectPricker({
    size = SizeType.Medium,
    fluid,
    label,
    width,
    hintText,
    minWidth,
    hasError,
    disabled,
    className,
    isSearchable = false,
    inputClassName,
    labelPosition = PositionType.Top,
    placeholderSelect = "Select...",
    onChange,
    ...props
}:SelectPrickerProps){

    // const customFilter = useCallback((candidate: any, input: any) => {
    //     if (input) {
    //       // return true for each option that matches your filter
    //       console.log(input)
    //     }
    //     return true; // if not search, then all match
    //   }, []);

    return (
        <div
            className={cx(
                "d-flex input-control my-1",
                {
                    "disabled-input": props.isDisabled,
                    "flex-shrink-1 flex-grow-1" : fluid,
                    "flex-column": labelPosition === PositionType.Top,
                    "flex-column-reverse": labelPosition === PositionType.Bottom,
                    "flex-row align-items-center": labelPosition === PositionType.Left,
                    "flex-row-reverse align-items-center": labelPosition === PositionType.Bottom
                },
                className
            )}
            >
                {Boolean(label) && (
                    <label
                        htmlFor={props.id}
                        className={cx("text-nowrap", {
                            "mb-1": labelPosition === PositionType.Top,
                            "mr-2 mb-0": labelPosition === PositionType.Left,
                            "ml-2 mb-0": labelPosition === PositionType.Right,
                            "mt-2 mb-0": labelPosition === PositionType.Bottom
                        })}
                        >
                        {label}
                    </label>
                )}
                <div
                    style={{width: `${width}px`, minWidth: `${minWidth}px`}}
                    className={cx("d-flex form-control py-0 px-0 br-0 border-0",{
                        "w-100": fluid,
                        "is-invalid": hasError,
                        "disabled-input": disabled,
                        "form-control-sm": size === SizeType.Small,
                        "form-control-lg": size === SizeType.Large,
                        "border border-gray-light text-gray": !hasError,
                    })}
                    >
                    <Select
                        menuPlacement="auto"
                        classNamePrefix="select-picker"
                        placeholder={placeholderSelect}
                        noOptionsMessage={()=>"No options"}
                        onChange={(value )=>onChange && onChange(value)}
                        // filterOption={customFilter}
                        {...props}
                        isDisabled={disabled}
                        isSearchable={isSearchable}
                    className={cx("w-100 h-100 flex-shrink-1 flex-grow-1 border-0 bg-transparent shadow-none outline-none select-picker",{
                        "picker-sm": size === SizeType.Small,
                        "picker-lg": size === SizeType.Large
                    },
                        inputClassName
                    )}
                    formatOptionLabel={(item: any)=>(
                        <div
                            style={{ display: "flex", alignItems: "center" }}
                            >
                                <span>{item.label}</span>
                        </div>
                    )}
                        />
                </div>

                {Boolean(hintText) && <span className={cx("text-denger")} >{hintText}</span>}

        </div>
    )
}