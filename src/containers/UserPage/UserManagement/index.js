import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import LoadingPage from '../../LoadingPage';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';
import { post, put } from '../../../utils/ApiCaller';
import { Row, Col } from 'antd';
import { useForm } from "react-hook-form";
import InputField from '../../../components/InputField';
import NotificationDialog from '../../../components/NotificationDialog';
import auth from '../../../routes/auth';

import './styles.scss';

const infoField = [
  { label: 'USERNAME', id: 'taiKhoan' },
  { label: 'NAME', id: 'hoTen' },
  { label: 'EMAIL', id: 'email' },
  { label: 'PHONE', id: 'soDT' },
  { label: 'PASSWORD', id: 'matKhau' },
];

let text;
let content;
let options = [];

const UserManagement = props => {
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
          value: /^[A-Za-z\s]+$/,
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

  if (isDialogOpened)
    document.body.setAttribute('style', 'overflow: hidden');
  else
    document.body.setAttribute('style', 'overflow: unset');

  const renderUserManagement = () => {
    const onSubmit = async (data) => {
      const singIn = async user => {
        try {
          const res = await post('/api/QuanLyNguoiDung/DangNhap', user);
          LocalStorageUtils.setItem('user', res.data);
          LocalStorageUtils.setItem('token', res.data.accessToken);
        } catch{ }
      }
      const updateAccount = async user => {
        try {
          const res = await post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', user);
          setAccount(res.data);
        } catch{ }
      }
      const changeInfo = async user => {
        try {
          const res = await put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', { ...user, ...account, ...data });

          singIn(res.data);
          updateAccount(res.data);

          setIsAccountEditing(false);
          setIsSecurityEditing(false);

          text = "Update Successfully";
        } catch{
          text = "Update Failed";
        }
        content = "";
        options = [{ label: 'OK' }];
        setIsDialogOpened(true);
      }

      const user = LocalStorageUtils.getItem('user');
      if (data.hoTen !== user.hoTen || data.email !== user.email || data.soDT !== user.soDT)
        changeInfo(user);
      else {
        setIsAccountEditing(false);
        setIsSecurityEditing(false);
      }
    };

    const handleSignOut = () => {
      const singOut = () => {
        LocalStorageUtils.removeItem('user');
        LocalStorageUtils.removeItem('token');
        auth.signOut(() => props.history.push('/'));
      }

      text = "Confirm";
      content = "Are you sure to Sign out?";
      options = [
        { label: "Cancel" },
        { label: "OK", onClick: singOut }
      ];
      setIsDialogOpened(true);
    }

    const renderHeader = () => (
      <div className="user-manage-header">
        <Row className="user-manage-header-container" align="middle">
          <Col xs={24} md={21}>
            <h1>{account.hoTen}</h1>
            <h3>Your account is {account.taiKhoan}</h3>
          </Col>
          <Col xs={24} md={3}>
            <span onClick={handleSignOut}>Sign Out</span>
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
              defaultValue={start === 1 ? account[property.name] : ''}
            />
          ))}
        </Row>
        <div className="submit-container">
          <button
            type="button"
            className="btn"
            onClick={() => start === 1 ? setIsAccountEditing(false) : setIsSecurityEditing(false)}
          >
            Cancel
          </button>
          <button className="btn btn-form-submit">Done</button>
        </div>
      </form>
    )

    const renderInfoField = (start, end) => (
      <Row className="info">
        {infoField.slice(start, end).map(field => (
          <Col
            style={{ height: field.id !== "matKhau" ? 88 : 50 }}
            key={field.id}
            span={24}
          >
            <h3 style={{ marginTop: field.id === "matKhau" && 12 }}>{field.label}</h3>
            {field.id !== "matKhau" && <p>{account[field.id]}</p>}
          </Col>
        ))
        }
      </Row >
    )

    const renderBody = () => (
      <div className="user-manage-body">
        <Row style={{ marginBottom: 30 }}>
          <Col xs={24} md={6}>
            <h2>Account</h2>
          </Col>
          <Col xs={24} md={16}>
            <Row className="info">
              <Col style={{ height: 88 }} span={24}>
                <h3>USERNAME</h3>
                <p>{account.taiKhoan}</p>
              </Col>
            </Row>
            {isAccountEditing ? renderEditField(1, 4) : renderInfoField(1, 4)}
          </Col>
          <Col>
            <span
              className="btn"
              style={{ display: `${isAccountEditing ? "none" : "block"}` }}
              onClick={() => { setIsAccountEditing(true); setIsSecurityEditing(false) }}
            >
              Edit
            </span>
          </Col>
        </Row>
        <hr />
        <Row style={{ marginTop: 30 }}>
          <Col xs={24} md={6}>
            <h2>Security</h2>
          </Col>
          <Col xs={24} md={16}>
            {isSecurityEditing ? renderEditField(4) : renderInfoField(4)}
          </Col>
          <Col>
            <span
              className="btn"
              style={{ display: `${isSecurityEditing ? "none" : "block"}` }}
              onClick={() => { setIsSecurityEditing(true); setIsAccountEditing(false) }}
            >
              Edit
            </span>
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
          content={content}
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
    return () => document.body.setAttribute('style', 'overflow: unset');
  }, [])

  return (
    <Fragment>
      <NavBar />
      {account ? renderUserManagement() : <LoadingPage />}
      <Footer />
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text={text}
        content={content}
        options={options}
      />
    </Fragment>
  )
}

export default UserManagement;