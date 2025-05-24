"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Calendar as CalendarIcon,
  ChevronDownIcon,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  PenitipanFormSchema,
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
} from "@/services/penitipan/penitipan-services";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CalendarDMY } from "../ui/calendar-month-year";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FormSelectPopover } from "../form-select-popover";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import UploadBox from "../ui/upload-box";
import Image from "next/image";

export default function NewPenitipanForm() {
  const [penitipRaw, setPenitipRaw] = React.useState<Penitip[]>([]);
  const [QcRaw, setQcRaw] = React.useState<Pegawai[]>([]);
  const [HunterRaw, setHunterRaw] = React.useState<Pegawai[]>([]);
  const [showHunterForm, setShowHunterForm] = React.useState<boolean>(false);
  const [showGaransiForm, setShowGaransiForm] = React.useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

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

  const form = useForm<PenitipanFormSchema>({
    resolver: zodResolver(PenitipanSchema),
    defaultValues: {
      id_penitip: "",
      id_qc: "",
      id_hunter: null,
      tanggal_penitipan: new Date(),
    },
  });

  type PenitipanPayload = Omit<PenitipanFormSchema, "tanggal_penitipan"> & {
    tanggal_penitipan: string;
  };

  const finalFormData = React.useRef<PenitipanPayload | null>(null);

  // 2. Define a submit handler.
  function onSubmit(values: PenitipanFormSchema) {
    if (showHunterForm && !values.id_hunter) {
      toast({
        title: "Validasi gagal",
        description: "Mohon pilih hunter terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    if (!showHunterForm) {
      values.id_hunter = null;
    }

    console.log("Data dikirim:", values);
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
                className="my-4 w-full space-y-2 rounded-lg border border-teal-400"
              >
                <AccordionItem
                  value={`item-${1}`}
                  className="border-none rounded-lg px-4 bg-white"
                >
                  <AccordionTrigger
                    className="text-lg font-semibold hover:no-underline hover:text-teal-700"
                    icon={<ChevronDownIcon />}
                  >
                    Data Produk 1
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 items-start">
                      <div className="space-y-4">
                        <Card className="w-full rounded-lg bg-white">
                          <CardHeader>
                            <CardTitle className="font-bold">
                              Nama dan Deskripsi
                            </CardTitle>
                            <Separator className="mt-2 mb-0 border-1 border-stone-400" />
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <FormField
                              control={form.control}
                              name="nama"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nama Produk</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Nama produk"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="nama"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Deskripsi Produk</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Deskripsi produk"
                                      className="h-31"
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </Card>
                        <Card className="w-full rounded-lg bg-white">
                          <CardHeader>
                            <CardTitle className="font-bold">
                              Kategori dan Garansi
                            </CardTitle>
                            <Separator className="mt-2 mb-0 border-1 border-stone-400" />
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <FormField
                              control={form.control}
                              name="nama"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kategori Produk</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Nama produk"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div>
                              {showGaransiForm ? (
                                <FormField
                                  control={form.control}
                                  name="id_hunter"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <FormLabel>Tanggal Garansi</FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "w-full max-w-[400px] justify-start text-left font-semibold bg-white",
                                              !field.value &&
                                                "text-muted-foreground"
                                            )}
                                          >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                              format(
                                                field.value,
                                                "dd MMMM yyyy",
                                                {
                                                  locale: id,
                                                }
                                              )
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
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              ) : null}
                              <div className="flex items-center space-x-2 mt-4">
                                <Checkbox
                                  id="terms"
                                  checked={showGaransiForm}
                                  className="bg-white"
                                  onCheckedChange={(value) => {
                                    if (!value) {
                                      form.setValue("id_hunter", null);
                                    }
                                    setShowGaransiForm(value === true);
                                  }}
                                />
                                <Label htmlFor="terms">
                                  Produk memiliki garansi
                                </Label>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="space-y-4">
                        <Card className="w-full  rounded-lg bg-white">
                          <CardHeader>
                            <CardTitle className="font-bold">
                              Harga Produk
                            </CardTitle>
                            <Separator className="mt-2 mb-0 border-1 border-stone-400" />
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <FormField
                              control={form.control}
                              name="nama"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Harga Produk</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Harga produk"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </Card>
                        <Card className="w-full  rounded-lg bg-white">
                          <CardHeader>
                            <CardTitle className="font-bold">
                              Foto Produk
                            </CardTitle>
                            <Separator className="mt-2 mb-0 border-1 border-stone-400" />
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <FormField
                              control={form.control}
                              name="nama"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex items-center gap-4">
                                      <UploadBox
                                        onFileSelect={(file) => {
                                          const url = URL.createObjectURL(file);
                                          setPreview(url);
                                        }}
                                      />

                                      {preview && (
                                        <div className="relative aspect-square w-1/2 sm:w-1/3 border-2 border-teal-500 rounded-md overflow-hidden">
                                          <Image
                                            src={preview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </Card>
                        <Card className="p-6 bg-white rounded-lg ">
                          <div>
                            <CardTitle className="font-bold">Aksi:</CardTitle>
                          </div>
                          <div className="flex lg:flex-row lg:items-center lg:justify-between ">
                            <Button className="bg-rose-600 hover:bg-rose-700">
                              <Trash2 size="64" strokeWidth={3} /> Hapus Produk
                              Ini
                            </Button>
                            <Button className="bg-teal-600 hover:bg-teal-700">
                              <Plus size="64" strokeWidth={3} /> Tambah Produk
                              Lain
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Button type="submit">
              <Save strokeWidth={2.5} />
              Simpan Data Penitipan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
