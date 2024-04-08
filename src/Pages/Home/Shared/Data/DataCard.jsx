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
        <Card className="p-4 shadow-md shadow-black h-full">
          <div className="flex flex-col items-center">
            <img
              src={ProfileImage}
              alt="image"
              className="mb-3 rounded-full shadow-lg w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
            />
            <h5 className="mb-1 md:text-xl font-medium text-gray-900 dark:text-white">
              {Name}
            </h5>
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {BiodataType}
              </p>
              <Badge color="warning" className="text-xs md:text-sm">
                {Subscription}
              </Badge>
            </div>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Link
                to={`/details/${_id}`}
                className="inline-flex items-center rounded-lg bg-pink-500 px-4 py-2 text-center md:text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-500 dark:focus:ring-pink-800 text-xs"
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
