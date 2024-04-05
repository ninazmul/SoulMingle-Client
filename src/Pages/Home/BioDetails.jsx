import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Badge, Button, Card } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useFavBio from "../../Hooks/useFavBio";
import useBioData from "../../Hooks/useBioData";
import DataCard from "./Shared/Data/DataCard";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const BioDetails = () => {
  const [bio] = useBioData();
  const [openModal, setOpenModal] = useState(false);

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

  const filteredBioData = bio.filter(
    (biodata) => biodata.BiodataType === bios.BiodataType
  );

  const isPremium = user?.subscription === "Premium";



  return (
    <section className="pt-16">
      <SectionTitle subHeading="view" heading="User Details"></SectionTitle>

      <div className="flex flex-col md:flex-row justify-around items-start">
        <div className="w-full md:w-2/3 flex items-center overflow-y-auto">
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
                  {isPremium ? (
                    <div>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Email:{" "}
                        <span className="text-pink-700">{bios.Email}</span>
                      </p>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Mobile:{" "}
                        <span className="text-pink-700">
                          {bios.MobileNumber}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </Card>
          <div>
            <Button.Group className="flex flex-col">
              <Button onClick={AddToFav} className="bg-pink-500 rounded-lg m-2">
                <CiHeart className="text-xl" />
              </Button>
              {isPremium ? (
                <div></div>
              ) : (
                <Button
                  onClick={() => setOpenModal(true)}
                  className="bg-pink-500 rounded-lg m-2"
                >
                  Contact
                </Button>
              )}
              <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to Request for Contact Information?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Link to={`/dashboard/checkout/${id}`}>
                        <Button
                          color="failure"
                          onClick={() => setOpenModal(false)}
                        >
                          {"Yes, I'm sure"}
                        </Button>
                      </Link>
                      <Button color="gray" onClick={() => setOpenModal(false)}>
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </Button.Group>
          </div>
        </div>

        <div className="text-center w-full md:w-1/3 border-l-2 border-pink-600 overflow-y-auto max-h-screen">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            More BioDatas:
          </h2>
          <div className="grid ">
            {filteredBioData.map((bio) => (
              <DataCard key={bio._id} bio={bio}></DataCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioDetails;
