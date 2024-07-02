import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { searchUser , relatedblog} from "../app/features/getUserSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {

  const [search , setsearch] = useState("")
  const dispatch = useDispatch();
  const [topic , setTopic] = useState("")
  useEffect(() => {
    dispatch(relatedblog(topic))
  },[topic])

  useEffect(() => {
    dispatch(searchUser(search))
  },[search])
  return (
    <>
      <header className="text-gray-600 body-font bg-[#9381ff]">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={'/'}>
          <p className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-12  h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            
            <select
            name="relatedtopic"
            onChange={(e) => setTopic(e.target.value)}
            id="countries"
            className=" border mx-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 w-52"
          >
            <option value="">Choose a Topic</option>
            <option value="Nature">Nature</option>
            <option value="Sports">Sports</option>
            <option value="Current Affairs">Current Affairs</option>
            <option value="Coding">Coding</option>
          </select>
          </p>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center w-96">
            <Input label="Searh Blogs" onChange={(e) => setsearch(e.target.value)}/>
          </nav>
          <div>
            <Link to={'/LoginPage'}>
            <button className="inline-flex mx-2 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
               Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            </Link>
            <Link to={'/SignupForm'}>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Signup
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
