import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { sellProductValidationSchema } from "@/schemas/sellProductSchema";
import { useSellProductMutation } from "@/redux/features/sell/sellApi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const SellProductForm = () => {
  const [sellProduct] = useSellProductMutation();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof sellProductValidationSchema>>({
    resolver: zodResolver(sellProductValidationSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof sellProductValidationSchema>) {
    const toastId = toast.loading("Processing.", {
      duration: 2000,
    });

    try {
      const response = await sellProduct(values).unwrap();
      if (response?.data?.accessToken) {
        toast.success("Sold successfully", {
          id: toastId,
        });

        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        id: toastId,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* buyer name */}
        <FormField
          control={form.control}
          name="buyer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the buyer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4 items-center">
          {/* quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter sell quantity."
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* sell date */}
          <FormField
            control={form.control}
            name="soldAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Sell</Button>
      </form>
    </Form>
  );
};

export default SellProductForm;
