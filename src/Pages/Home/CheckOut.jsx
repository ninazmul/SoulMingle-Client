import { useState, useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Button, Label, TextInput } from "flowbite-react";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CheckOut = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [bios, setBio] = useState({ _id: "" });
  const [loading, setLoading] = useState(true);
  const [stripeCardNumber, setStripeCardNumber] = useState("");
  const [userBioDataId, setUserBioDataId] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://soul-mingle-server.vercel.app/bioData/${id}`
        );
        const data = await response.json();
        setBio(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bio details:", error);
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://soul-mingle-server.vercel.app/user"
        );
        const data = await response.json();

        const userData = data.find((userData) => userData.email === user.email);

        if (userData) {
          setUserBioDataId(userData._id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
    fetchUserData();
  }, [id, user.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const partnerBioDataId = bios ? bios._id : "";
    const userEmail = user ? user.email : "";

    try {
      const response = await fetch(
        "https://soul-mingle-server.vercel.app/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            partnerBioDataId,
            userBioDataId,
            userEmail,
            stripeCardNumber,
            status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Checkout Successful!",
          text: "Your checkout request was successful.",
        });
        console.log("Checkout request successful!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Checkout Failed",
          text: `Error: ${data.message}`,
        });
        console.error("Error in checkout request:", data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: `Error: ${error.message}`,
      });
      console.error("Error making checkout request:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <SectionTitle heading="Check Out Request" subHeading="request now!" />
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text1" value="Partner BioData Id" />
            </div>
            <TextInput
              id="text1"
              type="text"
              placeholder={bios ? bios._id : ""}
              defaultValue={bios ? bios._id : ""}
              readOnly
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text2" value="Your BioData Id" />
            </div>
            <TextInput
              id="text2"
              type="text"
              placeholder={userBioDataId}
              defaultValue={userBioDataId}
              readOnly
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text3" value="Your Email" />
            </div>
            <TextInput
              id="text3"
              type="text"
              placeholder={user ? user.email : ""}
              defaultValue={user ? user.email : ""}
              readOnly
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text4" value="Stripe Card Number" />
            </div>
            <TextInput
              id="text4"
              type="number"
              placeholder="Input your stripe card number"
              required
              onChange={(e) => setStripeCardNumber(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text5" value="Status" />
            </div>
            <TextInput
              id="text5"
              type="text"
              placeholder="Enter status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              readOnly
            />
          </div>
          <Button className="bg-pink-500" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CheckOut;
