import React, {useState, Fragment} from 'react';
import {useForm} from 'react-hook-form';
import {Row, Col, Select} from 'antd';
import {post} from '../../utils/ApiCaller';
import InputField from '../../components/InputField';
import NotificationDialog from '../../components/NotificationDialog';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import auth from '../../routes/auth';
import {useSelector} from 'react-redux';

import './styles.scss';
import 'antd/dist/antd.css';

const {Option} = Select;

const optionSelectors = [
  {value: 'GP01', text: 'GP01'},
  {value: 'GP02', text: 'GP02'},
  {value: 'GP03', text: 'GP03'},
  {value: 'GP04', text: 'GP04'},
  {value: 'GP05', text: 'GP05'},
  {value: 'GP06', text: 'GP06'},
  {value: 'GP07', text: 'GP07'},
  {value: 'GP08', text: 'GP08'},
  {value: 'GP09', text: 'GP09'},
  {value: 'GP10', text: 'GP10'},
];

let text;

const SignUp = (props) => {
  const [groupID, setGroupID] = useState('GP01');
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const {handleSubmit, errors, register, watch} = useForm();
  const pathname = useSelector((state) => state.movieReducer.currentPath);

  const inputProperties = [
    {
      type: 'text',
      name: 'hoTen',
      label: 'Name',
      errors: errors,
      validator: register({
        required: 'Enter name',
        pattern: {
          value: /^[A-Za-z\s]+$/,
          message: 'Use normal characters only',
        },
      }),
      colSpan: 24,
    },
    {
      type: 'text',
      name: 'taiKhoan',
      label: 'Username',
      errors: errors,
      validator: register({
        required: 'Choose an Account name',
      }),
      colSpan: 24,
    },
    {
      type: 'password',
      name: 'matKhau',
      label: 'Password',
      errors: errors,
      validator: register({
        required: 'Enter password',
        minLength: {
          value: 6,
          message: 'Use 6 or more characters',
        },
      }),
      colSpan: 12,
    },
    {
      type: 'password',
      name: 'xacNhanMatKhau',
      label: 'Confirm',
      errors: errors,
      validator: register({
        required: 'Confirm password',
        validate: (value) =>
          value !== watch('matKhau') ? "Those password didn't match" : undefined,
      }),
      colSpan: 12,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      errors: errors,
      validator: register({
        required: 'Enter email address',
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: 'Invalid email address',
        },
      }),
      colSpan: 12,
    },
    {
      type: 'text',
      name: 'soDT',
      label: 'Phone',
      errors: errors,
      validator: register({
        required: 'Enter phone number',
        pattern: {
          value: /^\d{10}$/,
          message: 'Use exactly 10 numbers',
        },
      }),
      colSpan: 12,
    },
  ];

  const onSubmit = async (data) => {
    try {
      const res = await post('/api/QuanLyNguoiDung/DangKy', {...data, maNhom: groupID});
      saveUserToLocalStorage({...data, maNhom: groupID});
    } catch (err) {
      text = err.response.data;
      setIsDialogOpened(true);
    }
  };

  const handleSelectGroup = (value) => {
    setGroupID(value);
  };

  const saveUserToLocalStorage = (user) => {
    post('/api/QuanLyNguoiDung/DangNhap', user).then((res) => {
      LocalStorageUtils.setItem('user', res.data);
      LocalStorageUtils.setItem('token', res.data.accessToken);
      auth.signIn(() => props.history.push(pathname));
    });
  };

  return (
    <Fragment>
      <NavBar />
      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-heading">Creat Account</div>
          <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={[32, 8]}>
                {inputProperties.map((property, index) => {
                  return (
                    <InputField
                      key={index}
                      type={property.type}
                      name={property.name}
                      label={property.label}
                      errors={property.errors}
                      validator={property.validator}
                      colSpan={property.colSpan}
                    />
                  );
                })}
                <div className="signup-group-selector">
                  <Select
                    placeholder="Select a Group ID"
                    allowClear
                    onChange={handleSelectGroup}
                  >
                    {optionSelectors.map((option, index) => {
                      return (
                        <Option key={index} value={option.value}>
                          {option.text}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
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
      <Footer />
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text={text}
        options={[{label: 'OK'}]}
      />
    </Fragment>
  );
};

export default SignUp;
