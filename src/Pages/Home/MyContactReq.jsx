import { Table } from "flowbite-react";
// import useAxios from "../../Hooks/useAxios";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const MyContactReq = () => {
const axiosSecure = useAxios();

const { data: checkout = [] } = useQuery({
  queryKey: ["checkout"],
  queryFn: async () => {
    const res = await axiosSecure.get("/checkout");
    return res.data;
  },
});
    return (
      <section className="overflow-x-auto">
        <SectionTitle
          heading={`Total Contact Request: ${checkout.length}`}
          subHeading="My Contact Request"
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
            {checkout.map((user, index) => {
              const userCheckout = checkout.find((c) => c.Email === user.email);
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={user._id}
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{userCheckout?.partnerBioDataId}</Table.Cell>
                  <Table.Cell>{userCheckout?.userBioDataId}</Table.Cell>
                  <Table.Cell>{userCheckout?.userEmail}</Table.Cell>
                  <Table.Cell>{userCheckout?.status || "Pending"}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </section>
    );
};

export default MyContactReq;