import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTokens } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    const fetchData = async () => {
      if (authorizationCode) {
        const tokenEndpoint = import.meta.env.VITE_COGNITO_TOKEN_ENDPOINT;
        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_COGNITO_CLIENT_SECRET;
        const redirectUri = import.meta.env.VITE_COGNITO_CALLBACK;

        const formData = new URLSearchParams();
        formData.append("grant_type", "authorization_code");
        formData.append("client_id", clientId);
        formData.append("client_secret", clientSecret);
        formData.append("code", authorizationCode);
        formData.append("redirect_uri", redirectUri);

        try {
          const response = await axios.post(
            tokenEndpoint,
            formData.toString(),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const { access_token, id_token, refresh_token } = response.data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("id_token", id_token);
          localStorage.setItem("refresh_token", refresh_token);
          await dispatch(
            setTokens({
              accessToken: access_token,
              refreshToken: refresh_token,
              idToken: id_token,
            })
          );

          navigate("/dashboard");
        } catch (error) {
          console.error("Token exchange error:", error);
        }
      } else {
        console.error("Authorization code not found.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Processing authentication...</p>
    </div>
  );
};

export default Callback;