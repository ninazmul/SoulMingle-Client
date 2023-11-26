import { useEffect, useState } from "react";


const useBioData = () => {
     const [bio, setBio] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
       fetch("http://localhost:5000/bioData")
         .then((res) => res.json())
         .then((bio) => {
           setBio(bio);
           setLoading(false);
         });
     }, []);
    
    return [bio, loading];

};

export default useBioData;