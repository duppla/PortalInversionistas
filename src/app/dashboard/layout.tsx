
import { ReactNode } from "react";
import PrivateRoute from "../login/privateRoute";
import Navbar from '../Components/navbarFixed';

function Layout({ children }: { children: ReactNode; }) {


  return (
    <PrivateRoute>
      <div>
        <Navbar />
     
        
        <div>
          {children}
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Layout
