"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, Modal, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import useTable from "./hook/useTable";
import ModalProfolio from "./components/modalProfolio";
import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { dataURLtoFile } from "../../_actions/imageconvert";

const Portfolio = () => {
  const [form] = Form.useForm();
  const { Search } = Input;
  const [modal, contextHolder] = Modal.useModal();

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [rowId, setRowId] = useState("");
  const [optionMachine, setOptionMachine] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const showError = (
    message: string,
    title: string = "แจ้งเตือนจาก server!"
  ) => {
    modal.error({
      cancelText: "ยกเลิก",
      okText: "ตกลง",
      title: title,
      content: message,
    });
  };

  const loadingPage = (val: boolean) => {
    setLoading(val);
    setSpinning(val);
  };

  const multiImage = async (image: any) => {
    if (image.length > 0) {
      for (let index = 0; index < image.length; index++) {
        const row = image[index];
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
      }
    }
  };

  const findPort = async (id: string) => {
    loadingPage(true);
    await Http.post(Config.api.getPortById, null, {
      params: {
        id,
      },
    })
      .then(async (res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          // console.log("items", items);

          form.setFieldsValue({
            type: items.machineId,
            seo: items.seo,
            title: items.title,
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
              form.setFieldsValue({
                upload: [{ name: items.fileImage, originFileObj: fileData }],
              });
            });
          }
          await multiImage(items.imageList);
        }
      })
      .catch((e) => {
        showError(e.response || "เกิดข้อผิดพลาด");
      })
      .finally(() => {
        loadingPage(false);
      });
  };

  const addData = async (value: any) => {
    loadingPage(true);
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
    const upload = value.upload
      ? value.upload.length > 0
        ? value.upload[0].originFileObj
        : null
      : null;
    let data = new FormData();
    data.append("FormFile", upload);
    if (value.uploadmulti) {
      if (value.uploadmulti.length > 0) {
        value.uploadmulti.map((row: any) =>
          data.append("FormFileMulti", row.originFileObj)
        );
      }
    }
    await Http.post(Config.api.addPort, data, {
      params: {
        seo: value.seo,
        title: value.title,
        machineId: value.type,
        user: token,
      },
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        const check = res.data.message;
        if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "บันทึกข้อมูลเรียบร้อย!",
            onOk() {
              handleCancel();
            },
            onCancel() {
              handleCancel();
            },
          });
        } else {
          showError(check, "แจ้งเตือน!");
        }
      })
      .catch((e) => {
        showError(e.response || "เกิดข้อผิดพลาด");
      })
      .finally(() => {
        loadingPage(false);
      });
  };

  const updateData = async (value: any) => {
    loadingPage(true);
    const cookies = getCookie(Config.master);
    const token = cookies ? jwtDecode<any>(cookies).user : null;
    const upload = value.upload
      ? value.upload.length > 0
        ? value.upload[0].originFileObj
        : null
      : null;
    let data = new FormData();
    data.append("FormFile", upload);
    if (value.uploadmulti) {
      if (value.uploadmulti.length > 0) {
        value.uploadmulti.map((row: any) =>
          data.append("FormFileMulti", row.originFileObj)
        );
      }
    }
    await Http.post(Config.api.updatePort, data, {
      params: {
        seo: value.seo,
        title: value.title,
        machineId: value.type,
        user: token,
        id: rowId,
      },
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        const check = res.data.message;
        if (check === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "แก้ไขข้อมูลเรียบร้อย!",
            onOk() {
              handleCancel();
            },
            onCancel() {
              handleCancel();
            },
          });
        } else {
          showError(check, "แจ้งเตือน!");
        }
      })
      .catch((e) => {
        showError(e.response || "เกิดข้อผิดพลาด");
      })
      .finally(() => {
        loadingPage(false);
      });
  };

  const deleteData = async (id: any) => {
    loadingPage(true);
    await Http.delete(Config.api.deletePort, {
      params: {
        id,
      },
    })
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          modal.success({
            cancelText: "ยกเลิก",
            okText: "ตกลง",
            title: "ลบข้อมูลเรียบร้อย!",
          });
        } else {
          showError(data, "แจ้งเตือน!");
        }
      })
      .catch((e) => {
        showError(e.response || "เกิดข้อผิดพลาด");
      })
      .finally(async () => {
        await getData();
        loadingPage(false);
      });
  };

  const getData = async () => {
    loadingPage(true);
    await Http.post(Config.api.getPortAll)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          // console.log(items);

          setData(items);
          setDataFilter(items);
        }
      })
      .catch((e) => {
        showError(e.response || "เกิดข้อผิดพลาด");
      })
      .finally(() => {
        loadingPage(false);
      });
  };

  const getOptionMachine = async () => {
    loadingPage(true);
    setOptionMachine([]);
    await Http.post(Config.api.machine)
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          const optionItems = items.map((r: any) => {
            return { value: r.machineId, label: r.machineName };
          });
          setOptionMachine(optionItems);
        }
      })
      .catch((e) => {
        showError(e.response || "เกิดข้อผิดพลาด");
      })
      .finally(() => {
        loadingPage(false);
      });
  };

  const onSearch = (value: string) => {
    const filter = dataFilter.filter(
      (row: any) => row.title.indexOf(value) > -1
    );
    setData(filter);
  };

  const addModal = () => {
    getOptionMachine();
    setIsModalOpen(true);
    setIsEdit(false);
    setTitle("เพิ่มผลงาน");
  };

  const handleMenuClick = async (e: any, record: any) => {
    setIsEdit(true);
    switch (e.key) {
      case "0":
        getOptionMachine();
        setRowId(record.portfolioId);
        await findPort(record.portfolioId);
        setTitle(`แก้ไขบทความ ${record.portfolioId}`);

        setIsModalOpen(true);
        break;
      case "1":
        getOptionMachine();
        setRowId("");
        await findPort(record.portfolioId);
        setTitle(`มุมมองบทความ ${record.portfolioId}`);

        setIsModalOpen(true);
        break;
      case "3":
        modal.confirm({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "ต้องการลบใช่หรือไม่!",
          content: (
            <>
              <p>{`ลบผลงานนี้  ${record.title}  !`}</p>
              <p>{`รหัส:${record.portfolioId}`}</p>
            </>
          ),
          okType: "danger",
          async onOk() {
            await deleteData(record.portfolioId);
          },
        });
        break;
    }
  };

  const handleOk = () => {
    console.log("handleOk");
  };

  const handleCancel = () => {
    console.log("handleCancel");
    setIsModalOpen(false);
    form.resetFields();
    getData();
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    if (isEdit) {
      await updateData(values);
    } else {
      await addData(values);
    }
  };

  const { columns } = useTable({ handleMenuClick });

  return (
    <div className="h-full w-full">
      <div className="mb-2 flex flex-row justify-between">
        <div>
          <Search
            placeholder="ค้นหาหัวข้อผลงานของเรา"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Button
            className="ml-2"
            // type="primary"
            icon={<PlusOutlined />}
            onClick={addModal}
          >
            เพิ่ม
          </Button>
        </div>
        <label className=" font-extralight text-md">{`รายการ ${data.length}`}</label>
      </div>
      <Table
        rowKey={"portfolioId"}
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
      <ModalProfolio
        title={title}
        modal={modal}
        isOpen={isModalOpen}
        disable={isEdit && rowId == ""}
        form={form}
        options={optionMachine}
        onFinish={onFinish}
        handleCancel={handleCancel}
        handleOk={handleOk}
        loading={spinning}
      />
      <Spin className=" !z-[999px]" spinning={spinning} fullscreen />
      {contextHolder}
    </div>
  );
};

export default Portfolio;
