import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { Box, Container, makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Page from '../../../components/Page';
const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: 150,
  },
}));
const DashboardMovie = () => {
  const [change, setChange] = React.useState(false);
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: 'Movie ID', field: 'maPhim', type: 'numeric' },
      { title: 'Movie name', field: 'tenPhim' },
      { title: 'Trailer', field: 'trailer' },
      { title: 'Tag', field: 'biDanh' },
      {
        title: 'Poster',
        editComponent: (props) => (
          <input type="file" onChange={(e) => props.onChange(e.target.files[0])} />
        ),
        field: 'hinhAnh',
        render: (hinhAnh) => (
          <img src={hinhAnh.hinhAnh} style={{ width: 100, height: 100 }} />
        ),
        type: 'image',
      },
      { title: 'Description', field: 'moTa' },
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
      { title: 'Rate', field: 'danhGia', type: 'numeric' },
    ],
    data: [],
  });
  useEffect(() => {
    Axios({
      method: 'GET',
      url:
        'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
    })
      .then((rs) => {
        setState((prevState) => {
          return { ...prevState, data: rs.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  useEffect(() => {
    Axios({
      method: 'GET',
      url:
        'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
    })
      .then((rs) => {
        // console.log(rs.data);
        setState((prevState) => {
          return { ...prevState, data: rs.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let handleAddMovie = (film) => {
    let moment = require('moment');
    console.log(film);

    var form_data = new FormData();
    let ngayKhoiChieu = moment(film.ngayKhoiChieu).format('DD/MM/YYYY');
    const userAdmin = JSON.parse(localStorage.getItem('userAdmin'));
    let maPhim = parseInt(film.maPhim, 10);
    let danhGia = parseInt(film.danhGia, 10);
    let filmAdd = {
      ...film,
      maNhom: 'GP01',
      maPhim: maPhim,
      danhGia: danhGia,
      ngayKhoiChieu: ngayKhoiChieu,
    };
    for (const key in filmAdd) {
      console.log(key, filmAdd[key]);
      form_data.append(key, filmAdd[key]);
    }
    Axios({
      method: 'POST',
      url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh',
      // "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim",
      data: form_data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((rs) => {
        setChange(!change);
        Swal.fire('Thêm phim thành công !', 'Nhấn OK để thoát!', 'success');
      })
      .catch((error) => {
        Swal.fire('Thêm phim thành công !', error.response.data, 'error');
      });
  };
  let handleEditMovie = (film) => {
    var form_data = new FormData();
    const userAdmin = JSON.parse(localStorage.getItem('user'));
    let maPhim = parseInt(film.maPhim, 10);
    let danhGia = parseInt(film.danhGia, 10);
    let filmEdit = {
      ...film,
      maNhom: 'GP01',
      maPhim: maPhim,
      danhGia: danhGia,
    };
    for (const key in filmEdit) {
      console.log(key, filmEdit[key]);
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
        setChange(!change);
        Swal.fire('Sửa phim thành công !', 'Nhấn OK để thoát!', 'success');
      })
      .catch((error) => {
        Swal.fire('Sửa không phim thành công !', 'Nhấn OK để thoát', 'error');
      });
  };
  let handleDeleteMovie = (film) => {
    console.log(film);
    const userAdmin = JSON.parse(localStorage.getItem('userAdmin'));
    Axios({
      method: 'DELETE',
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${film.maPhim}`,
      data: film.maPhim,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((rs) => {
        Swal.fire('Xoá phim thành công !', 'Nhấn OK để thoát!', 'success');
      })
      .catch((error) => {
        Swal.fire('Xoá không phim thành công !', error.response.data, 'error');
      });
  };
  // <div>
  //   <Grid container spacing={3}>
  //     <NavbarAdmin />
  //     <Grid className={classes.rightTable} item xs={12} sm={10}>
  //       {renderTableUser()}
  //     </Grid>
  //   </Grid>
  // </div>;
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
            title="Editable Example"
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

                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      handleEditMovie(newData);
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    handleDeleteMovie(oldData);
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.movieReducer.listMovie,
  };
};

export default connect(mapStateToProps, null)(DashboardMovie);
