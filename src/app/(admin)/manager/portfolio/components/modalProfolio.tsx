import { Button, Form, FormInstance, Input, Modal, Select, Upload } from "antd";
import React from "react";
import Config from "@/hook/setApi/Config";
import { HookAPI } from "antd/es/modal/useModal";
import type { DefaultOptionType } from "antd/es/select";
import { normFile } from "@/app/(admin)/_actions/imageconvert";

type Props = {
  modal: HookAPI;
  isOpen: boolean;
  disable: boolean;
  handleCancel: (() => void) | undefined;
  onFinish: ((values: any) => void) | undefined;
  form: FormInstance<any> | undefined;
  options: DefaultOptionType[] | undefined;
  title: string;
  handleOk: (() => void) | undefined;
  afterOpenChange?: (() => void) | undefined;
  loading: boolean;
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ModalProfolio = ({
  disable,
  isOpen,
  handleCancel,
  handleOk,
  onFinish,
  modal,
  form,
  options,
  title,
  afterOpenChange,
  loading,
}: Props) => {
  const beforeUpload = (file: any) => {
    if (file.type === "image/png" || file.type === "image/jpeg") {
      return true;
    } else {
      modal.error({
        cancelText: "ยกเลิก",
        okText: "ตกลง",
        title: "แจ้งเตือนจาก server!",
        content: `${file.name} ไม่ใช่ไฟล์ png หรือ jpeg`,
      });
      return Upload.LIST_IGNORE;
    }
  };

  return (
    <Modal
      title={title}
      maskClosable={false}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={700}
      style={{ top: 8 }}
      //   className="!h-screen !w-screen"
      afterOpenChange={afterOpenChange}
    >
      <Form
        {...layout}
        form={form}
        name="listModal"
        // layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="หัวข้อ"
          rules={[{ required: true, message: "กรุณากรอกหัวข้อ!" }]}
        >
          <Input
            placeholder="กรุณากรอกหัวข้อ"
            size="large"
            disabled={disable}
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="เครื่องจักร"
          rules={[
            {
              required: true,
              message: "กรุณาเลือกเครื่องจักร",
            },
          ]}
        >
          <Select
            disabled={disable}
            dropdownStyle={{ zIndex: 2000 }}
            placeholder="กรุณาเลือกเครื่องจักร"
            // loading={selectLoading}
            allowClear
            showSearch
            optionFilterProp="label"
            options={options}
          />
        </Form.Item>
        <Form.Item
          name="seo"
          label="SEO"
          rules={[{ required: true, message: "กรุณากรอก SEO!" }]}
        >
          <Input placeholder="กรุณากรอก SEO" size="large" disabled={disable} />
        </Form.Item>

        <Form.Item
          name="upload"
          label="รูปภาพปก"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="อัพโหลดได้รูปเดียว"
        >
          <Upload
            name="logo"
            action={Config.api.mock}
            maxCount={1}
            listType="picture"
            beforeUpload={beforeUpload}
            accept="image/*"
          >
            <Button disabled={disable}>อัพโหลดภาพ</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="uploadmulti"
          label="รูปภาพประกอบ"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="อัพโหลดได้ 10 รูป"
        >
          <Upload
            name="logo"
            action={Config.api.mock}
            maxCount={10}
            multiple
            listType="picture"
            beforeUpload={beforeUpload}
            accept="image/*"
          >
            <Button disabled={disable}>อัพโหลดภาพ</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end !mb-0">
          <Button onClick={handleCancel}>ยกเลิก</Button>
          {disable ? null : (
            <Button
              className="ml-2"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              บันทึก
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default ModalProfolio;
