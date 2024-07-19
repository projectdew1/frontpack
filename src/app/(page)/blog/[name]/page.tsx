import { Breadcrumb } from "antd";
import Link from "next/link";
import NewsDetail from "../../_component/newsDetail";
import NewsSlider from "../../_component/newsSlider";
import axios from "axios";
import Config from "@/hook/setApi/Config";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const {  seo,items } = await getData(`${decodeURIComponent(name)}`);
  // const {img} = await getCatagory(`${decodeURIComponent(name)}`)
  // const des = items.map((r:any) => r.typeName);
  // console.log(img)
  return {
    title:  `${seo} ${Config.tailer}`,
    // description: `${des.join(",")}`,
  }
}

export default async function detailsBlog({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const { items } = await getData(`${decodeURIComponent(name)}`);
  return (
    <div className="w-full h-full select-none">
      <div className=" w-full px-4 md:px-20 ">
        <div className=" pt-24 pb-8 md:pt-28  "></div>

        <NewsDetail rows={items} />
      </div>
      <NewsSlider />
    </div>
  );
}

async function getData(name: string) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const { data } = await axios.post(Config.api.findNewsShow,null, {
    httpsAgent: agent,
    params: {
      id: name,
    },
  });
  console.log(data)
  return {
    items: data["items"],
    seo: data["items"].newsSeo,
  };
}

export async function generateStaticParams() {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const { data } = await axios.get(Config.api.findNewsIdShow, {
    httpsAgent: agent,
  });
  return data["items"].map((rows: any) => ({ name: rows.id }));
}
