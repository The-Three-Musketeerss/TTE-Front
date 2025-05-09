const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-16 lg:flex-row lg:space-x-32 lg:items-start lg:justify-center p-4">
      <div className="skeleton h-[500px] w-[500px]"></div>
      <div className="flex w-full lg:w-2xl flex-col gap-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-36"></div>
        <div className="skeleton h-56 w-full"></div>
        <div className="skeleton h-12 w-full"></div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
