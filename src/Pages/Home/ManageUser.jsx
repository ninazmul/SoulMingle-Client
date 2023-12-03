import { Button, Table } from "flowbite-react";
import useAxios from "../../Hooks/useAxios";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const ManageUser = () => {
  const axiosSecure = useAxios();
  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const { data: bio = [] } = useQuery({
    queryKey: ["bio"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bioData");
      return res.data;
    },
  });

  const makeAdmin = (user) => {
    axiosSecure
      .patch(`/user/admin/${user._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          axiosSecure.refetch();
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Admin!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Successful!",
                text: `${user.name} is an Admin Now!`,
                icon: "success",
              });
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error making user admin:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to make user admin. Please try again later.",
          icon: "error",
        });
      });
  };

   

const makePremium = (user) => {
  const userBio = bio.find((bioData) => bioData.Email === user.email);

  console.log("User Bio:", userBio);

  if (userBio && userBio.Subscription !== "Premium") {
    axiosSecure
      .patch(`/bioData/Premium/${userBio._id}`)
      .then((res) => {
        console.log("Premium Response:", res.data);

        if (res.data.modifiedCount > 0) {
          axiosSecure.refetch();
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Premium!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Successful!",
                text: `${user.name} is Now a Premium member!`,
                icon: "success",
              });
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error making user Premium:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to make user Premium. Please try again later.",
          icon: "error",
        });
      });
  }
};


  return (
    <section className="overflow-x-auto">
      <SectionTitle
        heading={`Total Users: ${users.length}`}
        subHeading="Manage Users"
      ></SectionTitle>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Make Admin</Table.HeadCell>
          <Table.HeadCell>Make Premium</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user, index) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={user._id}
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.name}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                {user.role === "admin" ? (
                  "Admin"
                ) : (
                  <Button
                    onClick={() => makeAdmin(user)}
                    outline
                    gradientDuoTone="purpleToPink"
                  >
                    Make Admin
                  </Button>
                )}
              </Table.Cell>
              <Table.Cell>
                {bio.find((bioData) => bioData.Email === user.email)
                  ?. Subscription === "Premium" ? (
                  "Premium"
                ) : (
                  <Button
                    onClick={() => makePremium(user)}
                    outline
                    gradientDuoTone="purpleToPink"
                  >
                    Make Premium
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );
};

export default ManageUser;
