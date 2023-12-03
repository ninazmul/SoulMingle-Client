import { Badge, Card } from "flowbite-react";
import useBioData from "../../Hooks/useBioData";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const ViewBio = () => {
  const [bio, reloadBio] = useBioData();
  const { user } = useAuth();

  const filteredBioData = bio.filter((data) => data.Email === user.email);
  const userFound = filteredBioData.length > 0;

  const handleCreateBio = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const createBio = {};
    formData.forEach((value, key) => {
      createBio[key] = value;
    });

    fetch("http://localhost:5000/bioData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createBio),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Bio Created Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          reloadBio();
        }
      })
      .catch((error) => {
        console.error("Error creating bio:", error.message);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create bio. Please try again.",
        });
      });
  };

  return (
    <section>
      <SectionTitle heading="My BioData" subHeading="view"></SectionTitle>
      {userFound ? (
        filteredBioData.map((data) => (
          <div
            className="flex flex-col md:flex-row justify-around items-center"
            key={data._id}
          >
            <div className="flex items-center">
              <Card className="">
                <div className="flex flex-col lg:flex-row items-center justify-around gap-10">
                  <div className="w-1/3">
                    <img
                      className="rounded-lg w-96"
                      src={data.ProfileImage}
                      alt=""
                    />
                  </div>
                  <div className=" w-2/3">
                    <div className="flex items-center gap-10">
                      <h5 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.Name}
                      </h5>
                      <Badge color="warning" size="sm">
                        {data.Subscription}
                      </Badge>
                    </div>
                    <div className="flex gap-10">
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Gender:{" "}
                        <span className="text-pink-700">
                          {data.BiodataType}
                        </span>
                      </p>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Age: <span className="text-pink-700">{data.Age}</span>
                      </p>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Race: <span className="text-pink-700">{data.Race}</span>
                      </p>
                    </div>
                    <div className="flex gap-10">
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Height:{" "}
                        <span className="text-pink-700">{data.Height}</span> CM
                      </p>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Weight:{" "}
                        <span className="text-pink-700">{data.Weight}</span> KG
                      </p>
                    </div>
                    <div className="flex gap-10">
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Occupation:{" "}
                        <span className="text-pink-700">{data.Occupation}</span>
                      </p>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        DOB:{" "}
                        <span className="text-pink-700">
                          {data.DateOfBirth}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-10">
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Fathers Name:{" "}
                        <span className="text-pink-700">
                          {data.FathersName}
                        </span>
                      </p>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Mothers Name:{" "}
                        <span className="text-pink-700">
                          {data.MothersName}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-10">
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Present Address:{" "}
                        <span className="text-pink-700">
                          {data.PresentDivision}
                        </span>
                      </p>
                      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400">
                        Permanent Address:{" "}
                        <span className="text-pink-700">
                          {data.PermanentDivision}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-3xl pb-2 font-bold text-center">
            Bio data not found. Please create your bio.
          </p>
          <form className="max-w-md mx-auto" onSubmit={handleCreateBio}>
            <div className="">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="name"
                    name="Name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                    placeholder=" "
                    defaultValue={user.displayName}
                  />
                  <label
                    alt="Name"
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="Subscription"
                    name="Subscription"
                    id="Subscription"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                    placeholder=" "
                    defaultValue="Free"
                    readOnly
                  />
                  <label
                    alt="Subscription"
                    htmlFor="Subscription"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Subscription
                  </label>
                </div>
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="ProfileImage"
                id="ProfileImage"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                defaultValue={user.photoURL}
              />
              <label
                alt="Profile Image"
                htmlFor="ProfileImage"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Profile Image
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  alt="Gender"
                  type="text"
                  name="BiodataType"
                  id="BiodataType"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="BiodataType"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Gender
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="Age"
                  id="Age"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Age"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Age
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  alt="Height"
                  type="number"
                  name="Height"
                  id="Height"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Height"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Height in CM
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="Weight"
                  id="Weight"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Weight"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Weight in KG
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="Race"
                  id="Race"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Race"
                  htmlFor="Race"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Race
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="Occupation"
                  id="Occupation"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Occupation"
                  htmlFor="Occupation"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Occupation
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="DateOfBirth"
                  id="DateOfBirth"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Date Of Birth"
                  htmlFor="DateOfBirth"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date Of Birth
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="FathersName"
                  id="FathersName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Fathers Name"
                  htmlFor="FathersName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Father Name
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="MothersName"
                  id="MothersName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Mothers Name"
                  htmlFor="MothersName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mother Name
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="PermanentDivision"
                  id="PermanentDivision"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Permanent Division"
                  htmlFor="PermanentDivision"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Permanent Division
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="PresentDivision"
                  id="PresentDivision"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Present Division"
                  htmlFor="PresentDivision"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Present Division
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                  defaultValue={user.email}
                />
                <label
                  htmlFor="Email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="MobileNumber"
                  id="MobileNumber"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Mobile Number"
                  htmlFor="MobileNumber"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mobile Number
                </label>
              </div>
            </div>
            <p className="text-center">Expected Partner:</p>
            <div
              style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}
            ></div>

            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="ExpectedPartnerHeight"
                  id="ExpectedPartnerHeight"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Expected Partner Height"
                  htmlFor="ExpectedPartnerHeight"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Height in CM
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="ExpectedPartnerWeight"
                  id="ExpectedPartnerWeight"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Expected Partner Weight in KG"
                  htmlFor="ExpectedPartnerWeight"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Weight in KG
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="ExpectedPartnerAge"
                  id="ExpectedPartnerAge"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                  placeholder=" "
                />
                <label
                  alt="Expected Partner Age"
                  htmlFor="ExpectedPartnerAge"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Age
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg w-full px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ViewBio;
