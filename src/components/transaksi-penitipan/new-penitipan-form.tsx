"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  PenitipanFormSchema,
  PenitipanSchema,
} from "@/services/penitipan/schema-penitipan";
import { Input } from "@/components/ui/input";
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <FormField
                control={form.control}
                name="id_penitip"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nama Penitip</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full md:w-[350px] justify-between bg-white",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <span>
                                <span className="text-green-700 font-bold">
                                  {
                                    dataPenitip.find(
                                      (dPen) => dPen.value === field.value
                                    )?.value
                                  }
                                </span>{" "}
                                -{" "}
                                <span className="font-normal">
                                  {
                                    dataPenitip.find(
                                      (dPen) => dPen.value === field.value
                                    )?.label
                                  }
                                </span>
                              </span>
                            ) : (
                              "Pilih nama penitip"
                            )}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari penitip..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              Penitip tidak ditemukan.
                            </CommandEmpty>
                            <CommandGroup>
                              {dataPenitip.map((dataPen) => (
                                <CommandItem
                                  value={dataPen.value}
                                  key={dataPen.value}
                                  onSelect={() => {
                                    form.setValue("id_penitip", dataPen.value);
                                  }}
                                >
                                  {dataPen.value} - {dataPen.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      dataPen.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full md:w-[350px] justify-between bg-white",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {/* {field.value
                            ? dataQC.find((dQC) => dQC.value === field.value)
                                ?.label
                            : "Pilih pegawai QC"}
                             */}
                            {field.value ? (
                              <span>
                                <span className="text-green-700 font-bold">
                                  {
                                    dataQC.find(
                                      (dQC) => dQC.value === field.value
                                    )?.value
                                  }
                                </span>{" "}
                                -{" "}
                                <span className="font-normal">
                                  {
                                    dataQC.find(
                                      (dQC) => dQC.value === field.value
                                    )?.label
                                  }
                                </span>
                              </span>
                            ) : (
                              "Pilih pegawai QC"
                            )}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari pegawai QC..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              Pegawai QC tidak ditemukan.
                            </CommandEmpty>
                            <CommandGroup>
                              {dataQC.map((dataPen) => (
                                <CommandItem
                                  value={dataPen.value}
                                  key={dataPen.value}
                                  onSelect={() => {
                                    form.setValue("id_qc", dataPen.value);
                                  }}
                                >
                                  {dataPen.value} - {dataPen.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      dataPen.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_hunter"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nama Hunter</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full md:w-[350px] justify-between bg-white",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <span>
                                <span className="text-green-700 font-bold">
                                  {
                                    dataHunter.find(
                                      (dHunter) => dHunter.value === field.value
                                    )?.value
                                  }
                                </span>{" "}
                                -{" "}
                                <span className="font-normal">
                                  {
                                    dataHunter.find(
                                      (dHunter) => dHunter.value === field.value
                                    )?.label
                                  }
                                </span>
                              </span>
                            ) : (
                              "Pilih hunter"
                            )}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari data hunter..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              Pegawai hunter tidak ditemukan.
                            </CommandEmpty>
                            <CommandGroup>
                              {dataHunter.map((dataPen) => (
                                <CommandItem
                                  value={dataPen.value}
                                  key={dataPen.value}
                                  onSelect={() => {
                                    form.setValue("id_hunter", dataPen.value);
                                  }}
                                >
                                  {dataPen.value} - {dataPen.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      dataPen.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={showHunterForm}
                  onCheckedChange={(value) => {
                    return value
                      ? setShowHunterForm(true)
                      : setShowHunterForm(false);
                  }}
                />
                <Label htmlFor="terms">Produk adalah produk hunting</Label>
              </div>
              {showHunterForm ? (
                <FormField
                  control={form.control}
                  name="id_hunter"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nama Hunter</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full md:w-[350px] justify-between bg-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <span>
                                  <span className="text-green-700 font-bold">
                                    {
                                      dataHunter.find(
                                        (dHunter) =>
                                          dHunter.value === field.value
                                      )?.value
                                    }
                                  </span>{" "}
                                  -{" "}
                                  <span className="font-normal">
                                    {
                                      dataHunter.find(
                                        (dHunter) =>
                                          dHunter.value === field.value
                                      )?.label
                                    }
                                  </span>
                                </span>
                              ) : (
                                "Pilih hunter"
                              )}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Cari data hunter..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Pegawai hunter tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {dataHunter.map((dataPen) => (
                                  <CommandItem
                                    value={dataPen.value}
                                    key={dataPen.value}
                                    onSelect={() => {
                                      form.setValue("id_hunter", dataPen.value);
                                    }}
                                  >
                                    {dataPen.value} - {dataPen.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        dataPen.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
