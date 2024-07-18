import { Breadcrumb } from "antd";
import Link from "next/link";
import Image from "next/image";
import NewsSlider from "../_component/newsSlider";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: 'เกี่ยวกับ | KMS',
}

export default function About() {
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
                title: "เกี่ยวกับ KMS",
              },
            ]}
          />
          <h1 className="text-4xl font-extralight mb-0">เกี่ยวกับ KMS</h1>
        </div>
        <div className="min-h-full w-full flex lg:flex-row flex-col">
          <div className="flex-1  flex flex-col items-center justify-start ">
            <div className=" relative h-[500px] w-full  p-4">
            <Image
            src={"/about1.png"}
            alt="Picture of the factory kms"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className=" object-cover rounded-xl shadow-lg border" // just an example
          />
            </div>
          </div>
          <div className="flex-1  flex flex-col items-start justify-start max-lg:my-4 lg:ml-4">
          {/* <div className="w-full rounded-xl shadow-lg border p-4">
asdasdas
            </div> */}
         
            <h1 className=" text-kmsppad text-3xl font-extralight">{'บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด'}</h1>
            <label className=" text-gray-400 text-lg font-extralight mt-4 text-balance ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'ดำเนินธุรกิจเกี่ยวกับเครื่องบรรจุภัณฑ์ มีสินค้ามากมายหลายชนิด เช่น เครื่องบรรจุของเหลว , น้ำยาล้างจาน ,แชมพู,แอลกอฮอล์,ครีม เครื่องบรรจุซองแนวตั้ง เมล็ด,ผงกาแฟ,คอลลาเจน, เครื่องบรรจุแนวนอน เครื่องซีลสูญญากาศ เครื่องอบฟิล์มหด เครื่องรัดกล่องและเครื่องอื่นๆ ที่เกี่ยวกับการบรรจุภัณฑ์'}</label>
            <label className=" text-gray-400 text-lg font-extralight  text-balance ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'ทางบริษัทฯ ได้นำเข้าเครื่องจักร คุณภาพตามมาตรฐาน ISO 9002 และได้รับรองมาตรฐานความปลอดภัย CE  ทำให้ท่านมั่นใจในสินค้าและคุณภาพเครื่องจักร จากประสบการณ์อันยาวนาน ทำให้เราสามารถให้คำปรึกษาและคัดเลือกสินค้าเครื่องจักรที่เหมาะสมกับงานของลูกค้าได้อย่างลงตัว'}</label>
            <label className="  text-lg font-extralight mt-4 text-balance">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'เรามีทีมช่างมืออาชีพที่คอยดูแล บริการติดตั้ง และ บริการหลังการขายด้วยความเป็นกันเอง  รับประกันสินค้า 1 ปี มีอะไหล่ให้บริการ '}</label>
            <label className="  text-lg font-extralight mt-4 text-balance ">{'ติดต่อเราทุกครั้งที่ท่านต้องการเครื่องบรรจุภัณฑ์ '}</label>
            <label className="  text-lg font-extralight  text-balance ">{'บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด  ขอขอบคุณลูกค้าทุกท่านที่ให้ความไว้วางใจ '}</label>
            
          </div>
        </div>
        <h1 className="text-4xl font-extralight mt-32 text-center">Why KMS ?</h1>
        <h1 className="text-xl font-extralight mb-16 text-center">ทำไมต้อง KMS ?</h1>
        <div className="min-h-full  w-full flex lg:flex-row flex-col">
          
        <div className="min-h-full w-full flex lg:flex-row flex-col lg:justify-center lg:items-start items-center mb-32 ">
          
      
        <div className="flex-none lg:w-[65vw] w-full flex flex-col  ">
        <div className=" relative h-[300px] w-full  p-4">
            <Image
            src={"/about_factory.png"}
            alt="Picture of the factory kms"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className=" object-cover rounded-xl shadow-lg border" // just an example
          />
            </div>
            <label className="  text-lg font-extralight mt-4 text-balance ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'KMS Machinery ไม่เพียงแต่คุณจะได้รับผลิตภัณฑ์ที่มีคุณภาพสูงและนวัตกรรมใหม่ๆ แต่ยังได้รับการบริการหลังการขายที่ยอดเยี่ยม ความน่าเชื่อถือ และความยั่งยืน ทำให้ธุรกิจของคุณสามารถเติบโตและประสบความสำเร็จได้อย่างมั่นคง'}</label>
          </div>
     
       
        </div>
       
        </div>
      </div>
        <NewsSlider />
    </div>
  );
}
