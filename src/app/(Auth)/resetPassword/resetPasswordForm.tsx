"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "./resetPassword.schema";
import { ResetPasswordFormType } from "./resetPassword.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handelResetPassword } from "./resetPasword.action";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

export default function ResetPasswordForm() {

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const router = useRouter();
  const RhfObj = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
     defaultValues: {
    email: "",
    newPassword: "", 
  },
  });
  const { control, handleSubmit } = RhfObj;

  async function mySubmit(data: ResetPasswordFormType) {

    setBtnLoading(true);

    const res = await handelResetPassword(data);

    setBtnLoading(false);

    if (res.success) {
      toast.success(res.message || "Your password has been reset successfully.",  {
          position: "top-right",
          duration: 1500,
          style: {
          color: "green",
          fontWeight: "600",
        },
        });

      router.push("/login");
    } else {
      toast.error(res.message || "Failed to reset password Please try again later.", {
          position: "top-right",
          duration: 1500,
          style: {
          color: "red",
          fontWeight: "600",
        },
        });
    }
  }

  return (
    <div className="p-6 w-full max-w-6xl mx-auto rounded-lg mt-6">
      <Form {...RhfObj}>
        <form onSubmit={handleSubmit(mySubmit)}>

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-2.5">
                  Email:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className="border-gray-200 rounded-md focus:outline-none focus:ring-0 mb-0.5 py-5 placeholder:text-gray-400 shadow-sm focus:shadow-md  focus:shadow-white !ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-5 ">
                  New Password:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="border-gray-200 rounded-md focus:outline-none focus:ring-0 mb-0.5 py-5 placeholder:text-gray-400 shadow-sm focus:shadow-md  focus:shadow-white !ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {btnLoading ? (

            <Button type="button" disabled className="cursor-not-allowed py-2 mt-4 px-8 font-semibold text-md bg-green-600 shadow-md shadow-white">
              <ClipLoader size={22} color="#e0e7ff" />
            </Button>
          ) : (

            <Button
              type="submit"
              className="cursor-pointer py-2 mt-4 px-8 font-semibold text-md bg-green-600 hover:bg-green-700 shadow-md shadow-white dark:text-white"
            >
              New Password
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
