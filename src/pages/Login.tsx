import { Button, Checkbox, Col, Form, Image, Input, Row, Typography, type FormProps } from "antd";

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const LoginPage = () => {
  return (
    <Row className="h-screen items-center">
      <Col span={14} className="flex h-screen items-center justify-center bg-blue-500">
        <Image
          height={"100%"}
          preview={false}
          alt="Login Image"
          src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1775572501/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_obvyeq.png"
        />
      </Col>

      <Col span={10} className="flex items-center justify-center">
        <Title level={2} className="mb-8 text-center">
          Đăng nhập hệ thống
        </Title>
        <Title level={5} className="mb-8 text-center">
          Chào mừng bạn quay lại với HR Management System
        </Title>
        <Row justify={"center"}>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="w-3/5"
          >
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
            >
              <Input size="large" placeholder="Nhập tên đăng nhập" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password size="large" placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Nhớ tài khoản</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
export default LoginPage;
