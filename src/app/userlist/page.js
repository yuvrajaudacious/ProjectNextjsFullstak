"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table, message, Input, Modal, Card } from "antd";
import AddUser from "../adduser/page";
import EditUser from "../Edituser/page";
import {
  EditTwoTone,
  DeleteTwoTone,
  InfoCircleTwoTone,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./style.css";
import Link from "next/link";

const { Search } = Input;

const getuser = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/adduser");
    const data = response.data;

    if (data.success) {
      return data.result;
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false };
  }
};

export default function Page() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [userdetail, setUserdetail] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

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

  const handledetail = (user) => {
    setUserdetail(user);
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

  const columns = [
    {
      title: "User Id",
      dataIndex: "User Id",
      key: "User Id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
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
        <Link
          href={`mailto:?to=${text}`}
          style={{ color: "blue", textDecoration: "" }}
        >
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
            <Link href="/userdetail">
              <InfoCircleOutlined
                onClick={() => handledetail(user)}
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
      <Card title="User List" className="ctable">
        <div className="btn-search" style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={showModal}>
            Add User
          </Button>
          <Search
            placeholder="Search by user name"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div>
        <Table dataSource={filteredUsers} columns={columns} />

        <Modal
          title={editUserData ? "Edit User" : "Add User"}
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
}
