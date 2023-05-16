function ServerError() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "24px",
        color: "red",
      }}
    >
      Server not found😔, kindly try again after some time.
    </div>
  );
}
export default ServerError;
