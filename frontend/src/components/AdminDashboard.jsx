import React, { useEffect, useState } from "react";
import { getAllusers, deleteUsers } from "../services/UsersService";
import Edit from "./EditButton";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage + 1;
  const endIndex = startIndex + itemsPerPage;

  const currentData = (users || []).slice(
    startIndex,
    Math.min(endIndex, users.length)
  );
  const handleDeleteUsers = async (id) => {
    try {
      const success = await deleteUsers(id);
      if (success) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
        toast.success("User Succesfully Deleted!");
      }
    } catch (error) {
      toast.error("User Doesn't Exist!");
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllusers();
        setUsers(users);
      } catch (error) {
        console.error(error.message);
      }
    };
    const interval = setInterval(() => {
      fetchUsers();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-auto bg-gray-200 px-4 py-10">
      <div className="flex justify-center items-center uppercase my-5 text-2xl text-gray-800">
        <h1 className="font-bold tracking-wider pb-10 pt-10">Users</h1>
      </div>
      <table className=" mx-auto border-collapse ">
        <thead>
          <tr className="bg-[#92c872]">
            <th className=" px-6  text-xs font-semibold text-white ">#</th>
            <th className=" px-6  text-xs font-semibold uppercase text-white ">
              Username
            </th>
            <th className=" px-6  text-xs font-semibold uppercase text-white">
              Email
            </th>

            <th
              colSpan={2}
              className="border-gray-300 px-6 py-4 text-xs font-semibold uppercase text-white"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((users, index) => (
            <tr
              key={users.id}
              className="hover:bg-gray-100 transition-colors text-sm  border-gray-300"
            >
              <td className=" border-gray-500 px-6  bg-gray-100 text-center text-gray-800 font-bold">
                {startIndex + index}
              </td>
              <td className="border-gray-500 px-6  bg-gray-100  text-center text-gray-800 font-semibold">
                {users.username}
              </td>
              <td className="border-gray-500 px-6  bg-gray-100 text-center text-gray-800 font-semibold ">
                {users.email}
              </td>
              <td className="border-gray-500 bg-gray-100 ">
                <Edit users={users} />
              </td>
              <td className="border-gray-500  bg-gray-100">
                <td className="flex justify-center group py-4 px-6">
                  <button
                    className=" bg-gray-800 hover:bg-red-600 text-white font-bold py-2 px-4 "
                    onClick={() => handleDeleteUsers(users.id)}
                  >
                    Delete
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <nav className="bg-white rounded-lg shadow-md">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={5}
            containerClassName={"flex"}
            pageClassName={
              "flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }
            activeClassName={"text-blue-700"}
            previousClassName={
              "px-4 py-2 text-sm font-medium text-gray-500 bg-white border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }
            nextClassName={
              "px-4 py-2 text-sm font-medium text-gray-500 bg-white border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            onPageChange={handlePageClick}
          />
        </nav>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminDashboard;
