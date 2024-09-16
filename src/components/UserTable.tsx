import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchUsers, filterUsers } from "../features/users/usersSlice";

const UserTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, loading } = useSelector(
    (state: RootState) => state.users
  );
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchTerms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    dispatch(filterUsers({ ...searchTerms, [name]: value }));
  };

  if (loading === "pending") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (loading === "rejected") {
    return (
      <Typography variant="h6" color="error">
        Error while loading users
      </Typography>
    );
  }

  return (
    <Box mt={3} mx={2}>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TextField
                  fullWidth
                  label="Search Name"
                  name="name"
                  variant="standard"
                  value={searchTerms.name}
                  onChange={handleInputChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  label="Search Username"
                  name="username"
                  variant="standard"
                  value={searchTerms.username}
                  onChange={handleInputChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  label="Search Email"
                  name="email"
                  variant="standard"
                  value={searchTerms.email}
                  onChange={handleInputChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  label="Search Phone"
                  name="phone"
                  variant="standard"
                  value={searchTerms.phone}
                  onChange={handleInputChange}
                  size="small"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Username</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Phone</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.name}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>No user has been found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
