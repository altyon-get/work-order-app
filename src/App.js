import React from "react";
import WorkOrder from "./components/WorkOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => (
  <div className="flex gap-4 items-center">
    <FontAwesomeIcon icon={faChevronLeft} aria-label="Go back" />
    <h1 className="text-2xl font-bold">Create Workorder</h1>
  </div>
);

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Header />
        <button className="bg-teal-400 text-white py-2 px-6 rounded-md shadow-md hover:bg-teal-500 transition-all duration-200 ease-in-out">
          Save
        </button>
      </div>
      <WorkOrder />
    </div>
  );
};

export default App;
