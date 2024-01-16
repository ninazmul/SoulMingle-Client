import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCheckout = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const { refetch, data: checkout = [] } = useQuery({
    queryKey: ["checkout", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/checkout?email=${user.email}`);
      return res.data;
    },
  });
  return [checkout, refetch];
};

export default useCheckout;
