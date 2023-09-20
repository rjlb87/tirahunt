import React, { useState } from "react";
import { editUsers } from "../services/UsersService";
import { AiOutlineClose } from "react-icons/ai";

const EditDashboard = ({ users }) => {
  const [showModal, setShowModal] = useState(false);

  const [userDetails, setUserDetails] = useState({
    id: users.id ?? "",
    username: users.username ?? "",
    email: users.email ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUsers(userDetails)
      .then((response) => {
        console.log(response);
        toggleModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="py-4 mx-10 h-auto">
        <button
          className="bg-gray-800 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          Edit
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-2 border-b border-solid rounded-t flex justify-center">
                <p className="text-md font-semibold text-center py-2 w-full">
                  Edit User
                </p>
                <button
                  className="  bg-transparent  text-black   leading-none font-semibold "
                  onClick={toggleModal}
                >
                  <span className="absolute  right-4 top-2 pt-2 text-gray-800">
                    <AiOutlineClose size={15} />
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="bg-white rounded-md px-4 py-2 border  focus:ring-gray-400 w-full"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={userDetails.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="bg-white rounded-md px-4 py-2 border  focus:ring-gray-400 w-full"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={userDetails.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-start">
                    <button
                      className="bg-[#92c872] hover:bg-[#77af57] text-white font-bold py-2 px-4 rounded-md w-full"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDashboard;
