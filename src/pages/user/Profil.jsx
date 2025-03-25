import React from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import tel from "./assets/Vector (6).svg";
import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";

const userLinks = [
  { to: "/user/user", label: "Bosh sahifa", icon: home },
  { to: "/user/katalog", label: "Katalog", icon: search },
  { to: "/user/orders", label: "Buyurtmalar", icon: order },
  { to: "/user/profil", label: "Profil", icon: profil },
];

function Profil() {
  return (
    <div className="p-3">
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <TopBar text="Profil" />
      </div>
      <div className="lg:px-40 mt-4">
        <h2 className="text-xl font-semibold mb-4 hidden md:block">
          Profil Ma'lumotlari
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Ism"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Familiya"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Magazin Nomi"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="+998 99 000 90 90"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
            type="text"
            placeholder="INN"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Manzil"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block md:hidden">
          <button className="flex items-center justify-center gap-2 w-full p-3 mt-5 mb-20 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <img className="w-6" src={tel} alt="" />
            Call Center
          </button>
        </div>
      </div>
      <Footer links={userLinks}/>
    </div>
  );
}

export default Profil;
