import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchUsers } from "../features/users/usersSlice";

export const UserTable = () => {
  const usersState = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box mt={3} mx={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography align="center" variant="h6">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h6">
                  Username
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h6">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h6">
                  Phone
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersState.users.map((user) => (
              <TableRow key={user.name}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
