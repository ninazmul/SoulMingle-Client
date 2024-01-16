

const SectionTitle = ({heading, subHeading}) => {
    return (
      <div className="text-center uppercase py-6">
        <p className="text-pink-500 font-bold md:text-xl">{subHeading}</p>
        <h2 className="text-xl md:text-4xl font-bold">{heading}</h2>
      </div>
    );
};

export default SectionTitle;