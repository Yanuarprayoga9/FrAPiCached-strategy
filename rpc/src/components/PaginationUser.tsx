import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


interface PaginationUserProps{
    total:number;
    page:number;
    setPage:(e:number)=>void
}
export const PaginationUser:React.FC<PaginationUserProps> = ({total,page,setPage}) => {
    const totalPage = Math.ceil(total/5)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
    </Stack>
  );
}