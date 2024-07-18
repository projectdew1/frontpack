"use client";

import { FaFacebookF, FaLine, FaTiktok, FaYoutube } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" flex justify-center bg-kmsblack drop-shadow px-20">
      <div className=" max-w-screen-xl w-full">
        <div className="py-10 flex flex-col md:flex-row gap-4">
          <div className="flex-1 select-none text-gray-400  mr-8">
            <div className="flex flex-row items-center">
              <Image
                width={50}
                height={50}
                src={"/logokmsgray.png"}
                alt={"logo kms MACHINARY"}
                priority
              />
              <label className="ml-2 text-xl font-normal text-white">
                KMS MACHINERY CO.,LTD
              </label>
            </div>
            <div className="my-8">
              <label>Copyright 2023 KMS MACHINERY</label>
              <br />
              <label>All Rights Reserved</label>
            </div>
            <div className="flex gap-2 mt-2">
              <a
                className="cursor-pointer"
                href="https://www.facebook.com/kmsmachinerythailand"
                target="_blank"
              >
                <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
                  <FaFacebookF className="group-hover:text-white" />
                </div>
              </a>
              <a
                className="cursor-pointer"
                href="https://page.line.me/?accountId=kmsmachinery"
                target="_blank"
              >
                <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
                  <FaLine className="group-hover:text-white" />
                </div>
              </a>
              <a
                className="cursor-pointer"
                href="https://www.youtube.com/@kmsmachinery4363"
                target="_blank"
              >
                <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
                  <FaYoutube className="group-hover:text-white" />
                </div>
              </a>
              <a
                className="cursor-pointer"
                href="https://www.tiktok.com/@kmsmachinery"
                target="_blank"
              >
                <div className="w-[30px] h-[30px] rounded-full border-2 group hover:bg-gray-500 border-gray-500 flex items-center justify-center cursor-pointer">
                  <FaTiktok className="group-hover:text-white" />
                </div>
              </a>
            </div>
          </div>

          <div className="flex-none w-48 select-none text-gray-400 ">
            <div className="flex flex-col justify-between h-full">
              <label className="text-xl font-normal ">Link</label>
              <Link key={`main`} href={`/`} className="cursor-pointer">
                <label className="text-sm font-normal text-white cursor-pointer">
                  หน้าหลัก
                </label>
              </Link>
              <Link key={`about`} href={`/about`} className="cursor-pointer">
                <label className="text-sm font-normal text-white cursor-pointer">
                  เกี่ยวกับ KMS
                </label>
              </Link>
              <Link key={`blog`} href={`/blog`} className="cursor-pointer">
                <label className="text-sm font-normal text-white cursor-pointer">
                  ข่าวและบทความ
                </label>
              </Link>
              <Link key={`shop`} href={`/shop`} className="cursor-pointer">
                <label className="text-sm font-normal text-white cursor-pointer">
                  สนใจผลิตภัณฑ์
                </label>
              </Link>
              <Link
                key={`contact`}
                href={`/contact`}
                className="cursor-pointer"
              >
                <label className="text-sm font-normal text-white cursor-pointer">
                  สมใจติดต่อ
                </label>
              </Link>
            </div>
          </div>
          <div className="flex-none w-48  select-none text-gray-400 ">
            <div className="flex flex-col  h-full">
              <label className="text-xl font-normal ">Contact us</label>
              <div className="text-white">
                <label className="text-sm font-extralight">
                  No. 1/46 Moo 6,
                </label>
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
                <a
                  className="cursor-pointer"
                  href="tel:034116655"
                  target="_blank"
                >
                  <label className="text-sm font-extralight cursor-pointer">
                    034-116655
                  </label>
                </a>
                <br />
                <a
                  className="cursor-pointer"
                  href="tel:0954565550"
                  target="_blank"
                >
                  <label className="text-sm font-extralight cursor-pointer">
                    095-456-5550
                  </label>
                </a>
                <br />
                <a
                  className="cursor-pointer"
                  href="tel:0869180060"
                  target="_blank"
                >
                  <label className="text-sm font-extralight cursor-pointer">
                    086-918-0060
                  </label>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
