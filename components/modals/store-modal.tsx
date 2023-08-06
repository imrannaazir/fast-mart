"use client";

import { useDispatch } from "react-redux";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Modal from "@/components/ui/modal";
import { onClose } from "@/redux/features/modalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const StoreModal = () => {
  // dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // select isOpen value
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  // define form schema
  const formSchema = z.object({
    name: z.string().min(1, { message: "name is required!" }),
  });

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // onsubmit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Modal
      title="Create Store"
      description="Add new store to add new products and categories"
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
    >
      <div>
        <div
          className="
                    space-y-4
                    py-2
                    pb-4"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e-commerce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div
                className="
              pt-6
              space-x-2
              flex
              items-center
              justify-end
              "
              >
                <Button onClick={() => dispatch(onClose())} variant={"outline"}>
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
