import { Link } from "react-router-dom";
import Header from "../components/shared/Header";
export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex h-dvh min-h-[980px]  flex-col justify-between items-center bg-gradient-to-b from-orange-500 to-orange-400 text-white">
        <div className="flex pt-20 flex-col items-center">
          <h1 className="modak px-4 text-5xl w-full text-center font-black mt-32 mb-8">Bringing Foodies Together</h1>
          <p className=" w-full px-3 md:w-3/5 text-center mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, delectus at! Quibusdam asperiores blanditiis nesciunt sapiente suscipit reprehenderit labore, accusamus ut atque quae sit quaerat nam magni impedit eaque consequatur.</p>
          <Link to={"/register"} className="bg-orange-600 text-white py-2 px-6 rounded-xl cursor-pointer duration-300 hover:bg-orange-700">
            Get Started
          </Link>
        </div>
        <img className="w-[900px]" src="/assets/hero.png" alt="Hands holding slices of pizza" />
      </main>
    </div>
  );
}
