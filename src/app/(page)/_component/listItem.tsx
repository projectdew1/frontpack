import Link from "next/link";
import numeral from "numeral";
import Image from "next/image";

type listItemsType = {
  imageSrc: string;
  title: string;
  link: string;
  price: number;
  discount: number;
  soldout: number;
};

const ListItem = ({
  link,
  title,
  imageSrc,
  price,
  discount,
  soldout,
}: listItemsType) => {
  return (
    <div className="w-full p-1 sm:p-2 lg:w-1/4 md:w-2/4">
      <Link href={`${link}`} aria-label={title}>
        <div
          className=" relative overflow-hidden rounded-2xl h-72 flex justify-center items-center bg-gray-100 hover:bg-gray-300 bg-cover bg-center bg-no-repeat"
        
        >
            <Image
            key={imageSrc}
            src={imageSrc}
            alt={`${title}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "contain",
            }}
          />
          {soldout == 1 ? (
            <div className="absolute transform rotate-45 bg-red-600 text-center text-white font-semibold py-2 right-[-50px] top-[30px] w-52 drop-shadow-lg uppercase text-[1.15rem]">
              สินค้าหมด !!
            </div>
          ) : discount > 0 ? (
            <div className="absolute transform rotate-45 bg-kmsorange text-center text-white font-semibold py-2 right-[-50px] top-[30px] w-52 drop-shadow-lg uppercase text-[1.15rem]">
              ลดราคา !!
            </div>
          ) : null}
        </div>
      </Link>
      {discount > 0 ? (
        <div>
          <p className=" text-base m-4 mb-1 font-semibold text-center">
            {title}
          </p>
          <p className="text-center text-base text-kmsblack">
            <label
              style={{
                color: "#767676",
                marginRight: "1rem",
                textDecoration: "line-through",
              }}
            >{`฿${numeral(price).format("0,0")}`}</label>
            <label
              style={{
                color: "#FF6600",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >{`฿${numeral(discount).format("0,0")}`}</label>
          </p>
        </div>
      ) : price == 0 ? (
        <div>
          <p className=" text-base m-4 mb-1 font-semibold text-center">
            {title}
          </p>
        </div>
      ) : (
        <div>
          <p className=" text-base m-4 mb-1 font-semibold text-center">
            {title}
          </p>
          <p className="text-center text-base text-kmsblack">
            <label
              style={{
                marginRight: "1rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >{`฿${numeral(price).format("0,0")}`}</label>
          </p>
        </div>
      )}
    </div>
  );
};

export default ListItem;
