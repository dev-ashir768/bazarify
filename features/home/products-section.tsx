import React, { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, PackageSearch, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useProductsStore } from "@/store/products.store";
import { ProductListResponse } from "@/types/product.types";
import { ProductServices } from "@/services/product.services";
import ProductCard from "./product-card";

export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="w-full aspect-square rounded-xl bg-gray-200" />
    <div className="px-2 space-y-2">
      <Skeleton className="h-4 w-3/4 bg-gray-200" />
      <Skeleton className="h-4 w-1/2 bg-gray-200" />
      <Skeleton className="h-5 w-1/3 mt-2 bg-gray-200" />
    </div>
  </div>
);

const ProductsSection = () => {
  const { ref, inView } = useInView();
  const limit = 10;

  const { cachedProducts, setCachedProducts } = useProductsStore();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ProductListResponse>({
    queryKey: ["products", { limit }],
    queryFn: ({ pageParam = 1 }) =>
      ProductServices.GetProductList({ page: pageParam as number, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.payload.current_page < lastPage.payload.total_pages) {
        return lastPage.payload.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.payload.products) || [];
  }, [data?.pages]);

  useEffect(() => {
    if (products.length > 0) {
      setCachedProducts(products);
    }
  }, [data, setCachedProducts, products]);

  const displayProducts = cachedProducts.length > 0 ? cachedProducts : products;

  return (
    <>
      <section className="container w-full md:py-28 py-20 space-y-10">
        <div className="text-center mb-10">
          <h2 className="text-midnight font-bold sm:text-[48px] sm:leading-[55px] text-3xl sm:tracking-wide mb-4">
            Our Product
          </h2>
          <p className="text-charcoal font-light sm:text-lg text-base">
            Searching for something special, see our list of featured products
          </p>
        </div>

        {/* If no cached products and currently loading initially */}
        {isLoading && cachedProducts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-7">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-2xl font-semibold text-charcoal mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn&apos;t load the products at this time. Please try again
              later.
            </p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-charcoal mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn&apos;t find any products at the moment. Please check
              back later.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-7">
              {displayProducts.map((product, index) => {
                const uniqueKey = product.sku
                  ? `${product.sku}-${index}`
                  : `product-${index}`;
                return <ProductCard key={uniqueKey} {...product} />;
              })}
            </div>

            <div
              ref={ref}
              className="w-full flex justify-center items-center py-4 min-h-[50px]"
            >
              {isFetchingNextPage ? (
                <Loader2 className="w-8 h-8 animate-spin text-charcoal" />
              ) : hasNextPage ? (
                <span className="text-sm text-gray-400">
                  Scroll down for more
                </span>
              ) : (
                <span className="text-sm text-gray-400">
                  You&apos;ve reached the end!
                </span>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductsSection;
