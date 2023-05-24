import React, {useCallback} from "react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";

interface UserManagerFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    roleName: string().required("Required!"),
})

export default function UserManagerEditRoleForm({initialValues, setInitialValues, submit}:UserManagerFormProps){

  
    const onChangeRoleName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            roleName: value.target.value
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
                        <div className="col-12">
                            <GroupBox
                                >
                                    <div className="row">
                                        <div className="col-12 d-flex">
                                        <InputField
                                        label="Роль"
                                        name="roleName"
                                        value={initialValues.roleName}
                                        onChange={(event: any)=>onChangeRoleName(event)}
                                         />
                                        </div>
                                    </div>
                            </GroupBox>
                        </div>
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <Button type="submit" className="text-light bg-gold px-2 py-1">
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}