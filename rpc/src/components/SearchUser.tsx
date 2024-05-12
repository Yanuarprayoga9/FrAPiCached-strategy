import Input from '@mui/joy/Input';

interface SearchUserProps {
  searchQ: string;
  setSearchQ: (e: string) => void;
}

export const SearchUser: React.FC<SearchUserProps> = ({
  searchQ,
  setSearchQ,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQ(e.target.value);
  };
  return (
    <Input
      onChange={onChange}
      defaultValue={searchQ}
      placeholder="Type in here…"
    />
  );
};
