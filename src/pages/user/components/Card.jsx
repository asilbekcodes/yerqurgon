import useProducts from "@/hooks/api/useProducts";
import plus from "../assets/Vector (4).svg";
const Card = () => {
  const product = useProducts();

  return (
    <div className="grid grid-cols-2 gap-y-10 md:gap-x-3 gap-x-1.5 md:grid-cols-3 xl:grid-cols-4">
      {product.productsData.map((item) => (
        <div key={item.id} className=" rounded-xl bg-white">
          <img src={item.image} alt="" className="w-full h-[120px] md:h-48 bg-gray-200 rounded-t-xl "/>
          <div className="p-2">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="flex items-center justify-between">
              <p className="m-0">
                <span className="font-medium">Narxi:</span> {item.price} so‘m
              </p>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-lg">
                <img src={plus} alt="" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
