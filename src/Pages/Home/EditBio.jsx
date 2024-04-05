import { useState } from "react";
import { Button, Card } from "flowbite-react";
import useBioData from "../../Hooks/useBioData";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const EditBio = () => {
  const [bio, reloadBio] = useBioData();
  const { user } = useAuth();
  const [formData, setFormData] = useState({});

  const filteredBioData = bio.filter((data) => data.Email === user.email);
  const userFound = filteredBioData.length > 0;

  const handleUpdateBio = async (e) => {
    e.preventDefault();

    const updateBio = { ...filteredBioData[0], ...formData };

    try {
      const response = await fetch(
        `http://localhost:5000/bioData/${filteredBioData[0]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateBio),
        }
      );

      const data = await response.json();

      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Bio Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reloadBio();
      }
    } catch (error) {
      console.error("Error updating bio:", error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update bio. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <SectionTitle heading="My BioData" subHeading="Edit"></SectionTitle>
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
                      className="w-96 rounded-lg"
                      src={data.ProfileImage}
                      alt=""
                    />
                  </div>
                  <div className=" w-2/3">
                    <form
                      className="max-w-md mx-auto"
                      onSubmit={handleUpdateBio}
                      onChange={handleChange}
                    >
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="Name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                            defaultValue={data.Name || "Name"}
                          />
                          <label
                            alt="Name"
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            {data.Name}
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="Subscription"
                            id="Subscription"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                            defaultValue={data.Subscription || "Free"}
                            readOnly
                          />
                          <label
                            alt="Subscription"
                            htmlFor="Subscription"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            {data.Subscription}
                          </label>
                        </div>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="ProfileImage"
                          id="ProfileImage"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                          defaultValue={data.ProfileImage || "Profile Image"}
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
                          <select
                            name="BiodataType"
                            id="BiodataType"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                            value={formData.Gender}
                            onChange={handleChange}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
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
                            defaultValue={data.Age || "Age"}
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
                          <label
                            htmlFor="Height"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Height In CM
                          </label>
                          <select
                            id="Height"
                            name="Height"
                            defaultValue={data.Height || "Height"}
                            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600"
                          >
                            <option value="Height" disabled>
                              Select Height
                            </option>
                            <option value="150">150 CM</option>
                            <option value="160">160 CM</option>
                            <option value="170">170 CM</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <label
                            htmlFor="Weight"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Weight In KG
                          </label>
                          <select
                            id="Weight"
                            name="Weight"
                            defaultValue={data.Weight || "Weight"}
                            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600"
                          >
                            <option value="Weight" disabled>
                              Select Weight
                            </option>
                            <option value="50">50 KG</option>
                            <option value="60">60 KG</option>
                            <option value="70">70 KG</option>
                          </select>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            name="Race"
                            id="Race"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                            value={formData.Gender}
                            onChange={handleChange}
                          >
                            <option value="Asian">Asian</option>
                            <option value="Caucasian or White">
                              Caucasian or White
                            </option>
                            <option value="African or Black">
                              African or Black
                            </option>
                            <option value="Native American or Indigenous">
                              Native American or Indigenous
                            </option>
                            <option value="Pacific Islander">
                              Pacific Islander
                            </option>
                          </select>
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
                          <select
                            name="Occupation"
                            id="Occupation"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                            value={formData.Gender}
                            onChange={handleChange}
                          >
                            <option value="Govt. Job">Govt. Job</option>
                            <option value="Private Job">Private Job</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Student">Student</option>
                            <option value="House Wife">House Wife</option>
                          </select>
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
                            defaultValue={data.DateOfBirth || "Date Of Birth"}
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
                            defaultValue={data.FathersName || "Fathers Name"}
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
                            defaultValue={data.MothersName || "Mothers Name"}
                          />
                          <label
                            alt="Mothers Name"
                            htmlFor="MothersName"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Mohter Name
                          </label>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <label
                            htmlFor="PermanentDivision"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Permanent Division
                          </label>
                          <select
                            id="PermanentDivision"
                            name="PermanentDivision"
                            defaultValue={
                              data.PermanentDivision || "Permanent Division"
                            }
                            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600"
                          >
                            <option value="" disabled>
                              Select Permanent Division
                            </option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattagram">Chattagram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Maymansign">Maymansign</option>
                            <option value="Sylhet">Sylhet</option>
                          </select>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <label
                            htmlFor="PresentDivision"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Present Division
                          </label>
                          <select
                            id="PresentDivision"
                            name="PresentDivision"
                            defaultValue={
                              data.PresentDivision || "Present Division"
                            }
                            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600"
                          >
                            <option value="" disabled>
                              Select Present Division
                            </option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattagram">Chattagram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Maymansign">Maymansign</option>
                            <option value="Sylhet">Sylhet</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="email"
                            name="Email"
                            id="Email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                            defaultValue={data.Email || "Email"}
                            readOnly
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
                            defaultValue={data.MobileNumber || "Mobile Number"}
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
                        style={{
                          borderBottom: "1px solid #ccc",
                          margin: "10px 0",
                        }}
                      ></div>

                      <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <label
                            htmlFor="Height"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Height In CM
                          </label>
                          <select
                            id="ExpectedPartnerHeight"
                            name="ExpectedPartnerHeight"
                            defaultValue={
                              data.ExpectedPartnerHeight ||
                              "ExpectedPartnerHeight"
                            }
                            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600"
                          >
                            <option value="ExpectedPartnerHeight" disabled>
                              Select Height
                            </option>
                            <option value="150">150 CM</option>
                            <option value="160">160 CM</option>
                            <option value="170">170 CM</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <label
                            htmlFor="Weight"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Weight In KG
                          </label>
                          <select
                            id="ExpectedPartnerWeight"
                            name="ExpectedPartnerWeight"
                            defaultValue={
                              data.ExpectedPartnerWeight ||
                              "ExpectedPartnerWeight"
                            }
                            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600"
                          >
                            <option value="ExpectedPartnerWeight" disabled>
                              Select Weight
                            </option>
                            <option value="50">50 KG</option>
                            <option value="60">60 KG</option>
                            <option value="70">70 KG</option>
                          </select>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="number"
                            name="ExpectedPartnerAge"
                            id="ExpectedPartnerAge"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                            defaultValue={
                              data.ExpectedPartnerAge || "Partner Age"
                            }
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
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center flex flex-col items-center">
          <p className="text-3xl pb-2 font-bold text-center">
            Bio data not found. Please create your bio.
          </p>
          <Link to="/dashboard/viewBio">
            <Button className="bg-pink-500">Create BioData</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default EditBio;
