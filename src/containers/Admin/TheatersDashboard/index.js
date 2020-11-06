import React, {useEffect, Fragment, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCinemaComplexInfo} from '../../../redux/actions/movieAction';
import {Menu} from 'antd';
import './styles.scss';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'antd/dist/antd.css';
import {get, post} from '../../../utils/ApiCaller';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';
import Swal from 'sweetalert2';
const theater = {
  CGV: [],
  BHDStar: [],
  CineStar: [],
  LotteCinima: [],
  MegaOS: [],
  Galaxy: [],
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: 'auto',
    width: 200,
  },
  marginAutoItem: {
    margin: 'auto',
  },
}));
const {SubMenu} = Menu;
const TheatersDashboard = () => {
  const cinemaComplexInfo = useSelector((state) => state.movieReducer.cinemaComplexInfo);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [chosenCine, setChosenCine] = useState({});
  const [group, setGroup] = useState(0);
  const [price, setPrice] = useState(0);
  const [movieID, setMovieID] = useState(0);
  const [date, setDate] = useState('2020-11-11T10:30');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCinemaComplexInfo());
    get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=CGV').then((res) => {
      {
        theater.CGV = res.data;
      }
    });
    get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=LotteCinima').then(
      (res) => {
        {
          theater.LotteCinima = res.data;
        }
      }
    );
    get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=CineStar').then(
      (res) => {
        {
          theater.CineStar = res.data;
        }
      }
    );
    get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=BHDStar').then(
      (res) => {
        {
          theater.BHDStar = res.data;
        }
      }
    );
    get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=MegaGS').then((res) => {
      {
        theater.MegaOS = res.data;
      }
    });
    get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=Galaxy').then((res) => {
      {
        theater.Galaxy = res.data;
      }
    });
  }, []);

  const handleCreate = () => {
    const token = LocalStorageUtils.getItem('token');
    let day = date.slice(0, 10);
    if (day) {
      day = day.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function (match, y, m, d) {
        return d + '/' + m + '/' + y;
      });
    }

    const time = date.slice(11, 16) + ':00';
    const theaterID = chosenCine.danhSachRap[group].maRap;
    post(
      '/api/QuanLyDatVe/TaoLichChieu',
      {
        maPhim: movieID,
        ngayChieuGioChieu: `${day} ${time}`,
        maRap: theaterID,
        giaVe: price,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
      .then((res) => {
        Swal.fire('Create Success !', 'Press OK to exit!', 'success');
      })
      .catch((err) => {
        Swal.fire('Fail !', err.response.data, 'error');
      });
  };
  const renderCinemaComplexMenu = () => {
    return cinemaComplexInfo?.map((cinemaComplex) => (
      <SubMenu
        key={cinemaComplex.maHeThongRap}
        title={
          <span>
            <img src={cinemaComplex.logo} />
            <span>{cinemaComplex.tenHeThongRap}</span>
          </span>
        }
      >
        {renderCinemaMenu(cinemaComplex)}
      </SubMenu>
    ));
  };
  const renderDialog = () => {
    return (
      <Dialog
        open={isOpen}
        // onClose={() => {
        //   setIsOpen(false);
        // }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{chosenCine.tenCumRap}</DialogTitle>
        <DialogContent>
          <DialogContentText>{chosenCine.diaChi}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Movie ID"
            type="Number"
            onChange={(e) => {
              setMovieID(e.target.value);
            }}
            required
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="Number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
            fullWidth
          />
          <TextField
            className={classes.marginAutoItem}
            label="Theatre"
            name="state"
            onChange={(e) => {
              setGroup(e.target.value);
            }}
            required
            select
            SelectProps={{native: true}}
            value={group}
          >
            <option value={0}>Theatre 1</option>
            <option value={1}>Theatre 2</option>
            <option value={2}>Theatre 3</option>
            <option value={3}>Theatre 4</option>
            <option value={4}>Theatre 5</option>
            <option value={5}>Theatre 6</option>
            <option value={6}>Theatre 7</option>
            <option value={7}>Theatre 8</option>
            <option value={8}>Theatre 9</option>
            <option value={9}>Theatre 10</option>
          </TextField>
        </DialogContent>
        <TextField
          onChange={(e) => {
            setDate(e.target.value);
          }}
          id="datetime-local"
          label="Time"
          type="datetime-local"
          defaultValue="2020-11-06T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              handleCreate();
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const renderCinemaMenu = (cinemaComplex) => {
    return cinemaComplex.lstCumRap.map((item) => (
      <Menu.Item
        key={item.maCumRap}
        onClick={() => {
          const indexOfTheater = theater[cinemaComplex.maHeThongRap].findIndex(
            (e) => e.maCumRap === item.maCumRap
          );

          setChosenCine(theater[cinemaComplex.maHeThongRap][indexOfTheater]);
          setIsOpen(true);
        }}
      >
        {/* <NavLink to={`/cinema-complex/${item.maCumRap}`}>{item.tenCumRap}</NavLink> */}
        <span>{item.tenCumRap}</span>
      </Menu.Item>
    ));
  };

  const renderCinemaComplexPage = () => (
    <div className="cinema-complex-page">
      <h1>Cinema Complex</h1>

      <Menu style={{width: '100%'}} mode="inline">
        {renderCinemaComplexMenu()}
      </Menu>
    </div>
  );
  return (
    <div>
      {renderDialog()}

      {renderCinemaComplexPage()}
    </div>
  );
};

export default React.memo(TheatersDashboard);
