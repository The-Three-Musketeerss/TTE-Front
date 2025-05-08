import ProductCard from "@components/shared/ProductCard/ProductCard";
import Button from "@components/shared/Button/Button";

const latestArrivals = [
  {
    id: 1,
    name: "Sandals",
    price: 99,
    imageUrl:
      "https://media.istockphoto.com/id/1804088535/photo/legs-of-an-asian-woman.jpg?s=1024x1024&w=is&k=20&c=ekRY6b7hto8K1H8Om585jcEMr2GRmNUZyZWrIRotmrg=",
  },
  {
    id: 2,
    name: "Pants",
    price: 99,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Sweater",
    price: 99,
    imageUrl:
      "https://media.istockphoto.com/id/1975908052/photo/portrait-of-beautiful-young-woman-on-white-background.jpg?s=1024x1024&w=is&k=20&c=5TZg7R-lhZO5TiqgVL4IEVjxjckp0pv5TeVaXPG5Hf4=",
  },
];

const LatestArrivals = () => {
  return (
    <section className="flex flex-col items-center mt-20">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">Latest arrivals</h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Explore the newest additions to our collection — fresh styles and trending picks just for you.
      </p>
      <Button text="Shop all" fullWidth={false} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl px-4">
        {latestArrivals.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default LatestArrivals;
