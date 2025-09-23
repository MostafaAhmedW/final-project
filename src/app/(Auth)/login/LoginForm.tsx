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
import { loginSchema } from "./login.schema";
import { LoginFormType } from "./login.type";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function LoginForm() {
  const [btnLoading, setBtnLoading] = useState(false);

  const RhfObj = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = RhfObj;

  async function mySubmit(data: LoginFormType) {
    setBtnLoading(true);

    const res = await signIn("credentials", { ...data, redirect: false });

    if (res?.ok) {
      toast.success("Welcome back", {
        position: "top-right",
        duration: 1500,
        style: {
          color: "green",
          fontWeight: "600",
        },
      });

      window.location.href = "/";
    } else {
      toast.error("Invalid email or password", {
        position: "top-right",
        duration: 1500,
        style: {
          color: "red",
          fontWeight: "600",
        },
      });
    }

    setBtnLoading(false);
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-5">
                  Password:
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

          <div className="mt-3 w-full flex justify-between items-center ">
            <div>
              {btnLoading ? (
                <Button
                  type="button"
                  disabled
                  className="cursor-not-allowed py-2 mt-4 px-8 font-semibold text-md bg-green-600 shadow-md shadow-white"
                >
                  <ClipLoader size={22} color="#e0e7ff" />
                </Button>
              ) : (
                <Button className="cursor-pointer py-2 mt-4 px-8 font-semibold text-md bg-green-600 hover:bg-green-700 shadow-md shadow-white dark:text-white">
                  Login
                </Button>
              )}
            </div>

            <div>
              <Link
                href="/forgetPassword"
                className="dark:text-blue-700 text-blue-600 hover:text-blue-600 hover:underline text-sm font-medium"
              >
                Forget Password?
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
