import React from "react";

import { SNSLogin } from "../features/sns-login/components";

const login = () => {
  return (
    <div className="h-screen bg-base-white">
      <div className="mx-auto h-full max-w-xl p-8">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col justify-center rounded-md border bg-white p-8">
            <SNSLogin />
            <div className="divider"></div>
            <div className="flex w-full justify-center">
              {/* TODO: form for sign up with email */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
