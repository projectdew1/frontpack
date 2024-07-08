"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Autoplay, Pagination, Navigation }from 'swiper/modules';

export default function BestProduct() {
  return (
    <div className=" select-none bg-purple-50 py-8 ">
      <div className="flex justify-center">
        <div className=" max-w-screen-xl w-full">
        <h1 className="text-4xl font-extralight mb-8 text-center">{"Recommended Products"}</h1>
          {/* <div className="bg-red-500 h-10 w-full"></div> */}
          <div className="flex flex-row ">
        {/* <div className="h-[500px] flex-none w-[450px] bg-kmsstone rounded-xl border-r border-white p-8 max-lg:hidden">
          <h1 className="text-7xl font-extralight text-white">
            Our Latest Update
          </h1>
          <h2 className="text-xl font-extralight text-white mt-4">
            ก้าวทันทุกข่าวสารความเคลื่อนไหวของ KMS
          </h2>
        </div> */}

        <Swiper
          watchSlidesProgress={true}
          slidesPerView={1}
          spaceBetween={40}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          // width={400}
          breakpoints={{
            580: {
              slidesPerView: 2,
            },
            1248: {
              slidesPerView: 3,
            },
          }}
          className=" !w-full  rounded-xl flex-auto "
        >
          {[1, 2, 3, 4, 5, 6].map((news: any,index:number) => (
            <SwiperSlide key={news} className="group cursor-pointer text-center bg-white rounded-xl  break-all shadow-lg">

              <div className="  relative h-[300px]  !w-full flex justify-center items-center ">
              <div className="  absolute top-[50px] h-[200px] w-[200px]  bg-purple-50 rounded-full  "/>
                  <Image
                    src={ news != 1 ? "https://kmspacking.com:5003/machine/M000053220223_160937.png": "https://kmspacking.com:5003/machine/M000068220223_164723.png"}
                    alt="Picture of the factory kms"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-contain " // just an example
                  />
                
                </div>
                <div className="p-4 px-8">
                  <p className=" font-light  h-[60px] line-clamp-2 text-2xl">{ news != 1 ? 'เครื่องซีลสุญญากาศแบบตั้งพื้น รุ่น DZ-600/2H' : 'asd'}</p>
                   <div className="group-hover:border-kmsppad group-hover:text-kmsppad group-hover:bg-white border border-white my-8 w-full p-2 bg-kmsppad text-white rounded-full shadow-lg">
                    สนใจสินค้า
                   </div>
                </div>
                    
            </SwiperSlide>
            // <SwiperSlide key={index} className="group border-r border-white break-all p-8 cursor-pointer">
            //   <a className="!h-full !w-full flex flex-col ">
            //     <div className=" relative h-[30vh] !w-full flex justify-center items-center ">
            //       <Image
            //         src={"/about_factory.png"}
            //         alt="Picture of the factory kms"
            //         fill
            //         priority
            //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            //         className=" object-cover rounded-xl shadow-lg  transition duration-300 group-hover:scale-110 " // just an example
            //       />
            //       <div className="absolute rounded-full w-24 h-24 bg-kmspurple text-center flex justify-center items-center text-white opacity-0 font-extralight transition duration-300 group-hover:opacity-100">
            //         ดูเนื้อหา
            //       </div>
            //     </div>
            //     <article className="!w-full">
            //       <h4 className="mt-2 text-white font-extralight">ข่าวสาร</h4>
            //       <p className="text-white font-light text-2xl line-clamp-2">
            //         simply dummy text of the printing and typesetting industry.
            //         Lorem Ipsum has been the industry's standard dummy text ever
            //         since the 1500s, when an unknown printer took a galley of
            //         type and scrambled it to make a type specimen book
            //       </p>
            //       <p className="text-white  font-extralight mt-4 line-clamp-2">
            //         simply dummy text of the printing and typesetting industry.
            //         Lorem Ipsum has been the industry's standard dummy text ever
            //         since the 1500s, when an unknown printer took a galley of
            //         type and scrambled it to make a type specimen book
            //       </p>

                 
            //     </article>
            //   </a>
            // </SwiperSlide>
          ))}

          {/* <SwiperSlide className="p-8">
            <a className="group  cursor-pointer ">
              <div className=" bg-gray-500 h-full w-full flex flex-col justify-center items-center">
                <div className="w-[100px] h-[100px] border border-white rounded-full group-hover:border-none group-hover:bg-kmspurple flex justify-center items-center">
                  <ArrowRightOutlined
                    style={{ color: "white", fontSize: "150%" }}
                  />{" "}
                </div>
                <label className="mt-2 text-white">ดูข่าวสารทั้งหมด</label>
              </div>
            </a>
          </SwiperSlide> */}
        </Swiper>
      </div>
        </div>
      </div>
    </div>
  );
}
