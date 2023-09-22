"use client";
import {
  Form,
  Input,
  Button,
  Card,
  DatePicker,
  Upload,
  Col,
  Row,
  message,
  Select,
} from "antd";
import axios from "axios";

import {
  FieldNumberOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./style.css";
import { useState } from "react";
import Link from "next/link";
import { Option } from "antd/es/mentions";
const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const adduser = async (e) => {
    e.preventDefault();
    console.log(userName, email, number, dateOfBirth, age,gender);

    try {
      const response = await axios.post("http://localhost:3000/api/adduser", {
        userName,
        email,
        number,
        dateOfBirth: null,
        gender,
        age,
      });

      if (response.data) {
        message.success("User added successfully");
      } else {
        message.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      message.error("Fill a All Filed");
    }
  };

  return (
    <div>
      <Form name="add-user-form">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter username!",
                },
              ]}
            >
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                prefix={<UserOutlined />}
                placeholder="username"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter Email!",
                },
              ]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>{" "}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="number"
              rules={[
                {
                  required: true,
                  message: "Please enter Number!",
                },
              ]}
            >
              <Input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                prefix={<FieldNumberOutlined />}
                placeholder="Number"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <DatePicker
                onChange={(dateOfBirth) =>
                  setDateOfBirth("dateOfBirth", dateOfBirth)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="age"
              rules={[
                {
                  required: true,
                  message: "Please enter age!",
                },
              ]}
            >
              <Input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a option and change input text above">
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload Your Profile
              </div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button onClick={adduser} type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
