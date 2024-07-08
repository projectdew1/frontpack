import Config from "@/hook/setApi/Config";
import { Breadcrumb, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import numeral from "numeral";
import { PhoneOutlined } from "@ant-design/icons";
import { FaLine } from "react-icons/fa6";
import { YouTubeEmbed } from "@next/third-parties/google";
import GalleryImage from "../../_component/galleryImage";

async function getData(name: string) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const { data } = await axios.get(Config.api.pageIdProduct, {
    httpsAgent: agent,
    params: {
      id: name,
    },
  });
  return {
    items: data["items"],
    seo: data["seo"],
  };
}

export default async function Product({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const { items } = await getData(`${decodeURIComponent(name)}`);

  const detail = () => {
    return (
      <ul className="pl-5 space-y-3 text-black list-disc marker:text-black">
        {items.detail.map((r: any, i: number) => (
          <li key={i}>{r.detail}</li>
        ))}
      </ul>
    );
  };

  const galleryImage = () => {
    let imageList = [
      {
        index: 0,
        original: Config.ImageHosting + items.localImage,
        thumbnail: Config.ImageHosting + items.localImage,
      },
    ];
    items.image.map((r: any, i: number) => {
      imageList.push({
        index: i + 1,
        original: Config.ImageHosting + r.local,
        thumbnail: Config.ImageHosting + r.local,
      });
    });
    // return  <ImageGallery items={imageList} showPlayButton={false} lazyLoad={true} thumbnailPosition={"right"} />
  };

  const technical = () => {
    const data = items.detailTech.map((r:any,i:number) => {
        return {
            key:i,
            name: r.technicallyName,
            descript:r.detailTech
        }
    })
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Descript',
          dataIndex: 'descript',
          key: 'descript',
        },
        
      ];
      if(items.detailTech.length > 0){

          return  ( <div>
        <hr className="w-full my-8" />
        <h1 className=" text-2xl font-thin mb-2">{"คุณสมบัติทางเทคนิค"}</h1>
        <br />
        <div className="w-full lg:w-1/2">
        <Table dataSource={data} columns={columns} pagination={false} showHeader={false} />
        </div>
      </div>);
    }else{
        return null;
    }
  }

  const videoYoutube = () => {
    if (items.video.length > 0) {
      return (
        <div>
          <hr className="w-full my-8" />
          <h1 className=" text-2xl font-thin mb-2">{"วีดีโอการใช้งาน"}</h1>
          <br />
          <div className="w-full">
            {items.video.map((r: any, i: number) => {
              return (
                <YouTubeEmbed
                  key={`youtube${i}`}
                  videoid={`${r.linkMap}`}
                  params="controls=0"
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="min-w-screen flex justify-center px-10 pb-10 md:px-4 select-none">
      <div className="flex flex-col items-center w-full max-w-full">
        <div className="flex flex-col max-w-full w-full">
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
                    title: (
                      <Link href={`/category/${items.type.idCategory}`}>
                        {items.type.categoryName}
                      </Link>
                    ),
                  },
                  {
                    title: `${items.machineName}`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col lg:flex-row flex-1 gap-8">
              <div className="w-full h-full flex flex-1 bg-gray-100 rounded-2xl lg:w-1/2">
                <div className="flex flex-1 justify-center items-center p-10 py-16">
                <GalleryImage items={items} />
                </div>
              </div>
              <div className="w-full flex flex-1 lg:w-1/2">
                <div className="flex flex-1 p-4  flex-col">
                  <h1 className="text-2xl">{items.machineName}</h1>
                  {items.soldout == 0 ? (
                    items.discount > 0 ? (
                      <p>
                        <label className=" text-gray-400 mr-4 line-through">{`฿${numeral(
                          items.price
                        ).format("0,0")}`}</label>
                        <label className=" text-kmsorange text-2xl font-bold">{`฿${numeral(
                          items.discount
                        ).format("0,0")}`}</label>
                      </p>
                    ) : items.price == 0 ? null : (
                      <p className="text-2xl font-bold mr-4">
                        {`฿${numeral(items.price).format("0,0")}`}
                      </p>
                    )
                  ) : (
                    <p className="text-2xl font-bold mr-4 text-red-600">
                      {`สินค้าหมด !!`}
                    </p>
                  )}
                  <div className="mt-4">
                    {detail()}
                    <p className="mt-4 text-xl font-semibold">รายละเอียด</p>
                    <p>
                      &emsp;&emsp;&emsp;&emsp;&emsp;
                      {items.explain.length > 0
                        ? items.explain[0].explainDetail
                        : ""}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <a
                        className="flex flex-row items-center justify-center bg-kmsorange rounded-2xl p-2 text-center text-white cursor-pointer "
                        href="tel:0954565550"
                        target="_blank"
                      >
                        <PhoneOutlined className="mr-1" />
                        095-456-5550
                      </a>
                      <a
                        className="flex flex-row items-center justify-center bg-kmsorange rounded-2xl p-2 text-center text-white cursor-pointer"
                        href="tel:0869180060"
                        target="_blank"
                      >
                        <PhoneOutlined className="mr-1" />
                        086-918-0060
                      </a>
                      <a
                        className="flex flex-row items-center justify-center bg-[#00c300] rounded-2xl p-2 text-center text-white cursor-pointer"
                        href="https://page.line.me/?accountId=kmsmachinery"
                        target="_blank"
                      >
                        <FaLine className="mr-1" />
                        Line official
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {technical()}
              {videoYoutube()}
          </div>
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
  const { data } = await axios.get(Config.api.pageProduct, {
    httpsAgent: agent,
  });
  return data["items"].map((category: any) => ({ name: category.id }));
}
