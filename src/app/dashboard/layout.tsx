
import { ReactNode } from "react";
import PrivateRoute from "../login/privateRoute";

function Layout({ children }: { children: ReactNode; }) {


  return (
    <PrivateRoute>
      <div>
        <h1>Layout</h1>
        <div>
          {children}
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Layout
