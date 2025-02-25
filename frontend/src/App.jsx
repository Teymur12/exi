import { Routes, Route, useNavigate } from "react-router-dom";
import Container from "./components/Container";
import Home from "./pages/home";
import SignIn from "./pages/login";
import SignUp from "./pages/signup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./components/loader";
import ResetPass from "pages/resetPass";
import NewPass from "pages/newPass";
import CreatePost from "createPost/createPost";
import Profile from "components/Profile";

const App = () => {
  const [redirect, setRedirect] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return <Loader />;
    }

    let timeout = setTimeout(() => {
      setRedirect(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);


  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/resetpassword" element={<ResetPass />} />
        <Route path="/auth/newpassword" element={<NewPass />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/Profile" element={<Profile  />} />

      </Routes>
    </Container>
  );
};

export default App;
