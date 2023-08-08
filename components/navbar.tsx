import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="grid grid-cols-2 grid-flow-col">
        <div className="flex justify-start p-4">
          <Link href={"/"}>
            <button className="btn-primary">
              Home
            </button>
          </Link>
        </div>

      <div className="flex justify-end space-x-3 p-4">
        <Link href={"/Login"}>
          <button className="btn-primary">
            Login
          </button>
        </Link>
        <Link href={"/Signup"}>
          <button className="btn-primary">
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
