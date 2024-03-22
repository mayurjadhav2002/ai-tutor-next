"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const ResetPass = () => {
  const [email, setEmail] = useState<String>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setEmail(data.email); // Update the email state
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4"
      >
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
              <FormDescription>
                Please enter your registered email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password {"(OTP)"}</FormLabel>
              {/* <FormControl>
                <InputOTP
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot
                        
key={index}
                          {...slot}
                          className="w-16 h-10"                        />
                      ))}{" "}
                    </InputOTPGroup>
                  )}
                  {...field}
                />
              </FormControl> */}
              <FormDescription>
                Please enter the one-time password sent to your Email. Check
                Spam folders also.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-5 bg-primary text-white dark:text-dark"
        >
          Next
        </Button>
      </form>
    </Form>
  );
};

function page() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img
            className="w-8 h-8 mr-2"
            src=""
            alt="logo"
          /> */}
          CareerAI
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset your password
            </h1>
            <ResetPass />
          </div>
        </div>
        <Link
          href="/register"
          className="mt-4 text-gray-700 dark:text-gray-200 text-sm"
        >
          Don&apos;t Have an Account?{" "}
          <span className="text-primary underline">Sign Up</span>{" "}
        </Link>
      </div>
    </section>
  );
}

export default page;
