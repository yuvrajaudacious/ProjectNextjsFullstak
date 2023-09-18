"use client";
import { Carousel, Layout, Menu } from "antd";
const { Header, Content, Sider } = Layout;
import profile from "../../../public/Image/ads.png";
import profile1 from "../../../public/Image/ads2.webp";
import profile2 from "../../../public/Image/ads3.webp";
import Image from "next/image";
const Admin = () => {
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} theme="light">
          <Menu mode="vertical" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Dashboard</Menu.Item>
            <Menu.Item key="2">Users</Menu.Item>
            <Menu.Item key="3">Settings</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Carousel autoplay>
              <div>
                <Image
                  src={profile}
                  alt="Virat Kohli"
                  width={1310}
                  height={60}
                />
              </div>
              <div>
                <Image
                  src={profile1}
                  alt="Virat Kohli"
                  width={1310}
                  height={60}
                />
              </div>
              <div>
                <Image
                  src={profile2}
                  alt="Virat Kohli"
                  width={1310}
                  height={60}
                />
              </div>
            </Carousel>
          </Header>
          <Content style={{ margin: "16px" }}>Content</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
