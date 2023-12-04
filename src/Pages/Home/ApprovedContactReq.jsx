import { Button, Table } from "flowbite-react";
import useAxios from "../../Hooks/useAxios";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
// import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ApprovedContactReq = () => {
    const axiosSecure = useAxios();
    
  const { data: checkout = [] } = useQuery({
    queryKey: ["checkout"],
    queryFn: async () => {
      const res = await axiosSecure.get("/checkout");
      return res.data;
    },
  });

  const makeApproved = (userCheckout) => {
    console.log("User Bio:", userCheckout);

    if (
      userCheckout &&
      userCheckout.status === "Pending" &&
      userCheckout.subscription !== "Premium"
    ) {
      axiosSecure
        .patch(`/checkout/Approved/${userCheckout._id}`)
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
                  text: `${userCheckout.userEmail} is Now a Premium member!`,
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
        heading={`Total checkout: ${checkout.length}`}
        subHeading="Manage checkout"
      ></SectionTitle>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Partner BioData ID</Table.HeadCell>
          <Table.HeadCell>User BioData ID</Table.HeadCell>
          <Table.HeadCell>User Email</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {checkout.map((userCheckout, index) => {
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={userCheckout._id}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{userCheckout?.partnerBioDataId}</Table.Cell>
                <Table.Cell>{userCheckout?.userBioDataId}</Table.Cell>
                <Table.Cell>{userCheckout?.userEmail}</Table.Cell>
                <Table.Cell>
                  {userCheckout?.status === "Pending" ? (
                    <Button
                      onClick={() => makeApproved(userCheckout)}
                      outline
                      gradientDuoTone="purpleToPink"
                    >
                      Approve
                    </Button>
                  ) : (
                    "Approved"
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </section>
  );
};

export default ApprovedContactReq;