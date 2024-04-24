import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

function Login() {
  const { loginUser } = useContext(AuthContext);

  //  const handel logIn
  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        const lastLogin = result.user?.metadata?.lastSignInTime;
        const user = {
          email,
          lastLogin,
        };
        // update the data
        fetch("http://localhost:5173/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div className="hero min-h-screen">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body">
            <h2 className="text-center font-bold text-3xl text-rose-500">
              Login
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
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

export default Login;
