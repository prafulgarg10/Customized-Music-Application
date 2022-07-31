import Artist from './file/Artist';
import Song from './file/Song';
import AddSong from './AddSong';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from './file/User';
import SignUp from './file/SignUp';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<User/>}/> 
        <Route path="/home" element={<div><Song/><Artist/></div>}/>
        <Route path="/AddSong" element={<AddSong />}/> 
        <Route path="/signup" element={<div><SignUp/></div>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
