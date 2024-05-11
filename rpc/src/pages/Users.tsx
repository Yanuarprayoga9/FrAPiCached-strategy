import { TableComp } from "../components/UserTable";
import {  useGetUsers } from "../hooks/useGetUsers";


const Users = () => {
  const { isLoading, data, isError } = useGetUsers({});
  console.log(data);
  if (isLoading) return <h1>loading</h1>;
  if (isError) return <h1 className="text-7xl text-red-500">error</h1>;

  return (
    <div>
      {data ? <TableComp datatable={data.users} /> : <h2>loading</h2>}
      </div>
  );
};

export default Users;
