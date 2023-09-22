"use client";
import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import axios from "axios";

const EditUser = ({ user, onCancel, onUpdate }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    console.log(editedUser); // Check if user data is available

    try {
      const response = await axios.put(
        `http://localhost:3000/api/adduser/${editedUser._id}`,
        editedUser
      );

      if (response.data.success) {
        message.success("User updated successfully");
        onUpdate();
        onCancel();
      } else {
        message.error("Failed to update user");
      }
    } catch {}
  };

  return (
    <div>
      <Form>
        <Form.Item label="Username">
          <Input
            name="userName"
            value={editedUser.userName}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Number">
          <Input
            name="number"
            value={editedUser.number}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Age">
          <Input
            name="age"
            value={editedUser.age}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Date of Birth">
          <Input
            name="dateOfBirth"
            value={editedUser.dateOfBirth}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select >
            <Option
             value={editedUser.gender}></Option>
            <Option value={editedUser.gender}></Option>
            <Option value={editedUser.gender}></Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
