import { useEffect, useState } from "react";


const useCouples = () => {
  const [couple, setCouple] = useState([]);

  const fetchCoupleData = async () => {
    try {
      const response = await fetch("couple.json");
      const data = await response.json();
      setCouple(data);
    } catch (error) {
      console.error("Error fetching Couple data:", error.message);
    }
  };

  useEffect(() => {
    fetchCoupleData();
  }, []);

  const reloadCouple = () => {
    fetchCoupleData();
  };

  return [couple, reloadCouple];
};

export default useCouples;