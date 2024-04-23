import { useLoaderData } from "react-router-dom";
import CoffeeCart from "../components/CoffeeCart";
import { useState } from "react";

function Home() {
  const AllCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(AllCoffees);

  // console.log(AllCoffees);
  return (
    <>
      <h2 className="text-5xl font-bold text-center mb-10">
        Our Popular Products
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coffees.map((coffee) => (
          <CoffeeCart
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
