
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useBioData from "../../Hooks/useBioData";

const SuccessCounter = () => {
  const [bio] = useBioData();

  // Filter data for Male and Female
  const maleData = bio.filter((data) => data.BiodataType === "Male");
    const femaleData = bio.filter((data) => data.BiodataType === "Female");
    const coupleData = bio.filter((data) => data.BiodataType === "Male" + data.BiodataType === "Female") 

  // Calculate total counts
  const maleCount = maleData.length;
    const femaleCount = femaleData.length;
    const coupleCount = coupleData.length;

  return (
    <section>
      <SectionTitle
        heading="See love stories"
        subHeading="Find yours today!"
      ></SectionTitle>
      <div className="flex justify-around p-4 bg-pink-500 rounded-lg text-white mb-10">
        <div className="stat">
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Male
          </div>
          <div className="value text-3xl lg:text-5xl font-bold">
            {maleCount}
          </div>
        </div>

        <div className="stat">
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Female
          </div>
          <div className="value text-3xl lg:text-5xl font-bold">
            {femaleCount}
          </div>
        </div>

        <div className="stat">
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Couples
          </div>
          <div className="value text-3xl lg:text-5xl font-bold">
            {coupleCount}
          </div>{" "}
          {/* Assuming this count is fixed */}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
