import React from "react";
import { useRouter } from "next/router";
import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import InputPassword from "@/components/Elements/InputPassword";

const dummyUsername = "gtap";
const dummyPassword = "dev";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  return (
    <div className="flex">
      <div className="bg-white text-center py-36 px-24 rounded-l-3xl">
        <h1 className="text-primary text-3xl font-bold">FIEMS</h1>
        <p className="text-sm font-light">Management System</p>
      </div>
      <div className="bg-primary grow rounded-r-3xl">
        <div className="flex flex-col gap-3 px-16 h-full pt-20 pb-7">
          <form
            className="flex flex-col gap-3 mb-auto"
            onSubmit={() => {
              if (
                user.username == dummyUsername &&
                user.password == dummyPassword
              ) {
                router.push("/dashboard");
              }
            }}
          >
            <h1 className="text-white text-xl font-semibold">Sign In</h1>
            <InputText
              placeholder="Username"
              className="w-full"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <InputPassword
              placeholder="Password"
              className="w-full"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="flex justify-end w-full">
              <Button
                text="Sign In"
                variant="filled"
                className="!bg-white !text-primary !py-2"
              />
            </div>
          </form>
          <p className="text-white text-xs font-light mt-auto">
            Can't login to your account? Please contact your admin
          </p>
        </div>
      </div>
    </div>
  );
}
