import {useSelector} from 'react-redux';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {Box, Container, makeStyles} from '@material-ui/core';
import Page from '../../../components/Page';
import Swal from 'sweetalert2';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';
// import NavbarAdmin from './NavbarAdmin';
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
  const listUser = useSelector((state) => state.userReducer.listUser);
  const [state, setState] = useState({
    columns: [
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
    ],
    data: [],
    query: {
      pageSizeOptions: [10, 20],
    },
  });

  useEffect(() => {
    Axios({
      method: 'GET',
      url:
        'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP04',
    })
      .then((rs) => {
        // dispatch(actGetListUser(rs.data))
        setState((prevState) => {
          return {...prevState, data: rs.data};
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDeleteUser = (user) => {
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    Axios({
      method: 'DELETE',
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user.taiKhoan}`,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
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
    let userEdit = {...user, maNhom: 'GP04'};
    if (user.maLoaiNguoiDung !== 'KhachHang' && user.maLoaiNguoiDung !== 'QuanTri') {
      console.log('sai ma loai ng dùng');
    } else {
      Axios({
        method: 'PUT',
        url:
          'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        data: userEdit,
        headers: {
          Authorization: `Bearer ${userAdmin.accessToken}`,
        },
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
    let userAdd = {...user, maNhom: 'GP04'};
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
          columns={state.columns}
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
    // <div>
    //   <Grid container spacing={3}>
    //     {/* <NavbarAdmin /> */}
    //     <Grid className={classes.rightTable} item xs={12} sm={10}>
    //       {renderTableUser()}
    //     </Grid>
    //   </Grid>
    // </div>
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>{renderTableUser()}</Box>
      </Container>
    </Page>
  );
}

export default Customer;
