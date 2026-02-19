import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Home</Link>

      {!isLoggedIn ? (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
