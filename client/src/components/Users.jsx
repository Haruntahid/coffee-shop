import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

function Users() {
  const LoadedUser = useLoaderData();
  const [users, setUsers] = useState(LoadedUser);

  //   handel delete user
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      //   console.log(result.user);
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });
            }
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          });
      }
    });
  };

  return (
    <>
      <h2 className="text-5xl font-bold text-center">Users : {users.length}</h2>
      {users.length > 0 ? (
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Create Time</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.email}</td>
                  <td>{user.createAt}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-error"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Users;
