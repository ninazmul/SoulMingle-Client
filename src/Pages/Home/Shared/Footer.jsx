

const Footer = () => {
    return (
      <div>
        <footer className="bg-pink-500 rounded-lg shadow m-4">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <a
                href="/"
                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="https://i.ibb.co/4dxnZw8/Soul-Mingle-removebg-preview.png"
                  className="h-8"
                  alt="SoulMingle Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Soul<span className="text-white">Mingle</span>
                </span>
              </a>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white">
                <li>
                  <a
                    href="/about"
                    className="hover:underline me-4 md:me-6 hover:text-pink-900 focus:text-pink-500"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline me-4 md:me-6 hover:text-pink-900 focus:text-pink-500"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline me-4 md:me-6 hover:text-pink-900 focus:text-pink-500"
                  >
                    Licensing
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:underline hover:text-pink-900 focus:text-pink-500"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-white sm:text-center">
              © 2023{" "}
              <a
                href="/"
                className="hover:underline hover:text-pink-900 focus:text-pink-500"
              >
                SoulMingle™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    );
};

export default Footer;