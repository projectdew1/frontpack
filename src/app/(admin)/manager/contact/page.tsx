"use client";

import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import { Badge, Button, Dropdown, Modal, Switch, Table, Tabs, Tag } from "antd";
import type { MenuProps, TableColumnsType, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../../_context/wrapper";

import moment from "moment";
import momentz from "moment-timezone";
import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";

type ContactList = {
  contactId:     number;
  contactName:   string;
  contactTitle:  string;
  contactDetail: string;
  contactMail:   string;
  contactTel:    string;
  status:        number;
  createDate:    Date;
  statusname:    string;
};

export default function Contact() {
  const { noRead, setnoRead } = useAppContext();
  const [modal, contextHolder] = Modal.useModal();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    all: [],
    read: [],
    noread: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selector, setSelector] = useState<ContactList>();
  const [checked, setChecked] = useState(false)

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
      title: () => <label style={{ fontWeight: "bold" }}>{"ผู้ติดต่อ"}</label>,
      dataIndex: "contactName",
      key: "contactName",
      sorter: (a: any, b: any) => a.contactName.localeCompare(b.contactName),
      width: 100,
      // align: "center",
      // ellipsis: true,
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"เบอร์โทร"}</label>,
      dataIndex: "contactTel",
      key: "contactTel",
      sorter: (a: any, b: any) => a.contactTel.localeCompare(b.contactTel),
      width: 100,
      // align: "center",
      // ellipsis: true,
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"อีเมลล์"}</label>,
      dataIndex: "contactMail",
      key: "contactMail",
      sorter: (a: any, b: any) => a.contactMail.localeCompare(b.contactMail),
      width: 100,
      // align: "center",
      // ellipsis: true,
    },

    {
      title: () => <label style={{ fontWeight: "bold" }}>{"สถานะ"}</label>,
      dataIndex: "statusname",
      key: "statusname",
      sorter: (a: any, b: any) => a.statusname.localeCompare(b.statusname),
      width: 80,
      render: (text: any, record: any, index: any) => {
        return (
          <Tag color={record.status == 0 ? "volcano" : ""} key={index}>
            {text}
          </Tag>
        );
      },
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

  useEffect(() => {
    getData();
  }, []);

  const itemsDropdown = (row: any): MenuProps["items"] => {
    return [
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
        disabled: row.status === 0,
      },
    ];
  };

  const handleMenuClick = (e: any, record: any) => {
    switch (e.key) {
      case "1":
        setChecked(record.status == 1)
        setSelector(record);
        showModal();
        break;
      case "3":
        modal.confirm({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "ต้องการลบใช่หรือไม่!",
          content: `ลบผู้ติดต่อ ${record.contactName} !`,
          okType: "danger",
          async onOk() {
            await deleteContact(record.contactId);
          },
        });
        break;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateRead = async (change:any) => {
   
    setLoading(true);
    await Http.put(Config.api.updatecontact, null, {
      params: {
        id: selector?.contactId,
        status: change ? 1 : 0,
      },
    })
      .then((res) => {
        const check = res.data.message;
       
        if (check === "success") {
            setChecked(change)
        }
      })
      .catch((e) => {})
      .finally(async () => {
        setLoading(false);
        await getData();
      });
  };

  const deleteContact = async (id: any) => {
    setLoading(true);
    await Http.delete(Config.api.deletecontact, {
      params: {
        id,
      },
    })
      .then((res) => {
        const check = res.data.message;
        if (check === "success") {
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
      });
  };

  const getData = async () => {
    setLoading(true);
    await Http.post(Config.api.contact)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const noRead = res.data.items.noRead;
          setnoRead(noRead);
          setData({
            all: res.data.items.data,
            read: res.data.items.dataRead,
            noread: res.data.items.datanoRead,
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
        setLoading(false);
      });
  };

  const childrenTab = (dataItems: any) => {
    return (
      <Table
        key={"contactKey"}
        rowKey={"contactId"}
        columns={columns}
        dataSource={dataItems}
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
        // scroll={{ y: 1300 }}
        loading={{
          spinning: loading,
          size: "large",
          tip: "กำลังโหลด...",
        }}
      />
    );
  };

  const itemsTable: TabsProps["items"] = [
    {
      key: "1",
      label: "ทั้งหมด",
      children: <>{childrenTab(data.all)}</>,
    },
    {
      key: "2",
      label: (
        <div className="flex">
          ยังไม่อ่าน
          <Badge
            count={noRead}
            size="small"
            className="flex justify-start"
          ></Badge>
        </div>
      ),
      children: <>{childrenTab(data.noread)}</>,
    },
    {
      key: "3",
      label: "อ่านแล้ว",
      children: <>{childrenTab(data.read)}</>,
    },
  ];

  return (
    <div className="h-full w-full">
      <Tabs defaultActiveKey="1" items={itemsTable} />
      <Modal
        title="รายละเอียดผู้ติดต่อ"
        footer={(
          
          <div className="flex justify-between items-center">
          <Switch className={checked ? " !bg-green-500" : ''} onChange={updateRead} checked={checked} checkedChildren="อ่านแล้ว" unCheckedChildren="ยังไม่อ่าน"  />
          <Button key="back" onClick={handleCancel}>
            ปิด
          </Button>
          </div>
        )}
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <p className=" font-bold">{`ชื่อผู้ติดต่อ :`} <label className=" font-light">{`${selector?.contactName ?? ''}`}</label></p>
          <p className=" font-bold">{`วันที่แจ้งข้อมูล :`} <label className=" font-light">{`${selector?.createDate ? momentz.utc(selector?.createDate).tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm") : ''}`}</label></p>
          <p className=" font-bold">{`เบอร์โทร :`} <label className=" font-light">{`${selector?.contactTel ?? ''}`}</label></p>
          <p className=" font-bold">{`อีเมลล์ :`} <label className=" font-light">{`${selector?.contactMail ?? ''}`}</label></p>
        <p className=" font-bold">{`เรื่องที่แจ้ง :`} <label className=" font-light">{`${selector?.contactTitle ?? ''}`}</label></p>
        <p className=" font-bold">{`รายละเอียด :`} <label className=" font-light">{`${selector?.contactDetail ?? ''}`}</label></p>
      </Modal>
      {contextHolder}
    </div>
  );
}
