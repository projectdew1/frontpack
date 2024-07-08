"use client";
import React, {  useState,useEffect } from 'react';

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery, {ReactImageGalleryItem} from "react-image-gallery";
import Config from '@/hook/setApi/Config';


export default function GalleryImage(dataItems:any) {
    const [dataImage, setDataImage] = useState<ReactImageGalleryItem[]>([])

   useEffect(() => {
    const {items } = dataItems;
        let arr: ReactImageGalleryItem[] = [{ original: Config.ImageHosting + items.localImage, thumbnail: Config.ImageHosting + items.localImage }]
        items.image.map((r:any, i:number) => {
            arr.push({
                original: Config.ImageHosting + r.local,
                thumbnail: Config.ImageHosting + r.local
            })
        })
        setDataImage(arr)
    }, [])
      return ( <ImageGallery items={dataImage} showPlayButton={false} lazyLoad={true} thumbnailPosition={"right"} />
    
    );
}