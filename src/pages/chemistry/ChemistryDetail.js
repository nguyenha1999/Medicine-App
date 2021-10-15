import React, { useState, useEffect, useCallback } from "react"
import { Modal, Form, Input, notification } from "antd"

import ImagePreview from "./ImagePreview"
import { uploadFile } from "../../api/axiosClient"

const IMAGE_ID = "imagepreview"

const ChemistryDetail = ({ item, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")
  const [form] = Form.useForm()

  const isEdit = !!item?._id
  const title = isEdit ? "Edit chemistry" : "Create chemistry"

  useEffect(() => {
    if (!item) return

    form.setFieldsValue({
      name: item.name,
      use: item.use,
      code: item.code
    })
  }, [item])

  const resetImage = () => {
    setFile(null)
    setImagePreviewUrl("")
    const input = document.getElementById(IMAGE_ID)
    input && (input.value = "")
  }

  const onFinish = useCallback(async values => {
    setConfirmLoading(true)
    try {
      const data = { ...values }
      if (!!item?._id) {
        data._id = item._id
      }

      if (!!file) {
        const formData = new FormData()
        const fileName = file.name
        formData.append("file", file, fileName)
        const res = await uploadFile(formData)
        data.imageUrl = res.data
      }

      await onOk(data)
      resetImage()
    } catch (err) {
      notification.error({ message: err.message })
    }
    setConfirmLoading(false)
  }, [item, onOk, file])

  return <Modal
    title={title}
    visible={!!item}
    onOk={() => form.submit()}
    onCancel={() => {
      resetImage()
      onCancel()
    }}
    confirmLoading={confirmLoading}
  >
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label="Code"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="use"
        label="Use"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <ImagePreview
        imageId={IMAGE_ID}
        imageUrl={item?.imageUrl}
        imagePreviewUrl={imagePreviewUrl}
        setImagePreviewUrl={setImagePreviewUrl}
        setFile={setFile}
        maxHeight="70vh"
      />
    </Form>
  </Modal>
}

export default ChemistryDetail