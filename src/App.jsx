import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Notes from "./pages/Notes";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import CreateNote from "./pages/CreateNote";
import { useAuthState } from "./contextapi/AuthState";
import Loader from "./pages/Loader";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Toast from "react-hot-toast";
import "./App.css";
import AuthProtector from "./components/AuthProtector";

function App() {
  const { getProfileFunc, fetching, token } = useAuthState();

  useEffect(() => {
    if (token) {
      getProfileFunc();
    }
  }, [token]);

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes category="public" />} />
        <Route path="/yournotes" element={<Notes />} />
        <Route
          path="/createnote"
          element={
            <AuthProtector>
              <CreateNote />
            </AuthProtector>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account/:userId" element={<Account />} />
        <Route
          path="/profile"
          element={
            <AuthProtector>
              <Profile />
            </AuthProtector>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;