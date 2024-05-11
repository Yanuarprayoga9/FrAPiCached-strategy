
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path="user" element={<Users/>}/>
          <Route path="*" element={<h1>notfound</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
