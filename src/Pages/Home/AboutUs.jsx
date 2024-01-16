import { useState } from "react";

const AboutUs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (accordionIndex) => {
    setActiveAccordion(
      activeAccordion === accordionIndex ? null : accordionIndex
    );
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
          Welcome to Soul<span className="text-pink-500">Mingle</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Where Connections Blossom!
        </p>
      </div>
      <p className="text-justify text-base md:text-lg lg:text-xl text-gray-700 mt-4">
        At SoulMingle, we are passionate about creating a platform that goes
        beyond the ordinary. We believe that genuine connections are the
        foundation of a fulfilling life. Our mission is to provide a space where
        individuals can explore the depths of meaningful relationships, share
        their unique stories, and build lasting connections that transcend the
        boundaries of time and distance.
      </p>

      <div id="accordion-collapse" data-accordion="collapse" className="mt-8">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className={`flex items-center justify-between w-full p-3 md:p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${
              activeAccordion === 1 ? "active" : ""
            }`}
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded={activeAccordion === 1}
            aria-controls="accordion-collapse-body-1"
            onClick={() => toggleAccordion(1)}
          >
            <span>Our Story:</span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 rotate-180 shrink-0 ${
                activeAccordion === 1 ? "rotate-0" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`p-3 md:p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
            activeAccordion === 1 ? "block" : "hidden"
          }`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            SoulMingle was born out of a vision to create a platform that brings
            people together in a world that can sometimes feel disconnected. We
            envisioned a space where individuals could explore the depths of
            meaningful relationships, share their stories, and build lasting
            connections that transcend the boundaries of time and distance.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to{" "}
            <a
              href="/docs/getting-started/introduction/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              get started
            </a>{" "}
            and start developing websites even faster with components on top of
            Tailwind CSS.
          </p>
        </div>

        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            className={`flex items-center justify-between w-full p-3 md:p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${
              activeAccordion === 2 ? "active" : ""
            }`}
            data-accordion-target="#accordion-collapse-body-2"
            aria-expanded={activeAccordion === 2}
            aria-controls="accordion-collapse-body-2"
            onClick={() => toggleAccordion(2)}
          >
            <span>Is there a Figma file available?</span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 rotate-180 shrink-0 ${
                activeAccordion === 2 ? "rotate-0" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-2"
          className={`p-3 md:p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
            activeAccordion === 2 ? "block" : "hidden"
          }`}
          aria-labelledby="accordion-collapse-heading-2"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            SoulMingle is designed with user experience in mind. Everything you
            see on our platform is thoughtfully created to enhance your journey
            in building connections and creating meaningful relationships.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Explore the{" "}
            <a
              href="https://flowbite.com/figma/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              design system
            </a>{" "}
            based on the utility classNamees from Tailwind CSS and components
            from SoulMingle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
