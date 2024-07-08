import Image from "next/image";
import Link from "next/link";

export default function Parallax() {
    return (
        <div className="flex justify-center select-none ">
          <div className=" max-w-screen-xl 	w-full ">
            <div className="flex lg:flex-row flex-col h-[800px]">
        <div className="flex-1  flex flex-col justify-center items-center lg:items-start lg:pl-20 pl-none py-10 sm:py-18">
          <h1 className="text-4xl sm:text-7xl font-normal tracking-wider">
            KMS MACHINERY
          </h1>
          <h1 className="text-2xl sm:text-4xl mt-6 font-normal text-kmsppad">
            ศูนย์รวมเครื่องบรรจุภัณฑ์
          </h1>
          <p className="text-base sm:text-2xl mt-2 font-light tracking-wider">
            สินค้าได้รับมาตรฐาน บริการจริงใจ
          </p>
          <p className="text-base sm:text-2xl mt-1 font-light  tracking-wider">
            นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              className="p-1.5 w-[150px] bg-gradient-to-l from-kmsorange to-yellow-500  shadow-[0_3px_6px_0px_rgba(0,0,0,0.16)] font-extralight text-xl text-white rounded-lg cursor-pointer flex justify-center items-center hover:animate-orangePulse"
              href="/shop"
            >
              สินค้า
            </Link>
            <a
              className="p-1.5 w-[150px] bg-kmsppad shadow-[0_3px_6px_0px_rgba(0,0,0,0.16)] font-extralight text-xl text-white rounded-lg cursor-pointer flex justify-center items-center hover:animate-purplePulse"
              href="https://www.facebook.com/kmsmachinerythailand"
              target="_blank"
            >
              ติดต่อ
            </a>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center  py-10  lg:py-18">
          <div className="h-[15rem] lg:h-5/6 w-4/5  relative max-h-screen-xl">
            <Image
              src={"/home1.jpg"}
              alt="Picture of the factory kms"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md rounded-bl-[8rem] object-cover" // just an example
            />
          </div>
        </div>
        </div>
        </div>
      </div>
    );
}