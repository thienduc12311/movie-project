import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {useSelector} from 'react-redux';
import Axios from 'axios';
let moment = require('moment');
import DateFnsUtils from '@date-io/date-fns';
import {Box, Container, makeStyles, TextField} from '@material-ui/core';
import Swal from 'sweetalert2';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Page from '../../../components/Page';
import {get, post, remove} from '../../../utils/ApiCaller';
const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: 150,
  },
}));
const DashboardMovie = () => {
  const [change, setChange] = useState(false);
  const [group, setGroup] = useState('GP01');
  const classes = useStyles();
  const listMovie = useSelector((state) => state.movieReducer.listMovie);
  const tableContent = {
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
  };
  const [state, setState] = useState({
    data: [],
  });
  useEffect(() => {
    get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${group}`)
      .then((rs) => {
        setState((prevState) => {
          return {...prevState, data: rs.data};
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [group]);

  let handleAddMovie = (film) => {
    let moment = require('moment');
    var form_data = new FormData();
    let ngayKhoiChieu = moment(film.ngayKhoiChieu).format('DD/MM/YYYY');
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    let maPhim = parseInt(film.maPhim, 10);
    let danhGia = parseInt(film.danhGia, 10);
    let filmAdd = {
      ...film,
      maNhom: group,
      maPhim: maPhim,
      danhGia: danhGia,
      ngayKhoiChieu: ngayKhoiChieu,
    };
    for (const key in filmAdd) {
      form_data.append(key, filmAdd[key]);
    }
    post('/api/QuanLyPhim/ThemPhimUploadHinh', form_data, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
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
    var form_data = new FormData();
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    let ngayKhoiChieu = moment(film.ngayKhoiChieu).format('DD/MM/YYYY');
    let maPhim = parseInt(film.maPhim, 10);
    let danhGia = parseInt(film.danhGia, 10);
    let filmEdit = {
      ...film,
      maNhom: group,
      maPhim: maPhim,
      danhGia: danhGia,
      ngayKhoiChieu: ngayKhoiChieu,
    };
    for (const key in filmEdit) {
      form_data.append(key, filmEdit[key]);
    }
    post('/api/QuanLyPhim/CapNhatPhimUpload', form_data, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    })
      .then((rs) => {
        get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${rs.data.maPhim}`).then((res) => {
          setState((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = res.data;
            return {...prevState, data};
          });
        });
        Swal.fire('Edit Success !', 'Press OK to exit!', 'success');
      })
      .catch((error) => {
        Swal.fire('Fail !', 'Press OK to exit', 'error');
      });
  };
  let handleDeleteMovie = (film) => {
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    remove(`/api/QuanLyPhim/XoaPhim?MaPhim=${film.maPhim}`, film.maPhim, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    })
      .then((rs) => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(film), 1);
          return {...prevState, data};
        });
        Swal.fire('Success !', 'Press OK!', 'success');
      })
      .catch((error) => {
        Swal.fire('Fail !', error.response.data, 'error');
      });
  };
  return (
    <Page className={classes.root} title="Movies">
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
            columns={tableContent.columns}
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

export default React.memo(DashboardMovie);
