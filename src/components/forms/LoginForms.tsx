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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logIn } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at lest 4 character.",
  }),
});

const LoginForm = () => {
  const [login, { error }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Logging in.", {
      duration: 2000,
    });
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    try {
      const response = await login(values).unwrap();
      if (response?.data?.accessToken) {
        toast.success("Logged in.", {
          id: toastId,
        });

        navigate("/", { replace: true });
        dispatch(
          logIn({
            accessToken: response?.data?.accessToken,
            user: jwtDecode(response?.data?.accessToken),
          })
        );
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        id: toastId,
      });
    }
  }

  if (error) {
    toast.error("Something went wrong.", {
      duration: 2000,
    });
  }

  return (
    <Form {...form}>
      <h1 className="text-3xl mb-6">Login</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address." {...field} />
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
                <Input
                  placeholder="Enter password."
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
