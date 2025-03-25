import { useParams } from "react-router-dom";
import plus from "./assets/Vector (4).svg";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllProducts } from "@/services/api/requests/products.requests";
import { objectToQueryString } from "@/utils/helpers";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
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

function KatalogId() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-one", id],
    queryFn: () => httpGetAllProducts(objectToQueryString({ category: id })),
    select: (response) => response.data,
  });

  return (
    <div className="p-3">
      <TopBar text={data && data.length > 0 ? data[0].category.name : "Katalog"} />
      <div className="lg:px-40 my-5">
        {isLoading ? (
          <p className="text-center text-gray-500">Yuklanmoqda...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Xatolik yuz berdi!</p>
        ) : data?.length === 0 ? (
          <p className="text-center text-gray-500">Mahsulot topilmadi</p>
        ) : (
          <div className="grid grid-cols-2 gap-y-10 md:gap-x-3 gap-x-1.5 md:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <div key={item.id} className="rounded-xl bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[120px] md:h-48 bg-gray-200 rounded-t-xl"
                />
                <div className="p-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <div className="flex items-center justify-between">
                    <p className="m-0">
                      <span className="font-medium">Narxi:</span> {item.price} so‘m
                    </p>
                    <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-lg">
                      <img src={plus} alt="Qo‘shish" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer links={userLinks}/>
    </div>
  );
}

export default KatalogId;
