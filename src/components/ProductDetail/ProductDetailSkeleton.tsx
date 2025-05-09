import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="flex space-x-32 items-start justify-center p-4">
      <div className="skeleton h-[500px] w-[500px]"></div>
      <div className="flex w-90 flex-col gap-4">
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-56 w-full"></div>
        <div className="skeleton h-12 w-full"></div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
