import Swal from "sweetalert2";

function AddCoffee() {
  const handelAddCoffee = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const price = form.price.value;
    const photo = form.photo.value;

    const newCoffee = {
      name,
      quantity,
      supplier,
      taste,
      category,
      details,
      price,
      photo,
    };

    // send data to server
    fetch("http://localhost:5000/coffee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Successfully added a Coffee",
            icon: "success",
          });
          form.reset();
        }
        console.log(data);
      });
  };
  return (
    <>
      <h2 className="text-5xl font-bold text-center mb-10">Add a coffee</h2>
      <form onSubmit={handelAddCoffee} className="space-y-6" action="">
        {/* row 1 */}
        <div className="flex gap-5">
          <div className="w-1/2">
            <label>Coffee Name:</label>
            <input
              type="text"
              placeholder="coffee name"
              name="name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2">
            <label>Avilable Quantity:</label>
            <input
              type="text"
              placeholder="avilable quantity"
              name="quantity"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* row 2 */}
        <div className="flex gap-5">
          <div className="w-1/2">
            <label>Supplier:</label>
            <input
              placeholder="Supplier"
              type="text"
              name="supplier"
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2">
            <label>Taste:</label>
            <input
              placeholder="Taste"
              type="text"
              name="taste"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* row 3 */}
        <div className="flex gap-5">
          <div className="w-1/2">
            <label>Category:</label>
            <input
              placeholder="Category"
              type="text"
              name="category"
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2">
            <label>Details:</label>
            <input
              placeholder="Details"
              type="text"
              name="details"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* row-4 */}
        <div className="flex gap-5">
          <div className="w-1/2">
            <label>Price:</label>
            <input
              placeholder="Price"
              type="text"
              name="price"
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2">
            <label>PhotoURL:</label>
            <input
              placeholder="PhotoURL"
              type="text"
              name="photo"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="text-center">
          <input
            className="btn px-6 py-2 rounded-lg bg-rose-400 hover:bg-inherit border border-rose-400 hover:transition"
            type="submit"
            value="Add"
          />
        </div>
      </form>
    </>
  );
}

export default AddCoffee;
