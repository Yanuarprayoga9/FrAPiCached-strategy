import { useEffect, useState } from "react";
import { TableComp } from "../components/UserTable";
import { useGetUsers } from "../hooks/useGetUsers";
import { SearchUser } from "../components/SearchUser";
import { UseDebounce } from "../hooks/useDebounce";
import { PaginationUser } from "../components/PaginationUser";
import { Grid } from "@mui/material";
import { ModalFormUser } from "../components/ModalFormUser";

const Users = () => {
  const [page, setPage] = useState(1);
  const [searchQ, setSearchQ] = useState("");
  const searchDebouncing = UseDebounce(searchQ);
  const { isLoading, data, isError, refetch } = useGetUsers({
    search: searchDebouncing,
    page,
    limit: 5,
  });

  useEffect(() => {
    refetch();
  }, [searchDebouncing, refetch, page]);

  if (isLoading) return <h1>loading</h1>;
  if (isError) return <h1 className="text-7xl text-red-500">error</h1>;

  return (
    <div>
      <Grid container spacing={2} sx={{ marginBottom:3 }}>
        <Grid item xs={8} >
          <SearchUser searchQ={searchQ} setSearchQ={setSearchQ} />
        </Grid>
        <Grid item xs={4}>
          <ModalFormUser />
        </Grid>
      </Grid>

      {data ? <TableComp datatable={data.users} /> : <h2>loading</h2>}
      <PaginationUser page={page} setPage={setPage} total={data.total} />
    </div>
  );
};

export default Users;
