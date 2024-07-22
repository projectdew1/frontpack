"use client";

import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  Table,
  Image,
  Dropdown,
  Form,
  Upload,
} from "antd";
import { useEffect, useState } from "react";

import type { FormProps, MenuProps, TableColumnsType } from "antd";

import moment from "moment";
import momentz from "moment-timezone";
import { dataURLtoFile, normFile } from "../../_actions/imageconvert";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

type CatagoryList = {
  categoryId: string;
  categoryName: string;
  createDate: Date;
  createUser: string;
  editDate: Date;
  editUser: string;
  fileImage: string;
  localImage: string;
  seo: string;
  typemachines: any[];
};

type FieldType = {
  categoryName?: string;
  categorySeo?: string;
  upload: any;
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function Catagory() {
  const { Search } = Input;
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [rowId, setRowId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const columns: TableColumnsType<any> = [
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
      dataIndex: "categoryId",
      key: "categoryId",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: any) => text,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"ประเภทผลิตภัณฑ์"}</label>
      ),
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a: any, b: any) => {
        a = a.categoryName || "";
        b = b.categoryName || "";
        return a.localeCompare(b);
      },
      width: 150,
      // align: "center",
      // ellipsis: true,
    },

    {
      title: () => <label style={{ fontWeight: "bold" }}>{"รูปภาพปก"}</label>,
      dataIndex: "localImage",
      key: "localImage",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: any) =>
        text ? <Image src={Config.ImageHosting + text} width={50} preview={false} /> : "",
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"SEO"}</label>,
      dataIndex: "seo",
      key: "seo",
      sorter: (a: any, b: any) => {
        a = a.seo || "";
        b = b.seo || "";
        return a.localeCompare(b);
      },
      width: 200,
      // align: "center",
      ellipsis: true,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"วันที่บันทึก"}</label>
      ),
      dataIndex: "createDate",
      key: "createDate",
      width: 120,
      align: "center",
      sorter: (a: any, b: any) =>
        moment(a.createDate).unix() - moment(b.createDate).unix(),
      render: (text: any, record: any, index: any) =>
        text
          ? momentz.utc(text).tz("Asia/Bangkok").format("DD/MM/YY HH:mm")
          : "",
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ผู้บันทึก"}</label>,
      dataIndex: "createUser",
      key: "createUser",
      sorter: (a: any, b: any) => {
        a = a.createUser || "";
        b = b.createUser || "";
        return a.localeCompare(b);
      },
      width: 100,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"วันที่แก้ไข"}</label>
      ),
      dataIndex: "editDate",
      key: "editDate",
      width: 120,
      align: "center",
      sorter: (a: any, b: any) =>
        moment(a.editDate).unix() - moment(b.editDate).unix(),
      render: (text: any, record: any, index: any) =>
        text
          ? momentz.utc(text).tz("Asia/Bangkok").format("DD/MM/YY HH:mm")
          : "",
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ผู้แก้ไข"}</label>,
      dataIndex: "editUser",
      key: "editUser",
      sorter: (a: any, b: any) => {
        a = a.editUser || "";
        b = b.editUser || "";
        return a.localeCompare(b);
      },
      width: 100,
    },
    {
      title: "",
      dataIndex: "menu",
      key: "menu",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: any) => (
        <>
          <Dropdown
            menu={{
              items: itemsDropdown(record),
              onClick: (e) => handleMenuClick(e, record),
            }}
            trigger={["click"]}
          >
            <MoreOutlined style={{ fontSize: "20px" }} />
          </Dropdown>
        </>
      ),
    },
  ];

  const itemsDropdown = (row: any): MenuProps["items"] => {
    return [
      {
        label: "แก้ไข",
        key: "0",
        icon: <EditOutlined />,
      },
      {
        label: "มุมมอง",
        key: "1",
        icon: <EyeOutlined />,
      },
      {
        type: "divider",
      },
      {
        label: "ลบ",
        key: "3",
        icon: <DeleteOutlined />,
        // disabled: row.status === 0,
      },
    ];
  };

  const handleMenuClick = async (e: any, record: any) => {
    setIsAdd(false);
    switch (e.key) {
      case "0":
        setRowId(record.categoryId);
        await findCategory(record.categoryId);
        setTitleModal(`แก้ไขประเภทผลิตภัณฑ์ ${record.categoryId}`);
        setIsEdit(true);
        showModal();
        break;
      case "1":
        await findCategory(record.categoryId);
        setTitleModal(`มุมมองประเภทผลิตภัณฑ์ ${record.categoryId}`);
        setIsEdit(false);
        showModal();
        break;
      case "3":
        modal.confirm({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "ต้องการลบใช่หรือไม่!",
          content: (
            <>
              <p>{`ลบประเภท  ${record.categoryName}  !`}</p>
              <p>{`รหัส:${record.categoryId}`}</p>
            </>
          ),
          okType: "danger",
          async onOk() {
            await deleteCategory(record.categoryId);
          },
        });
        break;
    }
  };

  const onSearch = (value: string) => {
    console.log(value);
    const filter = dataFilter.filter(
      (row: any) => row.categoryName.indexOf(value) > -1
    );
    setData(filter);
  };

  const addModal = () => {
    setTitleModal(`เพิ่มประเภทผลิตภัณฑ์`);
    setIsEdit(true);
    setIsAdd(true);
    showModal();
  };

  const getData = async () => {
    setLoading(true);
    await Http.post(Config.api.category)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          setData(items);
          setDataFilter(items);
        }
      })
      .catch((e) => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCategory = async (id: any) => {
    setLoading(true);
    await Http.delete(Config.api.deletecategory, {
      params: {
        id,
      },
    })
      .then((res) => {
        // console.log(res)
        const data = res.data.message;
        if (data === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "ลบข้อมูลเรียบร้อย!",
          });
        } else {
          modal.error({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "แจ้งเตือน!",
            content: data,
          });
        }
      })
      .catch((e) => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
      })
      .finally(() => {
        getData();
        setLoading(false);
      });
  };

  const addCategory = async (value: any) => {
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
    const upload = value.upload
      ? value.upload.length > 0
        ? value.upload[0].originFileObj
        : null
      : null;
    let data = new FormData();
    data.append("FormFile", upload);

    setLoading(true);
    await Http.post(Config.api.addcategory, data, {
      params: {
        user: token,
        categoryName: value.categoryName,
        seo: value.categorySeo,
      },
    })
      .then((res) => {
        const check = res.data.message;
        if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "เพิ่มข้อมูลเรียบร้อย!",
          });
        } else {
          modal.error({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "แจ้งเตือน!",
            content: check,
          });
        }
      })
      .catch((e) => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
      })
      .finally(async () => {
        await getData();
        setLoading(false);
        handleCancel();
      });
  };

  const updateCategory = async (value: any) => {
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
    const upload = value.upload
      ? value.upload.length > 0
        ? value.upload[0].originFileObj
        : null
      : null;
    let data = new FormData();
    data.append("FormFile", upload);

    setLoading(true);
    setLoading(true);
    await Http.put(Config.api.updatecategory, data, {
      params: {
        user: token,
        categoryName: value.categoryName,
        id: rowId,
        seo: value.categorySeo,
      },
    })
      .then((res) => {
        const check = res.data.message;
        if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "แก้ไขข้อมูลเรียบร้อย!",
          });
        } else {
          modal.error({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "แจ้งเตือน!",
            content: check,
          });
        }
      })
      .catch((e) => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
      })
      .finally(async () => {
        await getData();
        setLoading(false);
        handleCancel();
      });
  };

  const findCategory = async (id: any) => {
    setLoading(true);
    await Http.post(Config.api.idcategory, null, {
      params: {
        id,
      },
    })
      .then(async (res) => {
        const data = res.data.message;
        if (data === "success") {
          const items: CatagoryList = res.data.items;
          form.setFieldsValue({
            categoryName: items.categoryName,
            categorySeo: items.seo == null ? "" : items.seo,
          });
          if (items.fileImage !== null) {
            let fileData = null;
            let url = Config.ImageHosting + items.localImage;

            await Http.get(Config.api.base64, {
              params: {
                url,
              },
            }).then((res) => {
              fileData = dataURLtoFile(res.data.base64, items.fileImage);
              // console.log("Here is JavaScript File Object", fileData)
              form.setFieldsValue({
                upload: [{ name: items.fileImage, originFileObj: fileData }],
              });
            });
          }
        }
      })
      .catch((e) => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (isAdd) {
      await addCategory(values);
    } else {
      await updateCategory(values);
    }
  };

 

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
    <div className="h-full w-full">
      <div className="mb-2 flex flex-row justify-between">
        <div>
          <Search
            placeholder="ค้นหาชื่อประเภท"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Button
            className="ml-2"
            type="primary"
            icon={<PlusOutlined />}
            onClick={addModal}
          >
            เพิ่ม
          </Button>
        </div>
        <label className=" font-extralight text-md">{`รายการ ${data.length}`}</label>
      </div>
      <Table
        rowKey={"categoryId"}
        loading={{
          spinning: loading,
          size: "large",
          tip: "กำลังโหลด...",
        }}
        dataSource={data}
        columns={columns}
        // scroll={{ y: 600 }}
        size={"small"}
        bordered={true}
        tableLayout={"auto"}
        pagination={{
          defaultPageSize: 50,
          pageSizeOptions: ["10", "25", "50", "100"],
          showSizeChanger: true,
          locale: { items_per_page: "/ หน้า" },
        }}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
      />

      <Modal
        title={titleModal}
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          {...layout}
          form={form}
          // layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="categoryName"
            label="ชื่อประเภท"
            rules={[{ required: true, message: "กรุณากรอกชื่อประเภท!" }]}
          >
            <Input
              placeholder="กรุณากรอกชื่อประเภท"
              size="large"
              disabled={!isEdit}
            />
          </Form.Item>
          <Form.Item
            name="categorySeo"
            label="SEO"
            rules={[{ required: true, message: "กรุณากรอก SEO!" }]}
          >
            <Input
              placeholder="กรุณากรอก SEO"
              size="large"
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            name="upload"
            label="รูปภาพปก"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra={'อัพโหลดภาพได้รูปเดียว'}
          >
            <Upload
              name="logo"
              action={Config.api.mock}
              maxCount={1}
              listType="picture"
              beforeUpload={beforeUpload}
              onRemove={() => false}
              disabled={!isEdit}

            >
              <Button disabled={!isEdit}>{`อัพโหลดภาพ`}</Button>
            </Upload>
          </Form.Item>
          <div className="flex justify-end !mb-0">
            <Button onClick={handleCancel}>ยกเลิก</Button>
            {!isEdit ? null : (
              <Button className="ml-2" type="primary" htmlType="submit">
                บันทึก
              </Button>
            )}
          </div>
          {/* </Form.Item> */}
        </Form>
      </Modal>
      {contextHolder}
    </div>
  );
}
