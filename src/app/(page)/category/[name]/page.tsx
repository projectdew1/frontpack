import Config from "@/hook/setApi/Config";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "antd";
import ListItem from "../../_component/listItem";
import { HeaderPage } from "@/app/_model/HeaderPage";

async function getData(name: string) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const { data } = await axios.get(Config.api.pageIdHeader, {
    httpsAgent: agent,
    params: {
      name: name,
    },
  });
  return {
    items: data["items"],
    seo: data["seo"],
    machine: data["name"],
  };
}

async function getCatagory(name:string) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const { data } = await axios.get(Config.api.pageHeader, {
    httpsAgent: agent,
  });
  const row = data["items"].filter((row: HeaderPage, index: number) => {
    return row.enID == name;
  });
  return {
    img: row.length > 0 ? row[0].localImage : null,
  };
}

const emptyItems = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className=" relative ">
        <Image
          src={"/noitem.png"}
          alt="No items of the factory kms"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={1000}
          height={800}
        />
      </div>
      <p className="text-4xl font-semibold mb-0">
        ขอภัย กำลังเพิ่มข้อมูลสินค้า
      </p>
      <Link href={`/shop`}>
        <p className="text-base font-semibold text-kmsblue cursor-pointer hover:underline">
          กลับหน้าหมวดหมู่
        </p>
      </Link>
    </div>
  );
};

const showItems = (machine: string,items:any) => {
  return (
    <div className="w-full px-4 md:px-20 ">
      <div className=" pt-24 pb-8 md:pt-28 ">
        <Breadcrumb
          className=" !font-kanit font-light"
          items={[
            {
              title: <Link href={"/"}> หน้าหลัก </Link>,
            },
            {
              title: <Link href={"/shop"}> หมวดหมู่ </Link>,
            },
            {
              title: machine,
            },
          ]}
        />
        
      </div>
      {items.map((value:any, index:number) => {
        return (
          <div key={index}>
            <div>
          <h1 key={`typeName${index}`} className="text-3xl font-extralight mb-0" >{value.typeName}</h1>
						<hr />
            </div>
          <div key={`machine${index}`} className="flex flex-row flex-1 flex-wrap">
          {value.machine.map((item:any, list:number) => {
							return (
								<ListItem
									key={`list${list}`}
									link={`/product/${item.id}`}
									title={item.machineName}
									price={parseInt(item.price)}
									discount={parseInt(item.discount)}
									soldout={item.soldout}
									imageSrc={item.localImage !== null ? Config.ImageHosting + item.localImage : "/no-image.png"}
								/>
							)
						})}
          </div>
          </div>
        );
      })}
    
    </div>
  );
};

// export async function generateMetadata({
//   params,
// }: {
//   params: { name: string };
// }) {
//   const { name } = params;
//   const {  seo,items } = await getData(`${decodeURIComponent(name)}`);
//   // const {img} = await getCatagory(`${decodeURIComponent(name)}`)
//   const des = items.map((r:any) => r.typeName);
//   // console.log(img)
//   return {
//     title:  `${seo} ${Config.tailer}`,
//     description: `${des.join(",")}`,
//   }
// }

export default async function Category({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const { items, machine } = await getData(`${decodeURIComponent(name)}`);
  return (
    <div className="min-w-screen flex justify-center px-10 pb-10 md:px-4 select-none">
      <div className="flex flex-col items-center w-full max-w-full">
        <div className="flex flex-col max-w-full w-full">
          <div>{items.length > 0 ? showItems(machine,items) : emptyItems()}</div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const { data } = await axios.get(Config.api.pageHeader, {
    httpsAgent: agent,
  });
  return data["items"].map((category: any) => ({ name: category.enID }));
}
