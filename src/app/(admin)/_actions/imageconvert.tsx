"use client";

const dataURLtoFile = (dataurl:any, filename:any) => {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

const normFile = (e: any) => {
    // console.log("Upload event:", e)

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

export  {
	dataURLtoFile,
    normFile,
	
}