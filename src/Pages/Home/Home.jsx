import Data from "./Shared/Data/Data";
import Slider from "./Slider";
import { Helmet } from "react-helmet-async";
import SuccessCounter from "./SuccessCounter";

const Home = () => {
    return (
      <div>
        <Helmet>
          <title>SoulMingle | Home</title>
        </Helmet>
        <Slider></Slider>
        <Data></Data>
        <SuccessCounter></SuccessCounter>
      </div>
    );
};

export default Home;