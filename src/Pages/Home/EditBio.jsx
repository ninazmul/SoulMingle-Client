import React, { useState } from "react";
import { Badge, Card, Button } from "flowbite-react";
import useBioData from "../../Hooks/useBioData";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const EditBio = () => {
  const [bio] = useBioData();
  const { user } = useAuth();
  const [editedBioData, setEditedBioData] = useState({});

  // Filter the bio data based on the authenticated user's email
  const filteredBioData = bio.filter((data) => data.Email === user.email);

  // Update function to send edited data to the server
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/bioData/${filteredBioData[0]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedBioData),
        }
      );

      if (response.ok) {
        // Handle successful update (e.g., show a success message)
        console.log("Bio data updated successfully");
      } else {
        // Handle update failure (e.g., show an error message)
        console.error("Failed to update bio data");
      }
    } catch (error) {
      console.error("Error updating bio data:", error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section>
      <SectionTitle heading="My BioData" subHeading="Edit"></SectionTitle>
      {filteredBioData.map((data) => (
        <div
          className="flex flex-col md:flex-row justify-around items-center"
          key={data._id}
        >
          <div className="flex items-center">
            <Card className="">
              <div className="flex flex-col lg:flex-row items-center justify-around gap-10">
                <div className="w-1/3">
                  <img className="" src={data.ProfileImage} alt="" />
                </div>
                <div className=" w-2/3">
                  {/* Editable form */}

                  <form className="max-w-md mx-auto">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="password"
                        name="repeat_password"
                        id="floating_repeat_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Confirm password
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_first_name"
                          id="floating_first_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_first_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First name
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_last_name"
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_last_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="tel"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          name="floating_phone"
                          id="floating_phone"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_phone"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Phone number (123-456-7890)
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_company"
                          id="floating_company"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_company"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Company (Ex. Google)
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
      ))}
    </section>
  );
};

export default EditBio;
