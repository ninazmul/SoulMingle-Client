import { Button, Table } from "flowbite-react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";

const ApprovedPremium = () => {
  const axiosSecure = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumUsers = async () => {
      try {
        const response = await axiosSecure.get(
          "http://localhost:5000/premiumSubscription"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching premium users:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumUsers();
  }, [axiosSecure]);

  const makePremium = async (user) => {
    try {
      const response = await axiosSecure.post(
        "http://localhost:5000/premiumSubscription",
        {
          email: user.email,
        }
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((prevUser) =>
            prevUser.email === user.email
              ? { ...prevUser, Subscription: "Premium" }
              : prevUser
          )
        );
      }
    } catch (error) {
      console.error("Error making user premium:", error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="overflow-x-auto">
      <SectionTitle
        heading={`Total Request: `}
        subHeading="Approve Premium"
      ></SectionTitle>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
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
                {user.Subscription === "Premium" ? (
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

export default ApprovedPremium;
