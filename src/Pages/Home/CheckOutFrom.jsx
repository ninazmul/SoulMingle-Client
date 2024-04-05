import { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutFrom = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [bios, setBio] = useState({ _id: "" });
  const [loading, setLoading] = useState(true);
  const [stripeCardNumber, setStripeCardNumber] = useState("");
  const [userBioDataId, setUserBioDataId] = useState("");
    const [status, setStatus] = useState("Pending");
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bioData/${id}`);
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
        const response = await fetch("http://localhost:5000/user");
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

      if (!stripe || !elements) {
          return 
      }

      const card = elements.getElement("card");

      if (card === null) {
          return
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card
      })

    const partnerBioDataId = bios ? bios._id : "";
    const userEmail = user ? user.email : "";

    try {
      const response = await fetch("http://localhost:5000/checkout", {
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
      });

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
        <PaymentElement />
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="text5" value="Status" />
          </div>
          <TextInput
            id="text4"
            type="text"
            placeholder="Enter Stipe Number"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            readOnly
          />
        </div>
        <div className="hidden">
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
        <Button
          className="bg-pink-500"
          type="submit"
          disabled={!stripe || !elements}
        >
          Submit
        </Button>

        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CheckOutFrom;
