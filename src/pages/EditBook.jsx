import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

export const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreateBook = () => {
    const data = {
      title,
      author,
      date,
    };
    setLoading(true);

    axios
      .post("http://localhost:5555/books/", data)
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
      <h1 className="text-3xl">Create Book</h1>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex flex-col border-2 border-sky-700 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full"
            ></input>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full"
            ></input>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full"
            ></input>
          </div>
          <button onClick={handleCreateBook} className="p-2 m-8 bg-blue-100">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
