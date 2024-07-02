import { Button, Dropdown, MenuProps } from "antd"
import { Link } from "react-router-dom";

function DefaultLayout(props) {

  const user = JSON.parse(localStorage.getItem('user') as string);

  const items:MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/" style={{textDecoration: "none", fontSize: "1.1rem", padding: "0 1.5rem"}}>
          Home
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/profile" style={{textDecoration: "none", fontSize: "1.1rem", padding: "0 1.5rem"}}>
          Profile
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/bookings" style={{textDecoration: "none", fontSize: "1.1rem", padding: "0 1.5rem"}}>
          Bookings
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <button className="btn-1" style={{fontSize: "1.1rem", padding: "0 1.5rem"}} onClick={()=>{
          localStorage.removeItem('user');
          window.location.href = "/login";
        }}>
          Logout
        </button>
      ),
    },
  ];
  return (
    <div >
      <div className="header bs-1">
        <div className="d-flex justify-content-between align-items-center">
          <h1>A-Cars</h1>
          {/* <button >User</button> */}
          <Dropdown menu={{items}} placement="bottom">
            <Button>Welcome, {user.username}!</Button>
          </Dropdown>
        </div>
      </div>

      <div className="content">
        {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout