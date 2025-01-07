import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { logIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TResponse } from "@/types/global.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@repo/utils/zod-schemas";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: import.meta.env.VITE_APP_DEMO_EMAIL,
      password: import.meta.env.VITE_APP_DEMO_PASSWORD,
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const toastId = toast.loading("Signing in...", {
      duration: 2000,
    });

    try {
      const response = (await login(values)) as TResponse<{
        data: { accessToken: string };
      }>;

      if (response?.error) {
        toast.error(response.error.data.errorSources[0].message, {
          id: toastId,
        });
      }

      if (response.data) {
        toast.success("Welcome back!", {
          id: toastId,
        });

        navigate("/", { replace: true });
        dispatch(
          logIn({
            accessToken: response?.data?.data?.accessToken,
            user: jwtDecode(response?.data?.data?.accessToken),
          })
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        id: toastId,
      });
    }
  }

  const ShowPasswordIcon = !showPassword ? Eye : EyeOff;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute left-3 top-2.5 h-5 w-5" />
                  <Input placeholder="Enter your email address" className="pl-10" {...field} />
                </div>
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
              <FormLabel className="text-base">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute left-3 top-2.5 h-5 w-5" />
                  <ShowPasswordIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground absolute right-3 top-2.5 h-5 w-5 cursor-pointer"
                  />
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="px-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <span>Signing in</span>
              <Loader2 className="h-4 w-4 animate-spin duration-300" />
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
