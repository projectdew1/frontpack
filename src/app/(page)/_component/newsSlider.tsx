"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import Http from "@/hook/setApi/Http";
import Config from "@/hook/setApi/Config";

import {convert } from "html-to-text"
import Link from "next/link";

const NewsSlider = () => {
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
          pageSize:10,
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
    <div className=" bg-kmsstone py-8 ">
      <div className="flex flex-row border-y border-white">
        <div className="h-[500px] flex-none w-[500px] border-r border-white p-8 max-lg:hidden">
          <h1 className="text-7xl font-extralight text-white">
            Our Latest Update
          </h1>
          <h2 className="text-xl font-extralight text-white mt-4">
            ก้าวทันทุกข่าวสารความเคลื่อนไหวของ KMS
          </h2>
        </div>
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={1}
          spaceBetween={0}
          // width={400}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1248: {
              slidesPerView: 3,
            },
          }}
          className="!h-[500px] !w-full bg-kmsstone flex-auto"
        >
          {data.map((news: any,index:number) => (
            <SwiperSlide key={index} className="group border-r border-white break-all p-8 cursor-pointer">
              <Link key={`blog${index}`} href={`/blog/${news.id}`} className="!h-full !w-full flex flex-col ">
                <div className=" relative h-[30vh] !w-full flex justify-center items-center ">
                  <Image
                   src={Config.ImageHosting + news.localImage}
                   alt={news.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-cover rounded-xl shadow-lg  transition duration-300 group-hover:scale-110 " // just an example
                  />
                  <div className="absolute rounded-full w-24 h-24 bg-kmspurple text-center flex justify-center items-center text-white opacity-0 font-extralight transition duration-300 group-hover:opacity-100">
                    ดูเนื้อหา
                  </div>
                </div>
                <article className="!w-full">
                  <h4 className="mt-2 text-white font-extralight">{news.typeNews}</h4>
                  <p className="text-white font-light text-2xl line-clamp-2">
                   {news.title}
                  </p>
                  <p className="text-white  font-extralight mt-4 line-clamp-2 h-[100px]">
                  {convert(news.content)}
                  </p>
                
                  <p className="text-white  font-extralight mt-4 text-right">
                    อ่านต่อ...
                  </p>
                </article>
              </Link>
            </SwiperSlide>
          ))}

          <SwiperSlide className="p-8">
            <Link key={`blog`} href={`/blog`} className="group  cursor-pointer ">
              <div className=" bg-gray-500 h-full w-full flex flex-col justify-center items-center">
                <div className="w-[100px] h-[100px] border border-white rounded-full group-hover:border-none group-hover:bg-kmspurple flex justify-center items-center">
                  <ArrowRightOutlined
                    style={{ color: "white", fontSize: "150%" }}
                  />{" "}
                </div>
                <label className="mt-2 text-white">ดูข่าวสารทั้งหมด</label>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
      <Spin spinning={loading} fullscreen />
      {contextHolder}
    </div>
  ) : null;
};

export default NewsSlider;
