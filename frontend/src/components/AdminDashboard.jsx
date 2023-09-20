import React, { useEffect, useState } from "react";
import { getAllusers, deleteUsers } from "../services/UsersService";
import Edit from "./EditButton";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUsers } from "react-icons/fa";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRenters, setTotalRenters] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, users.length);

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

  const currentData = filteredUsers.slice(startIndex - 1, endIndex);

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
    <div className="min-h-screen bg-gray-200 px-20 py-10">
      <div className="text-center uppercase my-5 text-2xl text-gray-800 pb-10">
        <h1 className="font-bold tracking-wider">Admin Dashboard</h1>
      </div>

      <div className="bg-[#92c872]  p-4 rounded-tl rounded-tr border">
        <div className="flex justify-between items-center">
          <div className="space-x-6">
            <p className="text-lg text-gray-800 font-bold">
              Total Users:{" "}
              <span className={`text-gray-600 font-bold text-lg`}>
                {totalUsers}
              </span>{" "}
              | Total Renters{" "}
              <span className={`text-gray-600 font-bold text-lg`}>
                {totalRenters}
              </span>
            </p>
          </div>

          <div className="flex justify-end w-1/2 md:w-1/4 lg:w-1/4">
            <input
              type="text"
              placeholder="Search by username or email"
              className="border rounded py-2 px-4 w-full"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
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
              <th
                colSpan={2}
                className="px-6 py-3 text-xs font-semibold uppercase"
              >
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
                <td className="border-gray-500 px-6 py-3 bg-gray-100 text-center text-gray-800 font-bold">
                  {startIndex + index}
                </td>
                <td className="border-gray-500 px-6 py-3 bg-gray-100 text-center text-gray-800 font-semibold">
                  {user.username}
                </td>
                <td className="border-gray-500 px-6 py-3 bg-gray-100 text-center text-gray-800 font-semibold">
                  {user.email}
                </td>
                <td className="border-gray-500 bg-gray-100">
                  <Edit users={user} />
                </td>
                <td className="border-gray-500 bg-gray-100">
                  <button
                    className="group flex justify-center py-2 px-4 bg-gray-800 hover:bg-red-600 text-white font-bold rounded"
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
