import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Groups from './pages/Groups';
import Home from './pages/Home';
import MyFriends from './pages/MyFriends';
import AddFriend from './pages/AddFriend';
import CreateNewGroup from './pages/CreateGroup';
import AddExpense from './pages/AddExpense';
import ChooseParticipants from './pages/ChooseParticipants';
import {ToastContainer} from "react-toastify";
import ViewExpenses from './pages/ViewExpenses';
import "react-toastify/ReactToastify.css";
import bg from "../src/assets/background_image.jpg";

function App() {
  return (
  <div>
  {/* <ToastCon5173tainer></ToastContainer> */}
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/groups' element={<Groups></Groups>}></Route>
        <Route path="/groups/:groupID" element ={<AddExpense></AddExpense>} ></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/myFriends' element={<MyFriends></MyFriends>}></Route>
        <Route path='/addFriend' element={<AddFriend></AddFriend>}></Route>
        <Route path='/createGroup' element={<CreateNewGroup></CreateNewGroup>}></Route>
        <Route path="/chooseParticipants" element={<ChooseParticipants></ChooseParticipants>} ></Route>
        <Route path="/viewExpenses" element={<ViewExpenses></ViewExpenses>}></Route>
      </Routes>
    </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="light"
      />
  </div>
    
  )
}

export default App
