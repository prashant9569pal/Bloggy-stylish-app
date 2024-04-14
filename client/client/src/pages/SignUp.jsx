import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-700 via-purple-60  to-pink-600 rounded-lg text-white">
              Prashant's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a Blog page, where you can post your blog by signing-up
            using email and password.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username"></Label>
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div className="">
              <Label value="Your E-mail"></Label>
              <TextInput
                type="text"
                placeholder="username@gmail.com"
                id="email"
              />
            </div>
            <div className="">
              <Label value="Your Password"></Label>
              <TextInput type="text" placeholder="Password" id="email" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              SignUp
            </Button>
          </form>
          <div className=" flex gap-2 mt-5 text-sm">
            <span>Have an acccount?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign-In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
