import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createblog, getAllblogs, deleteblog as deleteBlogAction } from "../app/features/getUserSlice";
import { Link } from "react-router-dom";

const AddBlog = () => {
  const { blogs } = useSelector((state) => state.app);
  const [addblogs, setBlogs] = useState({});
  const dispatch = useDispatch();

  const blogdata = (e) => {
    setBlogs({ ...addblogs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createblog(addblogs));
    console.log("posted");
    setBlogs({});
  };

  const handleDelete = (id) => {
    dispatch(deleteBlogAction(id));
    dispatch(getAllblogs());
  };

  useEffect(() => {
    dispatch(getAllblogs());
  }, [dispatch]);

  return (
    <>
      <div className="my-6 mx-auto max-w-xl bg-white font-[sans-serif] rounded-lg ">
        <form className="mt-8 space-y-4 p-8">
          <input
            name="image"
            onChange={blogdata}
            type="text"
            placeholder="Image"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
          />
          <input
            name="name"
            onChange={blogdata}
            type="text"
            placeholder="Name"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
          />
          <select
            name="relatedtopic"
            onChange={blogdata}
            id="countries"
            className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 "
          >
            <option value="">Choose a Topic</option>
            <option value="Nature">Nature</option>
            <option value="Sports">Sports</option>
            <option value="Current Affairs">Current Affairs</option>
            <option value="Coding">Coding</option>
          </select>
          <textarea
            onChange={blogdata}
            placeholder="Message"
            rows={6}
            name="blogcontent"
            className="w-full rounded-md px-4 bg-gray-100 text-sm pt-3 outline-blue-500"
            defaultValue={""}
          />
          <button
            onClick={handleSubmit}
            type="button"
            className="text-white bg-[#9381ff] font-semibold rounded-md text-sm px-4 py-3 w-full"
          >
            Send
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 justify-items-center mx-6">
        {blogs &&
          blogs.map((p, index) => (
            <div key={index}>
              <div className="flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl  shadow-lg w-80">
                <div className="p-6">
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {p.name}
                  </h5>
                  <p className="mb-4 text-base line-clamp-2 ">
                    {p.blogcontent}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex justify-between items-center ">
                    <Link to={`/UpdateBlog/${p._id}`}>
                      <button
                        type="button"
                        className="text-white bg-[#9381ff] font-semibold rounded-md text-sm px-4 py-3 w-full m-2 mx-6 ml-4"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="text-white bg-[#d00000] font-semibold rounded-md text-sm px-4 py-3 w-full m-2 mx-6 mr-4"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AddBlog;
