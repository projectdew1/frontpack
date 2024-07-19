import { HeaderPage } from "@/app/_model/HeaderPage";
import Config from "@/hook/setApi/Config";
import axios from "axios";
import DisplayShop from "../_component/displayShop";
import { Breadcrumb } from "antd";
import Link from "next/link";

async function getData() {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const { data } = await axios.get(Config.api.pageHeader, {
    httpsAgent: agent,
  });
  const row = data["items"].map((row: HeaderPage, index: number) => {
    return row.name;
  });
  return {
    posts: data["items"],
    seo: row.join(),
  };
}

export async function generateMetadata() {
  const {  seo } = await getData();
  return {
    title:  `${seo} ${Config.tailer}`,
    description: `${seo}`,
  }
}

export default async function Shop() {
  const { posts } = await getData();
  return (
    <div className=" min-w-screen flex justify-center select-none">
      <div className=" w-full px-4 md:px-20 ">
        <div className=" pt-24 pb-8 md:pt-28  ">
          <Breadcrumb
            className=" !font-kanit font-light"
            items={[
              {
                title: <Link href={"/"}> หน้าหลัก </Link>,
              },
              {
                title: "หมวดหมู่",
              },
            ]}
          />
          <h1 className="text-4xl font-extralight mb-0">
            หมวดหมู่
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((row: any, index: number) => (
              <DisplayShop
                key={index}
                imageSrc={
                  row.localImage !== null
                    ? Config.ImageHosting + row.localImage
                    : "/no-image.png"
                }
                sizeImage={row.localImage !== null ? "90%" : "60%"}
                subtitle={`${row.items} ประเภท`}
                subtitle2={`${row.product} สินค้า`}
                title={row.name}
                link={`/category/${row.enID}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
