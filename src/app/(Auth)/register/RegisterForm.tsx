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
import { schema } from "./register.schema";
import { RegisterFormType } from "./register.type";
import { handelRegister } from "./register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function RegisterForm() {

  const router = useRouter();

  const RhfObj = useForm({
    resolver: zodResolver(schema),
  });

  const { control, handleSubmit } = RhfObj;

  async function mySubmit(data: RegisterFormType) {


    const isRegistered = await handelRegister(data)

    if (isRegistered === true) {

      toast.success('Created successfully', {
          position: "top-right",
          duration: 1500,
         style: {
          color: "green",
          fontWeight: "600",
        },
        });

      router.push('/login');


    }

    else {
      toast.error(isRegistered, {
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
    <div className=" p-6 w-full max-w-6xl mx-auto rounded-lg mt-6">
      <Form {...RhfObj}>
        <form onSubmit={handleSubmit(mySubmit)}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-2.5">
                  {" "}
                  Username:{" "}
                </FormLabel>
                <FormControl>

                  <Input
                    {...field}
                    placeholder="Enter your username"
                    className=" border-gray-200 rounded-md focus:outline-none focus:ring-0 mb-0.5 py-5  placeholder:text-gray-400 shadow-sm  focus:shadow-md shadow-green-700 focus:shadow-white !ring-0  "
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-2.5">
                  {" "}
                  Email:{" "}
                </FormLabel>
                <FormControl>

                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className=" border-gray-200 rounded-md  focus:outline-none focus:ring-0   mb-0.5 py-5  placeholder:text-gray-400 shadow-sm focus:shadow-md shadow-green-700 focus:shadow-white !ring-0"
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
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-2.5">
                  {" "}
                  Password:{" "}
                </FormLabel>
                <FormControl>

                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className=" border-gray-200 rounded-md  focus:outline-none focus:ring-0   mb-0.5 py-5  placeholder:text-gray-400 shadow-sm focus:shadow-md shadow-green-700 focus:shadow-white !ring-0"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-2.5">
                  {" "}
                  Re-password:{" "}
                </FormLabel>
                <FormControl>

                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your re-password"
                    className=" border-gray-200 rounded-md  focus:outline-none focus:ring-0   mb-0.5 py-5  placeholder:text-gray-400 shadow-sm focus:shadow-md shadow-green-700 focus:shadow-white !ring-0"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-600 font-semibold pb-1.5 mt-2.5">
                  {" "}
                  Phone:{" "}
                </FormLabel>
                <FormControl>

                  <Input
                    {...field}
                    type="tel"
                    placeholder="Enter your phone"
                    className=" border-gray-200 border rounded-md focus:outline-none focus:ring-0 mb-3 py-5  placeholder:text-gray-400 shadow-sm focus:shadow-md shadow-green-700 focus:shadow-white !ring-0"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="cursor-pointer py-2 mt-4 px-8 font-semibold text-md bg-green-600 hover:bg-green-700 shadow-md shadow-white my-1.5">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
