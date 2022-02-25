//Export a Axios Instance
import axios, { AxiosInstance } from "axios";

type SearchParams = {
  search: string;
  from: number | null | undefined;
};

class NasaImageService {
  private _instance: AxiosInstance;

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
}

export default new NasaImageService();
