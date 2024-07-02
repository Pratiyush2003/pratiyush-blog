import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateData, getAllblogs } from "../app/features/getUserSlice";

const UpdateBlog = () => {
  const { blogs } = useSelector((state) => state.app);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateblogs, setupdateData] = useState({
    image: "",
    name: "",
    relatedtopic: "",
    blogcontent: ""
  });

  const newData = (e) => {
    setupdateData({ ...updateblogs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      const singleblog = blogs.find((ele) => ele._id === id);
      if (singleblog) {
        setupdateData(singleblog);
      }
    }
  }, [id, blogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateData(updateblogs));
    await dispatch(getAllblogs());
    navigate('/AddBlog');
  };

  return (
    <div className="my-6 mx-auto max-w-xl bg-white font-[sans-serif] rounded-lg">
      <form className="mt-8 space-y-4 p-8" onSubmit={handleSubmit}>
        <input
          name="image"
          onChange={newData}
          value={updateblogs.image || ""}
          type="text"
          placeholder="Image"
          className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
        />
        <input
          name="name"
          onChange={newData}
          value={updateblogs.name || ""}
          type="text"
          placeholder="Name"
          className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
        />
        <select
          name="relatedtopic"
          onChange={newData}
          value={updateblogs.relatedtopic || ""}
          id="countries"
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500"
        >
          <option value="">Choose a Topic</option>
          <option value="Nature">Nature</option>
          <option value="Sports">Sports</option>
          <option value="Current Affairs">Current Affairs</option>
          <option value="Coding">Coding</option>
        </select>
        <textarea
          onChange={newData}
          placeholder="Message"
          value={updateblogs.blogcontent || ""}
          rows={6}
          name="blogcontent"
          className="w-full rounded-md px-4 bg-gray-100 text-sm pt-3 outline-blue-500"
        />
        <button
          type="submit"
          className="text-white bg-[#9381ff] font-semibold rounded-md text-sm px-4 py-3 w-full"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
