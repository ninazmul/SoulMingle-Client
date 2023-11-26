import Data from "./Shared/Data/Data";
import Slider from "./Slider";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
      <div>
        <Helmet>
          <title>SoulMingle | Home</title>
        </Helmet>
        <Slider></Slider>
        <Data></Data>
      </div>
    );
};

export default Home;