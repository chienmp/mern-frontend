import React from "react";
import { Link } from "react-router-dom";
import { PiBookOpenLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { BookModal } from "./BookModal";

export const SingleCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className="border-2 border-grey-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
      key={item._id}
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {item.date}
      </h2>
      <h4 className="my-2 text-gray-200">{item._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenLight className="text-red-300 text-2xl"></PiBookOpenLight>
        <h2 className="my-1">{item.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl"></BiUserCircle>
        <h2 className="my-1">{item.author}</h2>
      </div>
      <div className="flex justify-center items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        ></BiShow>
        <Link to={"/books/details/" + item._id}>
          <BsInfoCircle className="text-2xl text-green-600 hover:text-black"></BsInfoCircle>
        </Link>
        <Link to={"/books/edit/" + item._id}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black"></AiOutlineEdit>
        </Link>
        <Link to={"/books/delete/" + item._id}>
          <MdDeleteOutline className="text-2xl text-red-600 hover:text-black"></MdDeleteOutline>
        </Link>
      </div>
      {showModal && (
        <BookModal item={item} onClose={() => setShowModal(false)}></BookModal>
      )}
    </div>
  );
};
