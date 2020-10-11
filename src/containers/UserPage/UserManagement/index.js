import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import LoadingPage from '../../../components/LoadingPage';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';
import { post } from '../../../utils/ApiCaller';
import { Row, Col } from 'antd';
import { useForm } from "react-hook-form";
import InputField from '../../../components/InputField';
import NotificationDialog from '../../../components/NotificationDialog';

import './styles.scss';

let text;

const inFoField = [
  { label: 'USERNAME', id: 'taiKhoan' },
  { label: 'NAME', id: 'hoTen' },
  { label: 'EMAIL', id: 'email' },
  { label: 'PHONE', id: 'soDT' },
  { label: 'PASSWORD', id: 'matKhau' },
]

const UserManagement = () => {
  const [account, setAccount] = useState(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isAccountEditing, setIsAccountEditing] = useState(false);
  const [isSecurityEditing, setIsSecurityEditing] = useState(false);
  const { handleSubmit, errors, register, watch } = useForm();

  document.title = "Manage your account - Movie Project";

  const inputProperties = [
    {
      type: "text",
      name: 'taiKhoan',
      label: 'Username',
      errors: errors,
      validator: register({
        required: "Choose an Account name"
      }),
    },
    {
      type: "text",
      name: 'hoTen',
      label: 'Name',
      errors: errors,
      validator: register({
        required: "Enter name",
        pattern: {
          value: /^[A-Za-z]+$/,
          message: "Use normal characters only"
        }
      }),
    },
    {
      type: "text",
      name: 'email',
      label: 'Email',
      errors: errors,
      validator: register({
        required: "Enter email address",
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: "Invalid email address"
        }
      }),
    },
    {
      type: "text",
      name: 'soDT',
      label: 'Phone',
      errors: errors,
      validator: register({
        required: "Enter phone number",
        pattern: {
          value: /^\d{10}$/,
          message: "Use exactly 10 numbers"
        }
      }),
    },
    {
      type: "password",
      name: 'matKhau',
      label: 'Current password',
      errors: errors,
      validator: register({
        required: "Confirm password",
        validate: value => value !== account.matKhau ? "Those password didn't match" : undefined
      }),
    },
    {
      type: "password",
      name: 'matKhau',
      label: 'New password',
      errors: errors,
      validator: register({
        required: "Enter password",
        minLength: {
          value: 6,
          message: "Use 6 or more characters"
        }
      }),
    },
    {
      type: "password",
      name: 'xacNhanMatKhau',
      label: 'Confirm password',
      errors: errors,
      validator: register({
        required: "Confirm password",
        validate: value => value !== watch('matKhau') ? "Those password didn't match" : undefined
      }),
    },
  ];

  const renderUserManagement = () => {
    const onSubmit = async (data) => {
      // try {
      //   const res = await post('/api/QuanLyNguoiDung/DangNhap', data);
      //   LocalStorageUtils.setItem('user', res.data);
      // } catch (err) {
      //   text = err.response.data;
      //   setIsDialogOpened(true);
      // }
      const user = LocalStorageUtils.getItem('user');
      console.log({ ...data })
    };

    const renderHeader = () => (
      <div className="user-manage-header">
        <div className="header-left">
          <h1>{account.hoTen}</h1>
          <h3>Your account is {account.taiKhoan}</h3>
        </div>
        <div className="header-right">
          <p>Sign Out</p>
        </div>
      </div>
    )

    const renderEditField = (start, end) => (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[32, 8]}>
          {inputProperties.slice(start, end).map((property, index) => (
            <InputField
              key={index}
              type={property.type}
              name={property.name}
              label={property.label}
              errors={property.errors}
              validator={property.validator}
              colSpan={property.colSpan}
              value={!start && account[inFoField[index].id]}
            />
          ))}
        </Row>
        <div className="submit-container">
          <button className="btn btn-form-submit">SUBMIT</button>
        </div>
      </form>
    )

    const renderInfoField = (start, end) => (
      <Row>
        {inFoField.slice(start, end).map(field => (
          <Col style={{ height: 80 }} key={field.id} span={24}>
            <h3>{field.label}</h3>
            <p>{account[field.id]}</p>
          </Col>
        ))}
      </Row>
    )

    console.log(account)
    const renderBody = () => (
      <div className="user-manage-body">
        <Row>
          <Col span={6}>Account</Col>
          <Col span={12}>
            {isAccountEditing ? renderEditField(0, 4) : renderInfoField(0, 4)}
          </Col>
          <Col onClick={() => setIsAccountEditing(!isAccountEditing)} span={6}>Edit</Col>
        </Row>
        <hr />
        <Row>
          <Col span={6}>Security</Col>
          <Col span={12}>
            {isSecurityEditing ? renderEditField(4) : renderInfoField(4)}
          </Col>
          <Col onClick={() => setIsSecurityEditing(!isSecurityEditing)} span={6}>Edit</Col>
        </Row>
      </div>
    )

    return (
      <div className="user-manage-page">
        {renderHeader()}
        {renderBody()}
        <NotificationDialog
          isOpened={isDialogOpened}
          setIsOpened={setIsDialogOpened}
          text={text}
          options={[{ label: 'OK' }]}
        />
      </div>
    )
  }

  useEffect(() => {
    const fetData = async user => {
      try {
        const res = await post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', user);
        setAccount(res.data);
      } catch{ }
    }

    const user = LocalStorageUtils.getItem('user');
    if (user)
      fetData(user);
  }, [])


  return (
    <Fragment>
      <NavBar />
      {account ? renderUserManagement() : <LoadingPage />}
      <Footer />
    </Fragment>
  )
}

export default UserManagement;