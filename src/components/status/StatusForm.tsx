import React, {useCallback} from "react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";

interface StatusFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    name: string().required("Required!"),
    description: string().required("Required!")
})

export default function StatusForm({initialValues, setInitialValues, submit}:StatusFormProps){

    const onChangeName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            name: value.target.value
        }))
    },[setInitialValues])

    const onChangeDescription = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            description: value.target.value
        }))
    },[setInitialValues])



    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={submit}
            >
            {()=>(
                <Form>
                    <div className="row">
                        <div className="col-6">
                        <GroupBox title="Информация о статусе">
                           <div className="row">
                            <div className="col-12">
                            <InputField
                                label="Название"
                                name="name"
                                value={initialValues.name}
                                onChange={(event: any)=>onChangeName(event)}
                                />
                            </div>
                            <div className="col-12">
                            <InputField
                                label="Описание"
                                name="description"
                                value={initialValues.description}
                                onChange={(event: any)=>onChangeDescription(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>
                        <div className="col-12 mt-3">
                            <Button type="submit" className="text-light bg-gold px-2 py-1">
                                Созранить
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}