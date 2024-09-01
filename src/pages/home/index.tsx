import React, { useEffect, useState } from "react";
import "./index.scss";
import FoodList from "../../component/list-food";
import Carousel from "../../component/carousel";
import SearchBar from "../../component/search-bar";
function Home() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // mỗi lần gọi hàm sẽ tạo mới 1 lần và chỉ chạy lại hàm -> ko tạo mới lần nữa => dùng prev để lưu lại value của biến cũ -> mới cộng thêm đc
    const i = setInterval(() => {
      console.log("interval running...");
      setCount((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(i); // clear để khi chạy useEffect một lần nữa sẽ ko bị đè lệnh
    };
  }, []);
  return (
    <div>
      
      <Carousel apiURI="product" />
      <FoodList />
      <p> Count is : {count} </p>
    </div>
  );
}

export default Home;
