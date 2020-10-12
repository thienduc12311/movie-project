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
];

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
      })
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
      })
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
      })
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
      })
    },
    {
      type: "password",
      name: 'matKhauHienTai',
      label: 'Current password',
      errors: errors,
      validator: register({
        required: "Confirm password",
        validate: value => value !== account.matKhau ? "The current password you entered is incorrect" : undefined
      })
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
      })
    },
    {
      type: "password",
      name: 'xacNhanMatKhau',
      label: 'Confirm password',
      errors: errors,
      validator: register({
        required: "Confirm password",
        validate: value => value !== watch('matKhau') ? "Those password didn't match" : undefined
      })
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
        <Row className="user-manage-header-container">
          <Col xs={24} md={18}>
            <h1>{account.hoTen}</h1>
            <h3>Your account is {account.taiKhoan}</h3>
          </Col>
          <Col xs={24} md={6}>
            <span>Sign Out</span>
          </Col>
        </Row>
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
              defaultValue={!start ? account[property.name] : ''}
            />
          ))}
        </Row>
        <div className="submit-container">
          <button className="btn btn-form-submit">Submit</button>
          <button
            type="button"
            className="btn"
            onClick={() => !start ? setIsAccountEditing(false) : setIsSecurityEditing(false)}
          >
            Cancel
            </button>
        </div>
      </form>
    )

    const renderInfoField = (start, end) => (
      <Row className="info">
        {inFoField.slice(start, end).map(field => (
          <Col style={{ height: 88 }} key={field.id} span={24}>
            <h3>{field.label}</h3>
            {field.id !== "matKhau" ?
              <p>{account[field.id]}</p> :
              <div
                onClick={() => { setIsSecurityEditing(true); setIsAccountEditing(false) }}
                style={{ display: `${isSecurityEditing ? "none" : "block"}` }}
              >
                <span className="btn">Edit</span>
              </div>}
          </Col>
        ))}
      </Row>
    )

    const renderBody = () => (
      <div className="user-manage-body">
        <Row>
          <Col span={6}>
            <h2>Account</h2>
          </Col>
          <Col span={16}>
            {isAccountEditing ? renderEditField(0, 4) : renderInfoField(0, 4)}
          </Col>
          <Col>
            <span
              className="btn"
              style={{ display: `${isAccountEditing ? "none" : "block"}` }}
              onClick={() => { setIsAccountEditing(true); setIsSecurityEditing(false) }} span={2}
            >
              Edit
            </span>
          </Col>
        </Row>
        <hr />
        <Row style={{ marginTop: 60 }}>
          <Col span={6}>
            <h2>Security</h2>
          </Col>
          <Col span={18}>
            {isSecurityEditing ? renderEditField(4) : renderInfoField(4)}
          </Col>
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