import BackButton from "../components/BackButton";
import { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete("http://localhost:5555/books/" + id)
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl">Delete Book</h1>
      {loading ? <Spinner></Spinner> : ''}
      <div className="flex flex-col items-center border-2 border-sky-300 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure want to delete this book ?</h3>
        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>Yes, delete it</button>
      </div>
    </div>
  )
}

export default DeleteBook;