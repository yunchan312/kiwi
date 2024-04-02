import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import GoogleSignin from "../components/google-login";

export default function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const createObj = {
      name: e.target[0].value,
      email: e.target[1].value,
      pw: e.target[2].value,
      check: e.target[3].value,
    };
    if (
      (isLoading ||
        createObj.name === "" ||
        createObj.email === "" ||
        createObj.pw === "",
      createObj.check === "")
    )
      return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        createObj.email,
        createObj.pw
      );
      await updateProfile(credentials.user, {
        displayName: createObj.name,
      });
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
        <div className="font-bold text-[30px]">Create account</div>
        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-[60%]">
          <input
            className="py-1 px-5"
            type="type"
            placeholder="Type your name"
          />
          <input
            className="py-1 px-5"
            type="email"
            placeholder="Type your email"
          />
          <input className="py-1 px-5" type="password" placeholder="Password" />
          <input
            className="py-1 px-5"
            type="password"
            placeholder="check your password"
          />
          <input
            className="rounded-full bg-kiwi py-1 px-5 cursor-pointer"
            type="submit"
            value={isLoading ? "Loading..." : "Submit"}
          />
        </form>
        <GoogleSignin />
        <div>
          If you have account{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="text-kiwi cursor-pointer"
          >
            log in &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
