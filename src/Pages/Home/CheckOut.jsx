import { useState, useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Button, Label, TextInput } from "flowbite-react";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";

const CheckOut = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [bios, setBio] = useState({ _id: "" });
  const [loading, setLoading] = useState(true);
console.log("User ID:", user._id, user.email);

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

    fetchData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
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
              placeholder={user ? user._id : "Input Your BioData"}
              defaultValue={user ? user._id : ""}
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
