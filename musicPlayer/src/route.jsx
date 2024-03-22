import {createBrowserRouter, redirect} from "react-router-dom";
import Layout from "./page/layout";
import Home from "./page/home";
// import Register from "./page/register";
// import Add from "./page/add";
// import Update from "./page/update";
// import UploadImage from "./page/uploadImage";
// import Company from "./page/company";
import LoginPage from "./page/loginPage";
import SeeDetail from "./page/seeDetail";
import SearchResult from "./page/searchPage";
import Favourite2 from "./page/favourite";
import Register from "./page/register";


// eslint-disable-next-line react-refresh/only-export-components
const CheckUser = () => {
    if(!localStorage.getItem('access_token')) {
        return redirect('/login')
    }
    return null
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: "home",
                element: <Home/>
            },
          
            {
                path: "SeeDetail/:id",
                element: <SeeDetail/>
            },
            {
                path: "SearchResult",
                element: <SearchResult/>
            },
            {
                path: "favourite",
                element: <Favourite2/>,
              },
        ],
        loader: CheckUser
    },
    {
        path: "login",
        element: <LoginPage/>
    },
    {
        path: "login/register",
        element: <Register/>
    },
])

export default router