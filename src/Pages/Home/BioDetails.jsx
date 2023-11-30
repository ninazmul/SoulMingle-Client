import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Badge, Button, Card } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useFavBio from "../../Hooks/useFavBio";

const BioDetails = () => {
  const { id } = useParams();
  const [bios, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxios();
  const [, refetch] = useFavBio();

  const AddToFav = () => {
    if (user && user.email && bios) {
      const {
        _id,
        Name,
        BiodataType,
        ProfileImage,
        PermanentDivision,
        Age,
        Occupation,
        Subscription,
      } = bios;

      const favBioCart = {
        favId: _id,
        email: user.email,
        Name,
        BiodataType,
        ProfileImage,
        PermanentDivision,
        Age,
        Occupation,
        Subscription,
      };

      axiosSecure
        .post("/favBio", favBioCart)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Successful!",
              text: "Add to favourite Bio successfully!",
            });
            refetch();
          }
        })
        .catch((error) => {
          console.error("Error adding to favorite Bio:", error);
        });
    } else {
      Swal.fire({
        title: "Please sign in first",
        text: "You won't be able to add this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, sign in!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signIn", { state: { from: location } });
        }
      });
    }
  };
  useEffect(() => {
    console.log("Fetching bio details for ID:", id);
    setLoading(true);

    fetch(`https://soul-mingle-server.vercel.app/bioData/${id}`)
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bios) {
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
                <img className="" src={bios.ProfileImage} alt="" />
              </div>
              <div className=" w-2/3">
                <div className="flex items-center gap-10">
                  <h5 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {bios.Name}
                  </h5>
                  <Badge color="warning" size="sm">
                    {bios.Subscription}
                  </Badge>
                </div>
                <div className="flex gap-10">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Gender:{" "}
                    <span className="text-pink-700">{bios.BiodataType}</span>
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Age: <span className="text-pink-700">{bios.Age}</span>
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Race: <span className="text-pink-700">{bios.Race}</span>
                  </p>
                </div>
                <div className="flex gap-10">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Height: <span className="text-pink-700">{bios.Height}</span>{" "}
                    CM
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Weight: <span className="text-pink-700">{bios.Weight}</span>{" "}
                    KG
                  </p>
                </div>
                <div className="flex gap-10">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Occupation:{" "}
                    <span className="text-pink-700">{bios.Occupation}</span>
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    DOB:{" "}
                    <span className="text-pink-700">{bios.DateOfBirth}</span>
                  </p>
                </div>
                <div className="">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Fathers Name:{" "}
                    <span className="text-pink-700">{bios.FathersName}</span>
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Mothers Name:{" "}
                    <span className="text-pink-700">{bios.MothersName}</span>
                  </p>
                </div>
                <div className="">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Present Address:{" "}
                    <span className="text-pink-700">
                      {bios.PresentDivision}
                    </span>
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                    Permanent Address:{" "}
                    <span className="text-pink-700">
                      {bios.PermanentDivision}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <div>
            <Button.Group className="flex flex-col">
              <Button onClick={AddToFav} className="bg-pink-500 rounded-lg m-2">
                <CiHeart className="text-xl" />
              </Button>
              <Button className="bg-pink-500 rounded-lg m-2">CheckOut</Button>
              <Button className="bg-pink-500 rounded-lg m-2">Contact</Button>
            </Button.Group>
          </div>
        </div>
        <div className="text-center w-1/3">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Expectation:
          </h2>
          <div className="">
            <p className="text-xl md:text-2xl">
              Age:{" "}
              <span className="text-pink-700">{bios.ExpectedPartnerAge}</span>{" "}
              Years
            </p>
            <p className="text-xl md:text-2xl">
              Height:{" "}
              <span className="text-pink-700">
                {bios.ExpectedPartnerHeight}
              </span>{" "}
              CM
            </p>
            <p className="text-xl md:text-2xl">
              Weight:{" "}
              <span className="text-pink-700">
                {bios.ExpectedPartnerWeight}
              </span>{" "}
              KG
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioDetails;
