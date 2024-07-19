
import { Metadata } from 'next'
import Parallax from "./_component/parallax";
import BannnerThree from "./_component/bannerThree";
import NewsPage from './_component/newsPage';
import BestProduct from './_component/bestProduct';
import Customer from './_component/customer';

export const metadata: Metadata = {
  title: 'หน้าหลัก | KMS ศูนย์รวมเครื่องบรรจุภัณฑ์ สินค้าได้รับมาตรฐาน บริการจริงใจ พร้อมส่งทั่วประเทศไทย',
}

export default function Home() {
  return (
    <div>
      <Parallax />
      <BannnerThree />
      <Customer />
      <BestProduct />
<NewsPage />

    </div>
  );
}
