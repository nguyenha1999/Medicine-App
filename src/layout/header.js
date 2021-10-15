import React from "react";
import "./layout.css";
import { Layout, Row, Col, Menu, Dropdown, Avatar } from "antd";
import Button from "../component/Button";
import { useHistory } from "react-router-dom";
import { RollbackOutlined, MenuOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import logo from "../img/logo.png";

const { Header } = Layout;

const HeaderComponent = (props) => {
  const { click } = props;
  const history = useHistory();
  const roleUser = localStorage.getItem("role");
  const nameUser = localStorage.getItem("name");
  const goBack = () => {
    localStorage.clear();
    history.push("/login");
  };
  const login = () => {
    history.push("/login");
  };
  const menu = () => (
    <Menu>
      <Menu.Item>{nameUser}</Menu.Item>
      <Menu.Item>
        <Button
          title="SignOut"
          icon={<RollbackOutlined />}
          onClick={goBack}
          style={{ border: "none" }}
        />
      </Menu.Item>
    </Menu>
  );

  const renderAvt = () => {
    return (
      <>
        {roleUser === null ? (
          <Button
            title="Login"
            icon={<RollbackOutlined />}
            onClick={login}
            style={{ border: "none" }}
          />
        ) : (
          <Dropdown
            trigger="click"
            overlay={menu}
            placement="bottomCenter"
            arrow
          >
            <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              H
            </Avatar>
          </Dropdown>
        )}
      </>
    );
  };

  return (
    <Header style={{ padding: "0 30px" }} className="site-layout-background">
      <Row width="100%">
        <Col span={8} style={{ textAlign: "left" }}>
          <MenuOutlined onClick={click} style={{ fontSize: "20px" }} />
          <img src={logo} alt="logo" className="logo" />
        </Col>
        <Col span={8}>
          <h1>APP QUẢN LÝ NHÀ MÁY HOÁ CHẤT</h1>
        </Col>
        <Col span={8} style={{ textAlign: "right", paddingRight: "30px" }}>
          {renderAvt()}
        </Col>
      </Row>
    </Header>
  );
};

HeaderComponent.propTypes = {
  click: PropTypes.func,
};

export default React.memo(HeaderComponent);
