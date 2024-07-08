"use client";

import {
  DribbbleOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import {
  FaFacebookF,
  FaHeadphones,
  FaLine,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import Image from 'next/image'

const Footer = () => {
  return (
    <div className=" flex justify-center bg-kmsblack drop-shadow px-20">
      <div className=" max-w-screen-xl w-full"> 
      <div className="py-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 select-none text-gray-400  mr-8">
          <div className="flex flex-row items-center">

        <Image width={50} height={50} src={'/logokmsgray.png'} alt={"logo kms MACHINARY"}  priority />
          <label className="ml-2 text-xl font-normal text-white">
            KMS MACHINERY CO.,LTD
          </label>
          </div>
          <div className="my-8">
            <label>
            Copyright 2023 KMS MACHINERY 
            </label>
            <br />
            <label>
            All Rights Reserved
            </label>
          </div>
              <div className="flex gap-2 mt-2">
            <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
              <FaFacebookF  className="group-hover:text-white"/>
            </div>
            <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
              <FaLine className="group-hover:text-white"/>
            </div>
            <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
              <FaYoutube className="group-hover:text-white"/>
            </div>
            <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
              <FaTiktok className="group-hover:text-white"/>
            </div>
          </div>
        </div>
        {/* <div className="flex-1 select-none text-gray-400 ">
          <label className="text-sm font-normal flex items-center text-white">
            <FaHeadphones className="mr-2" />
            Call Center
          </label>
          <div className="px-2 py-[2px] mt-1 rounded-full w-[140px] flex  border-2 border-gray-500 cursor-pointer">
            <PhoneOutlined className="mr-1" />
            <label className="text-sm font-extralight">034-116655</label>
          </div>
          <div className="px-2 py-[2px] mt-1 rounded-full w-[140px] flex  border-2 border-gray-500 cursor-pointer">
            <PhoneOutlined className="mr-1" />
            <label className="text-sm font-extralight">095-456-5550</label>
          </div>
          <div className="px-2 py-[2px] mt-1 rounded-full w-[140px] flex  border-2 border-gray-500 cursor-pointer">
            <PhoneOutlined className="mr-1" />
            <label className="text-sm font-extralight">086-918-0060</label>
          </div>

          <label className="text-sm font-normal mt-2 text-white">
            <DribbbleOutlined className="mr-1" />
            Follow us
          </label>

         
        </div> */}
        <div className="flex-none w-48 select-none text-gray-400 ">
          {/* KMS MACHINERY CO.,LTD
           */}
           <div className="flex flex-col justify-between h-full">
           <label className="text-xl font-normal ">
            Link
            </label>
           <label className="text-sm font-normal text-white">
            หน้าหลัก
          </label>
          <label className="text-sm font-normal text-white">
           เกี่ยวกับ KMS
          </label>
           <label className="text-sm font-normal text-white">
           สนใจผลิตภัณฑ์
          </label>
          <label className="text-sm font-normal text-white">
           สมใจติดต่อ
          </label>
           </div>
        </div>
        <div className="flex-none w-48  select-none text-gray-400 ">
        <div className="flex flex-col  h-full">
        <label className="text-xl font-normal ">
            Contact us
            </label>
         <div className="text-white">
         <label className="text-sm font-extralight">No. 1/46 Moo 6,</label>
          <br />
          <label className="text-sm font-extralight">
            Petchkasem Road, Krathumbaen,
          </label>
          <br />
          <label className="text-sm font-extralight">
            Samut Sakhon 74310 Thailand
          </label>
         </div>
         <div className="mt-4">
         <label className="text-sm font-extralight">034-116655</label>
         <br />
         <label className="text-sm font-extralight">095-456-5550</label>
         <br />
         <label className="text-sm font-extralight">086-918-0060</label>
         </div>
           </div>
        </div>
      </div>

     
      {/* <div className=" text-center text-gray-400 select-none font-light text-xs">
        <div className="divide-y bg-gray-400 h-[0.5px]" />
        <div className="py-2 ">
          Copyright 2023 KMS MACHINERY | All Rights Reserved
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Footer;
