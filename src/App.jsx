import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { sendPost } from "./utils/axios";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      const token = cookies.get("TOKEN");
      if (!token) {
        navigate("/login");
      } else {
        const data = await sendPost("/");
        const { status, user } = data;
        return status
          ? cookies.set("userEmail", user.userEmail, {
              path: "/",
            })
          : (cookies.remove("TOKEN", { path: "/" }), navigate("/login")); 
      }
    };
    verifyCookie();
  })
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/books/create" element={<CreateBook></CreateBook>}></Route>
      <Route
        path="/books/delete/:id"
        element={<DeleteBook></DeleteBook>}
      ></Route>
      <Route path="/books/edit/:id" element={<EditBook></EditBook>}></Route>
      <Route path="/books/details/:id" element={<ShowBook></ShowBook>}></Route>
    </Routes>
  );
}

export default App;
