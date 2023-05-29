import './App.css';
import Navbarcomponent from './components/Navbarcomponent';
import FooterComponent from './components/FooterComponent';
import ForceLogin from './components/ForceLogin';
import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Loader from './components/Loader';
import Cookies from 'js-cookie';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [currentusertype, setCurrentusertype] = useState("");

  useEffect(() => {
    const cookieUsername = Cookies.get('aadharcard');
    const cookieUsertype = Cookies.get('usertype')
    if (cookieUsername) {
      setCurrentAccount(cookieUsername);
      setCurrentusertype(cookieUsertype)
    }
  }, []);

  return (
    <div className="App">
    <Loader></Loader>
      {currentAccount?
      <Router>
          <Navbarcomponent setCurrentAccount={setCurrentAccount} setCurrentusertype={setCurrentusertype} currentusertype={currentusertype}  currentAccount={currentAccount}></Navbarcomponent>
          <>

            <Routes>
              {currentusertype === 'admin' && (
                <Route exact path="*" element={<AdminHome></AdminHome>} />
              )}
              {currentusertype ==='user' && (
                <>
                  <Route exact path="/" element={<UserHome></UserHome>} />
                </>
              )}
            
            </Routes>
          </>
            <FooterComponent></FooterComponent>
      </Router>
      :
      <Router>
          <Navbarcomponent setCurrentAccount={setCurrentAccount} setCurrentusertype={setCurrentusertype} currentAccount={currentAccount} ></Navbarcomponent>
          
          <>
            <Routes> 
              <Route exact path='/' element={<ForceLogin></ForceLogin>}></Route>
              <Route exact path='*' element={<ForceLogin></ForceLogin>}></Route>
            </Routes>
          </>
            <FooterComponent></FooterComponent>
      </Router> 
    }
    </div>
  );
}

export default App;
