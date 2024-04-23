import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function CoffeeCart({ coffee, coffees, setCoffees }) {
  const { _id, name, quantity, price, photo } = coffee;

  //   delete operation
  const handelDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deleteCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee been deleted.",
                icon: "success",
              });
            }
            const remaining = coffees.filter((cofe) => cofe._id !== _id);
            setCoffees(remaining);
            console.log(data);
          });
      }
    });
  };
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl p-8">
        <figure>
          <img src={photo} alt={name} />
        </figure>
        <div className="flex justify-between pr-5 w-full">
          <div>
            <h2 className="card-title">Name : {name}</h2>
            <p>Quantity : {quantity}</p>
            <p>Price : {price} $</p>
          </div>
          <div>
            <ul className="menu rounded-box space-y-2">
              <li>
                <Link
                  className="tooltip tooltip-right bg-[#D2B48C]"
                  data-tip="View"
                >
                  <FaRegEye color="#fff" size={25} />
                </Link>
              </li>
              <li>
                <Link
                  to={`/update/${_id}`}
                  className="tooltip tooltip-right bg-[#3C393B]"
                  data-tip="Edit"
                >
                  <MdEdit color="#fff" size={25} />
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handelDelete(_id)}
                  className="tooltip tooltip-right bg-[#EA4744]"
                  data-tip="Delete"
                >
                  <MdDelete color="#fff" size={25} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

CoffeeCart.propTypes = {
  coffee: PropTypes.object,
  coffees: PropTypes.object,
  setCoffees: PropTypes.func,
};

export default CoffeeCart;
