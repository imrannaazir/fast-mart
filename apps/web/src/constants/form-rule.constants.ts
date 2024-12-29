import { Rule } from "antd/es/form";

export const formRules: Record<"email" | "firstName" | "lastName" | "password" | "confirmPassword", Rule[]> = {
  firstName: [{ required: true, message: "Please input your first name!" }],
  lastName: [{ required: true, message: "Please input your last name!" }],
  email: [
    { required: true, message: "Please input your email!" },

    {
      type: "email",
      message: "The input is not valid E-mail!",
    },
  ],

  password: [
    { required: true, message: "Please input your Password!" },
    () => ({
      validator(_, value: string) {
        if (value?.length < 8) {
          return Promise.reject("Password must be at least 8 characters!");
        }

        if (!/[A-Z]/.test(value)) {
          return Promise.reject("Password must contain at least one uppercase letter!");
        }

        if (!/[a-z]/.test(value)) {
          return Promise.reject("Password must contain at least one lowercase letter!");
        }

        if (!/[0-9]/.test(value)) {
          return Promise.reject("Password must contain at least one number.");
        }

        if (!/[!@#$%^&*().,?"':{}|<>]/.test(value)) {
          return Promise.reject("Password must contain at least one special character!");
        }

        return Promise.resolve();
      },
    }),
  ],
  confirmPassword: [
    { required: true, message: "Please confirm password!" },

    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("The new password that you entered do not match!"));
      },
    }),
  ],
};
