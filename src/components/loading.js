import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <PacmanLoader color="#00d26a" />
      <div>Loading...</div>
    </div>
  );
}
