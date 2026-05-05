import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("session_id");
    if (token) {
      localStorage.setItem("session_id", token);
      navigate("/");
    } else {
      window.location.href = "http://localhost:5000/Account/Login";
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" description="Đang đăng nhập..." />
    </div>
  );
};

export default AuthCallback;
