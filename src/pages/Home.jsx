import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox, MdLogin } from "react-icons/md";
import { Table } from "../components/home/Table";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "../components/home/Card";
import Cookies from "universal-cookie";
import { sendGet } from "../utils/axios";


export const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const cookies = new Cookies();
  const Logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    navigate("/");
  };
  useEffect(() => {
    setLoading(true);
    const getBooks = async () => {
      const books = await sendGet('/books');
      setBooks(books);
      setLoading(false);
    }
    getBooks();
    const userEmail = cookies.get('userEmail');
    setUserEmail(userEmail);
    toast(`Hello ${userEmail}`, {
      position: "top-right",
    })
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
      <h4>
          {" "}
          Welcome <span>{userEmail}</span>
        </h4>
        <button className="bg-sky-400 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={Logout}>LOGOUT</button>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <button className="bg-sky-400 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>
              Table
        </button>
        <button className="bg-sky-400 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>
              Card
        </button>
        <Link to="/register">
          <MdLogin className="text-sky-500 text-4xl"></MdLogin>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 text-red-300">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
        </Link>
      </div>
      {loading ? <Spinner /> : (showType === 'table' ? <Table books={books}></Table> : <Card books={books}></Card>) }
      <ToastContainer />
    </div>
  );
};

export default Home;
