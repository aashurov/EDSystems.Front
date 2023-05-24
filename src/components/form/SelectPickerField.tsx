import React, { useMemo } from 'react';
import { useField } from 'formik';
import { SelectPricker, SelectPrickerProps } from '../ui/SelectPicker';
  
interface SelectPickerFieldProps extends SelectPrickerProps{
    readonly name: string;  
    readonly onChanges?: (value: any) => void;
}

export default function SelectPickerField({ name, onChanges, ...inputProps}:SelectPickerFieldProps){
    const [field, meta, helpers] = useField(name);
   
    const showError = useMemo(()=>Boolean(meta.error && meta.touched), [meta])

    return (
        <SelectPricker
            id={name}
            hasError={showError}
            hintText={showError ? meta.error : undefined}
            {...field}
            {...inputProps}
            onChange={(value)=>{
                helpers.setValue(value);
                onChanges && onChanges(value)
            }}
            />
    )
}
