import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Table } from "antd";
import React from "react";
import Layout from "../../layout/layout";

const { Search } = Input;

const Partner = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên Công Ty",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "HotLine",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mặt hàng",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Hành động",
      dataIndex: "address",
      key: "address",
      render: (_text, record) => {
        return (
          <Row gutter={8}>
            <Col span="auto">
              <Button
                type="warning"
                size="small"
                icon={<FilePdfOutlined />}
                // onClick={() => print(record)}
              >
                Print
              </Button>
            </Col>
            <Col span="auto">
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                // onClick={() => setEditingItem(record)}
              >
                Edit
              </Button>
            </Col>
            <Col span="auto">
              <Button
                type="danger"
                size="small"
                icon={<DeleteOutlined />}
                // onClick={() => setRemoveId(record._id)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];
  return (
    <Layout>
      <h2>Danh sách đối tác</h2>
      <Row style={{ marginBottom: "8px" }}>
        <Col span={4}>
          <Button color="success">Thêm Đối Tác</Button>
        </Col>
        <Col span={12}>
          <Search placeholder="Search" enterButton />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            style={{ textAlign: "center" }}
            rowKey={(record) => record._id}
            columns={columns}
            bordered
            rowClassName={(record) => !record.enabled && "disabled-row"}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Partner;
