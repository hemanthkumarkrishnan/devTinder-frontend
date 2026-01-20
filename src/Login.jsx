import React from "react";

const Login = () => {
  return (        
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center font-medium text-base">Login</h2>
          <div  >
            <label className="form-control w-full max-w-xs ">
              <div className="label" >
                <span className="label-text">Email ID</span>
              </div>
              <input type="text" className="input input-bordered w-full max-w-xs my-1 xs focus:outline-black   "  />
            </label>
          </div>
          <div >
            <label className="form-control w-full max-w-xs ">
              <div className="label" >
                <span className="label-text my-1 ">password</span>
              </div>
              <input type="text" className="input input-bordered w-full max-w-xs  focus:outline-black"  />
            </label>
          </div>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary bg-primary p-5 font-medium ">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
