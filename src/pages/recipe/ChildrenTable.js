import React from "react"
import { Table } from "antd"

import style from "./style"

const ChildrenTable = ({ children }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "Ratio",
      dataIndex: "ratio",
      key: "ratio"
    }
  ]

  return <Table 
    rowKey={(record) => record._id}
    columns={columns}
    dataSource={children}
    size="small"
    pagination={false}
    style={style.mb2}
  />
}

export default ChildrenTable