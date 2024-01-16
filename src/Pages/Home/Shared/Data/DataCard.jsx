import { Card, Badge } from "flowbite-react";
import { Link } from "react-router-dom";


const DataCard = ({ bio }) => {
  const {
    _id,
    Name,
    BiodataType,
    ProfileImage,
    Subscription,
  } = bio;

    return (
      <div>
        <Card className="m-4 shadow-md shadow-black">
          <div className="flex flex-col items-center pb-10">
            <img
              src={ProfileImage}
              alt="image"
              height="200px"
              width="200px"
              className="mb-3 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {Name}
            </h5>
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {BiodataType}
              </p>
              <Badge color="warning" size="sm">
                {Subscription}
              </Badge>
            </div>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Link
                to={`/details/${_id}`}
                className="inline-flex items-center rounded-lg bg-pink-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-500 dark:focus:ring-pink-800"
              >
                View Profile
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
};

export default DataCard;
