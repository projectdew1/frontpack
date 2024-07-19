"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table } from "antd";
import type { FormProps, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../_context/wrapper";
import Http from "@/hook/setApi/Http";
import Config from "@/hook/setApi/Config";

type FieldType = {
    techName?: string;
};

export default function StateTech() {
  const { Search } = Input;
  const [form] = Form.useForm();
  const { isModalTech, setIsModalTech } = useAppContext();

  const [modal, contextHolder] = Modal.useModal();

  const [isOpen, setisOpen] = useState(false)
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowId, setRowId] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  const columns: TableColumnsType<any> = [
    {
      title: () => <label style={{ fontWeight: "bold" }}>{"ลำดับ"}</label>,
      dataIndex: "technicallyId",
      key: "technicallyId",
      width: 50,
      align: "center",
      sorter: (a: any, b: any) => {
        a = a.technicallyId || "";
        b = b.technicallyId || "";
        return a.localeCompare(b);
      },
      render: (text: any, record: any, index: any) => text,
    },
    {
      title: () => (
        <label style={{ fontWeight: "bold" }}>{"คุณสมบัติทางเทคนิค"}</label>
      ),
      dataIndex: "technicallyName",
      key: "technicallyName",
      sorter: (a: any, b: any) => {
        a = a.technicallyName || "";
        b = b.technicallyName || "";
        return a.localeCompare(b);
      },
      width: 100,
      ellipsis: true,
    },

    {
      title: "",
      dataIndex: "menu",
      key: "menu",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: any) => (
        <div>
          <Button
          onClick={() => editForm(record)}
          >
            แก้ไข
          </Button>
          <Button
            danger
            className="ml-2"
            onClick={() => deleteModal(record)}
          >
            ลบ
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  const getData = async () => {
    setLoading(true);
    await Http.post(Config.api.technical)
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

  const handleCancel = () => {
    form.resetFields();
    setIsModalTech(false);
    setisOpen(false)
    getData()
  };

  const onSearch = (value: string) => {
    const filter = dataFilter.filter(
      (row: any) => row.technicallyName.indexOf(value) > -1
    );
    setData(filter);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (isAdd) {
      await addTechnical(values);
    } else {
      await editTechnical(values);
    }
  };

  const addTechnical = async ({ techName }:FieldType) => {
    setLoading(true)
    await Http.post(Config.api.addtechnical, null, {
        params: {
            name:techName,
        },
    })
        .then(res => {
            const check = res.data.message
            if (check === "success") {
                modal.success({
                    cancelText: "ยกเลิก",
                    okText: "ตกลง",
                    title: "บันทึกข้อมูลเรียบร้อย!",
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
            closeForm()
            getData()
            setLoading(false)
        })
}

const editTechnical = async ({ techName }:FieldType) => {
    setLoading(true)
    await Http.put(Config.api.updatetechnical, null, {
        params: {
            id: rowId,
            name:techName,
        },
    })
        .then(res => {
            const check = res.data.message
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
        .catch(e => {
            modal.error({
                cancelText: "ยกเลิก",
                okText: "ตกลง",
                title: "แจ้งเตือนจาก server!",
                content: e.response,
              });
        })
        .finally(async () => {
            // onResetTech()
            // reloadTech()
            // setIsAdd(false)
            // setLoading(false)
            closeForm()
            getData()
            setLoading(false)
        })
}

const deleteTechnical = async (id:any) => {
    setLoading(true)
    await Http.delete(Config.api.deletetechnical, {
        params: {
            id,
        },
    })
        .then(res => {
            // console.log(res)
            const data = res.data.message
            if (data === "success") {
                modal.success({
                    cancelText: "ยกเลิก",
                    okText: "ตกลง",
                    title: "บันทึกข้อมูลเรียบร้อย!",
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
        .finally(() => {
            getData()
            setLoading(false)
        })
}

  const closeForm = () => {
    setisOpen(false)
    form.resetFields();
  }

  const openForm = () => {
    setisOpen(true)
    form.resetFields();
  }

  const addForm = () => {
    setIsAdd(true)
    openForm()
  }

  const editForm = async (record:any) => {
    form.setFieldsValue({
        techName: record.technicallyName,
    })
    setRowId(record.technicallyId)
    setIsAdd(false)
    setisOpen(true)
  }


  const deleteModal = (record:any) => {
    closeForm()
    modal.confirm({
        cancelText: "ยกเลิก",
        okText: "ตกลง",
        title: "ต้องการลบใช่หรือไม่!",
        content: (
          <>
            <p>{`ลบคุณสมบัติทางเทคนิค  ${record.technicallyName}  !`}</p>
            <p>{`รหัส:${record.technicallyId}`}</p>
          </>
        ),
        okType: "danger",
        async onOk() {
          await deleteTechnical(record.technicallyId);
        },
      });
  }
  

  


  return (
    <>
      {" "}
      <Modal
        title={"คุณสมบัติทางเทคนิค"}
        maskClosable={false}
        open={isModalTech}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div className="h-full w-full">
          <div className="mb-2 flex flex-row justify-between">
            <div>
              <Search
                placeholder="ค้นหาชื่อคุณสมบัติทางเทคนิค"
                allowClear
                onSearch={onSearch}
                style={{ width: 300 }}
              />
              <Button
                className="ml-2"
                type="primary"
                icon={<PlusOutlined />}
                  onClick={addForm}
              >
                เพิ่ม
              </Button>
            </div>
            <label className=" font-extralight text-md">{`รายการ ${data.length}`}</label>
          </div>
         { isOpen ? <div className="border-dashed border-2 rounded-md border-sky-500 p-2 mb-2">
            <Form
              //   {...layout}
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="techName"
                label="คุณสมบัติทางเทคนิค"
                rules={[
                  { required: true, message: "กรุณากรอกคุณสมบัติทางเทคนิค!" },
                ]}
              >
                <Input placeholder="กรุณากรอกคุณสมบัติทางเทคนิค"  />
              </Form.Item>
              <Button onClick={closeForm}>ยกเลิก</Button>
              <Button className="ml-2" type="primary" htmlType="submit">
                {isAdd ?'เพิ่มข้อมุล': 'แก้ไขข้อมูล'}
              </Button>
            </Form>
          </div> : null}

          <Table
            rowKey={"technicallyId"}
            loading={{
              spinning: loading,
              size: "large",
              tip: "กำลังโหลด...",
            }}
            dataSource={data}
            columns={columns}
            tableLayout={"auto"}
            size={"small"}
            bordered={true}
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: ["10", "25", "50", "100"],
              showSizeChanger: true,
              locale: { items_per_page: "/ หน้า" },
            }}
            locale={{ emptyText: "ไม่มีข้อมูล" }}
          />
        </div>
      </Modal>
      {contextHolder}
    </>
  );
}
