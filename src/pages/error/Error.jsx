import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <div className="error">
      <h1>找不到頁面!!</h1>
      <h2>2秒後幫你導入首頁...</h2>
    </div>
  );
};

export default Error;
