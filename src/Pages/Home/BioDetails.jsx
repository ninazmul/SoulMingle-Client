import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Badge, Button, Card } from 'flowbite-react';
import { CiHeart } from "react-icons/ci";


const BioDetails = () => {
  const { id } = useParams();
  const [bio, setBio] = useState(null);

  useEffect(() => {
    console.log("Fetching bio details for ID:", id);
    fetch(`http://localhost:5000/bioData/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Bio data:", data);
        setBio(data);
      })
      .catch((error) => {
        console.error("Error fetching bio details:", error);
        setBio(null);
      });
  }, [id]);


  if (!bio) {
    return <div>User not found</div>;
  }

  return (
    <section className="pt-16">
      <SectionTitle subHeading="view" heading="User Details"></SectionTitle>

      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="w-2/3 flex items-center">
          <Card className="">
            <div className="flex items-center justify-around gap-10">
              <div className="w-1/3">
                <img className="" src={bio.ProfileImage} alt="" />
              </div>
              <div className=" w-2/3">
                <div className="flex items-center gap-10">
                  <h5 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {bio.Name}
                  </h5>
                  <Badge color="warning" size="sm">
                    {bio.Subscription}
                  </Badge>
                </div>
                <div className="flex gap-10">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Occupation: {bio.Occupation}
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Age: {bio.Age}
                  </p>
                </div>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                  Division: {bio.PermanentDivision}
                </p>
              </div>
            </div>
          </Card>
          <div>
            <Button.Group className="flex flex-col">
              <Button className="bg-pink-500 rounded-lg m-2">
                <CiHeart className="text-xl" />
              </Button>
              <Button className="bg-pink-500 rounded-lg m-2">Messages</Button>
              <Button className="bg-pink-500 rounded-lg m-2">Contact</Button>
            </Button.Group>
          </div>
        </div>
        <div className="text-center w-1/3">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gender:
          </h2>
          <p className="text-xl md:text-2xl text-pink-700">{bio.BiodataType}</p>
        </div>
      </div>
    </section>
  );
};

export default BioDetails;
