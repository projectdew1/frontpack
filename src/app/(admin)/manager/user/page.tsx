"use client";

import { Button, Form, Input, Modal, Spin, Table, Tooltip } from "antd";
import type { FormProps, TableColumnsType } from "antd";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import { getCookie } from "cookies-next";
import {
  DeleteOutlined,
  KeyOutlined,
  LockOutlined,
  UndoOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

type FieldType = {
  username?: string;
  password?: string;
};

export default function User() {
  const { Search } = Input;

  const [data, setData] = useState([]);
  const [adToken, setAdToken] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const columns: TableColumnsType<any> = [
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"ชื่อผู้ใช้งาน"}</label>
      ),
      dataIndex: "username",
      key: "username",
      sorter: (a: any, b: any) => a.username.localeCompare(b.username),
      width: 100,
      // align: "center",
      // ellipsis: true,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"เข้าสู่ระบบล่าสุด"}</label>
      ),
      dataIndex: "lastLogin",
      key: "lastLogin",
      width: 120,
      align: "center",
      sorter: (a: any, b: any) =>
        moment(a.lastLogin).unix() - moment(b.lastLogin).unix(),
      render: (text: any, record: any, index: any) =>
        text
          ? moment.utc(text).tz("Asia/Bangkok").format("DD/MM/YY HH:mm")
          : "",
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ผู้บันทึก"}</label>,
      dataIndex: "createUser",
      key: "createUser",
      sorter: (a: any, b: any) => a.createUser.localeCompare(b.createUser),
      width: 80,
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
        text ? moment(text).format("DD/MM/YY HH:mm") : "",
    },
    {
      title: "",
      dataIndex: "menu",
      key: "menu",
      width: 50,
      align: "center",
      fixed: "right",
      render: (text: any, record: any, index: any) => (
        <div className="grid grid-cols-2 gap-x-2">
          <Tooltip title="รีเซ็ตรหัสผ่าน">
            <Button
              type="text"
              icon={<KeyOutlined />}
              disabled={record.callBy != "dew"}
              onClick={() => resetModal(record)}
            />
          </Tooltip>
          <Tooltip title="ลบผู้ใช้งาน">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              disabled={record.callBy != "dew"}
              onClick={() => deleteModal(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const deleteModal = async (row: any) => {
    modal.confirm({
      cancelText: "ยกเลิก",
      okText: "ตกลง",
      title: "ต้องการลบใช่หรือไม่!",
      content: `ลบผู้ใช้งานชื่อ ${row.username} !`,
      okType: "danger",
      async onOk() {
        // console.log('OK');
        await deleteUser(row.username);
      },
    });
  };

  const deleteUser = async (user: any) => {
    setLoading(true);
    await Http.delete(Config.api.deleteuser, {
      params: {
        username: user,
      },
    })
      .then((res) => {
        const check = res.data.message;
        if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "ลบเรียบร้อย!",
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
        setLoading(false);
        await getData();
      });
  };

  const resetModal = async (row: any) => {
    modal.confirm({
      cancelText: "ยกเลิก",
      okText: "ตกลง",
      title: "คุณต้องการรีเซ็ตรหัสผ่าน!",
      content: (
        <>
          {`ผู้ใช้งาน: ${row.username}`}
          <br />
          {`รีเซ็ตรหัสผ่านตั้งค่า: 9999`}
        </>
      ),
      async onOk() {
        // console.log('OK');

        await reset(row.username);
      },
    });
  };

  const reset = async (username: any) => {
    setLoading(true);
    await Http.put(Config.api.reset, null, {
      params: {
        username: username,
      },
    })
      .then((res) => {
        const check = res.data.message;
        if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "รีเซ็ตรหัสผ่านเรียบร้อย!",
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
        // setVisiblePass(false)
        setLoading(false);
        await getData();
      });
  };

  const getData = async () => {
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
    setAdToken(token);
    setLoading(true);
    await Http.post(Config.api.user, null, {
      params: {
        callBy: token,
      },
    })
      .then((res) => {
        const data = res.data.items;

        setData(data);
        setDataFilter(data);
      })
      .catch((e: any) => {
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

  const onSearch = (value: string) => {
    const filter = dataFilter.filter(
      (row: any) => row.username.indexOf(value) > -1
    );
    setData(filter);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    Modal.destroyAll();
    await addUser(values);
  };

  const addModal = () => {
    modal.confirm({
      cancelText: "ยกเลิก",
      okText: "ตกลง",
      title: "เพิ่มผู้ใช้งาน!",
      // className: '!mb-0 bg-red-50',
      // wrapClassName: '!mb-0 bg-red-50',
      content: (
        <Form
          name="normal_login"
          onFinish={onFinish}
  autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "กรุณากรอกผู้ใช้งาน!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="ผู้ใช้งาน"
              // size="large"
            />
          </Form.Item>
          <Form.Item
            className="mt-2"
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="รหัสผ่าน"
              // size="large"
            />
          </Form.Item>
          <Form.Item className="flex justify-end !mb-0">
            <Button className="mr-2" onClick={() => Modal.destroyAll()}>
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit">
              เพิ่ม
            </Button>
          </Form.Item>
        </Form>
      ),

      footer: <></>,
      okButtonProps: {
        htmlType: "submit",
      },
      async onOk() {
        console.log("OK");
      },
    });
  };

  const addUser = async (values: FieldType) => {
	
		setLoading(true)
		await Http.post(Config.api.adduser, null, {
			params: {
				username: values.username,
				pass: values.password,
				user: adToken
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "บันทึกเรียบร้อย!",
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
				setLoading(false)
       
				await getData()
			})
	}

  const onFinishChange: FormProps<FieldType>["onFinish"] = async (values) => {
    Modal.destroyAll();
   await changePassword(values)
  };

  const changePassword = async (values: FieldType) => {
		setLoading(true)
		await Http.put(Config.api.change, null, {
			params: {
				username: adToken,
				pass: values.password,
			},
		})
			.then(res => {
				const check = res.data.message
				if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "เปลี่ยนรหัสเรียบร้อย!",
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
			.finally(() => {
				setLoading(false)
        // Modal.destroyAll()
			})
	}

  const changeModal = () => {
    modal.confirm({
      cancelText: "ยกเลิก",
      okText: "ตกลง",
      title: "เปลี่ยนรหัสผู้ใช้งาน!",
      content: (
        <Form
          name="normal_login"
          className="login-form"
         
          onFinish={onFinishChange}
   autoComplete="off"
        >
        
          <Form.Item
            className="mt-2"
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่านใหม่!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="รหัสผ่านใหม่"
              // size="large"
            />
          </Form.Item>
          <Form.Item className="flex justify-end !mb-0">
            <Button className="mr-2" onClick={() => Modal.destroyAll()}>
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit">
              เปลี่ยนรหัส
            </Button>
          </Form.Item>
        </Form>
      ),
      footer: <></>,
      okButtonProps: {
        htmlType: "submit",
      },
      async onOk() {
        console.log("OK");
      },
    });
  };

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div className="mb-2 flex flex-row justify-between">
        <div>
          <Search
            placeholder="ค้นหาชื่อผู้ใช้งาน"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Button
            className="ml-2"
            type="primary"
            icon={<UserAddOutlined />}
            disabled={adToken != "dew"}
            onClick={addModal}
          >
            เพิ่ม
          </Button>
          <Button
            className="ml-2"
      
            icon={<UndoOutlined />}
           
            onClick={changeModal}
          >
            เปลี่ยนรหัส
          </Button>
        </div>
        <label className=" font-extralight text-md">{`รายการ ${data.length}`}</label>
      </div>
      <Table
        key={"UserKey"}
        rowKey={"username"}
        columns={columns}
        dataSource={data}
        size={"small"}
        bordered={true}
        virtual
        tableLayout={"auto"}
        pagination={false}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
        scroll={{ y: 1300 }}
        loading={{
          spinning: loading,
          size: "large",
          tip: "กำลังโหลด...",
        }}
      />
      {/* <Spin spinning={loading} tip="กำลังโหลด..." fullscreen /> */}
      {contextHolder}
    </div>
  );
}
