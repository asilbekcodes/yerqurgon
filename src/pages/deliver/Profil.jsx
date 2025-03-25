import React from "react";
import TopBar from "../user/components/TopBar";
import tel from "../user/assets/Vector (6).svg";
import Footer from "../user/components/Footer";
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import home from "../user/assets/Vector (3).svg";

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function Profil() {
  return (
    <div className="p-3">
      <TopBar text={"Profil"} />
      <main className="mt-4">
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
          {/* <input
            type="text"
            placeholder="Manzil"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>
        <div className="block md:hidden">
          <button className="flex items-center justify-center gap-2 w-full p-3 mt-5 mb-20 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <img className="w-6" src={tel} alt="" />
            Call Center
          </button>
        </div>
      </main>
      <Footer links={deliverLinks}/>
    </div>
  );
}

export default Profil;
