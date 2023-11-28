import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";


const useFavBio = () => {

    const axiosSecure = useAxios();
    const { user } = useAuth();
    const { data: favBio = [] } = useQuery({
        queryKey: ["favBio", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favBio?email=${user.email}`);
            return res.data;
        }
    })
    return [favBio];
};

export default useFavBio;