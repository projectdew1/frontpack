import Image from "next/image";

export default function BannnerThree() {
  return (
    <div className="mb-[120px] select-none ">
      <h1 className="text-4xl font-extralight mb-8 text-center">{"Services we offer"}</h1>
      <div className="flex lg:flex-row flex-wrap gap-10 justify-center items-center ">
      
      <div className="p-10 rounded-lg shadow-md h-[250px] w-[350px] bg-purple-50 flex flex-col items-center cursor-pointer">
        <div className=" relative w-[200px] h-[150px]">
          <Image
            src={"/order.svg"}
            alt="image of kms machinery"
            fill
            priority
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-center mt-2">สินค้าคุณภาพราคาย่อมเยาว์</h1>
      </div>
      <div className="p-10 rounded-lg shadow-md h-[250px] w-[350px] bg-purple-50 flex flex-col items-center cursor-pointer">
        <div className=" relative w-[200px] h-[150px]">
          <Image
            src={"/delive.svg"}
            alt="image of kms machinery"
            fill
            priority
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-center text-black  mt-2">
          บริการจัดส่งสินค้าทั่วไทย
        </h1>
      </div>
      <div className="p-10 rounded-lg shadow-md h-[250px] w-[350px] bg-purple-50 flex flex-col items-center cursor-pointer">
        <div className=" relative w-[200px] h-[150px]">
          <Image
            src={"/support.svg"}
            alt="image of kms machinery"
            fill
            priority
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-center mt-2">ปรึกษาปัญหา ออกแบบเครื่อง</h1>
      </div>
      </div>
    </div>
  );
}
