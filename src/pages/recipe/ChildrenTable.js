import { Table } from "antd";
import React from "react";
import style from "./style";

const ChildrenTable = ({ children }) => {
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã hoá chất",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tỉ lệ",
      dataIndex: "ratio",
      key: "ratio",
    },
  ];

  return (
    <Table
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={children}
      size="small"
      pagination={false}
      style={style.mb2}
    />
  );
};

export default ChildrenTable;
