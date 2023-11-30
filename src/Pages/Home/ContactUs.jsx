
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="max-w-screen-md mx-auto p-4 md:p-8 text-center bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-500 mb-4">
        Contact Us
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8">
        Thank you for visiting SoulMingle! If you have any questions or
        inquiries, please feel free to contact us at:
        <br />
        <strong className="text-pink-500">example@soulmingle.com</strong>
      </p>
      <div className="bg-pink-500 text-white p-4 md:p-6 rounded-lg mb-4">
        <p className="text-sm md:text-base lg:text-lg mb-4">
          You can also connect with us on social media:
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            <FaFacebook />
          </a>
          <a href="#" className="hover:underline">
            <FaTwitter />
          </a>
          <a href="#" className="hover:underline">
            <FaInstagram />
          </a>
        </div>
      </div>
      <p className="text-xs md:text-sm lg:text-base text-gray-700 mb-4">
        Ready to create your biodata? Sign in or view your bio on the dashboard.
      </p>
      <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
        <Link
          to="/signIn"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </Link>
        <Link
          to="/dashboard/viewBio"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2 md:mt-0"
        >
          View Bio
        </Link>
      </div>
    </div>
  );
};

export default ContactUs;
