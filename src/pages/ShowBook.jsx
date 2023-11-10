import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";


export const ShowBook = () => {
  const [book, setBooks] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books/" + id)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4">ShowBook</h1>
      {loading ? (<Spinner></Spinner>) : (
        <div className="flex flex-col border-2 border-sky-300 rounded-xl">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-300">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-300">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-300">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-300">Date</span>
            <span>{new Date(book.date).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook;