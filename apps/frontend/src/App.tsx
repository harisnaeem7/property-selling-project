import "./App.css";
import NavBar from "./components/header/NavBar";
import Routing from "./routes/Routes";
import { AuthHOC } from "./api/api";
function App() {
  return (
    <>
      <AuthHOC />
      <NavBar />
      <Routing />
    </>
  );
}

export default App;
