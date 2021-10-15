import React, { useState, useEffect, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"
import { Table, Button, Row, Col, Input, notification } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

import { chemistry } from "../../recoils/Atoms"
import Layout from "../../layout/layout"
import ImageModal from "./ImageModal"
import ConfirmModal from "../../component/ConfirmModal"
import ChemistryDetail from "./ChemistryDetail"
import style from "./style"

import { get, create, update, remove } from "../../api/chemistry"

const { Search } = Input

const Chemistry = () => {
  const history = useHistory()
  const [data, setData] = useRecoilState(chemistry)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  })

  const [imageUrl, setImageUrl] = useState(null)
  const [removeId, setRemoveId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const getData = useCallback(async (page) => {
    setLoading(true)

    // get data 
    const { current, pageSize } = pagination
    const res = await get(page || current, pageSize, search)
    setData(res?.data?.items || [])
    setPagination({
      ...pagination,
      total: res?.data?.total || 0,
    })

    setLoading(false)
  }, [pagination, search])

  const updateData = useCallback(
    async (values) => {
      if (!editingItem) return
      const isEdit = !!editingItem?._id
      const next = isEdit ? update : create

      try {
        await next(values)
        setEditingItem(null)
        notification.success({
          message: `${isEdit ? "Update" : "Create"} chemistry successfully`,
        })
        getData(1)
      } catch (err) {
        notification.error({
          message: err.message,
        })
      }
    },
    [editingItem, getData]
  )

  const onRemove = useCallback(async () => {
    if (!removeId) return
    try {
      await remove(removeId)
      setRemoveId(null)
      notification.success({
        message: "Remove chemistry successfully",
      })
      getData(1)
    } catch (err) {
      notification.error({
        message: err.message,
      })
    }
  }, [removeId, getData])

  const onTableChange = (pagination) => setPagination(pagination)

  useEffect(() => {
    getData()
  }, [search, pagination.current, pagination.pageSize])

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Use",
      dataIndex: "use",
      key: "use",
    },
    {
      title: "Image",
      key: "image",
      width: "10%",
      render: (_text, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => setImageUrl(record.imageUrl)}
        >
          View image
        </Button>
      ),
    },
    {
      title: "Recipe",
      key: "recipe",
      width: "10%",
      render: (_text, record) => (
        <Button
          type="dashed"
          size="small"
          onClick={() =>
            history.push(
              `/recipe/${record._id}/${record.recipeId || "create-recipe"}`
            )
          }
        >
          View recipe
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
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
        )
      },
    },
  ]

  return (
    <Layout>
      <h2>Chemistry list</h2>
      <Row>
        <Col span={4}>
          <Button
            color="success"
            onClick={() =>
              setEditingItem({
                name: "",
                use: "",
                imageUrl: "",
              })
            }
          >
            Create chemistry
          </Button>
        </Col>
        <Col span={12} style={style.mb2}>
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
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={data}
            size="small"
            loading={loading}
            pagination={pagination}
            onChange={onTableChange}
          />
        </Col>
      </Row>
      <ImageModal imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <ConfirmModal
        visible={!!removeId}
        title="Remove confirmation"
        message="Do you want to remove this chemistry?"
        onOk={onRemove}
        onCancel={() => setRemoveId(null)}
      />
      <ChemistryDetail
        item={editingItem}
        onOk={updateData}
        onCancel={() => setEditingItem(null)}
      />
    </Layout>
  )
}

export default Chemistry
