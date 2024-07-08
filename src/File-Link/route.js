import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../container/Login";
import Signup from "../container/Signup";

const route = createBrowserRouter([{
       path :'',
       element:<App/>,
       children:[{
        path:'',
        element:<Login/>
       },{
        path:'signUp',
        element:<Signup/>
       }
    ]
       
}])

export default route;