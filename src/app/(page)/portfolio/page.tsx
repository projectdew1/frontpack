import { Breadcrumb } from "antd";
import Link from "next/link";
import NewsSlider from "../_component/newsSlider";
import { Metadata } from "next/types";
import PortCategory from "../_component/portCategory";

export const metadata: Metadata = {
  title:
    "ผลงานของเรา | KMS ศูนย์รวมเครื่องบรรจุภัณฑ์ สินค้าได้รับมาตรฐาน บริการจริงใจ พร้อมส่งทั่วประเทศไทย",
};

export default function Portfolio() {
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
                title: "ผลงานของเรา",
              },
            ]}
          />
          <h1 className="text-4xl font-extralight mb-0">ผลงานของเรา</h1>
        </div>
        <PortCategory />
      </div>
      <NewsSlider />
    </div>
  );
}
