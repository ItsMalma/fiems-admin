import { Button } from "@/components/Elements";
import { Form, FormText } from "@/components/Forms";
import { FormPassword } from "@/components/Forms/Inputs/FormPassword";
import { trpc } from "@/libs/trpc";
import { LoginForm, loginInput } from "@/server/dtos/auth.dto";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [_, setCookie] = useCookies(["token"]);

  const router = useRouter();

  const { addToasts } = useToast();

  const methods = useForm<LoginForm>({
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: zodResolver(loginInput),
  });

  const loginMutation = trpc.auth.login.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await loginMutation
      .mutateAsync(data)
      .then(async (token) => {
        setCookie("token", token);

        await router.push("/master_data/business_partner/customer_group");
      })
      .catch((err) => {
        if (err instanceof TRPCClientError) {
          addToasts({ type: "error", message: err.message });
        }
      });
  });

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="bg-white rounded-[10px] p-4 shadow w-1/3">
        <Form
          singleTab
          methods={methods}
          controls={[
            {
              type: "input",
              id: "name",
              label: "Name",
              input: <FormText name="name" />,
              full: true,
            },
            {
              type: "input",
              id: "password",
              label: "Password",
              input: <FormPassword name="password" />,
              full: true,
            },
          ]}
        />
        <Button
          variant="filled"
          text="Login"
          className="mt-4 w-32"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}
