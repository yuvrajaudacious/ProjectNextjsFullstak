"use client";
import { Layout, Menu } from "antd";
import Link from "next/link";
import Home from "./home/page";
const { Header, Content } = Layout;

function page() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ background: "#703EB0", marginTop: "-17px", padding: 16 }}
      >
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/adduser">AddUser</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/userlist">Userlist</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/admin">Admin</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: "16px" }}>
        <Home />
      </Content>
    </Layout>
  );
}

export default page;
