import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import img from "@/assets/images/5196871.jpg";
import Footer from "./components/Footer";
import { Empty } from "antd";
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

const products = [
  {
    id: 1,
    name: "olmalar",
    seller: "Alimam",
    price: 699000,
    oldPrice: 1600000,
    image: img,
    quantity: 1,
  },
  {
    id: 2,
    name: "Qulupnaylar",
    seller: "ESBAY STORE",
    price: 149000,
    oldPrice: 390000,
    image: img,
    quantity: 1,
  },
  {
    id: 3,
    name: "Qulupnaylar",
    seller: "ESBAY STORE",
    price: 149000,
    oldPrice: 390000,
    image: img,
    quantity: 1,
  },
];

function Savat() {
  const [cart, setCart] = useState(products);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalOriginalPrice = products.reduce(
    (acc, item) => acc + item.oldPrice * item.quantity,
    0
  );
  const totalDiscountedPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const savings = totalOriginalPrice - totalDiscountedPrice;

  return (
    <div className="p-3">
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <TopBar text="Savat" />
      </div>
      <div className="lg:px-40 mt-4 mb-28">
        {cart.length === 0 ? (
          <Empty />
        ) : (
          <div className="flex gap-4">
            <div className="w-full md:min-w-[70%]">
              {cart.map((item) => (
              <div
                key={item.id}
                className="sm:flex justify-between gap-4 p-4 border rounded-lg mb-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 object-cover rounded"
                  />
                  <div className="">
                    <h2 className="font-semibold md:text-lg text-[14px] mt-2">
                      {item.name}
                    </h2>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-5">
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="border px-2 py-1"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="border px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                  <div className="grid place-items-end">
                    <p className="text-lg font-semibold">
                      {(item.price * item.quantity).toLocaleString()} so'm
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-600 flex items-center gap-2"
                    >
                      O'chirish
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
            <div className="border p-4 w-96 max-h-max rounded-lg md:block hidden">
              <h2 className="font-semibold text-lg">Buyurtmangiz</h2>
              <div className="flex justify-between text-gray-700 my-2 text-[15px]">
                <span>Mahsulotlar soni:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <hr className="my-8" />
              <div className="flex justify-between">
                <span className="text-[15px]">Jami:</span>
                <span className="font-semibold">
                  {totalDiscountedPrice.toLocaleString()} so'm
                </span>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 mt-[41px] rounded-lg text-center font-semibold">
                Rasmiylashtirish
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={`fixed bottom-16 rounded-t-xl left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50 py-2 block md:hidden ${cart.length === 0 ? 'hidden' : 'block'}`}>
        <div className="flex justify-between py-2 px-3 text-sm ">
          <div>
            <p className="m-0 text-gray-700 text-[12px]">
              Buyurtmangiz ({cart.length})
            </p>
            <span className="text-[20px] text-black">
              {totalDiscountedPrice.toLocaleString()} so'm
            </span>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-lg text-center">
            Rasmiylashtirish
          </button>
        </div>
      </div>
      <Footer links={userLinks}/>
    </div>
  );
}

export default Savat;
