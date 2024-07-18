"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Autoplay, Pagination, Navigation, FreeMode }from 'swiper/modules';


export default function Customer() {
    return (
        <div className=" select-none mb-[80px]  py-8">
        <div className="flex justify-center">
          <div className=" lg:max-w-screen-md max-w-screen-xl w-full">
          <h1 className="text-4xl font-extralight mb-8 text-center">{"Our Customer"}</h1>
                
            <div className="flex flex-row gap-4 justify-center flex-wrap ">
            
            {/* ))} */}
            {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13].map((news: any,index:number) => (
            <div className=" rounded-2xl shadow-md" key={index}>
            <div className="  relative h-[100px]  w-[100px] flex justify-center items-center ">
                    <Image
                      src={ `/customer${news}.png`}
                      alt="Picture of logo customer kms"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className=" object-contain p-2 " // just an example
                    />
        </div>
        </div>
        ))} 
          </div>
        </div>
      </div>
      </div>
    );
}