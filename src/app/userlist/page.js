"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, message, Input, Modal, Card } from "antd";
import AddUser from "../adduser/page";
import EditUser from "../Edituser/page";
import {
  EditTwoTone,
  DeleteOutlined,
  InfoCircleOutlined,
  CheckCircleTwoTone,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./style.css";
import Link from "next/link";
import StatusDropdown from "../status/page";

const { Search } = Input;

const Page = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const getuser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/adduser");
      const data = response.data;

      if (data.success) {
        return data.result;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userData = await getuser();
      setUsers(userData);
    }

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditUserData(null);
  };

  const handleEdit = (user) => {
    setEditUserData(user);
    showModal();
  };

  const handleDetail = (user) => {
    setUserDetail(user);
  };

  const handleDelete = (user) => {
    setDeleteUserId(user._id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/adduser/${deleteUserId}`
      );

      if (response.data.success) {
        message.success("User deleted successfully");
        const updatedUserData = await getuser();
        setUsers(updatedUserData);
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("An error occurred while deleting user");
    }

    setIsDeleteModalVisible(false);
    setDeleteUserId(null);
  };

  const handleStatusChange = async (user, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/adduser/${user._id}`,
        { Status: newStatus }
      );

      if (response.data.success) {
        message.success("Status updated successfully");
        const updatedUsers = users.map((u) =>
          u._id === user._id ? { ...u, Status: newStatus } : u
        );
        setUsers(updatedUsers);
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("An error occurred while updating status");
    }
  };

  const columns = [
    {
      title: "User Id",
      dataIndex: "User Id",
      key: "User Id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "ProfilePicture",
      dataIndex: "profilePicture",
      key: "profilePicture",
    },

    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, user) => (
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => handleEdit(user)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <Link href={`mailto:${text}`} style={{ color: "blue" }}>
          {text}
        </Link>
      ),
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (text, user) => (
        <StatusDropdown
          value={text}
          onChange={(value) => handleStatusChange(user, value)}
        />
      ),
    },

    {
      title: "Action",
      dataIndex: "Action",
      key: "action",
      render: (_, user) => {
        return (
          <div>
            <EditTwoTone
              style={{ color: "blue", marginRight: "8px" }}
              onClick={() => handleEdit(user)}
            />
            <DeleteOutlined
              style={{ color: "red", marginRight: "8px" }}
              onClick={() => handleDelete(user)}
            />
            <Link href={`/userdetail`}>
              <InfoCircleOutlined
                onClick={() => handleDetail(user)}
                style={{ color: "green" }}
              />
            </Link>
          </div>
        );
      },
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Card title="User List " className="ctable">
        <div className="btn-search" style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={showModal}>
            <PlusCircleOutlined />
            Add User{" "}
          </Button>
          <Search
            placeholder="Search by user name"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div>
        <Table dataSource={filteredUsers} columns={columns} />

        <Modal
          title={editUserData ? "Edit User" : ""}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {editUserData ? <EditUser user={editUserData} /> : <AddUser />}
        </Modal>

        <Modal
          title="Confirm Delete"
          visible={isDeleteModalVisible}
          onOk={confirmDelete}
          onCancel={() => setIsDeleteModalVisible(false)}
        >
          Are you sure you want to delete this user?
        </Modal>
      </Card>
    </div>
  );
};

export default Page;
