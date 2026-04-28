import { Spin } from "antd"

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spin size="large" tip="Đang tải dữ liệu..." />
    </div>
  )
}