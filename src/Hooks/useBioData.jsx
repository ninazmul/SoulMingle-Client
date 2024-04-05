import { useState, useEffect } from "react";

const useBioData = () => {
  const [bio, setBio] = useState([]);

  const fetchBioData = async () => {
    try {
      const response = await fetch("http://localhost:5000/bioData");
      const data = await response.json();
      setBio(data);
    } catch (error) {
      console.error("Error fetching bio data:", error.message);
    }
  };

  useEffect(() => {
    fetchBioData();
  }, []);

  const reloadBio = () => {
    fetchBioData();
  };

  return [bio, reloadBio];
};

export default useBioData;
