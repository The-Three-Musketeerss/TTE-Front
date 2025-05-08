import Carousel from "@components/Landing/Carousel";
import LatestArrivals from "@components/Landing/LatestArrivals";
import BestSelling from "@components/Landing/BestSelling";
import TopCategories from "@components/Landing/TopCategories";

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
