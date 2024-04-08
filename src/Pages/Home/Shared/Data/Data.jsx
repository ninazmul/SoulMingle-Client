import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import DataCard from "./DataCard";
import useBioData from "../../../../Hooks/useBioData";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { space } from "postcss/lib/list";

const Data = () => {
  const [bio] = useBioData();

  const premiumMembers = bio.filter((bio) => bio.Subscription === "Premium");

  const displayedPremiumMembers = premiumMembers.slice(0, 6);

  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    swipeToSlide: true,
    focusOnSelect: true,
    slidesToShow: slidesToShow,
  };

  const updateSlidesToShow = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
      setSlidesToShow(4);
    } else if (windowWidth >= 768) {
      setSlidesToShow(3);
    } else {
      setSlidesToShow(2);
    }
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    updateSlidesToShow(); // Initial calculation

    // Update slidesToShow on window resize
    window.addEventListener("resize", updateSlidesToShow);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  return (
    <section>
      <SectionTitle
        heading="Start your Search Here"
        subHeading="Find your SoulMIngle"
      ></SectionTitle>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {displayedPremiumMembers.map((bio) => (
            <DataCard key={bio._id} bio={bio}></DataCard>
          ))}
        </Slider>
        <div className="absolute top-1/2 left-5 transform -translate-y-1/2 flex space-x-4 z-10">
          <button
            className=" hover:text-pink-500 p-2 text-2xl bg-pink-500/50 rounded-lg"
            onClick={goToPrev}
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex space-x-4 z-10">
          <button
            className=" hover:text-pink-500 p-2 text-2xl bg-pink-500/50 rounded-lg"
            onClick={goToNext}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <Link to="/biodata" className="text-center flex justify-center py-4">
        <Button outline gradientDuoTone="purpleToPink">
          View All
        </Button>
      </Link>
    </section>
  );
};

export default Data;
