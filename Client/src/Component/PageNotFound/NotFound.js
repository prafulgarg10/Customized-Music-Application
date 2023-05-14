import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 300,
          textAlign: "center",
        }}
      >
        Oops the page you are looking for doesn't exist
      </div>
      <div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          Please login to continue..
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/">Click Here!!</Link>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
