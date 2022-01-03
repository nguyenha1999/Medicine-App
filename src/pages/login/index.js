import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import Particles from "react-particles-js";
import { Link } from "react-router-dom";
import "./index.scss";

const Login = () => {
  //   const token = useSelector((state) => state.user.token);
  //   const login = useSelector((state) => state.user.login);
  //   const userInfo = useSelector((state) => state.user);

  //   const dispatch = useDispatch();
  //   const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  //   const handlerLoginUser = async () => {
  //     dispatch(userLogin(user));
  //   };

  //   useEffect(() => {
  //     if (token && login && userInfo) {
  //       history.push("/");
  //     }
  //   }, [token]);

  return (
    <div className="wraper">
      <div className="container">
        <Row>
          <Col span={12}>
            <div className="bg-image"></div>
          </Col>
          <Col span={4}></Col>
          <Col span={8}>
            <Card bordered={false} style={{ width: "100%" }} className="p-2">
              <Form
                className="form-login"
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                // onFinish={handlerLoginUser}
              >
                <h2 className="text-center mb-4 fs-4 fw-bold">
                  Đăng nhập Hệ thống quản trị
                </h2>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tài khoản !",
                    },
                  ]}
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input
                    name="email"
                    onChange={handlerInputChange}
                    placeholder="Tài khoản"
                  />
                </Form.Item>
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
                >
                  <Input.Password
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={handlerInputChange}
                  />
                </Form.Item>
                <div className="d-flex justify-content-between">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 0,
                      span: 24,
                    }}
                  >
                    <Checkbox checked>Nhớ tài khoản</Checkbox>
                  </Form.Item>
                  <a href="#" className="mt-2">
                    Quên mật khẩu ?
                  </a>
                </div>

                <Button type="primary" htmlType="submit" className="w-100">
                  Đăng nhập
                </Button>
                <div className="mt-4 text-center">
                  <Link to="/register">Đăng ký tài khoản ?</Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="bg-overlay">
        <Particles
          params={{
            particles: {
              number: {
                value: 20,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
              color: {
                value: "#1e90ff",
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000",
                },
                polygon: {
                  nb_sides: 5,
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100,
                },
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#1e90ff",
                opacity: 1,
                width: 2,
              },
              move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            retina_detect: true,
          }}
        />
      </div>
    </div>
  );
};
export default Login;
