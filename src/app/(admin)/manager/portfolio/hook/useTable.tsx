import type { MenuProps, TableColumnsType } from "antd";
import { Dropdown, Image } from "antd";
import React from "react";
import moment from "moment";
import momentz from "moment-timezone";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Config from "@/hook/setApi/Config";

type Props = {
  handleMenuClick: (e: any, record: any) => Promise<void>;
};

const useTable = ({ handleMenuClick }: Props) => {
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

  const columns: TableColumnsType<any> = [
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
      dataIndex: "portfolioId",
      key: "portfolioId",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: any) => text,
    },
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"เครื่อง"}</label>,
      dataIndex: "machineName",
      key: "machineName",
      sorter: (a: any, b: any) => {
        a = a.machineName || "";
        b = b.machineName || "";
        return a.localeCompare(b);
      },
      width: 80,
      // align: "center",
      ellipsis: true,
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

  return { columns } as const;
};

export default useTable;
