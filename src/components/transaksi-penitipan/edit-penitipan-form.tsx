"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Accordion } from "@/components/ui/accordion";

import {
  Penitipan,
  PenitipanUpdateSchema,
  PenitipanUpdateFormSchema,
} from "@/services/penitipan/schema-penitipan";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Penitip } from "@/services/penitip/schema-penitip";
import { Pegawai } from "@/services/utils";
import { handleEditPenitipan } from "@/services/penitipan/penitipan-services";
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
import { FormSelectPopover } from "../form-select-popover";
import { KategoriProduk } from "@/services/produk/schema-kategori-produk";
import { useRouter } from "next/navigation";
import { EditProdukAccordionItem } from "./edit-product-form";
import { useFieldArray } from "react-hook-form";
import { format } from "date-fns";

export default function EditPenitipanForm({
  penitipRaw,
  QcRaw,
  kategoriProdukRaw,
  HunterRaw,
  detailPenitipan,
}: {
  penitipRaw: Penitip[] | null;
  QcRaw: Pegawai[] | null;
  kategoriProdukRaw: KategoriProduk[] | null;
  HunterRaw: Pegawai[] | null;
  detailPenitipan: Penitipan | null;
}) {
  const [showHunterForm, setShowHunterForm] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = useState(false);
  const router = useRouter();

  //untuk default nya akordion (supaya otomatis ada 1 accordion yg terbuka)
  const didAppendRef = React.useRef(false);

  // nama penitip
  const dataPenitip = penitipRaw?.map((penitip: Penitip) => ({
    label: penitip.user.nama,
    value: penitip.id_penitip,
  }));

  //untuk ngambil pegawai qc

  const dataQC = QcRaw?.map((pegawai: Pegawai) => ({
    label: pegawai.user.nama,
    value: pegawai.id_pegawai,
  }));

  //ambil kategori produk
  const dataKategori = (kategoriProdukRaw ?? [])
    .sort((a, b) => a.id_kategori - b.id_kategori)
    .map((kategori: KategoriProduk) => ({
      label: kategori.nama_kategori,
      value: kategori.id_kategori,
    }));

  //untuk ngambil pegawai hunter
  const dataHunter = HunterRaw?.map((pegawai: Pegawai) => ({
    label: pegawai.user.nama,
    value: pegawai.id_pegawai,
  }));

  useEffect(() => {
    if (detailPenitipan?.id_hunter) {
      setShowHunterForm(true);
    }
  }, [detailPenitipan?.id_hunter]);

  //form
  const form = useForm<PenitipanUpdateFormSchema>({
    resolver: zodResolver(PenitipanUpdateSchema),
    defaultValues: {
      id_penitip: detailPenitipan?.id_penitip ?? "",
      id_qc: detailPenitipan?.id_qc ?? "",
      id_hunter: detailPenitipan?.id_hunter ?? null,
      produk: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "produk",
  });

  //init data penitipan
  useEffect(() => {
    if (
      !didAppendRef.current &&
      (detailPenitipan?.produk_titipan ?? []).length > 0
    ) {
      detailPenitipan?.produk_titipan.forEach((produk) => {
        append({
          id_produk: produk.id_produk,
          nama_produk: produk.nama_produk,
          deskripsi_produk: produk.deskripsi_produk,
          id_kategori: produk.id_kategori,
          harga_produk: produk.harga_produk.toString(),
          waktu_garansi: produk.waktu_garansi
            ? new Date(produk.waktu_garansi)
            : null,
          foto_produk: produk.foto_produk.map((foto) => {
            return new File([foto.path_foto], foto.path_foto, {
              type: foto.path_foto.endsWith(".jpg")
                ? "image/jpeg"
                : "image/png",
            });
          }),
        });
      });
      didAppendRef.current = true;
    }
  }, [detailPenitipan, append]);

  const finalFormData = React.useRef<PenitipanUpdateFormSchema | null>(null);

  async function onSubmit(values: PenitipanUpdateFormSchema) {
    const isValid = await form.trigger();

    if (isValid) {
      finalFormData.current = {
        ...values,
      };

      setOpen(true);
    } else {
      alert("Form belum valid");
    }
  }

  async function handleSubmit(data: PenitipanUpdateFormSchema) {
    setSubmit(true);

    try {
      const formData = new FormData();

      if (data.id_penitip) {
        formData.append("id_penitip", String(data.id_penitip));
      }
      if (data.id_qc) {
        formData.append("id_qc", String(data.id_qc));
      }

      if (data.id_hunter) formData.append("id_hunter", data.id_hunter);

      if (data.produk.length) {
        data.produk.forEach((produk, i) => {
          console.log("Foto produksss:", produk.foto_produk);
          formData.append(`produk[${i}][id_produk]`, produk.id_produk);
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
            String(Number(produk.harga_produk))
          );
          if (produk.waktu_garansi instanceof Date) {
            formData.append(
              `produk[${i}][waktu_garansi]`,
              format(produk.waktu_garansi, "yyyy-MM-dd")
            );
          }

          produk.foto_produk?.forEach((file, j) => {
            formData.append(`produk[${i}][foto_produk][${j}][path_foto]`, file);
          });
        });
      }

      if (!detailPenitipan?.id_penitipan) {
        toast.error("ID penitipan tidak ditemukan");
        return;
      }

      const res = await handleEditPenitipan(
        detailPenitipan.id_penitipan,
        formData
      );

      if (res.message.includes("berhasil")) {
        router.push("/gudang/transaksi-penitipan");
        toast.success("Penitipan berhasil diperbarui");
        form.reset();
      } else {
        if (res.errors) {
          Object.entries(res.errors).forEach(([field, message]) => {
            form.setError(field as keyof PenitipanUpdateFormSchema, {
              type: "server",
              message: Array.isArray(message) ? message[0] : String(message),
            });
          });
        }
        toast.error("Gagal mengedit penitipan");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setSubmit(false);
      setOpen(false);
    }
  }

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
            <div className="border border-stone-300 p-4 rounded-lg bg-green-50">
              <CardTitle className="text-xl text-center mb-1">
                Tambah Data Penitipan
              </CardTitle>
              <CardDescription className="text-md text-center mb-10">
                Masukkan informasi-informasi umum penitipan
              </CardDescription>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start bg-white p-4 rounded-lg border border-teal-400">
                <FormField
                  control={form.control}
                  name="id_penitip"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nama Penitip</FormLabel>
                      <FormSelectPopover
                        options={dataPenitip!}
                        value={field.value ?? ""}
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
                        options={dataQC!}
                        value={field.value ?? ""}
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
                            options={dataHunter!}
                            value={field.value ?? ""}
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
                  <EditProdukAccordionItem
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
                      Berikut adalah produk yang akan ditambahkan:
                    </AlertDialogDescription>

                    <div className="mt-2 text-sm text-muted-foreground ps-4 space-y-1">
                      {finalFormData.current?.produk.map((p, i) => (
                        <p key={i} className="before:content-['•'] before:mr-2">
                          {p.nama_produk || "(Nama produk belum diisi)"}
                        </p>
                      ))}
                    </div>
                    <AlertDialogDescription className="font-semibold my-4">
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
