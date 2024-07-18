"use client";

import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import { Modal, Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import {convert } from "html-to-text"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import momentz from "moment-timezone";
import 'moment/locale/th';
import { FaFacebookF } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

import axios from "axios";




export default async function NewsDetail({
  rows,
}: {
  rows:any ;
}) {




  return  (
    <div className="  w-full select-none  mb-8">
      <div className="lg:px-10 px-none flex justify-center">
        <div className=" max-w-screen-xl w-full">
          {/* <h1 className="text-4xl font-extralight mb-8 text-center">{"News and Articles"}</h1> */}
          {/* <div className="flex lg:flex-row flex-wrap gap-10 justify-center items-center ">
            
          </div> */}
    <Swiper
          watchSlidesProgress={true}
          slidesPerView={1}
          spaceBetween={0}
       
          
        >

        </Swiper>
         <div className=" relative h-[450px] !w-full mb-8">
                  <Image
                  loading="lazy"
                    src={Config.ImageHosting + rows.localImage}
                    alt={rows.title}
                    fill
                    // priority
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-cover shadow-lg rounded-xl select-none" // just an example
                  />
                </div>
                <h1 className="text-xl font-extralight  ">{rows.typeNews}</h1> 
                <h1 className="text-4xl font-extralight mb-4 ">{rows.title}</h1> 
                <h1 className="text-md font-extralight mb-4 ">{momentz.utc(rows.createDate).locale('th').tz("Asia/Bangkok").add(543,'y').format("DD MMM YYYY")}</h1> 
                <div className="flex gap-2">
                <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
              <FaFacebookF  className="group-hover:text-white"/>
            </div>
            <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
              <FaShareNodes  className="group-hover:text-white"/>
            </div>
                </div>
                <div className="mt-4" dangerouslySetInnerHTML={{ __html: rows.content }} />
               {/* <div>{items.content}</div> */}
        </div>
      </div>
      {/* <Spin spinning={loading} fullscreen />
      {contextHolder} */}
    </div>
  ) ;
}
