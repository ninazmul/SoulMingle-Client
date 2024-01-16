import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import DataCard from "./DataCard";
import useBioData from "../../../../Hooks/useBioData";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Data = () => {
  const [bio] = useBioData();

  const premiumMembers = bio.filter((bio) => bio.Subscription === "Premium");

  const displayedPremiumMembers = premiumMembers.slice(0, 6);

  return (
    <section>
      <SectionTitle
        heading="Start your Search Here"
        subHeading="Find your SoulMIngle"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {displayedPremiumMembers.map((bio) => (
          <DataCard key={bio._id} bio={bio}></DataCard>
        ))}
      </div>
      <Link to="/biodata" className="text-center flex justify-center">
        <Button outline gradientDuoTone="purpleToPink">
          View All
        </Button>
      </Link>
    </section>
  );
};

export default Data;
