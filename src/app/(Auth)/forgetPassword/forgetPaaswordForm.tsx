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
import { forgetPasswordSchema } from "./forgetPassword.schema";
import { ForgetPasswordFormType } from "./forgetPassword.type";
import { toast } from "sonner";
import { handelForgetPassword } from "./forgetPassword.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ForgetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const RhfObj = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { control, handleSubmit } = RhfObj;

  async function mySubmit(data: ForgetPasswordFormType) {
    try {
      setLoading(true);
      const res = await handelForgetPassword(data);

      if (res?.statusMsg === "success") {
        toast.success("Reset code sent to your email", {
          position: "top-right",
          duration: 1500,
          style: {
            color: "green",
            fontWeight: "600",
          },
        });
        setTimeout(() => {
          router.push("/restCode");
        }, 1200);
      } else {
        toast.error(res?.message || "Failed to send reset code", {
          position: "top-right",
          duration: 1500,
          style: {
          color: "red",
          fontWeight: "600",
        },
        });
      }
    } catch (error) {
      toast.error("Unexpected error occurred", {
        position: "top-right",
        duration: 1500,
        style: {
          color: "red",
          fontWeight: "600",
        },
      });
      console.log(error);
      

    } finally {
      setLoading(false);
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
                    className="border-gray-200 rounded-md focus:outline-none focus:ring-0 mb-0.5 py-5 placeholder:text-gray-400 shadow-sm shadow-white !ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer py-2 mt-4 px-8 font-semibold text-md bg-green-600 hover:bg-green-700 shadow-md text-white flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <ClipLoader size={22} color="#e0e7ff" />
            ) : (
              "Send Email"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
