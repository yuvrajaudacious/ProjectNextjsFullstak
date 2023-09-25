"use client";
import React, { useState } from "react";
import axios from "axios";
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
import {
  FieldNumberOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./style.css";
import dayjs from "dayjs";

const { Option } = Select;

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [age, setAge] = useState(""); // State to store age
  const [gender, setGender] = useState("");

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const calculateAgeFromBirthdate = (birthdate) => {
    const currentDate = dayjs();
    const birthdateObject = dayjs(birthdate);
    const age = currentDate.diff(birthdateObject, "year");
    return age.toString(); 
  };

  const handleBirthdateChange = (date, dateString) => {
    setDateOfBirth(dateString); 
    const age = calculateAgeFromBirthdate(dateString);
    setAge(age);
  };

  const adduser = async (e) => {
    e.preventDefault();

    try {
      const formattedDateOfBirth = dayjs(dateOfBirth).format("YYYY-MM-DD");

      const response = await axios.post("http://localhost:3000/api/adduser", {
        userName,
        email,
        number,
        dateOfBirth: formattedDateOfBirth,
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
      message.error("Fill in all fields");
    }
  };

  return (
    <div>
      <Card title="Add User">
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
                  placeholder="Username"
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
              </Form.Item>
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
              <Form.Item
                name="birthdate"
                rules={[
                  {
                    required: true,
                    message: "Please select a birthdate!",
                  },
                ]}
              >
                <DatePicker
                  onChange={handleBirthdateChange}
                  format="YYYY-MM-DD"
                  placeholder="Birthdate"
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
                    message: "Age is required",
                  },
                ]}
              >
                <Input
                  value={age}
                  disabled // Disable the input field
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
                <Select onChange={setGender} placeholder="Select a gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
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
      </Card>
    </div>
  );
};

export default AddUser;
