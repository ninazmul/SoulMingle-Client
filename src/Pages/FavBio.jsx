import { Link } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle/SectionTitle";
import useFavBio from "../Hooks/useFavBio";
import { Table } from "flowbite-react";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";


const FavBio = () => {

    const [favBio, refetch] = useFavBio();
    const axiosSecure = useAxios();

    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            
              axiosSecure.delete(`/favBio/${id}`)
                  .then(res => {
                      if (res.data.deletedCount > 0) {
                          refetch();
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success",
                        });
                      }
              })
          }
        });
    }

    return (
      <section className="overflow-x-auto">
        <SectionTitle
          heading={`Total Favourites: ${favBio.length}`}
          subHeading="My Favourites"
        ></SectionTitle>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Age</Table.HeadCell>
            <Table.HeadCell>Occupation</Table.HeadCell>
            <Table.HeadCell>Permanent Address</Table.HeadCell>
            <Table.HeadCell>Subscription</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {favBio.map((bio) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={bio._id}
              >
                <Table.Cell>
                  <img src={bio.ProfileImage} alt="" className="h-10 rounded-full" />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {bio.Name}
                </Table.Cell>
                <Table.Cell>{bio.BiodataType}</Table.Cell>
                <Table.Cell>{bio.Age}</Table.Cell>
                <Table.Cell>{bio.Occupation}</Table.Cell>
                <Table.Cell>{bio.PermanentDivision}</Table.Cell>
                <Table.Cell>{bio.Subscription}</Table.Cell>
                <Table.Cell>
                  <Link
                    onClick={() => handleDelete(bio._id)}
                    className="text-xl text-pink-600 hover:underline dark:text-cyan-500"
                  >
                    <MdOutlineDeleteForever />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    );
};

export default FavBio;