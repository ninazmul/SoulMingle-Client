import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useBioData from "../../Hooks/useBioData";
import useAxios from "../../Hooks/useAxios";

const AdminDash = () => {
  const [bio, reloadBio] = useBioData();
  const axiosSecure = useAxios();
  const [totalRevenue, setTotalRevenue] = useState(0);

  const totalBiodataCount = bio.length;
  const maleBiodataCount = bio.filter((b) => b.BiodataType === "Male").length;
  const femaleBiodataCount = bio.filter(
    (b) => b.BiodataType === "Female"
  ).length;
  const premiumBiodataCount = bio.filter(
    (b) => b.Subscription === "Premium"
  ).length;

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
        axiosSecure.delete(`/bioData/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            reloadBio();
            // Update total revenue after deleting a premium user
            if (bio.find((b) => b._id === id)?.Subscription === "Premium") {
              setTotalRevenue((prevTotalRevenue) => prevTotalRevenue - 500);
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const calculateTotalRevenue = () => {
    const premiumUsers = bio.filter((b) => b.Subscription === "Premium");
    const revenueFromPremiumUsers = premiumUsers.length * 500;
    setTotalRevenue(revenueFromPremiumUsers);
  };

  React.useEffect(() => {
    calculateTotalRevenue();
  }, [bio]);

  return (
    <section className="overflow-x-auto">
      <SectionTitle
        heading={`Total Users: ${totalBiodataCount}`}
      ></SectionTitle>
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">Male users: {maleBiodataCount}</h1>
        <h1 className="text-2xl font-bold">
          Female users: {femaleBiodataCount}
        </h1>
        <h1 className="text-2xl font-bold">
          Premium users: {premiumBiodataCount}
        </h1>
        <h1 className="text-2xl font-bold">Total Revenue: {totalRevenue} BDT</h1>
      </div>

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
          {bio.map((bio) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={bio._id}
            >
              <Table.Cell>
                <img
                  src={bio.ProfileImage}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
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

export default AdminDash;
