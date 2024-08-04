// dependencies
import { Helmet } from "react-helmet";
import HeroBanner from "../../components/homepage/HeroBanner";
import LatestProducts from "../../components/homepage/LatestProducts";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>GreenKart eCommerce || PrismaORM + MySQL + Express</title>
      </Helmet>
      <HeroBanner />
      <LatestProducts />
    </>
  );
};

export default Homepage;
