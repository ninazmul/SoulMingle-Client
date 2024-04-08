import Data from "./Shared/Data/Data";
import Slider from "./Slider";
import { Helmet } from "react-helmet-async";
import SuccessCounter from "./SuccessCounter";
import SuccessStory from "./SuccessStory";

const Home = () => {
    return (
      <div>
        <Helmet>
          <title>SoulMingle | Home</title>
        </Helmet>
        <Slider></Slider>
        <Data></Data>
        <SuccessCounter></SuccessCounter>
        <SuccessStory></SuccessStory>
      </div>
    );
};

export default Home;