"use client";

import * as React from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Calendar as CalendarIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  PegawaiFormSchema,
  PegawaiSchema,
} from "@/services/pegawai/schema-pegawai";
import router from "next/router";
import { toast } from "sonner";
import { handleNewPegawai } from "@/services/pegawai/pegawai-service";

export default function NewPegawaiForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);

  const form = useForm<PegawaiFormSchema>({
    resolver: zodResolver(PegawaiSchema),
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      no_telp: "",
      id_jabatan: 1,
      nip: "",
      tanggal_lahir: new Date(),
    },
  });

  type PegawaiPayload = Omit<PegawaiFormSchema, "tanggal_lahir"> & {
    tanggal_lahir: string;
  };

  const finalFormData = React.useRef<PegawaiPayload | null>(null);

  async function onSubmit(values: PegawaiFormSchema) {
    const isValid = await form.trigger();

    if (isValid) {
      const payload = {
        ...values,
        tanggal_lahir: format(values.tanggal_lahir, "yyyy-MM-dd"),
      };

      finalFormData.current = payload;
      console.log(finalFormData.current);
      setOpen(true);
    } else {
      alert("Form belum valid");
    }
  }

  async function handleSubmit(data: PegawaiPayload) {
    console.log(data);
    setSubmit(true);

    try {
      const res = await handleNewPegawai(data);
      console.log(res);

      if (res.message === "Pegawai berhasil ditambahkan") {
        router.push("/admin/pegawai");
        toast.success("Pegawai berhasil ditambahkan");
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
        toast.error("Gagal menambahkan pegawai");
      }
    } catch (err) {
      setSubmit(false);
      toast.error("Terjadi kesalahan server");
    } finally {
      setOpen(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Tambah Data Pegawai Baru
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-green-600">
                    Password minimal 8 katakter, mengandung huruf besar, kecil,
                    dan karakter khusus
                  </FormDescription>
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
                  Daftar
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
                      {submit ? "Memproses..." : "Ya, Daftarkan"}
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
