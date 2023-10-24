import React, { useEffect, useState } from "react";
import { getAllusers, deleteUsers } from "../services/UsersService";
import Edit from "./EditButton";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRenters, setTotalRenters] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const pageCount = Math.ceil(users.length / itemsPerPage);
  const [showEl, setShowEl] = useState(false);

  const showElepsis = () => {
    setShowEl(!showEl);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, users.length);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const usernameMatch = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return usernameMatch || emailMatch;
  });

  const currentData = filteredUsers.slice(startIndex, endIndex);

  const handleDeleteUsers = async (id) => {
    try {
      const success = await deleteUsers(id);
      if (success) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
        toast.success("User Successfully Deleted!");
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

        const totalUsers = users.length;
        const totalRenters = users.filter((user) => user.isRenter).length;
        setTotalUsers(totalUsers);
        setTotalRenters(totalRenters);
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
    <div className="min-h-screen bg-gray-200 px-20 py-20">
      <div className="text-start my-10 text-2xl text-gray-800 px-10">
        <h1 className="font-bold tracking-wider inline-flex items-center">
          <MdDashboard size={40} className="mr-2" /> Welcome, admin!
        </h1>
      </div>

      <div className="bg-[#92c872]  p-4 rounded-tl-lg rounded-tr-lg border mx-10">
        <div className="flex justify-between items-center">
          <div className="space-x-10">
            <p className="text-md text-gray-100 font-bold inline-flex">
              <FaUsers size={30} className="mr-2 text-gray-100" />
              Total Users:
              <span className={`text-blue-600 font-bold text-md mr-10 px-2`}>
                {totalUsers}
              </span>
              Total Renters:{" "}
              <span className={`text-blue-600 font-bold text-md px-2`}>
                {totalRenters}
              </span>
            </p>
          </div>

          <div className="flex justify-end w-1/2 md:w-1/4 lg:w-1/4 text-sm px-10 ml-4">
            <input
              type="text"
              placeholder="Search username or email"
              className="border rounded py-2 px-4 w-full"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-10 ">
        <table className="min-w-full border-collapse rounded-lg">
          <thead>
            <tr className="bg-[#92c872] text-white">
              <th className="px-6 py-3 text-xs font-semibold">NO.</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase">
                Username
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 transition-colors text-sm border-gray-300"
              >
                <td className="border-gray-500 text-center text-gray-800 font-bold bg-[#e5fdd8]">
                  {startIndex + index + 1}
                </td>
                <td className="border-gray-500 px-2 sm:px-6 py-3 text-center text-gray-800 font-semibold bg-[#e5fdd8]">
                  {user.username}
                </td>
                <td className="border-gray-500 px-2 sm:px-6 py-3 text-center text-gray-800 font-semibold bg-[#e5fdd8]">
                  {user.email}
                </td>
                <td className="flex justify-center items-center bg-[#e5fdd8] px-4 space-x-4 pt-4 pb-4">
                  <Edit users={user} />

                  <button
                    className="group flex justify-center p-2 px-4 bg-white hover:bg-red-500 text-gray-800 font-bold rounded"
                    onClick={() => handleDeleteUsers(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-10 h-8 bg-[#92c872] mx-10 rounded-bl-lg rounded-br-lg  "></div>
      <div className="flex justify-center mt-4">
        <nav className="bg-white rounded-lg shadow-md">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
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
