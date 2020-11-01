import {
  SET_CURRENT_PATH,
  SET_MOVIE_LIST,
  SET_CINEMA_COMPLEX_OPTIONS,
  SET_CINEMA_OPTIONS,
  SET_DATE_OPTIONS,
  SET_TIME_OPTIONS,
  SET_CINEMA_COMPLEX_INFO,
  SET_CINEMA_INFO,
} from '../constants/movieConstants';

const initialState = {
  currentPath: '/',
  movieList: null,
  optionsForSearchBar: {
    movieOptions: null,
    cinemaComplexOptions: null,
    cinemaOptions: null,
    dateOptions: null,
    timeOptions: null,
  },
  cinemaComplexInfo: null,
  cinemaInfo: null,
  newsArray: [
    {
      id: 0,
      title: 'Ròm: Bạo Lực Xuất Sắc Với Trải Nghiệm Đánh Đề Cực Đã',
      details:
        'Một dự án điện ảnh lấy đi của cả đoàn làm phim hết tám năm thanh xuân. Những thước phim ấy mang về vinh quang cho Việt Nam tại Liên hoan phim Busan năm 2019, khi chiến thắng giải thưởng cao quý nhất. Cũng chính tác phẩm vẻ vang kia suýt nữa đã bị tiêu hủy bởi một vài vấn đề vi phạm quy tắc. Để rồi lại một lần nữa bằng cả tâm huyết và sự đấu tranh kiên cường, Ròm – bộ phim độc lập của đạo diễn Trần Thanh Huy đã chính thức ra mắt khán giả tại các rạp chiếu phim trên toàn quốc. Xem thêm tại: https://www.galaxycine.vn/binh-luan-phim/review-rom-bao-luc-xuat-sac-voi-trai-nghiem-danh-de-cuc-da.Cả hai diễn viên trẻ đều cho thấy tinh thần chuyên nghiệp và hy sinh vì vai diễn. Những cảnh hành động khắc nghiệt đủ khiến cho ai chứng kiến cũng đều phải rùng mình. Đặc biệt ở nhiều trường đoạn, màn rượt đuổi khắp Sài Gòn có thể được so sánh như một phiên bản Fast And Furious…chạy bộ. Tất cả đều mãn nhãn dưới sự sắp đặt ống kính tài tình của đạo diễn. Xem thêm tại: https://www.galaxycine.vn/binh-luan-phim/review-rom-bao-luc-xuat-sac-voi-trai-nghiem-danh-de-cuc-da',
      image: 'https://www.galaxycine.vn/media/2020/9/26/1135-rom_1601065506923.jpg',
    },
    {
      id: 1,
      title: "Truy Cùng Giết Tận - Cuộc tái ngộ của hai 'ông hoàng phòng vé' xứ Hàn",
      details:
        'Truy Cùng Giết Tận (tựa Tiếng Anh: Deliver Us From Evil) là câu chuyện của In-nam (Hwang Jung Min) – một tay sát thủ quyết định giải nghệ sau khi thực hiện hợp đồng cuối cùng của mình. Chưa kịp rửa tay gác kiếm, In-nam chợt nhận được thông tin con gái mình bị bắt cóc ở Thái Lan. In-nam đến Thái Lan để tìm kiếm cô con gái anh chưa từng gặp mặt cùng với Yui (Park Jeong Min). Cuộc chạy đua với thời gian trở nên khó khăn hơn bao giờ hết khi cả hai phải đương đầu với sự bám đuổi gắt gao từ Ray (Lee Jung-jae). Tên “đồ tể” máu lạnh truy sát In-nam sau khi biết rằng anh trai mình đã bị giết hại, Ray quyết tâm đòi lại món nợ máu này bằng mọi giá.Sau 7 năm kể từ New World – bộ phim đạt thành tích hơn 4.68 triệu vé, hai tên tuổi lão làng trong làng điện ảnh Hàn Quốc mới tiếp tục tái hợp trong Truy Cùng Giết Tận – một bộ phim hành động siêu “nặng đô”. Đạo diễn Hong Won Chan cho biết, phim sẽ đưa các cảnh hành động lên một tầm cao mới, từ đánh nhau tay đôi, đâm dao, bắn súng đến cả nổ bom! Bộ phim được quay tại ba quốc gia Thái Lan, Nhật Bản và Hàn Quốc, trong đó Thái Lan là bối cảnh chính chiếm khoảng 80% phim.',
      image: 'https://s3img.vcdn.vn/123phim/2020/08/DUE_STI-PRE-20-c6ba27.jpg',
    },
    {
      id: 2,
      title:
        '6 đạo diễn tỉ đô làm nên thành công của những bom tấn đình đám nhất Hollywood',
      details:
        'Với sự ra mắt của bom tấn TENET vào tháng 8 này, thầy phù thủy làm nên thành công của The Dark Knight, Inception, Interstellar hay Dunkirk - Christopher Nolan tiếp tục ghi dấu ấn của mình trong danh sách đạo diễn của những tượng đài phòng vé. Đây cũng là lúc để cùng nhìn lại 6 gương mặt làm phim “mát tay” đem đến các tác phẩm bạc tỉ sáng giá tại Hollywood. Chúng ta có thể nói gì về một cây đại thụ đã giữ vững phong độ của mình trong hơn 50 năm tại Hollywood? Chính Steven Spielberg đã mở đầu cho kỷ nguyên bom tấn bằng Jaws năm 1975, rồi sau đó tiếp tục cho ra đời hàng loạt tác phẩm đỉnh cao “càn quét” rạp chiếu phải nhắc tới như loạt Jurassic Park (doanh thu 1 tỉ USD), ET: The Extra-Terrestrial, series Indiana Jones hay gần đây nhất là Ready Player One.Từ chỗ một cặp anh em vô danh khởi nghiệp với bộ phim sinh viên kinh phí vỏn vẹn 10.000 USD, ngày nay bộ đôi đã ghi tên mình vào danh sách những nhà làm phim xuất sắc nhất của thập kỷ. ',
      image:
        'https://s3img.vcdn.vn/123phim/2020/08/6-da-o-die-n-ti-do-lam-nen-thanh-cong-cua-nhu-ng-bom-ta-n-di-nh-da-m-nha-t-hollywood-15966020199934.jpg',
    },
    {
      id: 3,
      title: 'Bán Đảo Peninsula là bom tấn xác sống không thể bỏ lỡ!',
      details:
        'Đoạn clip kéo dài gần 2 phút này đã làm nức lòng cộng đồng yêu điện ảnh khi tiết lộ tóm tắt nội dung, thông tin về tuyến nhân vật đồ sộ bên cạnh vô số đại cảnh hành động mãn nhãn. Lấy bối cảnh 4 năm sau chuỗi sự kiện kinh hoàng trong Train to Busan, tác phẩm xoay quanh tay cựu quân nhân Jung Seok (Gang Dong Won), người từng mất cả gia đình do đại dịch zombie.Dẫu may mắn sống sót rồi an toàn rời khỏi Hàn Quốc, tuy nhiên, anh ta lại phải sống đời lang bạt, nghèo khổ tại Hong Kong suốt nhiều năm trời. Một ngày nọ, trước số tiền công hậu hĩnh lên đến 2,5 triệu USD, chàng cựu quân nhân liền chấp nhận “hồi hương”, dẫn đầu nhóm biệt kích đột nhập vào thủ đô Seoul - lúc này chẳng khác gì thành phố chết - nhằm thu hồi kiện hàng đặc biệt. Thế nhưng, trong quá trình thực hiện nhiệm vụ, cả đội bất ngờ bị phục kích, tấn công bởi đơn vị bí ẩn mang bí danh 631 cũng như lũ thây ma hung tợn.',
      image: 'https://s3img.vcdn.vn/123phim/2020/06/01-d9fe01.jpg',
    },
    {
      id: 4,
      title: 'Vũ trụ Điện ảnh Valiant được Sony đưa lên màn bạc như thế nào?',
      details:
        'Valiant Cinematic Universe (VCU) - Vũ trụ Điện ảnh Valiant là một trong 3 cái tên danh tiếng nhất trong làng truyện tranh thế giới bên cạnh hai ông lớn DC Extended Universe (DCEU) - Vũ trụ Mở rộng DC và Marvel Cinematic Universe (MCU) - Vũ trụ Điện ảnh Marvel. Hãng từng lập kỷ lục doanh thu cũng như trở thành nhà xuất bản truyện tranh được nhiều đề cử nhất tại giải Harvey Awards suốt 3 năm liên tiếp 2014, 2015 và 2016. Sắp tới đây, hãng Sony sẽ cho ra mắt siêu anh hùng Bloodshot do Vin Diesel thủ vai dựa trên nhân vật bán chạy nhất của Valiant Comics.Năm 1988, cựu tổng biên tập Marvel Jim Shooter, Steven J. Massarsky cùng một nhóm các nhà đầu tư dự tính mua lại Marvel Entertainment nhưng thất bại. Thay vào đó, họ thành lập Voyager Communications một năm sau đó. Valiant - một ấn bản của Voyager Communications đã thu hút được nhiều họa sĩ và tác giả từ Marvel để tạo ra một vũ trụ siêu anh hùng riêng biệt.',
      image: 'https://s3img.vcdn.vn/123phim/2020/03/4af6add101b35004877f718d179c7132.jpg',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PATH:
      return {
        ...state,
        currentPath: action.currentPath,
      };

    case SET_MOVIE_LIST:
      return {
        ...state,
        movieList: action.movieList,
        optionsForSearchBar: {
          ...state.optionsForSearchBar,
          movieOptions: action.movieList,
        },
      };

    case SET_CINEMA_COMPLEX_OPTIONS:
      return {
        ...state,
        optionsForSearchBar: {
          ...state.optionsForSearchBar,
          cinemaComplexOptions: action.cinemaComplexOptions,
        },
      };

    case SET_CINEMA_OPTIONS:
      return {
        ...state,
        optionsForSearchBar: {
          ...state.optionsForSearchBar,
          cinemaOptions: action.cinemaOptions,
        },
      };

    case SET_DATE_OPTIONS:
      return {
        ...state,
        optionsForSearchBar: {
          ...state.optionsForSearchBar,
          dateOptions: action.dateOptions,
        },
      };

    case SET_TIME_OPTIONS:
      return {
        ...state,
        optionsForSearchBar: {
          ...state.optionsForSearchBar,
          timeOptions: action.timeOptions,
        },
      };

    case SET_CINEMA_COMPLEX_INFO:
      return {
        ...state,
        cinemaComplexInfo: action.cinemaComplexList,
      };

    case SET_CINEMA_INFO:
      return {
        ...state,
        cinemaInfo: action.cinemaInfo,
      };

    default:
      return state;
  }
};
