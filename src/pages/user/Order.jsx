import React from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import icon from "./assets/Vector 2 (1).svg";
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
function Order() {
  return (
    <div className="p-3">
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <TopBar text="Buyurtmalar" />
      </div>
      <div className="lg:px-40 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="border rounded-xl px-4 py-4 shadow-sm">
            <p className="font-semibold text-lg ">
              ID: <span className="font-bold">371000</span>
            </p>
            <div className="flex items-center justify-between">
              <p className="text-[14px] m-0 text-gray-500">27 Mart 2025</p>
              <button className="bg-green-600 px-4 text-[14px] py-1 text-white rounded-full">Yetkazildi</button>
            </div>
            <hr className="my-4"/>
            <div className="flex items-center justify-between ">
                <p className="text-[14px] text-gray-700 m-0">Mahsulotlarni ko'rish</p>
                <img src={icon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer links={userLinks}/>
    </div>
  );
}

export default Order;
