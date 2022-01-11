import { Button, Card, Form, Input } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useState } from "react";
import Layout from "../../layout/layout";
import "./index.scss";

const Profile = () => {
  const [user, setUser] = useState({
    email: "",
    password: "******",
  });

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <Layout>
      <div style={{ height: "80vh" }}>
        <Card
          style={{
            width: 400,
            margin: "auto",
            textAlign: "center",
            position: "relative",
            paddingTop: "5px",
          }}
        >
          <div
            style={{
              background: "#74b9ff",
              position: "absolute",
              top: 0,
              width: "100%",
              padding: "30px 0",
              left: 0,
            }}
          ></div>
          <div>
            <Avatar
              className="custom-icon"
              size={50}
              style={{
                backgroundColor: "#1890ff",
                border: "2px solid #fff",
              }}
            >
              H
            </Avatar>
            <h2 style={{ marginTop: 1 }}>Lê Ngọc Hà</h2>
            <h4 style={{ marginTop: 1 }}>kngocha15999@gmail.com</h4>
          </div>
          <Form>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
                },
              ]}
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              defaultValue={user.password}
            >
              <div className="form-item-profile" style={{ marginTop: "2px" }}>
                <Input.Password
                  name="password"
                  onChange={handlerInputChange}
                  defaultValue={user.password}
                />
              </div>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
              }}
            >
              <Button htmlType="submit">Cập nhật</Button>
            </div>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};
export default Profile;
