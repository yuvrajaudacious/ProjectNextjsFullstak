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
const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState(null);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const adduser = async (e) => {
    e.preventDefault();
    console.log(name, email, number, dob);

    try {
      const response = await axios.post("http://localhost:3000/api/products", {
        name,
        email,
        number,
        dob,
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
      <h1>Add User</h1>
      <Link href="/userlist">UserList</Link>
      <Card className="cards">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <DatePicker/>
                <Input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="Date Of Birth"
                />
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
      </Card>
    </div>
  );
};

export default AddUser;
