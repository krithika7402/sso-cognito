import Image from "../../assets/glassbuilding.png";

const Login = () => {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_COGNITO_SSO;
  };

  return (
    <div className="max-h-screen bg-[#f2f2f2] flex flex-col p-8 justify-center">
      <div className="rounded-lg bg-white h-[56rem] p-12 pr-0 flex">
        <div
          className="flex-grow bg-red-600 rounded-lg bg-no-repeat h-full bg-cover w-1/2"
          style={{ backgroundImage: `url(${Image})` }}
        ></div>

        <div className="flex-grow rounded-r-lg w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-center p-2">WELCOME TO RETROREVIVE</h1>
          <p className="p-2">Already a member of Presidio? Login via SSO</p>
          <button
            className="mt-10 p-4 bg-[#f2f2f2] rounded-sm"
            onClick={handleLogin}
          >
            SIGN IN WITH MICROSOFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
