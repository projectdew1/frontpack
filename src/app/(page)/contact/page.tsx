



import { Metadata } from 'next'
import InputContact from '../_component/contact';
import { Breadcrumb } from "antd";
import Link from "next/link";
import NewsSlider from '../_component/newsSlider';


export const metadata: Metadata = {
  title: 'ติดต่อเรา | KMS',
}

export default function Contact() {
  
  return (
  
      <div className="flex flex-col w-full h-full select-none ">

        <div className=" pt-24 pb-8 md:pt-28 md:px-20 px-4 ">
          <Breadcrumb
            className=" !font-kanit font-light"
            items={[
              {
                title: <Link href={"/"}> หน้าหลัก </Link>,
              },
              {
                title: "ติดต่อเรา",
              },
            ]}
          />
          <h1 className="text-4xl font-extralight mb-0">ติดต่อเรา</h1>
        </div>
        <div className="min-h-full  w-full flex lg:flex-row flex-col-reverse mb-32	">
          <div className="flex-1  flex flex-col items-center justify-start md:px-20 ">
            <div className="w-full h-full ">
              {/* <h1 className=" pl-4 py-2 font-light text-xl">ข้อมูลการติดต่อ</h1>
              <div className="flex flex-col">
                <label className="pl-4 font-extralight text-gray-500">E-mail :</label>
                <label className="pl-8 font-extralight text-gray-500">
                  kmspacking@gmail.com
                </label>
                <label className="pl-4 font-extralight text-gray-500">Tel :</label>
                <a
                  className="pl-8 font-extralight cursor-pointer underline text-gray-500"
                  target="_blank"
                  href="tel:034116655"
                >
                  034-116655
                </a>
                <a
                  className="pl-8 font-extralight cursor-pointer underline text-gray-500"
                  target="_blank"
                  href="tel:0954565550"
                >
                  095-456-5550
                </a>
                <a
                  className="pl-8 font-extralight cursor-pointer underline text-gray-500"
                  target="_blank"
                  href="tel:0869180060"
                >
                  086-918-0060
                </a>
                <label className="pl-4 font-extralight text-gray-500">Line :</label>
                <a
                  className="pl-8 font-extralight cursor-pointer underline text-gray-500"
                  target="_blank"
                  href="https://page.line.me/?accountId=kmsmachinery"
                >
                  @kmsmachinery
                </a>
                <label className="pl-4 font-extralight text-gray-500">Facebook :</label>
                <a
                  className="pl-8 font-extralight cursor-pointer underline text-gray-500"
                  target="_blank"
                  href="https://www.facebook.com/kmsmachinerythailand"
                >
                  @kmsmachinerythailand
                </a>
                <label className="pl-4 font-extralight text-gray-500">Youtube :</label>
                <a
                  className="pl-8 font-extralight cursor-pointer underline text-gray-500"
                  target="_blank"
                  href="https://www.youtube.com/@kmsmachinery4363"
                >
                  KMS MACHINERY
                </a>
              </div> */}
              <h1 className=" pl-4 pt-2 font-light text-xl ">
                วันและเวลาเปิดทำการ
              </h1>
              <div className="flex flex-col py-2">
                <label className="pl-8 font-extralight text-gray-500">
                  วัน: จันทร์ - เสาร์  เวลา: 8.30 - 17.30
                </label>
             
              </div>
              <h1 className=" pl-4 pb-2 font-light text-xl ">
                สถานที่ตั้ง
              </h1>
              <iframe
                className="md:rounded-xl md:shadow-lg md:mb-12"
                title="map kms"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124026.61381228402!2d100.17995825773735!3d13.728638289250934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e295e27d572fb9%3A0x46f8115383270857!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4hOC5gOC4reC5h-C4oeC5gOC4reC4qiDguYHguKHguIrguIrguLXguJnguYDguJnguK3guKPguLXguYgg4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1716055993565!5m2!1sth!2sth"
                width="100%"
                height="400"
                allowFullScreen
                loading="lazy"
                // referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="flex-1  flex flex-col justify-start pr-none lg:pr-20  ">
            <div className="lg:border lg:rounded-xl lg:shadow-lg p-4 pt-8 w-auto">
              <h1 className="p-4 font-light text-xl">สอบถามข้อมูลหาเรา</h1>
           <InputContact />
            </div>
          </div>
        </div>
        <NewsSlider />
      </div>

  );
}
