"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";
import { FaEye, FaEyeSlash, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Please Enter valid name, at least 3 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false); // Initialize state to track whether password is shown or hidden

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(
        "https://ai-tutor-next-backend.onrender.com/user/register",
        data
      );
      // console.log(response)
      if (response.status === 201) {
        const userData = response.data.data;
        const setCookies = await Cookies.set("user", userData);
        const setAccessToken = await Cookies.set(
          "access_token",
          userData.access_token
        );
        await localStorage.setItem("user", JSON.stringify(userData));
        if (setCookies && setAccessToken) {
          console.log("Login Successful");
          window.location.href = "/dashboard";
        }
      } else {
        console.log("Some error occurred");
      }
    } catch (error) {
      console.log("Unexpected Error occurred ", error);
    }

    // Display toast message
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@email.com"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="pr-8"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-700 cursor-pointer focus:outline-none"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <p className="text-gray-500 text-sm text-center font-semibold">
            By proceeding, You agree to our <Link href="#" className="text-primary">Terms</Link> and <Link href="#" className="text-primary">Privacy policy</Link>.
        </p>
        <Button type="submit" className="w-full  py-5 bg-primary text-white dark:text-dark">
          Sign Up
        </Button>
     
      </form>
    </Form>
  );
};

export default function page() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <RegisterForm />
            <Separator />
            <button className="w-full flex bg-white p-2 rounded-lg items-center justify-center text-center gap-4 border-black border-[1px] font-semibold ">
              <FcGoogle className="w-6 h-6" />
              Continue with Google
            </button>
            <button className="w-full flex bg-blue-800 p-2 rounded-lg items-center justify-center text-center gap-4 text-white font-semibold ">
              <FaLinkedin className="w-6 h-6" />
              <span>Continue with LinkedIn</span>
            </button>
          </div>
        </div>
        <Link
          href="/signin"
          className="mt-4 text-gray-700 dark:text-gray-200 text-sm"
        >
          Already Have an Account?{" "}
          <span className="text-primary underline">Sign In</span>{" "}
        </Link>
      </div>
    </section>
  );
}
