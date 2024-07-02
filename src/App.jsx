import React from "react";
import Navbar from "../src/components/Navbar.jsx";
import BlogCards from "./components/BlogCards.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleCard from "./components/SingleCard.jsx";
import SignupForm from "./components/SignupForm.jsx";
import LoginPage from "./components/LoginPage.jsx";
import AddBlog from "./components/AddBlog.jsx";
import UpdateBlog from "./components/UpdateBlog.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlogCards />}></Route>
          <Route path="/singleblog/:id" element={<SingleCard />}></Route>
          <Route path="/SignupForm" element={<SignupForm />}></Route>
          <Route path="/LoginPage" element={<LoginPage />}></Route>
          <Route path="/AddBlog" element={<AddBlog />}></Route>
          <Route path="/UpdateBlog/:id" element={<UpdateBlog />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
