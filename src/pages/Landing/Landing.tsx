import Carousel from "@components/Landing/Carousel/Carousel";
import LatestArrivals from "@components/Landing/LatestArrivals/LatestArrivals";
import BestSelling from "@components/Landing/BestSelling/BestSelling";
import TopCategories from "@components/Landing/TopCategories/TopCategories";

const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      <Carousel />
      <TopCategories />
      <LatestArrivals />
      <BestSelling />

    </div>
  );
};

export default Landing;
