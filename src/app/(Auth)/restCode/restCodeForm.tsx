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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { restCodeSchema } from "./restCode.schema";
import { RestCodeFormType } from "./restCode.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handelRestCode } from "./restCode.action";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState } from "react";
import { ClipLoader } from "react-spinners";

import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"], 
});


export default function RestCodeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const RhfObj = useForm<RestCodeFormType>({
    resolver: zodResolver(restCodeSchema),
  });

  const { control, handleSubmit } = RhfObj;

  async function mySubmit(data: RestCodeFormType) {
    try {
      setLoading(true);
      const res = await handelRestCode(data);
      console.log("res rsetCode ", res);

      if (res?.status === "Success") {
        toast.success("Success", {
          position: "top-right",
          duration: 1500,
          style: {
          color: "green",
          fontWeight: "600",
        },
        });
        setLoading(false);
 router.push("/resetPassword");

      } else {
        toast.error(res?.message || "Invalid or expired code", {
          position: "top-right",
          duration: 1500,
          style: {
          color: "red",
          fontWeight: "600",
        },
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className={` ${playfair.className} text-center text-2xl font-bold text-green-700 mb-6`}>
          Verify Reset Code
        </h2>

        <Form {...RhfObj}>
          <form onSubmit={handleSubmit(mySubmit)} className="space-y-6 dark:text-black">
            <FormField
              control={control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-600 font-semibold mb-0.5">
                    Enter Code:
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-2 font-semibold text-md bg-green-600 hover:bg-green-700 shadow-md rounded-lg flex items-center justify-center gap-2 dark:text-white cursor-pointer"
            >
              {loading ? (
                <ClipLoader size={22} color="#e0e7ff" />
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
