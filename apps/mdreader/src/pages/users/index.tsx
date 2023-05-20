import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@mdreader/ui/components/ui/table';
import { useProfiles } from '../../hooks/useProfiles';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@mdreader/ui/components/ui/avatar';
import { Link } from 'react-router-dom';

const Users = () => {
  const { data: users } = useProfiles();

  return (
    <div className="w-100 max-w-full">
      <h1 className="ml-3 text-4xl">Users</h1>

      <Table>
        <TableCaption>A list of MD Reader Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead className="w-[2000px]">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage
                    src={`https://github.com/${user.login}.png`}
                    alt={user.login}
                  />
                  <AvatarFallback>{user.login}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <Link to={`/profile/${user.login}`}>{user.name}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Users;
