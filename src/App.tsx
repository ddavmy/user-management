import { Container, Typography } from "@mui/material";
import "./App.css";
import UserTable from "./components/UserTable";

function App() {
  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" mt={3}>
        User Management Table
      </Typography>
      <UserTable />
    </Container>
  );
}

export default App;
