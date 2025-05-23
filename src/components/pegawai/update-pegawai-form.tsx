"use client";

import * as React from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";
import { CalendarDMY } from "@/components/ui/calendar-month-year";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Pegawai,
  PegawaiFormSchema,
  PegawaiSchema,
} from "@/services/pegawai/schema-pegawai";
import { toast } from "sonner";
import { handleUpdatePegawai } from "@/services/pegawai/pegawai-service";
import { useRouter } from "next/navigation";
import { z } from "zod";

const UpdatePegawaiSchema = PegawaiSchema.partial();

type UpdatePegawaiFormSchema = z.infer<typeof UpdatePegawaiSchema>;

export default function UpdatePegawaiForm({ pegawai }: { pegawai: Pegawai }) {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const router = useRouter();

  const form = useForm<UpdatePegawaiFormSchema>({
    resolver: zodResolver(UpdatePegawaiSchema),
    defaultValues: {
      nama: pegawai.user.nama,
      email: pegawai.user.email,
      no_telp: pegawai.user.no_telp,
      id_jabatan: pegawai.id_jabatan,
      nip: pegawai.nip,
      tanggal_lahir: new Date(pegawai.tanggal_lahir),
    },
  });

  type PegawaiPayload = Omit<UpdatePegawaiFormSchema, "tanggal_lahir"> & {
    tanggal_lahir: string;
  };

  const finalFormData = React.useRef<PegawaiPayload | null>(null);

  async function onSubmit(values: UpdatePegawaiFormSchema) {
    const isValid = await form.trigger();

    if (isValid) {
      const payload: PegawaiPayload = {
        ...values,
        tanggal_lahir: values.tanggal_lahir
          ? format(values.tanggal_lahir, "yyyy-MM-dd")
          : "",
      };

      Object.keys(payload).forEach((key) => {
        const value = payload[key as keyof PegawaiPayload];
        if (value === undefined || value === "" || value === null) {
          delete payload[key as keyof PegawaiPayload];
        }
      });

      finalFormData.current = payload;
      setOpen(true);
    } else {
      alert("Form belum valid");
    }
  }

  async function handleSubmit(data: PegawaiPayload) {
    setSubmit(true);

    try {
      const res = await handleUpdatePegawai(data, pegawai.id_pegawai);

      if (res.message == "Pegawai berhasil diubah") {
        router.push("/admin/pegawai");
        toast.success("Data pegawai berhasil diubah");
        form.reset();
        setOpen(false);
      } else {
        if (res.errors) {
          Object.entries(res.errors).forEach(([field, message]) => {
            form.setError(field as keyof PegawaiFormSchema, {
              type: "server",
              message: Array.isArray(message) ? message[0] : String(message),
            });
          });
        }
        setSubmit(false);
        toast.error("Gagal mengubah data pegawai");
      }
    } finally {
      setOpen(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Edit Data Pegawai
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Adi Nugroho" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: adi@mail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="no_telp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: 08xxxxxxxxxx" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <FormControl>
                    <Input placeholder="18 Digit NIP" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_jabatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Jabatan Pegawai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Jabatan</SelectLabel>
                          <SelectItem value="1">Hunter</SelectItem>
                          <SelectItem value="2">Customer Service</SelectItem>
                          <SelectItem value="3">Quality Control</SelectItem>
                          <SelectItem value="5">Kurir</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarDMY
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <Button type="submit" className="w-full" disabled={submit}>
                  Perbarui Data Pegawai
                </Button>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Data Pegawai</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah data Pegawai sudah benar?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setOpen(false)}
                      disabled={submit}
                    >
                      Batal
                    </AlertDialogCancel>
                    <Button
                      type="button"
                      onClick={() => {
                        if (finalFormData.current) {
                          handleSubmit(finalFormData.current);
                        }
                      }}
                      disabled={submit}
                    >
                      {submit ? "Memproses..." : "Ya, Perbarui"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
