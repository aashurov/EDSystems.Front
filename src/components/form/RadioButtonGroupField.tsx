
interface Props{
    readonly value: any;
    readonly options: any[],
    readonly onChange: (value: any) => void;
    readonly className?: string;
    readonly inputClassName?: string;
    readonly labelClassName?: string;
    readonly radioButtonClassName?: string;
}

export default function RadioButtonGroupField({
    value,
    onChange,
    options,
    className,
    inputClassName,
    labelClassName,
    radioButtonClassName
}:Props){


    if(options.length === 0) return null;

    return (
        <div className={`radio-button-group ${className}`}>
           {options && options.map((radio: any, index: number)=>{
            return (
            <div 
                key={index}
                className={`radio-button ${radioButtonClassName}`}>
                <input
                    type="radio"
                    className={`${inputClassName}`}
                    id={radio.value}
                    onChange={onChange}
                    value={radio.value}
                    checked={ value && radio.value === value}
                />
             <label 
                    htmlFor={radio.value}
                    className={`ms-2 ${labelClassName}`}
                    >
                    {radio.label}
                    </label>
            </div>
            )
           })}
        </div>
    )
}