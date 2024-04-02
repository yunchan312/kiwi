import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignin from "../components/google-login";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const loginObj = {
      email: e.target[0].value,
      pw: e.target[1].value,
    };
    if (isLoading || loginObj.email === "" || loginObj.pw === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, loginObj.email, loginObj.pw);
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-kiwiCenter w-screen flex flex-col items-center justify-center">
      <div className="bg-white py-[40px] gap-7 w-[800px] h-[450px] bg-opacity-60 flex flex-col justify-center items-center">
        <div className="font-bold text-[30px]">Log in</div>
        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-[60%]">
          <input
            className="py-1 px-5"
            type="email"
            placeholder="Type your email"
          />
          <input className="py-1 px-5" type="password" placeholder="Password" />

          <input
            className="rounded-full bg-kiwi py-1 px-5 cursor-pointer"
            type="submit"
            value={isLoading ? "Loading..." : "Submit"}
          />
        </form>
        <GoogleSignin />
        <div>
          If you don't have account{" "}
          <span
            onClick={() => {
              navigate("/create");
            }}
            className="text-kiwi cursor-pointer"
          >
            create one &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
