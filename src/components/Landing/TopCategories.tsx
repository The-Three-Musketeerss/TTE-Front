import Button from "@components/shared/Button/Button";

const topCategories = [
  { id: 1, name: "Shoes" },
  { id: 2, name: "Jackets" },
  { id: 3, name: "Accessories" },
];

const TopCategories = () => {
  const handleClick = (category: string) => {
    console.log(`Clicked category: ${category}`);
  };

  return (
    <section className="flex flex-col items-center mt-20">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">
        Top Categories
      </h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Explore our most popular categories — carefully curated by demand and trend.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full max-w-4xl px-4">
        {topCategories.map((category) => (
          <Button
            key={category.id}
            text={category.name}
            fullWidth={true}
            onClick={() => handleClick(category.name)}
          />
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
