import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import logo from "../assets/logo.png";
import logo_1 from "../assets/logo_1.png";
const { Title, Text, Link } = Typography;

const LoginPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#f4f7fb]">
      <Row className="h-full">
        {/* LEFT SIDE */}
        <Col
        span={12}
          className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0052cc] to-[#003b99]"
        >
          {/* background */}
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/20" />
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-white/5" />

          {/* dots */}
          <div className="absolute top-8 left-8 grid grid-cols-8 gap-2 opacity-30">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-white" />
            ))}
          </div>

          <div className="z-10 text-center text-white">
            <Image
              preview={false}
              width={260}
              src={logo_1}
            />

            <Title level={1} className="!mt-8 !mb-3 !text-white">
              HR Management System
            </Title>

            <p className="text-lg text-white/90">
              Quản trị nhân sự hiệu quả
            </p>

            <p className="text-lg text-white/90">
              Phát triển tổ chức bền vững
            </p>
          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col
        span={12}
          className="flex h-full items-center justify-center px-10"
        >
          <div className="w-full h-full bg-white p-12 shadow-2xl">
            {/* LOGO */}
            <div className="mb-8 flex justify-center">
              <Image
                preview={false}
                width={180}
                src={logo}
              />
            </div>

            {/* TITLE */}
            <div className="mb-10 text-center">
              <Title level={1} className="!mb-2">
                Đăng nhập
              </Title>

              <Text className="text-[16px] text-gray-500">
                Chào mừng bạn quay trở lại!
              </Text>
            </div>

            {/* FORM */}
            <Form layout="vertical" style={{
              padding:24
            }}>
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Nhập tên đăng nhập"
                  className="!h-[52px] rounded-xl"
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Nhập mật khẩu"
                  className="!h-[52px] rounded-xl"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              {/* remember */}
              <div className="mb-6 flex items-center justify-between">
                <Checkbox>Nhớ tài khoản</Checkbox>

                <Link>Quên mật khẩu?</Link>
              </div>

              {/* button */}
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="!h-[52px] rounded-xl !bg-[#0052cc] text-[16px] font-semibold"
              >
                Đăng nhập
              </Button>

              <Divider>hoặc</Divider>

              {/* microsoft */}
              <Button
                block
                size="large"
                className="!h-[52px] rounded-xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    className="h-5 w-5"
                  />

                  <span>Đăng nhập với Microsoft</span>
                </div>
              </Button>

              <div className="mt-8 text-center text-gray-400">
                © 2026 HRM System. All rights reserved.
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;