import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {Box, Container, makeStyles, TextField} from '@material-ui/core';
import Page from '../../../components/Page';
import Swal from 'sweetalert2';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';
import {get, put, remove} from '../../../utils/ApiCaller';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightTable: {
    padding: theme.spacing(2),
  },
}));

function Customer() {
  const classes = useStyles();
  const [group, setGroup] = useState('GP01');
  const columns = [
    {title: 'Name', field: 'hoTen'},
    {title: 'Account', field: 'taiKhoan', disabled: true},
    {title: 'Password', field: 'matKhau'},
    {title: 'Email', field: 'email', type: 'string'},
    {
      title: 'Phone number',
      field: 'soDt',
      type: 'numeric',
    },
    {
      title: 'Type',
      field: 'maLoaiNguoiDung',
      lookup: {KhachHang: 'Customer', QuanTri: 'Admin'},
    },
  ];
  const [state, setState] = useState({
    data: [],
    query: {
      pageSizeOptions: [10, 20],
    },
  });

  useEffect(() => {
    get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${group}`)
      .then((rs) => {
        setState((prevState) => {
          return {...prevState, data: rs.data};
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [group]);
  const handleDeleteUser = (user) => {
    const userAdmin = LocalStorageUtils.getItem('user');
    remove(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user.taiKhoan}`, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    })
      .then((rs) => {
        Swal.fire('Delete success', 'Press OK!', 'success');
      })
      .catch((error) => {
        Swal.fire('Delete failed !', error.response.data, 'error');
      });
  };

  const handleEditUser = (user) => {
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    let userEdit = {...user, maNhom: group};
    if (user.maLoaiNguoiDung !== 'KhachHang' && user.maLoaiNguoiDung !== 'QuanTri') {
      console.log('sai ma loai ng dùng');
    } else {
      put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', userEdit, {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      })
        .then((rs) => {
          Swal.fire('Edit success!', 'Nhấn OK để thoát!', 'success');
        })
        .catch((error) => {
          console.log({...error});
          Swal.fire('Edit failed !', error.response.data, 'error');
        });
    }
  };
  // add
  const handleAddUser = (user) => {
    const userAdmin = LocalStorageUtils.getItem('user');
    let userAdd = {...user, maNhom: group};
    if (user.maLoaiNguoiDung !== 'KhachHang' && user.maLoaiNguoiDung !== 'QuanTri') {
      console.log('sai ma loai ng dùng');
    } else {
      Axios({
        method: 'POST',
        url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung',
        data: userAdd,
        headers: {
          Authorization: `Bearer ${userAdmin.accessToken}`,
        },
      })
        .then((rs) => {
          Swal.fire('Success!', 'Nhấn OK để thoát!', 'success');
        })
        .catch((error) => {
          Swal.fire('Fail!', error.response.data, 'error');
        });
    }
  };
  let renderTableUser = () => {
    if (state.data.length > 0) {
      return (
        <MaterialTable
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 15, 20, 25],
            headerStyle: {
              backgroundColor: '#c7c9c8',
            },
            emptyRowsWhenPaging: false,
          }}
          title="Dashboard"
          columns={columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  handleAddUser(newData);
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return {...prevState, data};
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  handleEditUser(newData);
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return {...prevState, data};
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  handleDeleteUser(oldData);
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return {...prevState, data};
                  });
                }, 600);
              }),
          }}
        />
      );
    }
  };
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>
          <TextField
            mt={3}
            label="Group"
            name="state"
            onChange={(e) => {
              setGroup(e.target.value);
            }}
            required
            select
            SelectProps={{native: true}}
            value={group}
            variant="outlined"
          >
            <option value="GP01">GP01</option>
            <option value="GP02">GP02</option>
            <option value="GP03">GP03</option>
            <option value="GP04">GP04</option>
            <option value="GP05">GP05</option>
            <option value="GP06">GP06</option>
            <option value="GP07">GP07</option>
            <option value="GP08">GP08</option>
            <option value="GP09">GP09</option>
          </TextField>
          {renderTableUser()}
        </Box>
      </Container>
    </Page>
  );
}

export default React.memo(Customer);
