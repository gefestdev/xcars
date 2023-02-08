import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Car from "./pages/Car";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/account" element={<Account />}></Route>
        <Route exact path="/car" element={<Car />}></Route>
      </Routes>
    </div>
  );
}

export default App;
