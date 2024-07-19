import Config from "@/hook/setApi/Config";
import base_url from "@/hook/setApi/Config";
import axios from "axios";
import { MetadataRoute } from "next";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
    const https = require("https");
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const category = await axios.get(Config.api.pageHeader, {
        httpsAgent: agent,
      });
      const product = await axios.get(Config.api.pageProduct, {
        httpsAgent: agent,
      });
      const blog = await axios.get(Config.api.findNewsIdShow, {
        httpsAgent: agent,
      });

      return [
        ...category.data["items"].map((items: any) => ({ url:`${base_url}/category/${items.enID}`,lastModified: new Date() })),
        ...product.data["items"].map((items: any) => ({ url:`${base_url}/product/${items.id}`,lastModified: new Date() })),
        ...blog.data["items"].map((items: any) => ({ url:`${base_url}/blog/${items.id}`,lastModified: new Date() })),
        {
            url: `${base_url}`,
            lastModified: new Date(),
          },
        {
            url: `${base_url}/shop`,
            lastModified: new Date(),
          },
          {
            url: `${base_url}/about`,
            lastModified: new Date(),
          },
          {
            url: `${base_url}/blog`,
            lastModified: new Date(),
          },
          {
            url: `${base_url}/contact`,
            lastModified: new Date(),
          },
    ];
}