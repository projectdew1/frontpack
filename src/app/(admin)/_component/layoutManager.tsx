"use client";

import React, { useEffect, useState } from "react";
import {
  BulbOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Layout, Menu, MenuProps } from "antd";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import { useAppContext } from "../_context/wrapper";


const { Header, Sider, Content } = Layout;

export default function LayoutManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const { noRead, setnoRead } = useAppContext()
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);
  const [current, setCurrent] = useState("0");
  const [count, setCount] = useState(0);

  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <MailOutlined />,
      label: (
        <a className="flex">
          ผู้ติดต่อ
          <Badge
            count={noRead}
            size="small"
            className="flex justify-start"
          ></Badge>
        </a>
      ),
    },
    {
      key: "3",
      icon: <ProductOutlined />,
      label: "ผลิตภัณฑ์",
      children: [
        { key: "330", icon: <ProductOutlined />, label: "ประเภท" },
        { key: "331", icon: <ProductOutlined />, label: "หมวดหมู่" },
        { key: "332", icon: <ProductOutlined />, label: "สินค้า" },
      ],
    },

    {
      key: "4",
      icon: <FileTextOutlined />,
      label: "บทความ",
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: "ผู้ใช้งาน",
    },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: "ออกจากระบบ",
    },
  ];

  useEffect(() => {
    // first
    const getData = async () => {
      await Http.post(Config.api.contact)
        .then((res) => {
          const data = res.data.message;
          if (data === "success") {
            const noRead = res.data.items.noRead;
            setnoRead(noRead);
          }
        })
        .catch((e) => {});
    };

    return () => {
      getData();
      switchKeyorPath(false, pathname);
    };
  }, []);

  const switchKeyorPath = (key: boolean, keyPath: any) => {
    let path = "";
    let keyCurrunt = "0";
    switch (keyPath) {
      case "1":
      case "/manager":
        path = "/manager";
        keyCurrunt = "1";
        break;
      case "2":
      case "/manager/contact":
        path = "/manager/contact";
        keyCurrunt = "2";
        break;
      case "330":
      case "/manager/catogory":
        path = "/manager/catogory";
        keyCurrunt = "330";
        break;
      case "331":
      case "/manager/group":
        path = "/manager/group";
        keyCurrunt = "331";
        break;
      case "332":
      case "/manager/product":
        path = "/manager/product";
        keyCurrunt = "332";
        break;
      case "4":
      case "/manager/article":
        path = "/manager/article";
        keyCurrunt = "4";
        break;
      case "5":
      case "/manager/user":
        path = "/manager/user";
        keyCurrunt = "5";
        break;
      case "6":
      case "/manager/logout":
        path = "/manager/logout";
        keyCurrunt = "6";
        break;
    }
    if (key) {
      setCurrent(keyPath);
      if (keyPath != "6") {
        router.push(path);
      } else {
        deleteCookie(Config.master);
        router.push("/administrator");
      }
    } else {
      setCurrent(keyCurrunt);
    }
  };

  const onSelectMenu: MenuProps["onClick"] = async (e) => {
    switchKeyorPath(true, e.key);
  };

  const titleChange = () => {
    switch (current) {

      case "1":
        return "Dashboard";
      case "2":
        return "ผู้ติดต่อ";
      case "4":
        return "บทความ";
      case "5":
        return "ผู้ใช้งาน";
      case "330":
        return "ประเภท";
      case "331":
        return "หมวดหมู่";
      case "332":
        return "สินค้า";

      default:
        return "";
    }
  };

  return (
    <Layout className="!min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={mode ? "light" : "dark"}
      >
        <div className="h-10 m-2 rounded-xl">
          <h1
            className={cn(
              "text-2xl font-extralight flex justify-center items-center",
              !mode && "text-white"
            )}
          >
            KMS
          </h1>
        </div>
        <Menu
          theme={mode ? "light" : "dark"}
          mode="inline"
          selectedKeys={[current]}
          onClick={onSelectMenu}
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="!bg-white !p-0 flex justify-between">
          <div>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            />
          <label className=" text-2xl font-extralight">{titleChange()}</label>
            </div>
          <Button
            type="text"
            icon={mode ? <MoonOutlined /> : <BulbOutlined />}
            onClick={() => setMode(!mode)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content className=" m-2 p-2 rounded-xl  bg-white shadow-xl">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
