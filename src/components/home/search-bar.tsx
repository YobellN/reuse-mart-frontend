import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  productName: z.string().min(1, {
    message: "Masukkan nama produk",
  }),
});

export default function SearchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("HJAJBSJKBAJBKDJADAK");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-between items-center m-0"
      >
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem className="w-full h-10 rounded-sm shadow-none">
              <FormControl className="w-full border-0 h-10 rounded-sm shadow-none dark:bg-white">
                <Input placeholder="Temukan Produk..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-8 bg-bright-green rounded-sm shadow-s w-14 mx-1"
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
}
