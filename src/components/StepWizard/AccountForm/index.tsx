import React, {FC} from 'react';
import FormLayout from "../FormLayout";
import AvatarPicker from "../../ui/AvatarPicker";
import InputField from "../../ui/InputField";
import * as Yup from 'yup';
import {UserType} from "../../../types";
import {useSelector} from "react-redux";
import {StateType} from "../../../redux/store";



const AccountForm:FC<AccountFormPropsType> = () => {
    const {initialValues, users} = useSelector(({addForm: {avatar, password, username}, users}: StateType )=> ({
        users: users.users,
        initialValues: {avatar, password, username}
    }))

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('required field')
            .notOneOf(
                users.map((user: UserType) => user.username),
                "you can't use this username",
            ),
        password: Yup.string().required('required field'),
        passwordRepeat: Yup.string()
            .oneOf([Yup.ref('password'), ''], "passwords don't match")
            .required('required field')
    })

    return (
        <FormLayout initialValues={initialValues} validationSchema={validationSchema}>
            <div>
                <AvatarPicker name={'avatar'} />
            </div>
            <div>
                <InputField name="username" label="User Name" />
                <InputField name="password" label="Password" type="password" />
                <InputField name="passwordRepeat" label="Repeat Password" type="password" />
            </div>
        </FormLayout>
    );
};

export default AccountForm;

type AccountFormPropsType = {
}