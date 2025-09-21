"use client";
import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormValues>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    // basic confirm password check (react-hook-form also validates below)
    if (values.password !== values.confirmPassword) {
      // should not happen because of validation below, but keep guard
      return;
    }

    // TODO: wire up real signup API
    console.log("Signup payload:", {
      name: values.name,
      email: values.email,
      password: values.password,
    });

    // example: reset form after "successful" signup
    reset();
  };

  const password = watch("password", "");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="signup-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      // simple email regex
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <Button
              type="submit"
              form="signup-form"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Creating..." : "Create account"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
