import axios from "axios";

interface GetProductListProps {
  page: number;
  limit: number;
}

export const ProductServices = {
  GetProductList: async ({ page, limit }: GetProductListProps) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASEURL_OMS}/api/staging/productlist`,
        {
          page: page,
          limit: limit,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
