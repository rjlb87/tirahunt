import React, { useState } from "react";
import { editUsers } from "../services/UsersService";

const EditDashboard = ({ users }) => {
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
    console.log(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUsers(userDetails).then(console.log(userDetails));
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = (e) => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="py-4 mx-10 h-auto">
        <button
          className=" bg-gray-800 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          Edit
        </button>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="mt-40 flex items-center justify-center">
            <div className="bg-gray-900 rounded-lg text-white ">
              <div className="p-10">
                <h2 className="text-lg text-white font-bold pb-10">
                  Users&apos;s Information
                </h2>
                <div className="mb-4 text-sm">
                  <input
                    className="bg-slate-500 rounded-md mt-2 px-6 py-2"
                    type="text"
                    name="username"
                    placeholder="First Name"
                    defaultValue={users.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 text-sm">
                  <input
                    className="bg-slate-500 rounded-md px-6 py-2"
                    type="text"
                    name="email"
                    placeholder="Last Name"
                    defaultValue={users.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    className=" text-sm bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                    onClick={(e) => {
                      handleSubmit(e);
                      toggleModal();
                    }}
                  >
                    Save
                  </button>
                  <div className="px-6">
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md text-sm"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditDashboard;
