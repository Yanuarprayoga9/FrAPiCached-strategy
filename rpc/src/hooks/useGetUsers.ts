import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../utils/constant";

type query = {
  search?: string;
  limit?: number;
  page?: number;
};

export async function getUsers({ search, limit, page }: query) {
  try {
    const queryL = limit ? `&limit=${limit}` : "";
    const queryP = page ? `&page=${page}` : "";

    const url = `${baseUrl}/user?search=${search || ""}${queryL}${queryP}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const useGetUsers = ({ search, limit, page }: query) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ search, limit, page }),
  });
};
