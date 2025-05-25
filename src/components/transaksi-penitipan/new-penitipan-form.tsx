"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon, Save } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Accordion } from "@/components/ui/accordion";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  PenitipanFormSchema,
  PenitipanPayload,
  PenitipanSchema,
} from "@/services/penitipan/schema-penitipan";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getAllPenitip } from "@/services/penitip/penitip-services";
import { Penitip } from "@/services/penitip/schema-penitip";
import { Pegawai } from "@/services/utils";
import {
  getPegawaiQC,
  getPegawaiHunter,
  handleNewPenitipan,
} from "@/services/penitipan/penitipan-services";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CalendarDMY } from "../ui/calendar-month-year";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FormSelectPopover } from "../form-select-popover";
import { getAllKategoriProduk } from "@/services/produk/kategori-produk-services";
import { KategoriProduk } from "@/services/produk/schema-kategori-produk";
import { useRouter } from "next/navigation";
import { NewProdukAccordionItem } from "./new-product-form";
import { useFieldArray } from "react-hook-form";

export default function NewPenitipanForm() {
  const [penitipRaw, setPenitipRaw] = React.useState<Penitip[]>([]);
  const [QcRaw, setQcRaw] = React.useState<Pegawai[]>([]);
  const [kategoriProdukRaw, setKategoriProdukRaw] = React.useState<
    KategoriProduk[]
  >([]);
  const [HunterRaw, setHunterRaw] = React.useState<Pegawai[]>([]);
  const [showHunterForm, setShowHunterForm] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = useState(false);

  const router = useRouter();

  //untuk default nya akordion (supaya otomatis ada 1 accordion yg terbuka)
  useEffect(() => {
    if (fields.length === 0) {
      append({
        nama_produk: "",
        deskripsi_produk: "",
        id_kategori: 0,
        harga_produk: null,
        waktu_garansi: null,
        foto_produk: [],
      });
    }
  }, []);

  //fetch nama penitip
  useEffect(() => {
    async function fetchData() {
      const data = await getAllPenitip();
      setPenitipRaw(data);
    }
    fetchData();
  }, []);

  const dataPenitip = penitipRaw.map((penitip: Penitip) => ({
    label: penitip.user.nama,
    value: penitip.id_penitip,
  }));

  //untuk ngambil pegawai qc
  useEffect(() => {
    async function fetchData() {
      const data = await getPegawaiQC();
      setQcRaw(data);
    }
    fetchData();
  }, []);

  const dataQC = QcRaw.map((pegawai: Pegawai) => ({
    label: pegawai.user.nama,
    value: pegawai.id_pegawai,
  }));

  //ambil kategori produk
  useEffect(() => {
    async function fetchData() {
      const data = await getAllKategoriProduk();
      setKategoriProdukRaw(data);
    }
    fetchData();
  }, []);

  const dataKategori = kategoriProdukRaw
    .sort((a, b) => a.id_kategori - b.id_kategori)
    .map((kategori: KategoriProduk) => ({
      label: kategori.nama_kategori,
      value: kategori.id_kategori,
    }));

  //untuk ngambil pegawai hunter
  useEffect(() => {
    async function fetchData() {
      const data = await getPegawaiHunter();
      setHunterRaw(data);
    }
    fetchData();
  }, []);

  const dataHunter = HunterRaw.map((pegawai: Pegawai) => ({
    label: pegawai.user.nama,
    value: pegawai.id_pegawai,
  }));

  //form
  const form = useForm<PenitipanFormSchema>({
    resolver: zodResolver(PenitipanSchema),
    defaultValues: {
      id_penitip: "",
      id_qc: "",
      id_hunter: null,
      tanggal_penitipan: new Date(),
      produk: [],
    },
  });

  const finalFormData = React.useRef<PenitipanPayload | null>(null);

  async function onSubmit(values: PenitipanFormSchema) {
    const isValid = await form.trigger();

    if (isValid) {
      const tanggal_penitipan = values.tanggal_penitipan
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      finalFormData.current = {
        ...values,
        tanggal_penitipan,
      };

      setOpen(true);
    } else {
      alert("Form belum valid");
    }
  }

  async function handleSubmit(data: PenitipanPayload) {
    setSubmit(true);

    try {
      const formData = new FormData();

      formData.append("id_penitip", data.id_penitip);
      formData.append("id_qc", data.id_qc);
      if (data.id_hunter) formData.append("id_hunter", data.id_hunter);
      formData.append("tanggal_penitipan", data.tanggal_penitipan);

      if (data.produk.length) {
        data.produk.forEach((produk, i) => {
          formData.append(`produk[${i}][nama_produk]`, produk.nama_produk);
          formData.append(
            `produk[${i}][deskripsi_produk]`,
            produk.deskripsi_produk
          );
          formData.append(
            `produk[${i}][id_kategori]`,
            String(produk.id_kategori)
          );
          formData.append(
            `produk[${i}][harga_produk]`,
            String(produk.harga_produk)
          );
          if (produk.waktu_garansi instanceof Date) {
            formData.append(
              `produk[${i}][waktu_garansi]`,
              produk.waktu_garansi.toISOString().slice(0, 10)
            );
          }

          produk.foto_produk.forEach((file, j) => {
            formData.append(`produk[${i}][foto_produk][${j}][path_foto]`, file);
          });
        });
      }

      const res = await handleNewPenitipan(formData);

      if (res.message === "Penitipan berhasil ditambahkan") {
        router.push("/cs/penitipan");
        toast.success("Penitipan berhasil ditambahkan");
        form.reset();
      } else {
        if (res.errors) {
          Object.entries(res.errors).forEach(([field, message]) => {
            form.setError(field as keyof PenitipanFormSchema, {
              type: "server",
              message: Array.isArray(message) ? message[0] : String(message),
            });
          });
        }
        toast.error("Gagal menambahkan penitipan");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setSubmit(false);
      setOpen(false);
    }
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "produk",
  });

  return (
    <Card className="w-full sm:max-w-6/7 mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center pb-4 border-b-2 border-stone-300">
          Formulir Penitipan Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="border border-stone-300 p-4 rounded-lg bg-stone-50">
              <CardTitle className="text-xl text-center mb-1">
                Tambah Data Penitipan
              </CardTitle>
              <CardDescription className="text-md text-center mb-10">
                Masukkan informasi-informasi umum penitipan
              </CardDescription>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-start">
                <FormField
                  control={form.control}
                  name="id_penitip"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nama Penitip</FormLabel>
                      <FormSelectPopover
                        options={dataPenitip}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Pilih nama penitip"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="id_qc"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nama Pegawai QC</FormLabel>
                      <FormSelectPopover
                        options={dataQC}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Pilih pegawai QC"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  {showHunterForm ? (
                    <FormField
                      control={form.control}
                      name="id_hunter"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Nama Hunter</FormLabel>
                          <FormSelectPopover
                            options={dataHunter}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Pilih hunter"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="terms"
                      checked={showHunterForm}
                      className="bg-white"
                      onCheckedChange={(value) => {
                        if (!value) {
                          form.setValue("id_hunter", null);
                        }
                        setShowHunterForm(value === true);
                      }}
                    />
                    <Label htmlFor="terms">Produk adalah produk hunting</Label>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="tanggal_penitipan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Penitipan</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full max-w-[400px] justify-start text-left font-semibold bg-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "dd MMMM yyyy", {
                                  locale: id,
                                })
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarDMY
                              mode="single"
                              selected={field.value ?? new Date()}
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
              </div>
            </div>
            <div className="border border-stone-300 p-4 rounded-lg bg-green-50">
              <CardTitle className="text-xl text-center mb-1">
                Tambah Data Barang Titipan
              </CardTitle>
              <CardDescription className="text-md text-center mb-10">
                Masukkan informasi dan detail barang titipan.
              </CardDescription>
              <Accordion
                type="multiple"
                defaultValue={["item-1"]}
                className="my-4 w-full space-y-2 rounded-lg "
              >
                {fields.map((field, index) => (
                  <NewProdukAccordionItem
                    key={field.id}
                    index={index}
                    form={form}
                    dataKategori={dataKategori}
                    append={append}
                    remove={remove}
                    length={fields.length}
                  />
                ))}
              </Accordion>
            </div>

            <div className="pt-4">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <Button type="submit" disabled={submit}>
                  <Save strokeWidth={2.5} />
                  Simpan Data Penitipan
                </Button>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Konfirmasi Penitipan Baru
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah data penitipan sudah benar?
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
                      {submit ? "Memproses..." : "Ya, Tambah Penitipan"}
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
