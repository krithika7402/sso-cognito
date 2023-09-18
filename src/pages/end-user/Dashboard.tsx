import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setTokens } from "../../features/auth/authSlice";
import { RootState } from "../../store/store";

const Dashboard = () => {
  const [userName, setUserName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authStore);

  useEffect(() => {
    if (userData.accessToken) {
      const decodedAccessToken: {
        username: string;
      } = jwt_decode(userData.accessToken);

      const userFullName: string = decodedAccessToken.username;
      setUserName(userFullName);
    }

    if (userData.idToken) {
      const decodedIdToken: {
        "custom:jobtitle": string;
      } = jwt_decode(userData.idToken);

      const userJobTitle: string = decodedIdToken["custom:jobtitle"];
      setJobTitle(userJobTitle);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("refresh_token");
    dispatch(setTokens({ accessToken: "", refreshToken: "", idToken: "" }));
    setUserName("");
    setJobTitle("");
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const domain = import.meta.env.VITE_COGNITO_DOMAIN;
    window.location.href = `${domain}/logout?client_id=${clientId}&logout_uri=http://localhost:5173`;
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-full h-12 p-10 border-b-2">
        <div>RetroRevieve</div>

        <div
          className="bg-red-300 p-4 rounded-sm hover:bg-red-400 ease-in-out duration-300 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </nav>
      <div className="w-full flex p-10">
        <h4 className="p-4 w-1/12">ID</h4>
        <h4 className="bg-slate-100 w-5/6 flex-wrap p-4 whitespace-normal break-words">
          {" "}
          {userData.idToken}
        </h4>
      </div>
      <div className="w-full flex p-10">
        <h4 className="p-4 w-1/12">Access</h4>
        <h4 className="bg-slate-100 w-5/6 flex-wrap p-4 whitespace-normal break-words">
          {" "}
          {userData.accessToken}
        </h4>
      </div>
      <div className="w-full flex p-10">
        <h4 className="p-4 w-1/12">Refresh</h4>
        <h4 className="bg-slate-100 w-5/6 flex-wrap p-4 whitespace-normal break-words">
          {" "}
          {userData.refreshToken}
        </h4>
      </div>

      <hr />
      {userName ? (
        <div>
          Logged in as {userName}
          <br />
          Job Title: {jobTitle}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
