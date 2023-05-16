import AddSong from "./Component/Song/AddSong";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/User/Login";
import SignUp from "./Component/User/SignUp";
import NotFound from "./Component/PageNotFound/NotFound";
import { useState } from "react";
import NavBar from "./Component/Navbar/NavBar";
import Dashboard from "./Component/Dashboard/Dashboard";
import AllArtists from "./Component/Artist/AllArtists";
import Profile from "./Component/User/Profile";
import UserRatedSongs from "./Component/User/UserRatedSongs";
import ServerError from "./Component/ServerError/ServerError";

function App() {
  const [user, setUser] = useState({});

  function userHandler(user) {
    setUser(user);
  }

  function userSignOutHandler() {
    setUser({});
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar user={user} setUserOnSignOut={userSignOutHandler} />
        <Routes>
          <Route path="/" element={<Login setUser={userHandler} exact />} />
          <Route path="/signup" element={<SignUp setUser={userHandler} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/AddSong" element={<AddSong />} />
          <Route path="/artists" element={<AllArtists />} />
          <Route
            path="/profile"
            element={<Profile user={user} updateUserOnDelete={setUser} />}
          />
          <Route path="/userrating" element={<UserRatedSongs user={user} />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
