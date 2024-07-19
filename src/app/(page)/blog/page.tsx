import { Breadcrumb } from "antd";
import Link from "next/link";
import Image from "next/image";
import NewsSlider from "../_component/newsSlider";
import NewsBlog from "../_component/newsBlog";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: 'ข่าวและบทความ | KMS ศูนย์รวมเครื่องบรรจุภัณฑ์ สินค้าได้รับมาตรฐาน บริการจริงใจ พร้อมส่งทั่วประเทศไทย',
}

export default function Blog() {
  return (
    <div className="w-full h-full select-none">
      <div className=" w-full px-4 md:px-20 ">
        <div className=" pt-24 pb-8 md:pt-28  ">
          <Breadcrumb
            className=" !font-kanit font-light"
            items={[
              {
                title: <Link href={"/"}> หน้าหลัก </Link>,
              },
              {
                title: "ข่าวและบทความ",
              },
            ]}
          />
          <h1 className="text-4xl font-extralight mb-0">ข่าวและบทความ</h1>
        </div>
      <NewsBlog />
        
     
      </div>
        <NewsSlider />
    </div>
  );
}
