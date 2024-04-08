import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Carousel } from "flowbite-react";
import useCouples from "../../Hooks/useCouples";

const SuccessStory = () => {
  const [couples] = useCouples();

  return (
    <section>
      <SectionTitle heading="Success Stories" subHeading="Next will be yours" />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-10">
        <Carousel pauseOnHover>
          {couples.map((couple, index) => (
            <div key={index} className="bg-pink-500">
              {(
                <img src={couple.Male.ProfileImage} alt={couple.Male.Name} />
              ) && (
                <img src={couple.Male.ProfileImage} alt={couple.Male.Name} />
              )}
              <p>
                {couple.Male.Name} & {couple.Female.Name}
              </p>
              {/* Add more details as needed */}
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default SuccessStory;
