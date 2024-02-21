import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../Utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/fireBase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const pwd = password.current.value;
    const result = checkValidData(email.current.value, pwd);
    //console.log(result, email.current.value, pwd);
    setErrorMessage(result);
    if (result) return;
    if (!isSignInForm) {
      //sign up
      createUserWithEmailAndPassword(auth, email.current.value, pwd)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // Adding name to the app store
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://occ-0-2164-1009.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4",
          })
            .then(() => {
              //console.log("User added successfully", user);
              // to add the updated item we need to dispatch an action we have done it in body authstatechanged but it created a problem for us only after page refresh we can see the updated name and url so, we will have to do the same here as well
              // In below line we are taking this user info from auth and nor from user because auth has been updated with new value but not the user.
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.errorMessage);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      //sign in
      signInWithEmailAndPassword(auth, email.current.value, pwd)
        .then((userCredential) => {
          const user = userCredential.user;
          //console.log("User Signed In successfully", user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="opacity-90"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        ></img>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInForm ? (
          ""
        ) : (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-gray-600"
          ></input>
        )}
        <input
          type="email"
          ref={email}
          placeholder="Email or Phone Number"
          className="p-4 my-4 w-full bg-gray-600"
        ></input>
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600"
        ></input>
        <p className="text-red-700 font-bold py-2 text-md">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py text-gray-400">
          {isSignInForm ? "New to Netflix? " : "Already Registered! "}
          <span
            className="text-white text-5 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? " Sign Up now." : " Sign In now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
