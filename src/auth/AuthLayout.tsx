
import { Outlet } from 'react-router-dom'
import './login.css'

export const AuthLayout = () => {
  return (
    <>

      <div id="main-wrapper" className="container">
        <div className="row d-flex align-items-center justify-content-center vh-100">

          <Outlet />

        </div>

      </div>



    </>
  )
}
