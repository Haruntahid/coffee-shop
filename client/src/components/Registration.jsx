import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

function Registration() {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  // handel register
  const handelRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    createUser(email, password)
      .then((result) => {
        const createAt = result.user?.metadata?.creationTime;
        // send the data to server
        const user = { email, createAt };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Registration Successfully",
                icon: "success",
              });
            }
          });
      })
      .catch((error) => {
        console.log(error);
        setError(
          error.message.replace(
            "Firebase: Error (auth/email-already-in-use).",
            "Email already Exist!!"
          )
        );
      });
  };
  return (
    <>
      <div className="hero min-h-screen">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handelRegister} className="card-body">
            <h2 className="text-center font-bold text-3xl text-rose-500">
              Register
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
              {error && <span className="text-rose-400">{error}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
