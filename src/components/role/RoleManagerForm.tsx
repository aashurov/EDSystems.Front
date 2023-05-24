import React, {useCallback, useRef} from "react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";
import Dropdown from "../form/DropdownSelect";

interface RoleFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    name: string().required("Required!"),
})

export default function RoleManagerForm({initialValues, setInitialValues, submit}:RoleFormProps){

    const inqFormRef = useRef<any>(null);

    const onChangeName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            name: value.target.value
        }))
    },[setInitialValues])

    const inqFormRefHandler = useCallback((instance: any)=>{
        if(instance){
            inqFormRef.current = instance
        }
    },[inqFormRef])


    const options = [
        { value: "green", label: "Green" },
        { value: "blue", label: "Blue" },
        { value: "red", label: "Red" },
        { value: "yellow", label: "Yellow" },
        { value: "orange", label: "Orange" },
        { value: "pink", label: "Pink" },
        { value: "purple", label: "Purple" },
        { value: "grey", label: "Grey" }
      ];

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={submit}
            innerRef={inqFormRefHandler}
            >
            {()=>(
                <Form>
                    <div className="row">
                        <div className="col-6">
                        <GroupBox title="Person Info">
                           <div className="row">
                            <div className="col-12">
                            <InputField
                                label="Name"
                                name="name"
                                value={initialValues.name}
                                onChange={(event: any)=>onChangeName(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>
                        <div className="col-6">
                            <Dropdown
                                options={options}
                                onChange={(value: any)=> console.log(value)}
                                onScroll={()=> console.log("Asadbek")}
                                placeHolder="Select"
                                isSearchable={true}
                                 />
                        </div>
                        <div className="col-12 mt-3">
                            <Button type="submit" className="text-light bg-gold px-2 py-1">
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}