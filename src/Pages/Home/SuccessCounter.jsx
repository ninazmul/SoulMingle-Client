import SectionTitle from "../../Components/SectionTitle/SectionTitle";


const SuccessCounter = () => {
    return (
      <section>
        <SectionTitle
          heading="See love stories"
          subHeading="Find yours today!"
        ></SectionTitle>
        <div className="flex justify-around p-4 bg-pink-500 rounded-lg text-white mb-10">
          <div className="stat">
            <div className="text-xl md:text-2xl lg:text-3xl font-semibold">Male</div>
            <div className="value text-3xl lg:text-5xl font-bold">31K</div>
          </div>

          <div className="stat">
            <div className="text-xl md:text-2xl lg:text-3xl font-semibold">Female</div>
            <div className="value text-3xl lg:text-5xl font-bold">4,200</div>
          </div>

          <div className="stat">
            <div className="text-xl md:text-2xl lg:text-3xl font-semibold">Couples</div>
            <div className="value text-3xl lg:text-5xl font-bold">1,200</div>
          </div>
        </div>
      </section>
    );
};

export default SuccessCounter;