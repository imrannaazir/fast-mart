import { cn } from "@/lib/utils";
import { useGetMyDataQuery, useUpdateMyDataMutation } from "@/redux/features/user/user-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@repo/utils/functions";
import { TProfileFieldValues, TUser } from "@repo/utils/types";
import { profileUpdateValidation } from "@repo/utils/zod-schemas";
import { format } from "date-fns";
import { CalendarIcon, Edit, Loader2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PageSection from "../ui/page-section";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ProfileInformationForm = () => {
  const [isDisable, setIsDisable] = useState(true);
  const { data, isFetching } = useGetMyDataQuery("");
  const [updateMyData, { isLoading }] = useUpdateMyDataMutation();
  const myData = data?.data as TUser;
  const form = useForm<TProfileFieldValues>({
    resolver: zodResolver(profileUpdateValidation),
  });

  useEffect(() => {
    if (myData?._id) {
      form.setValue("dateOfBirth", myData?.dateOfBirth as Date);
      form.setValue("firstName", myData?.firstName);
      form.setValue("lastName", myData?.lastName);
      form.setValue("phoneNumber", myData?.phoneNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);

  const onCancel = () => {
    setIsDisable(true);
    form.reset();
  };

  const onSubmit = async (values: TProfileFieldValues) => {
    try {
      const result = await updateMyData(values).unwrap();
      if (result?.success) {
        toast.success("Profile information updated successfully.");
      }
    } catch (error) {
      if (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PageSection className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center justify-between">
            <Label className="text-lg">Profile Information</Label>
            {/* buttons */}
            <div>
              {isDisable ? (
                <Button onClick={() => setIsDisable(false)} type="button" size={"icon"}>
                  <Edit />
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button variant={"destructive"} onClick={onCancel} type="button" size={"icon"}>
                    <X />
                  </Button>
                  <Button type="submit" size={"icon"}>
                    {isLoading ? <Loader2 className="animate-spin duration-300" /> : <Save />}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisable}
                    {...field}
                    placeholder={isFetching ? "Loading..." : "Enter your first name"}
                    value={field?.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisable}
                    {...field}
                    placeholder={isFetching ? "Loading..." : "Enter your last name"}
                    value={field?.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisable}
                    {...field}
                    placeholder={isFetching ? "Loading..." : "Enter your phone number"}
                    value={field?.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="col-span-12 mt-1 flex flex-col sm:col-span-6">
                <FormLabel className="mb-1">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isDisable}
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field?.value}
                      onSelect={field.onChange}
                      fromYear={1960}
                      toYear={2030}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </PageSection>
      </form>
    </Form>
  );
};

export default ProfileInformationForm;
