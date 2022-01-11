import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, notification, Row, Table } from "antd";
import "jspdf-autotable";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { create, get, remove, update } from "../../api/bill";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { bill } from "../../recoils/Atoms";
import style from "./style";
import UserDetail from "./UserDetail";

const { Search } = Input;

const getCharLastName = (name) => {
  let splitName = name?.split(" ");
  if (splitName?.length) {
    return splitName[splitName?.length - 1][0]?.toUpperCase();
  }
  return "X";
};

const User = () => {
  const [data, setData] = useRecoilState(bill);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  });

  const [removeId, setRemoveId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const getData = useCallback(
    async (page) => {
      setLoading(true);

      // get data
      const { current, pageSize } = pagination;
      const res = await get(page || current, pageSize, search);
      setData(res?.data?.items || []);
      setPagination({
        ...pagination,
        total: res?.data?.total || 0,
      });

      setLoading(false);
    },
    [pagination, search]
  );

  const updateData = useCallback(
    async (values) => {
      if (!editingItem) return;
      const isEdit = !!editingItem?._id;
      const next = isEdit ? update : create;

      try {
        await next(values);
        setEditingItem(null);
        notification.success({
          message: `${isEdit ? "Update" : "Create"} user successfully`,
        });
        getData(1);
      } catch (err) {
        notification.error({
          message: err.message,
        });
      }
    },
    [editingItem, getData]
  );

  const onRemove = useCallback(async () => {
    if (!removeId) return;
    try {
      await remove(removeId);
      setRemoveId(null);
      notification.success({
        message: "Remove bill successfully",
      });
      getData(1);
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
  }, [removeId, getData]);

  const onTableChange = (pagination) => setPagination(pagination);

  useEffect(() => {
    getData();
  }, [search, pagination.current, pagination.pageSize]);

  const columns = [
    {
      title: "#",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
      render: (_text, record) => (
        <Avatar
          className="custom-icon"
          size={40}
          style={{
            backgroundColor: "#ed136e",
            border: "2px solid #fff",
            fontSize: 14,
          }}
        >
          {getCharLastName(record.lastName)}
        </Avatar>
      ),
    },
    {
      title: "Họ và tên",
      key: "name",
      dataIndex: "name",
      width: "10%",
    },
    {
      title: "Email",
      key: "products",
      width: "30%",
      render: (_text, record) =>
        record.products.map((product) => (
          <div>
            {product.name}: {product.count}
          </div>
        )),
    },
    {
      title: "Chức vụ",
      key: "price",
      render: (_text, record) =>
        record.products.map((product) => product.count * product.price),
      width: "15%",
    },
    {
      title: "Bộ Phận",
      key: "staff",
      render: (_text, record) => record.staff?.name,
      width: "15%",
    },
    {
      title: "Hành động",
      key: "action",
      width: "25%",
      render: (_text, record) => {
        return (
          <Row gutter={8}>
            <Col span="auto">
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => setEditingItem(record)}
              >
                Edit
              </Button>
            </Col>
            <Col span="auto">
              <Button
                type="danger"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => setRemoveId(record._id)}
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
      <h2>Danh Sách Nhân Viên</h2>
      <Row style={style.mb2}>
        <Col span={4}>
          <Button
            color="success"
            onClick={() =>
              setEditingItem({
                createdAt: new Date().getTime(),
                isExport: false,
                products: [],
              })
            }
          >
            Thêm Nhân Viên
          </Button>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search"
            onSearch={(value) => setSearch(value)}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            style={{ textAlign: "center" }}
            rowKey={(record) => record._id}
            columns={columns}
            bordered
            dataSource={data}
            size="small"
            loading={loading}
            pagination={pagination}
            onChange={onTableChange}
            rowClassName={(record) => !record.enabled && "disabled-row"}
          />
        </Col>
      </Row>
      <ConfirmModal
        visible={!!removeId}
        title="Remove confirmation"
        message="Do you want to remove this bill?"
        onOk={onRemove}
        onCancel={() => setRemoveId(null)}
      />
      <UserDetail
        item={editingItem}
        onOk={updateData}
        onCancel={() => setEditingItem(null)}
      />
    </Layout>
  );
};

export default User;
