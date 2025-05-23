"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon } from "lucide-react";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  PenitipanFormSchema,
  PenitipanSchema,
} from "@/services/penitipan/schema-penitipan";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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

export default function NewPenitipanForm() {
  const [penitipRaw, setPenitipRaw] = React.useState<Penitip[]>([]);
  const [QcRaw, setQcRaw] = React.useState<Pegawai[]>([]);
  const [HunterRaw, setHunterRaw] = React.useState<Pegawai[]>([]);
  const [showHunterForm, setShowHunterForm] = React.useState<boolean>(false);

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
    <Card className="max-w-5/6 mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center ">
          Formulir Penitipan Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg text-start mb-6">
          Tambah Data Penitipan
        </CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                              "w-full md:w-[350px] justify-start text-left font-semibold bg-white",
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
            <CardTitle className="text-lg text-start my-12">
              Tambah Data Barang Titipan
            </CardTitle>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
