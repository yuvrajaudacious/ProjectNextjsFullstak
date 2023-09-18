"use client";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";

import { LockOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Upload,
  message,
} from "antd";
import "./style.css";
import yourImage from "../../../public/Image/virat2.jpg";
import Image from "next/image";
import Link from "next/link";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    Email: "",
    password: "",
    Number: "",
    date: null,
  });

  const handleFormChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000//api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        message.success("Signup successful");
        console.log(data.message);
      } else {
        console.error("API call failed");
        message.info("Signup succesdfsssful");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="background">
      <Card className="cardaa" title="Sign in  Now">
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onChange={(e) => handleFormChange("username", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  onChange={(e) => handleFormChange("Email", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleFormChange("password", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <DatePicker onChange={(date) => handleFormChange("date", date)} />
            </Col>
            <Col span={12}>
              <Form.Item
                name="Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your Number!",
                  },
                ]}
              >
                <Input
                  placeholder="Number"
                  onChange={(e) => handleFormChange("Number", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Form.Item valuePropName="fileList">
              <ImgCrop rotationSlider>
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 0,
                        width: 10,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Row>
          <Form.Item shouldUpdate>
            <Button
              className="button"
              type="primary"
              htmlType="button"
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
            <p>
              Already logged in? <Link href="/login"> logged-in </Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
