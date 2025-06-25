"use client";

import { Modal, Spin } from "antd";
import React, { useState } from "react";

const PortCategory = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const mock = [10, 10, 10, 10, 10, 10, 10];

  return (
    <div className="  w-full select-none  mb-8">
      <div className="lg:px-10 px-none flex justify-center">
        <div className=" max-w-screen-xl">
          <div className="flex lg:flex-row flex-wrap gap-10 justify-center items-center w-full">
            {mock.map((r) => {
              return (
                <div className="w-[320px] h-[540px] bg-red-400">{"asd"}</div>
              );
            })}
          </div>
        </div>
      </div>
      <Spin spinning={loading} fullscreen />
      {contextHolder}
    </div>
  );
};

export default PortCategory;
