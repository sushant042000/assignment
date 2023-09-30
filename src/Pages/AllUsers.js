import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";

import {
  getAllUserFail,
  getAllUserStart,
  getAllUserSuccess,
} from "../Store/userSlice";
import { getAllUsersApi } from "../API/api";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import toast from "react-hot-toast";

function AllUsers() {
  const navigate = useNavigate();

  const { token, allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      dispatch(getAllUserStart());

      await getAllUsersApi(token).then((res) =>
        dispatch(getAllUserSuccess(res.message.data))
      );
      toast("✔ All users")

    } catch (error) {
      dispatch(getAllUserFail(error.message));
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleClick = (user) => {
    navigate(`/user/${user}`);
  };

  return (
    <div className=" w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      {allUsers ? (
        <div className="w-[80vw]">
          <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
          <div className="overflow-x-auto">
            <table className="  rounded-md flex flex-col justify-center items-center table-auto ">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Gender</th>
                  <th className="px-4 py-2">Designation</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Company Name</th>
                </tr>
              </thead>
              <tbody>
                {allUsers &&
                  allUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 !== 0
                          ? "bg-gray-100 cursor-pointer"
                          : "bg-gray-300 cursor-pointer"
                      }
                      onClick={() => handleClick(user.name1)}
                    >
                      <td className="px-4 py-2 text-center">{user.name1}</td>
                      <td className="px-4 py-2 text-center">{user.age}</td>
                      <td className="px-4 py-2 text-center">{user.gender}</td>
                      <td className="px-4 py-2 text-center">
                        {user.designation}
                      </td>
                      <td className="px-4 py-2 text-center">{user.address}</td>
                      <td className="px-4 py-2 text-center">
                        {user.company_name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      )}
    </div>
  );
}

export default AllUsers;
