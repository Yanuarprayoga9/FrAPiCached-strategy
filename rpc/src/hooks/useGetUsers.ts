import { useQuery } from "@tanstack/react-query";

type query = {
  search?: string;
  limit?: number;
  page?: number;
};

export async function getUsers({ search, limit, page }: query) {
  try {
    const queryL = limit ? `&limit=${limit}` : "";
    const queryP = page ? `&page=${page}` : "";

    const url = `http://localhost:5000/user?search=${
      search || ""
    }${queryL}${queryP}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const useGetUsers = ({ search, limit, page }: query) => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ search, limit, page }),
  });

  return users;
};
