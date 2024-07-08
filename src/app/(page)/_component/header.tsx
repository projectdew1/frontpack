"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConfigProvider, Drawer, Menu, Popover } from "antd";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hook/use_scroll_top";
import axios from "axios";
import Config from "@/hook/setApi/Config";
import { NavData } from "@/app/_model/NavData";
import { HeaderPage } from "@/app/_model/HeaderPage";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MenuOutlined } from "@ant-design/icons";

import type { MenuProps } from "antd";
import { kanit } from "@/app/font";

type MenuItem = Required<MenuProps>["items"][number];

const navData: NavData[] = [
  { id: 1, name: "ผลิตภัณฑ์", link: "/shop" },
  { id: 2, name: "เกี่ยวกับ KMS", link: "/about" },
  // { id: 3, name: "วิธีสั่งซื้อและชำระเงิน", link: "/payment" },
  // { id: 4, name: "บทความ", link: "/article" },
  { id: 5, name: "ติดต่อเรา", link: "/contact" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const scrolled = useScrollTop();
  const [data, setData] = useState<HeaderPage[]>([]);
  const [hold, setHold] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const hearderShop = async () => {
      setData([]);
      await axios
        .get(Config.api.pageHeader)
        .then((res) => {
          const items = res.data.items;
          setData(items);
        })
        .catch((e) => console.log(e));
    };
    hearderShop();
  }, []);

  const content = (
    <div className="flex flex-col flex-wrap justify-start h-60 ">
      {data.map((x, i) => (
        <Link
          key={`content${i}`}
          href={`/category/${x.enID}`}
          className="w-50 text-gray-400 rounded-sm p-1 text-xs text-start text-ellipsis overflow-hidden hover:bg-kmsorange hover:text-white"
        >
          <h1 className="!font-kanit">{x.name}</h1>
        </Link>
      ))}
    </div>
  );

  const items = () => {
    let listitems:MenuItem[] = [];
    let children:MenuItem[] = [];
    {data.map((x, i) => (
      children.push({ key: `children${i}`, label: <Link href={`/category/${x.enID}`}>{x.name}</Link> })
    ))}
    listitems.push({ key: "1", label: <Link href={"/"}>{"หน้าหลัก"}</Link> })
    listitems.push({ key: "2", label: <Link href={"/about"}>{"เกี่ยวกับ KMS"}</Link> })
    listitems.push({ key: "3", label: <Link href={"/contact"}>{"ติดต่อเรา"}</Link> })
    listitems.push({ key: "4", label: "ผลิตภัณฑ์", children: children})
    return listitems;
  }
  

  const onClick = () => {
    setOpen(false);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: kanit.style.fontFamily,
        },
      }}
    >
      <div
        className={cn(
          "z-50 fixed top-0 min-w-full py-5 px-4 md:px-20 flex justify-between select-none",
          scrolled && "border-b shadow-sm bg-white"
        )}
      >
        <Link href={"/"} className=" flex items-center self-center ">
          <Image
            className="cursor-pointer hidden md:block "
            src={"/logo.png"}
            alt={"logo kms MACHINARY"}
            width={70}
            height={70}
          />
          <Image
            className="cursor-pointer md:hidden "
            src={"/logo.png"}
            alt={"logo kms MACHINARY"}
            width={40}
            height={40}
          />
          <h2 className="cursor-pointer ml-4 font-normal   xl:text-2xl  hidden md:block ">
            {" "}
            {"บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด"}
          </h2>
        </Link>
        <div
          className="justify-end self-center items-center cursor-pointer lg:hidden"
          onClick={() => setOpen(true)}
        >
          <MenuOutlined className="text-xl" />
        </div>
        <div className="justify-end self-center items-center hidden lg:block">
          <div className="flex justify-end self-center items-center ">
            {navData.map((row: NavData, index: number) => {
              if (row.id == 1) {
                return (
                  <div key={`body${index}`}>
                    <Popover
                      key={index}
                      placement="bottom"
                      content={content}
                      className="cursor-pointer font-normal text-md px-4 !font-kanit"
                      onOpenChange={(visible: boolean) => setHold(visible)}
                    >
                      <Link
                        key={index}
                        className={cn(
                          "cursor-pointer flex items-center  hover:text-kmsppad",
                          (pathname.search(`${row.link}`) >= 0 ||
                            pathname.search("category") >= 0 ||
                            pathname.search("product") >= 0) &&
                            "text-kmsppad"
                        )}
                        href={row.link}
                      >
                        {row.name}
                        <MdKeyboardArrowDown
                          key={index}
                          className={cn(
                            "ml-1 transition duration-[400ms]",
                            hold && "-rotate-180"
                          )}
                        />
                      </Link>
                    </Popover>
                  </div>
                );
              } else if (row.id == 5) {
                return (
                  <div key={`body${index}`}>
                    <Link
                      key={index}
                      className="cursor-pointer font-normal text-md px-4 py-2 bg-kmsppad text-white rounded-md shadow-lg"
                      href={row.link}
                    >
                      {row.name}
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div key={`body${index}`}>
                    <Link
                      key={index}
                      className={cn(
                        "cursor-pointer font-normal text-md px-4 py-2  hover:text-kmsppad",
                        pathname.search(`${row.link}`) >= 0 && "text-kmsppad"
                      )}
                      href={row.link}
                    >
                      {row.name}
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <Drawer onClose={onClose} open={open}>
          <Menu
            style={{ border: "none" }}
            onClick={onClick}
            mode="inline"
            selectable={false}
            items={items()}
          />
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default Header;
