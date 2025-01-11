import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { TChangePasswordFieldValues } from "@repo/utils/types";
import { changeAdminPasswordValidationSchema } from "@repo/utils/zod-schemas";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PageSection from "../ui/page-section";

const ChangePasswordForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const ShowPasswordIcon = !passwordShow ? Eye : EyeOff;
  const ShowNewPasswordIcon = !newPasswordShow ? Eye : EyeOff;
  const ShowConfirmPasswordIcon = !confirmPasswordShow ? Eye : EyeOff;

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<TChangePasswordFieldValues>({
    resolver: zodResolver(changeAdminPasswordValidationSchema),
  });

  const onSubmit = async (values: TChangePasswordFieldValues) => {
    try {
      const result = await changePassword({
        oldPassword: values.oldPassword,
        password: values?.password,
      }).unwrap();
      if (result?.success) {
        toast.success("Password has been changed successfully");
        form.setValue("confirmPassword", "");
        form.setValue("oldPassword", "");
        form.setValue("password", "");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.errorSources?.[0]?.message);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PageSection className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center justify-between">
            <Label className="text-lg">Change Password</Label>
          </div>
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-2.5 h-5 w-5" />
                    <ShowPasswordIcon
                      onClick={() => setPasswordShow(!passwordShow)}
                      className="text-muted-foreground absolute right-3 top-2.5 h-5 w-5 cursor-pointer"
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter your current password"
                        type={passwordShow ? "text" : "password"}
                        className="px-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-2.5 h-5 w-5" />
                    <ShowNewPasswordIcon
                      onClick={() => setNewPasswordShow(!newPasswordShow)}
                      className="text-muted-foreground absolute right-3 top-2.5 h-5 w-5 cursor-pointer"
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter a new password"
                        type={newPasswordShow ? "text" : "password"}
                        className="px-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-2.5 h-5 w-5" />
                    <ShowConfirmPasswordIcon
                      onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                      className="text-muted-foreground absolute right-3 top-2.5 h-5 w-5 cursor-pointer"
                    />
                    <FormControl>
                      <Input
                        placeholder="Confirm your new password"
                        type={confirmPasswordShow ? "text" : "password"}
                        className="px-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin duration-300" /> : <span>Change password</span>}
            </Button>
          </div>
        </PageSection>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
