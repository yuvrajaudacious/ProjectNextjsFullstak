"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import "./login.css";
import Link from "next/link";

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send the user's input to the API
      });

      if (response.status === 200) {
        Router.push("/userlist"); // Assuming you have a /dashboard route
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="background">
      <Card
        className="login"
        title="Login Now"
        bordered={false}
        hoverable
        style={{
          width: 400,
        }}
      >
        <Form
          onSubmit={handleLogin}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onSubmit={handleLogin}
              htmlType="submit"
              className="button"
            >
              Log in
            </Button>
            <p>
              Create Your Account <Link href="/signup">Signup</Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
