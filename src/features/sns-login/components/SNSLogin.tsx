import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { FcGoogle } from "react-icons/fc";

import { auth } from "../../../lib/firebase";

const SNSLogin = () => {
  const router = useRouter();

  const loginWithProvider = (providerName: "google") => {
    const provider = {
      google: new GoogleAuthProvider(),
    };
    return signInWithPopup(auth, provider[providerName]);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full">
        <div className="mx-auto flex w-full justify-center">
          <button
            className="btn btn-outline inline-block border-2 border-base-gray hover:bg-transparent hover:text-base-gray"
            onClick={() =>
              loginWithProvider("google")
                .then(() => {
                  router.push("/");
                })
                .catch((err) => {
                  console.log(err);
                })
            }
          >
            <div className="flex items-center gap-2">
              <FcGoogle size={24} />
              <span className="font-bold">Login with Google</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SNSLogin;
