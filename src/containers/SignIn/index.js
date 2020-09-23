import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from "react-hook-form";
import { Row, Col, Select } from 'antd';
import { post, get } from '../../utils/ApiCaller';
import InputField from '../../components/InputField';
import NotificationDialog from '../../components/NotificationDialog';
import LocalStorageUtils from '../../utils/LocalStorageUtils';

import 'antd/dist/antd.css';

let text;
const options = [{ label: 'OK' }];

const SignUp = () => {
    const [user, setUser] = useState(null);
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const { handleSubmit, errors, register } = useForm();

    const onSubmit = (data) => {
        setUser(data);
    };

    useEffect(() => {
        if (user) {
            post('/api/QuanLyNguoiDung/DangNhap', user)
                .then((res) => {
                    LocalStorageUtils.setItem('user', res.data);
                })
                .catch(() => {
                    setIsDialogOpened(true);
                })
        }
    }, [user]);

    return (
        <Fragment>
            <div className="signup-container">
                <div className="signup-content">
                    <div className="signup-heading">LOGIN</div>
                    <div className="form-wrapper">
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <Row gutter={[32, 8]}>
                                <InputField
                                    name='taiKhoan'
                                    label='Username'
                                    errors={errors}
                                    validator={register({
                                        required: "Choose an Account name"
                                    })}
                                />
                                <InputField
                                    type="password"
                                    name='matKhau'
                                    label='Password'
                                    errors={errors}
                                    validator={register({
                                        required: "Enter password"
                                    })}
                                />
                                <Col xs={24}>
                                    <div className="submit-container">
                                        <button className="btn btn-form-submit">SUBMIT</button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
            <NotificationDialog
                isOpened={isDialogOpened}
                setIsOpened={setIsDialogOpened}
                text={"Login Failed"}
                options={[{ label: 'OK' }]}
            />
        </Fragment>
    );
}

export default SignUp;