"use client";

import Image from "next/image";

export default function NewsPage() {
  return (
    <div className="  w-full select-none  mb-8">
      <div className="lg:px-10 px-none py-10 sm:py-20 flex justify-center">
        <div className=" max-w-screen-xl">
          <h1 className="text-4xl font-extralight mb-8 text-center">{"News and Articles"}</h1>
          <div className="flex lg:flex-row flex-wrap gap-10 justify-center items-center ">
            {[1, 2, 3].map((news: any, index: number) => (
              <div
                key={index}
                className="w-[350px] h-[540px] group relative cursor-pointer "
              >
                <div className=" relative h-[250px]">
                  <Image
                    src={"/about_factory.png"}
                    alt="Picture of the factory kms"
                    fill
                    priority
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-cover rounded-xl select-none" // just an example
                  />
                </div>
                <div className=" absolute top-[180px] right-0 rounded-2xl shadow-lg p-[3px] h-[350px] w-11/12   group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500">
                <div className="flex flex-col justify-between h-full w-full px-8 py-4 rounded-2xl bg-white ">  
                {/* group-hover:border-kmspurple group-hover:border-2 */}
                  <article>
                    <h4 className="mt-2 mb-4  font-extralight">ข่าวสาร</h4>
                    <p className=" font-light text-2xl line-clamp-2">
                      simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an unknown printer
                      took a galley of type and scrambled it to make a type
                      specimen book
                    </p>
                    <p className="  font-extralight mt-4 line-clamp-4">
                      simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an unknown printer
                      took a galley of type and scrambled it to make a type
                      specimen book
                    </p>
                  </article>
                  <div className="flex justify-end cursor-pointer">
                  <label className="cursor-pointer p-2 border group-hover:border-kmsppad group-hover:bg-white group-hover:text-kmsppad border-white bg-kmsppad text-white rounded-3xl text-center w-[100px]">อ่านต่อ</label>
                </div>
                </div>
                </div>
              </div>
            ))}
          </div>
          <a className="flex flex-row justify-end cursor-pointer">
            <div className="text-md font-extralight p-2 px-4 text-center rounded-lg border border-kmsppad text-kmsppad ">
              {"อ่านทั้งหมด"}
            </div>{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
