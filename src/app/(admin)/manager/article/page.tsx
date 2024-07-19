"use client";

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
  Select,
  Spin,
} from "antd";
import { useEffect, useRef, useState } from "react";

import type { FormProps, MenuProps, TableColumnsType } from "antd";

import moment from "moment";
import momentz from "moment-timezone";
import { dataURLtoFile, normFile } from "../../_actions/imageconvert";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";

import {convert } from "html-to-text"
import Editor from "../../_component/editor";



const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

type FieldType = {
  categoryName?: string;
  categorySeo?: string;
  upload: any;
};

export default function Article() {
  const [form] = Form.useForm();
  const { Search } = Input;

  const [modal, contextHolder] = Modal.useModal();

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [rowId, setRowId] = useState("");
  const [valueContent, setValueContent] = useState('');

  const [spinning, setSpinning] = useState(false);

  const [selector, setSelector] = useState([]);

  const quillRef = useRef<any>();

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  const columns: TableColumnsType<any> = [
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
      dataIndex: "newsId",
      key: "newsId",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: any) => text,
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"หัวข้อ"}</label>,
      dataIndex: "title",
      key: "title",
      sorter: (a: any, b: any) => {
        a = a.title || "";
        b = b.title || "";
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
        text ? (
          <Image src={Config.ImageHosting + text} width={50} preview={false} />
        ) : (
          ""
        ),
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"SEO"}</label>,
      dataIndex: "newsSeo",
      key: "newsSeo",
      sorter: (a: any, b: any) => {
        a = a.newsSeo || "";
        b = b.newsSeo || "";
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
        getTypeData()
        setRowId(record.newsId);
        setValueContent("")
        await findContent(record.newsId);
        setTitleModal(`แก้ไขบทความ ${record.newsId}`);
        setIsEdit(true);
        setIsModalOpen(true);
      

        break;
      case "1":
        getTypeData()
        setValueContent("")
        await findContent(record.newsId);
        setTitleModal(`มุมมองบทความ ${record.newsId}`);
        setIsEdit(false);
        setIsModalOpen(true)
      
        break;
      case "3":
        modal.confirm({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "ต้องการลบใช่หรือไม่!",
          content: (
            <>
              <p>{`ลบบทความ  ${record.title}  !`}</p>
              <p>{`รหัส:${record.newsId}`}</p>
            </>
          ),
          okType: "danger",
          async onOk() {
            await deleteContent(record.newsId);
          },
        });
        break;
    }
  };

  const getData = async () => {
    setLoading(true);
    await Http.post(Config.api.getNewsAll)
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

  const getTypeData = async () => {
    setLoading(true);
    await Http.get(Config.api.getTypeNews)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          setSelector(items)
          // setData(items);
          // setDataFilter(items);
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

  const deleteContent = async (id:any) => {
    setSpinning(true)
		setLoading(true)
		await Http.delete(Config.api.deleteNews, {
			params: {
				id,
			},
		})
			.then(res => {
				const data = res.data.message
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
			.catch(e => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
			})
			.finally(async () => {
				await getData()
				setSpinning(false)
		setLoading(false)
			})
	}

  const dataSelector = () => {
    const data = selector.map((r: any, i) => {
      return {
        value: `${r.typeNewsId}`,
        label: `${r.typeNews}`,
      };
    });
    return data;
  };

  const onSearch = (value: string) => {
    const filter = dataFilter.filter(
      (row: any) => row.title.indexOf(value) > -1
    );
    setData(filter);
  };

  const addModal = () => {
    setValueContent("")
    getTypeData()
    setIsModalOpen(true);
    setIsAdd(true);
    setTitleModal(`เพิ่มบทความ`);
    setIsEdit(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if(convert(quillRef.current.root.innerHTML).trim() == ""){
      modal.error({
        cancelText: "ยกเลิก",
        okText: "ตกลง",
        title: "แจ้งเตือน",
        content:'กรุณากรอกเนื้อหา',
      });
      return;
    }

    if (isAdd) {
      await addContent(values);
    } else {
      await updateContent(values);
    }
  };

  const addContent = async (value:any) => {
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
		const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null

		let data = new FormData()
		data.append("FormFile", upload)
    data.append("Content", quillRef.current.root.innerHTML)
		if (value.uploadmulti) {
			if (value.uploadmulti.length > 0) {
				value.uploadmulti.map((row:any) => data.append("FormFileMulti", row.originFileObj))
			}
		}


		setSpinning(true)
		setLoading(true)
		await Http.post(Config.api.addNews, data, {
			params: {
				seo: value.seo,
				typeNewsId: value.type,
        title: value.title,
        user: token,
			},
			headers: {
				"content-type": "multipart/form-data",
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "บันทึกข้อมูลเรียบร้อย!",
            onOk() {
              handleCancel()
            },
            onCancel() {
              handleCancel()
            },
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
			.catch(e => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
			})
			.finally(async () => {
				await getData()
				setSpinning(false)
				setLoading(false)
			})
	}

  const updateContent = async (value:any) => {
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
		const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null


		let data = new FormData()
		data.append("FormFile", upload)
    data.append("Content", quillRef.current.root.innerHTML)
		if (value.uploadmulti) {
			if (value.uploadmulti.length > 0) {
				value.uploadmulti.map((row:any) => data.append("FormFileMulti", row.originFileObj))
			}
		}

		setSpinning(true)
		setLoading(true)
		await Http.put(Config.api.updateNews, data, {
			params: {
				id: rowId,
				seo: value.seo,
				typeNewsId: value.type,
        title: value.title,
        user: token,
			},
			headers: {
				"content-type": "multipart/form-data",
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "แก้ไขข้อมูลเรียบร้อย!",
            onOk() {
              handleCancel()
            },
            onCancel() {
              handleCancel()
            },
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
			.catch(e => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response,
        });
			})
			.finally(async () => {
				await getData()
				setSpinning(false)
				setLoading(false)
			})
	}

  const findContent = async (id: any) => {
    setLoading(true);
    await Http.post(Config.api.findNews, null, {
      params: {
        id,
      },
    })
      .then(async (res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
    
          await multiImage(items.image);

          form.setFieldsValue({
            seo: items.newsSeo,
            title: items.title,
            type: items.typeNewsId,

          });
       
            if (items.fileImage !== null) {
              let fileData = null;
              let url = Config.ImageHosting + items.localImage;
              // console.log(url)
              await Http.get(Config.api.base64, {
                params: {
                  url,
                },
              }).then((res) => {
                // console.log(res)
                fileData = dataURLtoFile(res.data.base64, items.fileImage);
                // console.log("Here is JavaScript File Object", fileData)
                form.setFieldsValue({
                  upload: [{ name: items.fileImage, originFileObj: fileData }],
                });
              });
            }
            setValueContent(items.content)
  
        }
      })
      .catch((e) => {
        console.log(e)
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e?.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const multiImage = async (image: any) => {
    if (image.length > 0) {
      await image.map(async (row: any, index: number) => {
        let url = Config.ImageHosting + row.local;

        await Http.get(Config.api.base64, {
          params: {
            url,
          },
        }).then((res) => {
          let fileDatamulti = dataURLtoFile(res.data.base64, row.fileName);
          // console.log("Here is JavaScript File Object", fileDatamulti)
          if (form.getFieldValue("uploadmulti")) {
            form.setFieldsValue({
              uploadmulti: [
                ...form.getFieldValue("uploadmulti"),
                {
                  key: index,
                  name: row.fileName,
                  originFileObj: fileDatamulti,
                },
              ],
            });
          } else {
            form.setFieldsValue({
              uploadmulti: [
                {
                  key: index,
                  name: row.fileName,
                  originFileObj: fileDatamulti,
                },
              ],
            });
          }
        });
      });
    }
  };


  const btnEditor = () => {
    // console.log(quillRef.current.root.innerHTML)
    // console.log(Delta)
    quillRef.current.root.innerHTML = valueContent
  }
  



  return (
    <div className="h-full w-full">
      <div className="mb-2 flex flex-row justify-between">
        <div>
          <Search
            placeholder="ค้นหาหัวข้อบทความ"
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
        rowKey={"newsId"}
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
        style={{ top: 8 }}
        className="!h-screen !w-screen"
        afterOpenChange={btnEditor}
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
              disabled={!isEdit}
            />
          </Form.Item>
          <Form.Item
            name="type"
            label="ประเภทบทความ"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกประเภท",
              },
            ]}
          >
          <Select
              disabled={!isEdit}
              dropdownStyle={{ zIndex: 2000 }}
              placeholder="กรุณาเลือกประเภท"
              // loading={selectLoading}
              allowClear
              showSearch
              optionFilterProp="label"
              options={dataSelector()}
            />
             </Form.Item>
          <Form.Item
            name="seo"
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
            extra="อัพโหลดได้รูปเดียว"
          >
            <Upload
              name="logo"
              action={Config.api.mock}
              maxCount={1}
              listType="picture"
              beforeUpload={beforeUpload}
            >
              <Button disabled={!isEdit}>อัพโหลดภาพ</Button>
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
            >
              <Button disabled={!isEdit}>อัพโหลดภาพ</Button>
            </Upload>
          </Form.Item>
    
          <div className="my-4">
          {/* <Editor
        ref={quillRef}
        readOnly={!isEdit}
       
      /> */}
       
            <p className="hidden">Current value: {valueContent}</p> 
          </div>
          <div className="flex justify-end !mb-0">
            <Button onClick={handleCancel}>ยกเลิก</Button>
            {!isEdit ? null : (
              <Button   className="ml-2" type="primary" htmlType="submit">
                บันทึก
              </Button>
            )}
          </div>
        </Form>
      </Modal>
      <Spin spinning={spinning} fullscreen />
      {contextHolder}
    </div>
  );
}
