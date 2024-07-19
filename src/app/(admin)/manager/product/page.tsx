"use client";

import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
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
  Tag,
  Select,
  Radio,
  InputNumber,
  Space,
  Spin,
} from "antd";
import { useEffect, useState } from "react";

import type { FormProps, MenuProps, TableColumnsType } from "antd";

import moment from "moment";
import momentz from "moment-timezone";
import { dataURLtoFile, normFile } from "../../_actions/imageconvert";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../../_context/wrapper";
import StateTech from "../../_component/stateTech";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

type FieldType = {
  techName?: string;
};

export default function Product() {
  const { Search, TextArea } = Input;
  const [form] = Form.useForm();
  const { setIsModalTech } = useAppContext();

  const [modal, contextHolder] = Modal.useModal();

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [rowId, setRowId] = useState("");

  const [selectLoading, setSelectLoading] = useState(false);
  const [selector, setSelector] = useState([]);
  const [selectorTech, setSelectorTech] = useState([]);

  const [isPrice, setIsPrice] = useState(false);

  const [spinning, setSpinning] = useState(false);

  const columns: TableColumnsType<any> = [
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
      dataIndex: "machineId",
      key: "machineId",
      width: 90,
      align: "center",
      sorter: (a: any, b: any) => {
        a = a.machineId || "";
        b = b.machineId || "";
        return a.localeCompare(b);
      },
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
      ellipsis: true,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"หมวดหมู่ผลิตภัณฑ์"}</label>
      ),
      dataIndex: "typeName",
      key: "typeName",
      sorter: (a: any, b: any) => {
        a = a.typeName || "";
        b = b.typeName || "";
        return a.localeCompare(b);
      },
      width: 200,
      ellipsis: true,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"ชื่อสินค้าผลิตภัณฑ์"}</label>
      ),
      dataIndex: "machineName",
      key: "machineName",
      sorter: (a: any, b: any) => {
        a = a.machineName || "";
        b = b.machineName || "";
        return a.localeCompare(b);
      },

      width: 200,
      ellipsis: true,
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"รหัสสินค้า"}</label>,
      dataIndex: "itemsCode",
      key: "itemsCode",
      sorter: (a: any, b: any) => {
        a = a.itemsCode || "";
        b = b.itemsCode || "";
        return a.localeCompare(b);
      },
      width: 120,
      ellipsis: true,
    },

    {
      title: () => <label style={{ fontWeight: "bold" }}>{"SEO"}</label>,
      dataIndex: "machineSeo",
      key: "machineSeo",
      sorter: (a: any, b: any) => {
        a = a.machineSeo || "";
        b = b.machineSeo || "";
        return a.localeCompare(b);
      },
      width: 180,
      ellipsis: true,
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"Sold out"}</label>,
      dataIndex: "soldout",
      key: "soldout",
      width: 100,
      // ellipsis: true,
      render: (text: any, record: any, index: any) => {
        return (
          <Tag color={text == 1 ? "volcano" : ""} key={index}>
            {text === 1 ? "ของหมด" : "มีของ"}
          </Tag>
        );
      },
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ราคา"}</label>,
      dataIndex: "price",
      key: "price",
      width: 100,
      // ellipsis: true,
      render: (text: any, record: any, index: any) => {
        return (
          <Tag color={record.soldout == 1 ? "volcano" : ""} key={index}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"ลดราคาเหลือ"}</label>
      ),
      dataIndex: "discount",
      key: "discount",
      width: 100,
      // ellipsis: true,
      render: (text: any, record: any, index: any) => {
        return (
          <Tag color={record.soldout == 1 ? "volcano" : ""} key={index}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"รูปภาพปก"}</label>,
      dataIndex: "localImage",
      key: "localImage",
      width: 100,
      render: (text: any, record: any, index: any) =>
        text ? (
          <Image width={50} src={Config.ImageHosting + text} preview={false} />
        ) : (
          ""
        ),
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
      fixed: "right",
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

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

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
        label: "คัดลอก",
        key: "2",
        icon: <CopyOutlined />,
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
    // console.log(record);
    setIsAdd(false);
    switch (e.key) {
      case "0":
        setRowId(record.machineId);
        await findMachine(record.machineId,false);
        setTitleModal(`แก้ไขสินค้า ${record.machineId}`);
        selectGroup();
        selectTech()
        setIsEdit(true);
        setIsModalOpen(true);
        break;
      case "1":
        await findMachine(record.machineId,false);
        setTitleModal(`มุมมองสินค้า ${record.machineId}`);
        selectGroup();
        selectTech()
        setIsEdit(false);
        setIsModalOpen(true);
        break;
      case "2":
        await findMachine(record.machineId,true);
        setTitleModal(`คัดลอกสินค้า ${record.machineId}`);
        selectGroup();
        selectTech()
        setIsEdit(true);
        setIsAdd(true);
        setIsModalOpen(true);
        break;
      case "3":
        modal.confirm({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "ต้องการลบใช่หรือไม่!",
          content: (
            <>
              <p>{`ลบสินค้า  ${record.machineName}  !`}</p>
              <p>{`รหัส:${record.machineId}`}</p>
            </>
          ),
          okType: "danger",
          async onOk() {
            await deleteProduct(record.machineId);
          },
        });
        break;
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

  const getData = async () => {
    setLoading(true);
    await Http.post(Config.api.machine)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          // console.log(items)
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

  const multiMachine = async (image: any) => {
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

  const findMachine = async (id: any, copy: boolean) => {
    setLoading(true);
    await Http.post(Config.api.idmachine, null, {
      params: {
        id,
      },
    })
      .then(async (res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          let technical: any = [];
          let detail: any = [];
          let video: any = [];
          let manual: any = [];

          if (!copy) {
            await multiMachine(items.image);
          }

          items.detail.forEach((row: any) => {
            detail.push(row.detail);
          });

          items.video.forEach((row: any) => {
            video.push(row.link);
          });

          items.manual.forEach((row: any) => {
            manual.push(row.manual);
          });

          items.detailTech.forEach((row: any) => {
            technical.push({ tech: row.technicallyId, name: row.detailTech });
          });

          form.setFieldsValue({
            seo: items.machineSeo,
            group: items.typeId,
            product: copy ? "" : items.machineName,
            model: items.itemsCode,
            number: items.price,
            price: parseInt(items.price + items.discount) > 0 ? true : false,
            discount: items.discount,
            soldout: items.soldout == 1 ? true : false,
            explain:
              items.explain.length > 0 ? items.explain[0].explainDetail : "",
            detail,
            video,
            manual,
            technical,
          });
          // setIsPrice(parseInt(items.price + items.discount) > 0 ? true : false)
          if (!copy) {
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

  const addModal = () => {
    setTitleModal(`เพิ่มสินค้า`);
    setIsEdit(true);
    setIsAdd(true);
    selectGroup();
    selectTech()
    setIsModalOpen(true);
  };

  const onSearch = (value: string) => {
    console.log(value);
    const filter = dataFilter.filter(
      (row: any) => row.machineName.indexOf(value) > -1
    );
    setData(filter);
  };

  const selectGroup = async () => {
    setSelectLoading(true);
    await Http.post(Config.api.type)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          setSelector(items);
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
        setSelectLoading(false);
      });
  };

  const selectTech = async () => {
    setSelectLoading(true);
    await Http.post(Config.api.technical)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          setSelectorTech(items);
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
        setSelectLoading(false);
      });
  };

  const dataSelector = () => {
    const data = selector.map((r: any, i) => {
      return {
        value: `${r.typeId}`,
        label: `${r.typeName}`,
      };
    });
    return data;
  };

  const dataSelectorTech = () => {
    const data = selectorTech.map((r: any, i) => {
      return {
        value: `${r.technicallyId}`,
        label: `${r.technicallyName}`,
      };
    });
    return data;
  };

  const showModalTech = () => {
    setLoading(true);
    setIsModalTech(true);
    setLoading(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (isAdd) {
      await addProduct(values);
    } else {
      await updateProduct(values);
    }
  };

  const addProduct = async (value:any) => {
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
		const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null
		const number = value.price ? value.number : null
		const discount = value.price ? value.discount : null
		let data = new FormData()
		data.append("FormFile", upload)
		if (value.uploadmulti) {
			if (value.uploadmulti.length > 0) {
				value.uploadmulti.map((row:any) => data.append("FormFileMulti", row.originFileObj))
			}
		}

		if (value.technical) {
			if (value.technical.length > 0) {
				value.technical.map((row:any, i:number) => {
					data.append(`technical[${i}].tech`, row.tech)
					data.append(`technical[${i}].name`, row.name)
				})
			}
		}

		if (value.video) {
			if (value.video.length > 0) {
				value.video.map((row:any, i:number) => {
					data.append(`videos[${i}]`, row)
				})
			}
		}

		if (value.manual) {
			if (value.manual.length > 0) {
				value.manual.map((row:any, i:number) => {
					data.append(`manual[${i}]`, row)
				})
			}
		}

		if (value.detail) {
			if (value.detail.length > 0) {
				value.detail.map((row:any, i:number) => {
					data.append(`detail[${i}]`, row)
				})
			}
		}

		setSpinning(true)
		setLoading(true)
		await Http.post(Config.api.addmachine, data, {
			params: {
				seo: value.seo,
				typeID: value.group,
				machineName: value.product,
				machineModels: value.model,
				price: number,
				discount: discount,
				soldout: value.soldout,
				user: token,
				explain: value.explain,
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

  const updateProduct = async (value:any) => {
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
		const upload = value.upload ? (value.upload.length > 0 ? value.upload[0].originFileObj : null) : null

		const number = value.price ? value.number : null
		const discount = value.price ? value.discount : null

		let data = new FormData()
		data.append("FormFile", upload)
		if (value.uploadmulti) {
			if (value.uploadmulti.length > 0) {
				value.uploadmulti.map((row:any) => data.append("FormFileMulti", row.originFileObj))
			}
		}
		if (value.technical) {
			if (value.technical.length > 0) {
				value.technical.map((row:any, i:number) => {
					data.append(`technical[${i}].tech`, row.tech)
					data.append(`technical[${i}].name`, row.name)
				})
			}
		}

		if (value.video) {
			if (value.video.length > 0) {
				value.video.map((row:any, i:number) => {
					data.append(`videos[${i}]`, row)
				})
			}
		}

		if (value.manual) {
			if (value.manual.length > 0) {
				value.manual.map((row:any, i:number) => {
					data.append(`manual[${i}]`, row)
				})
			}
		}

		if (value.detail) {
			if (value.detail.length > 0) {
				value.detail.map((row:any, i:number) => {
					data.append(`detail[${i}]`, row)
				})
			}
		}

		setSpinning(true)
		setLoading(true)
		await Http.post(Config.api.updatemachine, data, {
			params: {
				id: rowId,
				seo: value.seo,
				typeID: value.group,
				machineName: value.product,
				machineModels: value.model,
				price: number,
				discount: discount,
				soldout: value.soldout,
				user: token,
				explain: value.explain,
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

  const deleteProduct = async (id:any) => {
    setSpinning(true)
		setLoading(true)
		await Http.delete(Config.api.deletemachine, {
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

  return (
    <div className="h-full w-full">
      {" "}
      <div className="mb-2 flex flex-row justify-between">
        <div>
          <Search
            id="searchProduct"
            placeholder="ค้นหาชื่อสินค้า"
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
          <Button className="ml-2" type="dashed" danger onClick={showModalTech}>
            คุณสมบัติทางเทคนิค
          </Button>
        </div>
        <label className=" font-extralight text-md">{`รายการ ${data.length}`}</label>
      </div>
      <Table
        rowKey={"machineId"}
        loading={{
          spinning: loading,
          size: "large",
          tip: "กำลังโหลด...",
        }}
        dataSource={data}
        columns={columns}
        scroll={{ x: 1500, y: 700 }}
        size={"small"}
        bordered={true}
        pagination={{
          defaultPageSize: 50,
          pageSizeOptions: ["10", "25", "50", "100"],
          showSizeChanger: true,
          locale: { items_per_page: "/ หน้า" },
        }}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
      />
      <StateTech />
      <Modal
        title={titleModal}
        maskClosable={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 8 }}
        className="!h-screen !w-screen"
      >
        <Form
          {...layout}
          form={form}
          // layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="seo"
            label="SEO"
            rules={[
              {
                required: true,
                message: "กรุณากรอก SEO",
              },
            ]}
          >
            <Input
              disabled={!isEdit}
              placeholder="กรุณากรอก SEO"
              autoComplete={"off"}
            />
          </Form.Item>
          <Form.Item
            name="group"
            label="หมวดหมู่ผลิตภัณฑ์"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกหมวดหมู่",
              },
            ]}
          >
            <Select
              disabled={!isEdit}
              dropdownStyle={{ zIndex: 2000 }}
              placeholder="กรุณาเลือกหมวดหมู่"
              loading={selectLoading}
              allowClear
              showSearch
              optionFilterProp="label"
              options={dataSelector()}
            />
          </Form.Item>
          <Form.Item
            name="product"
            label="ชื่อสินค้า"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อสินค้า",
              },
            ]}
          >
            <Input
              disabled={!isEdit}
              placeholder="กรุณากรอกชื่อสินค้า"
              autoComplete={"off"}
            />
          </Form.Item>
          <Form.Item
            name="model"
            label="รหัสรุ่น"
            rules={[
              {
                required: true,
                message: "กรุณากรอกรหัสรุ่น",
              },
            ]}
          >
            <Input
              disabled={!isEdit}
              placeholder="กรุณากรอกรหัสรุ่น"
              autoComplete={"off"}
            />
          </Form.Item>
          <Form.Item label="ราคา" style={{ marginBottom: 0 }}>
            <Form.Item
              name="price"
              label="เลือก"
              rules={[
                {
                  required: true,
                  message: "เลือกราคา",
                },
              ]}
              style={{ display: "inline-block" }}
            >
              <Radio.Group
                disabled={!isEdit}
                optionType="button"
                onChange={(e) => setIsPrice(e.target.value)}
                options={[
                  { id: "1", label: "ไม่มี", value: false },
                  { id: "2", label: "มี", value: true },
                ]}
              />
            </Form.Item>
            {isPrice ? (
              <Form.Item
                label="จำนวนราคา"
                name="number"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกจำนวนราคา",
                  },
                ]}
                style={{ display: "inline-block", margin: "0 8px" }}
              >
                <InputNumber min={0} disabled={!isEdit} />
              </Form.Item>
            ) : null}
            {isPrice ? (
              <Form.Item
                label="จำนวนลดราคา"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกจำนวนลดราคา",
                  },
                ]}
                style={{ display: "inline-block", margin: "0 8px" }}
              >
                <InputNumber min={0} disabled={!isEdit} />
              </Form.Item>
            ) : null}
          </Form.Item>
          <Form.Item
            name="soldout"
            label="จำนวนสินค้า"
            rules={[
              {
                required: true,
                message: "เลือกจำนวนสินค้า",
              },
            ]}
          >
            <Radio.Group
              disabled={!isEdit}
              optionType="button"
              options={[
                { id: "1", label: "ของหมด", value: true },
                { id: "2", label: "มีอยู่", value: false },
              ]}
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
            name="explain"
            label="คำอธิบาย"
            rules={[
              {
                required: true,
                message: "กรุณากรอกคำอธิบาย",
              },
            ]}
          >
            <TextArea
              rows={4}
              autoSize={false}
              maxLength={400}
              showCount={true}
              disabled={!isEdit}
              autoComplete={"off"}
            />
          </Form.Item>
          <Form.List name="detail">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "คุณสมบัติ" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "กรุณากรอกคุณสมบัติ",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        maxLength={400}
                        placeholder="กรุณากรอกคุณสมบัติ"
                        style={{ width: "80%" }}
                        autoComplete={"off"}
                        disabled={!isEdit}
                      />
                    </Form.Item>

                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="ml-2"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item label={"เพิ่มคุณสมบัติ"}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    disabled={!isEdit}
                    icon={<PlusOutlined />}
                  >
                    เพิ่มคุณสมบัติ
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="technical">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "คุณสมบัติทางเทคนิค" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      name={[field.name, "tech"]}
                      // fieldKey={[field.fieldKey, "tech"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "กรุณาเลือกคุณสมบัติ",
                        },
                      ]}
                      noStyle
                    >
                      <Select
                        style={{ width: "30%" }}
                        disabled={!isEdit}
                        dropdownStyle={{ zIndex: 2000 }}
                        placeholder="กรุณาเลือกคุณสมบัติ"
                        loading={selectLoading}
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        options={dataSelectorTech()}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "name"]}
                      // fieldKey={[field.fieldKey, "name"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "กรุณากรอกคุณสมบัติทางเทคนิค",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                                   className="!ml-2"
                        maxLength={400}
                        placeholder="กรุณากรอกคุณสมบัติทางเทคนิค"
                        style={{ width: "60%" }}
                        autoComplete={"off"}
                        disabled={!isEdit}
                      />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="ml-2"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item label={"เพิ่มคุณสมบัติทางเทคนิค"}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    disabled={!isEdit}
                    icon={<PlusOutlined />}
                  >
                    เพิ่มคุณสมบัติทางเทคนิค
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="manual">
									{(fields, { add, remove }, { errors }) => (
										<>
											{fields.map((field, index) => (
												<Form.Item {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={index === 0 ? "วิธีใช้" : ""} required={false} key={field.key}>
													<Form.Item
														{...field}
														validateTrigger={["onChange", "onBlur"]}
														rules={[
															{
																required: true,
																whitespace: true,
																message: "กรุณากรอกวิธีใช้",
															},
														]}
														noStyle
													>
														<Input
															maxLength={400}
															placeholder="กรุณากรอกวิธีใช้"
															disabled={!isEdit}
															style={{ width: "80%" }}
														
														/>
													</Form.Item>
													{fields.length > 0 ? <MinusCircleOutlined className="ml-2" onClick={() => remove(field.name)} /> : null}
												</Form.Item>
											))}
											<Form.Item label={"เพิ่มวิธีใช้"}>
												<Button type="dashed" onClick={() => add()} style={{ width: "60%" }} disabled={!isEdit} icon={<PlusOutlined />}>
													เพิ่มวิธีใช้
												</Button>
												<Form.ErrorList errors={errors} />
											</Form.Item>
										</>
									)}
								</Form.List>
                <Form.List name="video">
									{(fields, { add, remove }, { errors }) => (
										<>
											{fields.map((field, index) => (
												<Form.Item {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={index === 0 ? "ลิ้งค์วีดีโอ" : ""} required={false} key={field.key}>
													<Form.Item
														{...field}
														validateTrigger={["onChange", "onBlur"]}
														rules={[
															{
																required: true,
																whitespace: true,
																message: "กรุณากรอกลิ้งค์วีดีโอ",
															},
														]}
														noStyle
													>
														<Input
															maxLength={400}
															placeholder="กรุณากรอกลิ้งค์วีดีโอ"
															disabled={!isEdit}
															style={{ width: "80%" }}
														
														/>
													</Form.Item>
													{fields.length > 0 ? <MinusCircleOutlined className="ml-2" onClick={() => remove(field.name)} /> : null}
												</Form.Item>
											))}
											<Form.Item label={"เพิ่มลิ้งค์วีดีโอ"}>
												<Button type="dashed" onClick={() => add()} style={{ width: "60%" }} disabled={!isEdit} icon={<PlusOutlined />}>
													เพิ่มลิ้งค์วีดีโอ
												</Button>
												<Form.ErrorList errors={errors} />
											</Form.Item>
										</>
									)}
								</Form.List>
                <Form.Item name="uploadmulti" label="รูปภาพประกอบ" valuePropName="fileList" getValueFromEvent={normFile} extra="อัพโหลดได้ 10 รูป">
									<Upload name="logo" action={Config.api.mock} maxCount={10} multiple listType="picture" beforeUpload={beforeUpload}>
										<Button disabled={!isEdit}>อัพโหลดภาพ</Button>
									</Upload>
								</Form.Item>
                <div className="flex justify-end">
                <Button  onClick={handleCancel}>
							ปิด
						</Button>
                {isEdit ?<Button type="primary"  htmlType="submit" loading={loading} className="ml-2" >
								{isAdd ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
							</Button> : null}
                </div>
        </Form>
      </Modal>
      <Spin spinning={spinning} fullscreen />
      {contextHolder}
    </div>
  );
}
