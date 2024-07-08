"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Spin, message, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Config from "@/hook/setApi/Config";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { setToken } from "../_actions/token";
import { setCookie } from 'cookies-next';



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';



export default function Administrator() {
    const router = useRouter();
  const [spinning, setSpinning] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();


 const noti = (type: NotificationType, des:String , title: String) => {
    api[type]({
      message: title != '' ? title : 'แจ้งเตือน!',
      description:
        des,
    });
    //     noti('error','message','')
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  
    await Login(values);

  };
  
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    noti('error','กรอกไม่ครบนะจ๊ะ เจ๊แหม่ม !','')
  };

  const Login = async (values: FieldType) => {
    
    setSpinning(true)
    const params = {
        username: values.username,
        password: values.password,
    }
    await axios.post(Config.api.login, params, {
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    })
        .then( async (res:any) => {
         
          setCookie(Config.master,res.data.token)
            router.push("/manager/")
        })
        .catch(e => {
            if (e.response) {
                if (e.response.status === 401) {
                     noti('error',`กรุณาลงชื่อเข้าสู่ระบบใหม่ !`,'')
                }
            } else {
                noti('error',`${e.response}`,'เกิดความผิดพลาดที่ Server')
            }
        })
        .finally(() => {
            setSpinning(false)
        })
}

  return (
    <div className=" min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
        {contextHolder}
      <div className="p-8 border rounded-xl w-[25rem] shadow-xl bg-white">
        <h1 className="text-3xl font-extralight mb-4">ลงชื่อผู้ใช้งาน</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "กรุณากรอกผู้ใช้งาน!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="ผู้ใช้งาน"
              size="large"
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
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button mt-5"
              block
              shape="round"
              size="large"
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Spin spinning={spinning} fullscreen />
    </div>
  );
}
