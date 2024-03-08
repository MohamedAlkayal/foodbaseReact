import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <h1 className="text-[150px] font-black text-orange-500">404</h1>
      <p className="mb-3">
        Page not found {" - "}
        <Link to="/" className="text-blue-500 cursor-pointer duration-300 hover:text-blue-700">
          Take me Home
        </Link>
      </p>
    </div>
  );
}
