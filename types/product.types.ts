export interface ProductTypes {
  productname: string;
  variation_price: string;
  sku: string;
  variant_image: string;
  brandname: string;
  shopify_url: string;
}

export interface ProductListResponse {
  status: number;
  message: string;
  payload: {
    total_count: number;
    total_pages: number;
    current_page: number;
    limit: number;
    products: ProductTypes[];
  };
}
