import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function GoogleSignin() {
  const navigate = useNavigate();
  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div
      className="rounded-full bg-kiwi w-[60%] py-1 px-5 text-center cursor-pointer flex justify-center items-center"
      onClick={onGoogleLogin}
    >
      <span>Start with Google</span>
    </div>
  );
}
