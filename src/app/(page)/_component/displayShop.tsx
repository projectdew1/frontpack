"use client";

import Image from "next/image";
import Link from "next/link";

type displayType = {
  imageSrc: string;
  title: string;
  subtitle: string;
  subtitle2: string;
  link: string;
  sizeImage: string;
};

export default function DisplayShop({
  imageSrc,
  title,
  subtitle,
  subtitle2,
  link,
  sizeImage,
}: displayType) {
  return (
    <div className=" rounded-[1rem] mb-4 p-4 pb-0 bg-gray-100 hover:bg-gray-300 hover:text-white">
      <Link href={`${link}`} aria-label={title}>
        <div className="flex flex-col justify-center items-center h-56 relative bg-cover bg-center bg-no-repeat">
          <Image
            src={imageSrc}
            alt={`${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="mb-8">
          <p className="mb-1 font-light text-3xl text-kmsdptitle">{title}</p>
          <p className=" text-kmsdpsubtitle text-xs flex justify-between">
            <label>{subtitle}</label>
            <label>{subtitle2}</label>
          </p>
        </div>
      </Link>
    </div>
  );
}
