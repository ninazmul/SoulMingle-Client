import { Badge, Card } from "flowbite-react";
import useBioData from "../../Hooks/useBioData";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";


const ViewBio = () => {
const [bio] = useBioData();
const { user } = useAuth();

// Filter the bio data based on the authenticated user's email
const filteredBioData = bio.filter((data) => data.Email === user.email);

    return (
      <section>
        <SectionTitle heading='My BioData' subHeading='view'></SectionTitle>
        {filteredBioData.map((data) => (
          <div className="flex flex-col md:flex-row justify-around items-center" key={data._id}>
            <div className="flex items-center">
              <Card className="">
                <div className="flex flex-col lg:flex-row items-center justify-around gap-10">
                  <div className="w-1/3">
                    <img className="" src={data.ProfileImage} alt="" />
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
        ))}
      </section>
    );
};

export default ViewBio;