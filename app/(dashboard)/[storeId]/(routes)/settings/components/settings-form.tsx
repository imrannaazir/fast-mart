"use client";
import { useState } from "react";

import Headline from "@/components/ui/headline";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import AlertModal from "@/components/modals/alert-modal";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ApiAlert from "@/components/ui/api-alert";
import { useParams } from "next/navigation";
import useOrigin from "@/hooks/useOrigin";

//form schema
const formSchema = z.object({
  name: z.string().min(2),
});

type SettingsFormValue = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Store;
}
const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const origin = useOrigin();

  //   react hook form
  const form = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  // handle on submit
  const onSubmit = async (data: SettingsFormValue) => {
    console.log(data);
  };
  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
      />

      {/* top */}
      <div className="flex items-center justify-between">
        <Headline
          title="Store settings"
          description="Manage store preferences"
        />
        <Button
          variant="destructive"
          size="sm"
          disabled={isLoading}
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />

      {/* form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* button */}
          <Button disabled={isLoading} className="me-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>

      <Separator />

      {/* api alert */}
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params.storeId}`}
      />
    </>
  );
};

export default SettingsForm;
