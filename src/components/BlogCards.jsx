import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchallblog } from "../app/features/getUserSlice";
import Loader from "./Loader.jsx";

const BlogCards = () => {
  const { allfetchedBlogs, searchData , relatedTopics } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchallblog());
  }, [dispatch]);

  if(allfetchedBlogs.length === 0){
    return <Loader></Loader>
  }

  const handlebutton = () => {
    const token = localStorage.getItem('token');
    if(token){
      navigate('/AddBlog')
    }else{
      navigate('/LoginPage')
    }
  }
 
  return (
    <>
      <div className=" grid md:grid-cols-2 lg:grid-cols-4 mx-auto text-center mt-20 gap-6 px-[20px]">
        {allfetchedBlogs &&
          allfetchedBlogs
            .filter((e) => {
              if (searchData.length === 0) {
                return true;
              } else{
                return e.name.toLowerCase().includes(searchData.toLowerCase());
              }
            })
            .filter((e) => {
              if(relatedTopics){
                return e.relatedtopic === relatedTopics;
              }else if(relatedTopics === "Choose a Topic"){
                return true;
              }else{
                return true;
              }
            })
           
            .map((e, index) => (
              <div key={index}>
                <Link to={`/singleblog/${e._id}`}>
                {/* {console.log(e.id)} */}
                  <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark drop-shadow-md">
                    <div
                      className="relative overflow-hidden bg-cover bg-no-repeat"
                      data-twe-ripple-init=""
                      data-twe-ripple-color="light"
                    >
                      <div className="overflow-hidden">
                      <img
                        className="rounded-lg h-48 w-full hover:scale-125 duration-1000"
                        src={e.image}
                        alt={e.name}
                      />
                      </div>
                    </div>
                    <div className="p-6 text-surface dark:text-black">
                      <h5 className="mb-2 text-xl font-medium leading-tight">
                        {e.name}
                      </h5>
                      <p className="mb-4 text-base line-clamp-2">
                        {e.blogcontent}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
      
        <div className="fixed bottom-8 right-8">
          <button className="bg-[#9381ff] text-white font-bold py-2 px-4 rounded" onClick={handlebutton}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
    </>
  );
};

export default BlogCards;
