import { Spin } from "antd";

export const GlobalLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" description="Đang tải dữ liệu..." />
    </div>
  );
};
