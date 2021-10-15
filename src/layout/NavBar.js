import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  FilePdfOutlined
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = (props) => {

  const { collapsed } = props;
  const { Sider } = Layout;
  const { pathname } = useLocation();

  return (
    <Sider collapsed={collapsed}>
      <Menu theme="dark" defaultSelectedKeys={pathname} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="/bill" icon={<FilePdfOutlined />}>
          <NavLink to="/bill">Bill</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default React.memo(NavBar);
