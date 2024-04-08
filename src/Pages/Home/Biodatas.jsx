import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Dropdown, Button } from "flowbite-react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useBioData from "../../Hooks/useBioData";
import DataCard from "./Shared/Data/DataCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Pagination } from "flowbite-react";

const Biodatas = () => {
  const [bio] = useBioData();
  const [filter, setFilter] = useState({
    biodataType: "All",
    ageRange: [18, 30],
    division: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const [filteredBioDatas, setFilteredBioDatas] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    const filteredData = bio.filter((item) => {
      const biodataTypeFilter =
        filter.biodataType === "All" || item.BiodataType === filter.biodataType;

      const ageRangeFilter =
        !filter.ageRange ||
        (item.Age >= filter.ageRange[0] && item.Age <= filter.ageRange[1]);

      const divisionFilter =
        filter.division === "All" || item.PermanentDivision === filter.division;

      return biodataTypeFilter && ageRangeFilter && divisionFilter;
    });

    const sortedData = filteredData.sort((a, b) =>
      sortOrder === "ascending" ? a.Age - b.Age : b.Age - a.Age
    );

    setFilteredBioDatas(sortedData);
  }, [bio, filter, sortOrder]);

  const totalPages = Math.ceil(filteredBioDatas.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredBioDatas.slice(startIndex, endIndex);

  const onPageChange = (page) => setCurrentPage(page);

  const handleFilterChange = (type, value) => {
    if (type === "division" && value === "All") {
      setFilter({ ...filter, division: "" });
    } else {
      setFilter({ ...filter, [type]: value });
    }
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setCurrentPage(1);
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "ascending" ? "descending" : "ascending"
    );
  };

  return (
    <section className="pt-10">
      <Helmet>
        <title>SoulMingle | Biodata</title>
      </Helmet>
      <SectionTitle
        heading="Start your Search Here"
        subHeading="Find your SoulMIngle"
      ></SectionTitle>
      <div>
        <div className="flex md:order-2 justify-between">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Button className="bg-pink-500">Filter</Button>}
          >
            <Dropdown.Item>
              <Button
                outline
                gradientDuoTone="purpleToPink"
                className="w-full"
                onClick={() => handleFilterChange("biodataType", "Male")}
              >
                Male
              </Button>
              <Button
                outline
                gradientDuoTone="purpleToPink"
                className="w-full"
                onClick={() => handleFilterChange("biodataType", "Female")}
              >
                Female
              </Button>
              <Button
                outline
                gradientDuoTone="purpleToPink"
                className="w-full"
                onClick={() => handleFilterChange("biodataType", "All")}
              >
                All
              </Button>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <label>Age Range:</label>
              <Slider
                range
                min={18}
                max={60}
                value={filter.ageRange}
                onChange={(value) => handleFilterChange("ageRange", value)}
              />
              <div className="text-center mt-2">
                {`Age: ${filter.ageRange[0]} - ${filter.ageRange[1]}`}
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <label>Division:</label>
              <select
                onChange={(e) => handleFilterChange("division", e.target.value)}
              >
                <option value="All">All</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Maymansign">Maymansign</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </Dropdown.Item>
          </Dropdown>
          <Button
            outline
            gradientDuoTone="purpleToPink"
            className="ml-2"
            onClick={toggleSortOrder}
          >
            {`Sort ${sortOrder === "ascending" ? "Ascending" : "Descending"}`}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((bio) => (
          <DataCard key={bio._id} bio={bio}></DataCard>
        ))}
      </div>
      <div className="flex overflow-x-auto justify-center mt-4 text-pink-500">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </section>
  );
};

export default Biodatas;
