import { Form, Input, Modal, notification } from "antd";
import React, { useCallback, useState } from "react";

const UserDetail = ({ item, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [data, setData] = useState({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    products: [],
  });

  const reset = () =>
    setData({
      createdAt: new Date().getTime(),
      products: [],
      isExport: false,
    });

  const onFinish = useCallback(async () => {
    setConfirmLoading(true);
    try {
      if (!data) {
        throw new Error("Invalid information");
      }

      if (!!data.products.find((product) => !product.count)) {
        throw new Error("Product count have to be greater than 0");
      }

      const result = {
        ...data,
        products: data.products.map((product) => ({
          _id: product._id,
          count: product.count,
          name: product.name,
        })),
      };

      await onOk(result);
    } catch (err) {
      notification.error({ message: err.message });
    }
    setConfirmLoading(false);
  }, [item, onOk, data]);

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const isEdit = !!item?._id;
  const title = isEdit ? "Sửa Thông Tin Nhân Viên" : "Thêm Nhân Viên";

  return (
    <Modal
      title={title}
      visible={!!item}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        reset();
        onCancel();
      }}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item label="Email" name="email">
          <Input value={data.email} onChange={handlerInputChange} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            placeholder="******"
            value={data.password}
            onChange={handlerInputChange}
          />
        </Form.Item>
        <Form.Item label="firstName" name="firstName">
          <Input value={data.firstName} onChange={handlerInputChange} />
        </Form.Item>
        <Form.Item label="lastName" name="lastName">
          <Input
            value={data.lastName}
            onChange={handlerInputChange}
            placeholder="Tên Nhân viên"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetail;
