import axios, { AxiosInstance } from "axios";
import { NasaResponseImage } from "../../types";

type SearchParams = {
  search: string;
  from: number | null | undefined;
};

class NasaImageService {
  private _instance: AxiosInstance;
  static IMAGE_NOT_FOUND_HREF = "https://i.imgur.com/1LsxTQI.png";
  static NOT_AVAILABLE = "N/A";

  constructor() {
    this._instance = axios.create({
      baseURL: process.env["NASA_IMAGE_SEARCH_URL"],
      timeout: 1000,
      params: {
        media_type: "image",
      },
    });
  }

  async getImages(params: SearchParams) {
    return await this._instance.get("/search", {
      params: {
        q: params.search,
        page: params.from,
      },
    });
  }

  extractImageData(image: NasaResponseImage) {
    const title = image.data[0].title || NasaImageService.NOT_AVAILABLE;
    const description =
      image.data[0].description ||
      image.data[0]["description_508"] ||
      NasaImageService.NOT_AVAILABLE;
    const href = image.links[0].href || NasaImageService.IMAGE_NOT_FOUND_HREF;
    return {
      title,
      description,
      href,
    };
  }
}

export default new NasaImageService();
