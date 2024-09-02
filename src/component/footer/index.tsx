import React from "react";
import "./index.scss";
function Footer() {
  return (
    <div className="footer">
      <div className="footer__upper">
        <div className="footer__upper__column1">
          <h3>Danh mục món ăn</h3>
          <ul>
            <li>Món mới </li>
            <li>Combo 1 người </li>
            <li>Gà rán - Gà quay </li>
            <li>Burger - Cơm - Mì ý </li>
            <li>Thức ăn nhẹ </li>
            <li>Thức uống & tráng miệng </li>
          </ul>
        </div>
        <div className="footer__upper__column2">
          <h3>Về KFC</h3>
          <ul>
            <li>Câu Chuyện Của Chúng Tôi</li>
            <li>Tin Khuyến Mãi </li>
            <li>Tin tức KFC </li>
            <li>Tuyển dụng</li>
            <li>Đặt tiệc Sinh nhật</li>
          </ul>
        </div>
        <div className="footer__upper__column3">
          <h3>Liên hệ KFC</h3>
          <ul>
            <li>Theo dõi đơn hàng</li>
            <li>Hệ Thống Nhà Hàng </li>
            <li>Liên hệ KFC </li>
          </ul>
        </div>
        <div className="footer__upper__column4">
          <h3>Chính sách</h3>
          <ul>
            <li>Chính sách hoạt động</li>
            <li>Chính sách và quy định </li>
            <li>Chính sách bảo mật thông tin </li>
          </ul>
        </div>
        <div className="footer__upper__column5">
          <button>Download on the App Store</button>
          <button>Get it on Google Play</button>
        </div>
      </div>
      <div className="footer__lower">
        <div className="footer__lower__left">
          <h2>CÔNG TY LIÊN DOANH TNHH KFC VIỆT NAM</h2>
          <ul>
            <li>Số 292 Bà Triệu, P. Lê Đại Hành, Q. Hai Bà Trưng, TP. Hà Nội.</li>
            <li>Điện thoại: (028) 38489828</li>
            <li>Email: lienhe@kfcvietnam.com.vn</li>
            <li>Mã số thuế: 0100773885</li>
            <li>Ngày cấp: 29/10/1998 - Nơi cấp: Cục Thuế Thành Phố Hà Nội</li>
          </ul>
        </div>
        <div className="footer__lower__right">
          <img
            src="https://kfcvn-static.cognizantorderserv.com/images/email/logo_footer.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
