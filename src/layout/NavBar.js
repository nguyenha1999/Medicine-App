import {
  FileAddOutlined,
  FilePdfOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = (props) => {
  const { collapsed } = props;
  const { Sider } = Layout;
  const { pathname } = useLocation();

  return (
    <Sider collapsed={collapsed}>
      <Menu theme="dark" defaultSelectedKeys={pathname} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <NavLink to="/">Trang Chủ</NavLink>
        </Menu.Item>
        {/* <Menu.Item key="/bill" icon={<FilePdfOutlined />}>
          <NavLink to="/bill">Hoá Đơn</NavLink>
        </Menu.Item> */}
        <Menu.Item key="/import" icon={<FileAddOutlined />}>
          <NavLink to="/import">Đơn Nhập</NavLink>
        </Menu.Item>
        <Menu.Item key="/export" icon={<FilePdfOutlined />}>
          <NavLink to="/export">Đơn Xuất</NavLink>
        </Menu.Item>
        <Menu.Item key="/partner" icon={<UserSwitchOutlined />}>
          <NavLink to="/partner">Đối Tác</NavLink>
        </Menu.Item>
        <Menu.Item key="/profile" icon={<UserOutlined />}>
          <NavLink to="/profile">Thông Tin</NavLink>
        </Menu.Item>
        <Menu.Item key="/user" icon={<TeamOutlined />}>
          <NavLink to="/user">Nhân Viên</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default React.memo(NavBar);
