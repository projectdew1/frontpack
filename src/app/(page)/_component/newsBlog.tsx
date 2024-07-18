"use client";

import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";
import { Modal, Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { convert } from "html-to-text";

import momentz from "moment-timezone";
import "moment/locale/th";

export default function NewsBlog() {
  const [modal, contextHolder] = Modal.useModal();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);

  useEffect(() => {
    return () => {
    //   getData();
    setData([1,2,3,4,5,6,7,8,9])
    };
  }, []);

  const getData = async () => {
    setLoading(true);
    await Http.post(Config.api.getNews, null, {
      params: {
        pageNumber: page,
        pageSize: 10,
      },
    })
      .then((res) => {
        const data = res.data.message;
        if (data === "success") {
          const items = res.data.items;
          setData(items);
          setPageTotal(res.data.totalPages);
        }
      })
      .catch((e) => {
        modal.error({
          cancelText: "ยกเลิก",
          okText: "ตกลง",
          title: "แจ้งเตือนจาก server!",
          content: e.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return data.length > 0 ? (
    <div className="  w-full select-none  mb-8">
      <div className="lg:px-10 px-none flex justify-center">
        <div className=" max-w-screen-xl">
       
          <div className="flex lg:flex-row flex-wrap gap-10 justify-center items-center ">
            {data.map((news: any, index: number) => (
              <div
                key={index}
                className="w-[320px] h-[540px] group relative cursor-pointer "
              >
                <div className=" relative h-[250px]">
                  <Image
                    // src={Config.ImageHosting + news.localImage}
                    // alt={news.title}
                     src={'/about_factory.png'}
                    alt={'news.title'}
                    fill
                    priority
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-cover rounded-xl select-none" // just an example
                  />
                </div>
                <div className=" absolute top-[180px] right-0 rounded-2xl shadow-lg p-[3px] h-[350px] w-11/12   group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500">
                  <div className="flex flex-col justify-between h-full w-full px-8 py-4 rounded-2xl bg-white ">
                    <article>
                      <h4 className="mt-2  font-extralight">
                        {/* {news.typeNews} */}
                        บทความ
                      </h4>
                      <h4 className=" mb-4 text-sm  font-extralight">
                        {/* {momentz.utc(news.createDate).locale('th').tz("Asia/Bangkok").add(543,'y').format("DD MMM YYYY")} */}
                        18 Jul 2556
                      </h4>

                      <p className=" font-light text-2xl line-clamp-2">
                        {/* {news.title} */}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchan
                      </p>
                      <p className="  font-extralight mt-4 line-clamp-4">
                        {/* {convert(news.content)}
                         */}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchan
                      </p>
                    </article>
                    <div className="flex justify-end cursor-pointer">
                      <label className="cursor-pointer p-2 border group-hover:border-kmsppad group-hover:bg-white group-hover:text-kmsppad border-white bg-kmsppad text-white rounded-3xl text-center w-[100px]">
                        อ่านต่อ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a className="flex flex-row justify-center cursor-pointer mt-10 ">
            <div className="text-md font-extralight p-2 px-10 text-center rounded-full border border-kmsppad text-kmsppad ">
              {"เพิ่มเติม"}
            </div>{" "}
          </a>
        </div>
      </div>
      <Spin spinning={loading} fullscreen />
      {contextHolder}
    </div>
  ) : null;
}
