"use client";

import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import { Modal, Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import {convert } from "html-to-text"

import momentz from "moment-timezone";
import 'moment/locale/th';
import Link from "next/link";

export default function NewsPage() {
  const [modal, contextHolder] = Modal.useModal();
  
const [data, setData] = useState([])
const [loading, setLoading] = useState(false);

useEffect(() => {
  

  return () => {
    getData()
  }
}, [])


const getData = async ()  => {
  setLoading(true);
    await Http.post(Config.api.getNews, null, {
      params: {
        pageNumber:1,
        pageSize:3,
      },
    })
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          setData(items);
        }
      })
      .catch((e) => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
}


  return data.length > 0 ? (
    <div className="  w-full select-none  mb-8">
      <div className="lg:px-10 px-none py-10 sm:py-20 flex justify-center">
        <div className=" max-w-screen-xl">
          <h1 className="text-4xl font-extralight mb-8 text-center">{"News and Articles"}</h1>
          <div className="flex lg:flex-row flex-wrap gap-10 justify-center items-center ">
            {data.map((news: any, index: number) => (
              <Link
              href={`/blog/${news.id}`}
                key={index}
                className="w-[350px] h-[540px] group relative cursor-pointer "
              >
                <div className=" relative h-[250px]">
                  <Image
                    src={Config.ImageHosting + news.localImage}
                    alt={news.title}
                    fill
                    priority
                       placeholder="blur"
                   blurDataURL="/no-image.png"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-cover rounded-xl select-none" // just an example
                  />
                </div>
                <div className=" absolute top-[180px] right-0 rounded-2xl shadow-lg p-[3px] h-[350px] w-11/12   group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500">
                <div className="flex flex-col justify-between h-full w-full px-8 py-4 rounded-2xl bg-white ">  
                  <article>
                    <h4 className="mt-2  font-extralight">{news.typeNews}</h4>
                    <h4 className=" mb-4 text-sm  font-extralight">{momentz.utc(news.createDate).locale('th').tz("Asia/Bangkok").add(543,'y').format("DD MMM YYYY")}</h4>
                    <p className=" font-light text-2xl line-clamp-2">
                      {news.title}
                    </p>
                    <p className="  font-extralight mt-4 line-clamp-4">
                      {convert(news.content)}
                    </p>
                  </article>
                  <div className="flex justify-end cursor-pointer">
                  <label className="cursor-pointer p-2 border group-hover:border-kmsppad group-hover:bg-white group-hover:text-kmsppad border-white bg-kmsppad text-white rounded-3xl text-center w-[100px]">อ่านต่อ</label>
                </div>
                </div>
                </div>
              </Link>
            ))}
          </div>
          <Link key={`blog`} href={`/blog`} className="flex flex-row justify-end cursor-pointer">
            <div className="text-md font-extralight p-2 px-4 text-center rounded-lg border border-kmsppad text-kmsppad ">
              {"อ่านทั้งหมด"}
            </div>{" "}
          </Link>
        </div>
      </div>
      <Spin spinning={loading} fullscreen />
      {contextHolder}
    </div>
  ) : null;
}
