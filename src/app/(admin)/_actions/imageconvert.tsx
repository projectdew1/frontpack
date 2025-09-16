"use client";

import Config from "@/hook/setApi/Config";
import Http from "@/hook/setApi/Http";

const dataURLtoFile = (dataurl: any, filename: any) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const normFile = (e: any) => {
  // console.log("Upload event:", e)

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const uploadBase = async (url: string) => {
  try {
    const res = await Http.get(Config.api.base64, { params: { url } });
    const base64 = res.data.base64;
    return base64;
  } catch (err) {
    console.error("uploadBase error:", err);
    return null;
  }
};

export { dataURLtoFile, normFile, uploadBase };
