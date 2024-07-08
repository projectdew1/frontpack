"use client";

import React from "react";
import {
  Button,
  Form,
  Input,
  message,
  Space,
  ConfigProvider,
  Select,
  Spin,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { kanit } from "@/app/font";
import axios from "axios";
import Config from "@/hook/setApi/Config";

export default function InputContact() {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = React.useState(false);

  const validateMessages = {
    required: "กรุณากรอก ${label}",
    types: {
      email: "${label} ไม่ใช่แบบที่ถูกต้อง!",
      regexp: "${label} ไม่ใช่แบบที่ถูกต้อง!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
    pattern: {
      mismatch: "${label} ไม่ตรงกับรูปแบบพิมพ์เฉพาะเลข 10 ตัว",
    },
  };

  const formItemLayout = {
    labelCol: {
      // xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      // xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const formTailLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14, offset: 6 },
  };

  const onFinish = async () => {

    setSpinning(true)

    await axios.post(Config.api.addcontact, null, {
      params: {
        name: form.getFieldValue(["name"]),
        mail: form.getFieldValue(["email"]),
        tel: form.getFieldValue(["telephone"]),
        title: form.getFieldValue(["header"]),
        detail: form.getFieldValue(["detail"]),
      },
    })
      .then((res: any) => {
        const data = res.data.message;

        if (data === "success") {
          message.success("ส่งข้อมูลสำเร็จ!");
          form.resetFields();
        } else {
          message.error("ส่งข้อมูลไม่สำเร็จ !");
        }
      })
      .catch((e) => {
        message.error("เกิดข้อผิดพลาดจาก Server");
      })
      .finally(async () => {
        setSpinning(false)
      });
  };

  const onFinishFailed = () => {
    message.error("กรุณากรอกข้อมูลให้ครบ!");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: kanit.style.fontFamily,
        },
      }}
    >
      {" "}
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="ชื่อ-นามสกุล"
          rules={[{ required: true }]}
        >
          <Input placeholder="ชื่อ-นามสกุล" maxLength={200} />
        </Form.Item>
        <Form.Item
          name="telephone"
          label="เบอร์โทร"
          rules={[{ required: true, pattern: new RegExp("([0-9]{10}\\s*)+") }]}
        >
          <Input placeholder="0XXXXXXXXX" maxLength={10} />
        </Form.Item>
        <Form.Item
          name="email"
          label="อีเมลล์"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="อีเมลล์" maxLength={100} />
        </Form.Item>
        <Form.Item
          name="header"
          label="หัวข้อสอบถาม"
          rules={[{ required: true }]}
        >
          <Select placeholder="เลือกหัวข้อสอบถาม">
            <Select.Option value="ทั่วไป">ทั่วไป</Select.Option>
            <Select.Option value="ผลิตภัณฑ์และบริการ">ผลิตภัณฑ์และบริการ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="detail"
          label="รายละเอียด"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            rows={4}
            allowClear
            placeholder="รายละเอียด"
            showCount
            maxLength={500}
          />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Space>
            <Button
              style={{ background: "#4F1AFF" }}
              type="primary"
              icon={<SendOutlined />}
              htmlType="submit"
            >
              ส่ง
            </Button>
            {/* <Button htmlType="button" onClick={onFill}>
Fill
</Button> */}
          </Space>
        </Form.Item>
      </Form>
      <Spin spinning={spinning} fullscreen />
    </ConfigProvider>
  );
}
