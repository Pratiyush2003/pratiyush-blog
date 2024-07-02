import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchallblog } from "../app/features/getUserSlice";

const SingleCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allfetchedBlogs } = useSelector((state) => state.app);
  const [blogData, setBlogData] = useState({});
  const [relatedTopics, setRelatedTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchallblog());
  }, [dispatch]);

  useEffect(() => {
    if (allfetchedBlogs.length > 0) {
      const data = allfetchedBlogs.find((e) => e._id === id);
      if (data) {
        setBlogData(data);
        const relatedBlogs = allfetchedBlogs.filter(
          (e) => e.relatedtopic === data.relatedtopic && e._id !== data._id
        );
        setRelatedTopics(relatedBlogs);
      } else {
        navigate("/");
      }
    }
  }, [allfetchedBlogs, id, navigate]);

  return (
    <>
      <div className="flex items-center justify-center mt-4 text-center">
        <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark m-10 rounded-t-lg">
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat "
            data-twe-ripple-init=""
            data-twe-ripple-color="light"
          >
            
            <img className="rounded-t-lg w-full md:h-80" src={blogData.image} alt="" />
            <a href="#!">
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
            </a>
          </div>
          <div className="text-surface dark:text-black mt-4">
            <h5 className="mb-2 text-4xl font-bold leading-tight">
              {blogData.name}
            </h5>
            <p className="mb-4 text-base text-gray-500">
              {blogData.relatedtopic}
            </p>
            <p className="mb-4 text-base">{blogData.blogcontent}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto text-center mt-20 gap-6 px-[20px]">
          {relatedTopics.map((related) => (
            <div
              key={related._id}
              className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark "
            >
              <div className="relative overflow-hidden bg-cover bg-no-repeat">
                <Link to={`/singleblog/${related._id}`}>
                <img className="rounded-t-lg w-full" src={related.image} alt="" />
                </Link>

              </div>
              <div className="text-surface dark:text-black md:mt-4 md:p-4 mt-2 p-2">
                <h5 className="mb-2 text-base md:text-xl font-bold leading-tight">
                  {related.name}
                </h5>
                <p className=" md:text-base text-gray-500">
                  {related.relatedtopic}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleCard;
