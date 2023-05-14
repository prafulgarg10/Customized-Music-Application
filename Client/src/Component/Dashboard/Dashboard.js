import Song from "../Song/Song";
import Artist from "../Artist/Artist";
import { useState, useEffect } from "react";

function Dashboard({ user }) {
  const [isUserAvailable, setIsUserAvailable] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setIsUserAvailable(true);
    } else {
      setIsUserAvailable(false);
    }
  }, [user]);

  return (
    <div>
      {isUserAvailable && (
        <div>
          <Song user={user} />
          <Artist />
        </div>
      )}
      {!isUserAvailable && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "600",
            marginTop: "20px",
          }}
        >
          Kindly login/signup to view this page
        </div>
      )}
    </div>
  );
}
export default Dashboard;
