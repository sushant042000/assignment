import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleUserFail,
  getSingleUserStart,
  getSingleUserSuccess,
} from "../Store/userSlice";
import { getSpecificUserApi, updateUserApi } from "../API/api";
import { useDispatch, useSelector } from "react-redux";
import { Hourglass } from "react-loader-spinner";
import toast from "react-hot-toast";

function UserPage() {
  const { loading, token, userData } = useSelector((state) => state.user);
  const param = useParams();
  const dispatch = useDispatch();
  const userName = param.name;
  const [user, setUserData] = useState({});
  const navigate=useNavigate();

  const fetchSpecificUser = async () => {
    try {
      dispatch(getSingleUserStart());

      await getSpecificUserApi(token, userName).then((res) =>
        dispatch(getSingleUserSuccess(res.message.data.specific_user[0]))
      );
    } catch (error) {
      dispatch(getSingleUserFail(error.message));
    }
  };

  useEffect(() => {
    fetchSpecificUser();
  }, []);

  useEffect(() => {
    if (userData) {
      setUserData({ ...userData });
    }
  }, [userData]);

 

  const handleSave = async () => {
    try {
      const res = await updateUserApi(userName, token, user);
      console.log(res);
      toast(" updated successsfully !");
      navigate('/all')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      {user ? (
        <div >
          <h1 className="text-2xl text-gray-700 text-center font-bold mb-4">User Data</h1>
          <div className="mb-4 flex gap-2">
            <label className=" w-[10vw] block text-gray-700 font-bold ">Name :</label>
            <input
              type="text"
              name="name1"
              value={user.name1}
              onChange={(e) =>
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md px-3 text-center py-2 w-full lg:w-[20vw] text-purple-950 text-lg font-medium bg-gray-300"
            />
          </div>
          <div className="mb-4 flex gap-2">
            <label className=" w-[10vw] block text-gray-700 font-bold ">Age :</label>
            <input
              type="text"
              name="age"
              value={user.age}
              onChange={(e) =>
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full lg:w-[20vw] text-center  text-purple-950 text-lg font-medium bg-gray-300"
            />
          </div>
          <div className="mb-4 flex gap-2">
            <label className=" w-[10vw] block text-gray-700 font-bold ">Gender :</label>
            <input
              type="text"
              name="gender"
              value={user.gender}
              onChange={(e) =>
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-center w-full lg:w-[20vw]  text-purple-950 text-lg font-medium bg-gray-300 "
            />
          </div>
          <div className="mb-4 flex gap-2">
           <label className="w-[10vw] flex justify-center  items-center  text-gray-700 font-bold ">
            Company Name:
          </label>
            <input
              type="text"
              name="company_name"
              value={user.company_name}
              onChange={(e) =>
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-center  w-full lg:w-[20vw]  text-purple-950 text-lg font-medium bg-gray-300 "
            />
          </div>
         <div  className="flex justify-center items-center">
         <button
         onClick={handleSave}
         className=" w-full lg:w-[20vw] mt-8 bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       >
         Save
       </button>
         
         </div>
        </div>
      ) : (
        <div>
          {loading ? (
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default UserPage;
