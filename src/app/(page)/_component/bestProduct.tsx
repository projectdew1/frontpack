"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

const list = [
  {
    image: "https://kmspacking.com:5003/machine/M000127240223_173908.jpg",
    link: "/product/TTAwMDEyNw==",
    name: "เครื่องบรรจุแบบกะบะ รุ่น SK-160",
  },
  {
    image: "https://kmspacking.com:5003/machine/M000097240223_174518.png",
    link: "/product/TTAwMDA5Nw==",
    name: "เครื่องบรรจุผงแบบสกรูอัตโนมัติ รุ่น OMW-FL420",
  },
  {
    image: "https://kmspacking.com:5003/machine/M000142260223_154500.png",
    link: "/product/TTAwMDE0Mg==",
    name: "เครื่องตัดแอลซีลพร้อมอบฟิล์มหดอัตโนมัติ",
  },
  {
    image: "https://kmspacking.com:5003/machine/M000033240223_151103.png",
    link: "/product/TTAwMDAzMw==",
    name: "เครื่องบรรจุซองสำเร็จรูป รุ่น OMW-200",
  },
  {
    image: "https://kmspacking.com:5003/machine/M000022280223_154448.png",
    link: "/product/TTAwMDAyMg==",
    name: "เครื่องบรรจุแคปซูล รุ่น DTJ-V",
  },
  {
    image: "https://kmspacking.com:5003/machine/M000118280223_155447.png",
    link: "/product/TTAwMDExOA==",
    name: "เครื่องบลิสเตอร์แพค บรรจุแผงยา รุ่น DPB-80",
  },
];

export default function BestProduct() {
  return (
    <div className=" select-none bg-purple-50 py-8 ">
      <div className="flex justify-center">
        <div className=" max-w-screen-xl w-full">
          <h1 className="text-4xl font-extralight mb-8 text-center">
            {"Recommended Products"}
          </h1>
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
              {list.map((news: any, index: number) => (
                <SwiperSlide
                  key={index}
                  className="group cursor-pointer text-center bg-white rounded-xl  break-all shadow-lg"
                >
                <Link href={news.link}>
                  <div className="  relative h-[300px]  !w-full flex justify-center items-center ">
                    <div className="  absolute top-[50px] h-[200px] w-[200px]  bg-purple-50 rounded-full  " />
                    <Image
                      src={news.image}
                      alt={news.name + '| KMS'}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className=" object-contain " // just an example
                    />
                  </div>
                  <div className="p-4 px-8">
                    <p className=" font-light  h-[60px] line-clamp-2 text-2xl">
                      {news.name}
                    </p>
                    <div className="group-hover:border-kmsppad group-hover:text-kmsppad group-hover:bg-white border border-white my-8 w-full p-2 bg-kmsppad text-white rounded-full shadow-lg">
                      สนใจสินค้า
                    </div>
                  </div>
                </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
