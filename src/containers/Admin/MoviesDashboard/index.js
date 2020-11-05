import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {useSelector} from 'react-redux';
import Axios from 'axios';
let moment = require('moment');
import DateFnsUtils from '@date-io/date-fns';
import {Box, Container, makeStyles} from '@material-ui/core';
import Swal from 'sweetalert2';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Page from '../../../components/Page';
const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: 150,
  },
}));
const DashboardMovie = () => {
  const [change, setChange] = useState(false);
  const classes = useStyles();
  const listMovie = useSelector((state) => state.movieReducer.listMovie);
  const [state, setState] = useState({
    columns: [
      {title: 'Movie ID', field: 'maPhim', type: 'numeric'},
      {title: 'Movie name', field: 'tenPhim'},
      {title: 'Trailer', field: 'trailer'},
      {title: 'Tag', field: 'biDanh'},
      {
        title: 'Poster',
        editComponent: (props) => (
          <input
            type="file"
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return props.onChange(e.target.files[0]);
            }}
          />
        ),
        field: 'hinhAnh',
        render: (hinhAnh) => (
          <img src={hinhAnh.hinhAnh} style={{width: 100, height: 100}} />
        ),
        type: 'string',
      },
      {title: 'Description', field: 'moTa'},
      {
        title: 'Release date',
        editComponent: (props) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={props.value ? props.value : new Date()}
              onChange={(date) => {
                props.onChange(date);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        ),
        field: 'ngayKhoiChieu',
      },
      {title: 'Rate', field: 'danhGia', type: 'numeric'},
    ],
    data: [],
  });
  useEffect(() => {
    Axios({
      method: 'GET',
      url:
        'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09',
    })
      .then((rs) => {
        // console.log(rs.data);
        setState((prevState) => {
          return {...prevState, data: rs.data};
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let handleAddMovie = (film) => {
    film.preventDefault();
    film.stopPropagation();
    let moment = require('moment');
    var form_data = new FormData();
    let ngayKhoiChieu = moment(film.ngayKhoiChieu).format('DD/MM/YYYY');
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    let maPhim = parseInt(film.maPhim, 10);
    let danhGia = parseInt(film.danhGia, 10);
    let filmAdd = {
      ...film,
      maNhom: 'GP09',
      maPhim: maPhim,
      danhGia: danhGia,
      ngayKhoiChieu: ngayKhoiChieu,
    };
    for (const key in filmAdd) {
      form_data.append(key, filmAdd[key]);
    }
    Axios({
      method: 'POST',
      url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh',
      data: form_data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((rs) => {
        setChange(!change);
        Swal.fire('Success !', 'Press OK!', 'success');
      })
      .catch((error) => {
        Swal.fire('Fail !', error.response.data, 'error');
      });
  };
  let handleEditMovie = (film, oldData) => {
    console.log(oldData);
    var form_data = new FormData();
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    let ngayKhoiChieu = moment(film.ngayKhoiChieu).format('DD/MM/YYYY');
    let maPhim = parseInt(film.maPhim, 10);
    let danhGia = parseInt(film.danhGia, 10);
    let filmEdit = {
      ...film,
      maNhom: 'GP09',
      maPhim: maPhim,
      danhGia: danhGia,
      ngayKhoiChieu: ngayKhoiChieu,
    };
    for (const key in filmEdit) {
      form_data.append(key, filmEdit[key]);
    }
    Axios({
      method: 'POST',
      url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload',
      data: form_data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((rs) => {
        console.log(rs.data);

        setChange(!change);
        Swal.fire('Edit Success !', 'Press OK to exit!', 'success').then(
          location.reload()
        );
      })
      .catch((error) => {
        Swal.fire('Fail !', 'Press OK to exit', 'error');
      });
  };
  let handleDeleteMovie = (film) => {
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    Axios({
      method: 'DELETE',
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${film.maPhim}`,
      data: film.maPhim,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((rs) => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(film), 1);
          return {...prevState, data};
        });
        Swal.fire('Success !', 'Nhấn OK để thoát!', 'success');
      })
      .catch((error) => {
        Swal.fire('Fail !', error.response.data, 'error');
      });
  };
  return (
    <Page className={classes.root} title="Movies">
      <Container maxWidth={false}>
        <Box mt={3}>
          <MaterialTable
            detailPanel={(rowData) => {
              return (
                <iframe
                  width="100%"
                  height="500"
                  src={rowData.trailer}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              );
            }}
            title="Movies"
            columns={state.columns}
            data={state.data}
            options={{
              headerStyle: {
                backgroundColor: '#c7c9c8',
              },
              emptyRowsWhenPaging: false,
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    handleAddMovie(newData);
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return {...prevState, data};
                    });
                  }, 300);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      handleEditMovie(newData, oldData);
                    }
                  }, 300);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    handleDeleteMovie(oldData);
                  }, 300);
                }),
            }}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default DashboardMovie;
