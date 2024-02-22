import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "views/Login";

import { getAuthUserService } from "./services/auth.service";
import AdminLayout from "layouts/Admin.js";
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from 'store/redux/user-account-data.redux';

function App() {
    const dispatch = useDispatch();
    const [checkingLoader,setCheckingLoader] = useState(true);
    const [loggedIn,setLoggedIn] = useState(false);
    const checkingUserAuth = async ()=>{
        setCheckingLoader(true)
        const response = await getAuthUserService();
        if (response?.data?.status === 200) {
            setLoggedIn(true)
            const { user } = response.data.data;
           //  console.log({user});
            dispatch(
             userAccountDataActions.setData({
               field: "id",
               data:  user.id,
             })
           );
           dispatch(
             userAccountDataActions.setData({
               field: "name",
               data:  user.name,
             })
           );
           dispatch(
             userAccountDataActions.setData({
                field: "email",
                data:  user.email,
             })
           );
           dispatch(
             userAccountDataActions.setData({
                field: "phone",
                data:  user.phone,
             })
           );
           dispatch(
             userAccountDataActions.setData({
                field: "phoneCountryCode",
                data:  user.phoneCountryCode,
             })
           );
           dispatch(
             userAccountDataActions.setData({
                field: "avatar",
                data:  user.avatar,
             })
           );
           dispatch(
             userAccountDataActions.setData({
                field: "isPromoted",
                data:  user.isPromoted,
             })
           );
           dispatch(
             userAccountDataActions.setData({
                field: "walletAmount",
                data:  user.walletAmount,
             })
           );
           dispatch(
             userAccountDataActions.setData({
                field: "isLoggedIn",
                data:  true,
             })
           );
           setCheckingLoader(false);
        }else{
          setCheckingLoader(false);
          dispatch(userAccountDataActions.resetState());
        }
     }
     useEffect(()=>{
        checkingUserAuth();
     },[])
     useEffect(()=>{
       console.log({loggedIn})
     },[loggedIn])
  return (  !checkingLoader ? <BrowserRouter>
    <Switch>
      {loggedIn ? (
        <>
          <Route  path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect exact from="/" to="/admin/dashboard" />
        </>
      ) : (
        <>
          <Route exact path="/login"><Login/></Route>
          <Redirect exact from="/" to="/login" />
        </>
      )}
    </Switch>
  </BrowserRouter> : 'Processing....'
  );
}

export default App;
