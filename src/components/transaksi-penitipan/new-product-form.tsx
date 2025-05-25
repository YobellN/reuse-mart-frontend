import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarDMY } from "../ui/calendar-month-year";
import { FormSelectPopover } from "../form-select-popover";
import UploadBox from "../ui/upload-box";
import Image from "next/image";
import { CalendarIcon, ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function NewProdukAccordionItem({
  form,
  index,
  dataKategori,
  append,
  remove,
  length,
}: {
  form: any;
  index: number;
  dataKategori: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  length: number;
}) {
  const [showGaransiForm, setShowGaransiForm] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);

  return (
    <div className=" border border-teal-400 rounded-lg">
      <AccordionItem
        value={`item-${index + 1}`}
        className="border-none rounded-lg px-4 bg-white"
      >
        <AccordionTrigger
          className="text-lg font-semibold hover:no-underline hover:text-teal-600"
          icon={<ChevronDownIcon />}
        >
          Data Produk {index + 1}
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
                    name={`produk.${index}.nama_produk`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Produk</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama produk" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`produk.${index}.deskripsi_produk`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Produk</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deskripsi produk"
                            className="h-31"
                            {...field}
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
                    name={`produk.${index}.id_kategori`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori Produk</FormLabel>
                        <FormSelectPopover
                          options={dataKategori}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Pilih kategori produk"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    {showGaransiForm ? (
                      <FormField
                        control={form.control}
                        name={`produk.${index}.waktu_garansi`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Garansi</FormLabel>
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
                      <Label htmlFor="terms">Produk memiliki garansi</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="w-full  rounded-lg bg-white">
                <CardHeader>
                  <CardTitle className="font-bold">Harga Produk</CardTitle>
                  <Separator className="mt-2 mb-0 border-1 border-stone-400" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name={`produk.${index}.harga_produk`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga Produk</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Harga produk"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                  <CardTitle className="font-bold">Foto Produk</CardTitle>
                  <Separator className="mt-2 mb-0 border-1 border-stone-400" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name={`produk.${index}.foto_produk`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-wrap items-center gap-2">
                            <UploadBox
                              onFileSelect={(files) => {
                                const urls = files.map((file) =>
                                  URL.createObjectURL(file)
                                );
                                setPreview((prev) => [...prev, ...urls]);
                                field.onChange([...field.value, ...files]);
                              }}
                            />
                            {preview.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {preview.map((src, idx) => (
                                  <div
                                    key={idx}
                                    className="group relative aspect-square w-24 h-24 sm:w-30 sm:h-30 border-2 border-teal-500 rounded-md overflow-hidden"
                                  >
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        const updatedPreview = preview.filter(
                                          (_, i: number) => i !== idx
                                        );
                                        const updatedFiles = field.value.filter(
                                          (file: File, i: number) => i !== idx
                                        );

                                        setPreview(updatedPreview);
                                        field.onChange(updatedFiles);
                                      }}
                                      className="absolute z-10 hidden group-hover:flex items-center justify-center bg-teal-600/50 hover:bg-teal-600/50 text-white rounded-md w-full h-full cursor-pointer"
                                    >
                                      <div className="flex items-center bg-rose-600 p-2 rounded-md">
                                        <Trash2 className="bg-rose-600 me-1" />
                                        Hapus Foto
                                      </div>
                                    </Button>
                                    <Image
                                      src={src}
                                      alt={`Preview ${idx + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
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
                <div className="flex flex-wrap lg:flex-row lg:items-center lg:justify-between ">
                  <Button
                    type="button"
                    disabled={length <= 1}
                    onClick={() => {
                      setPreview([]);
                      remove(index);
                    }}
                    className={cn(
                      "hover:bg-rose-700 my-2 w-full sm:w-42",
                      length <= 1
                        ? "bg-slate-600 cursor-not-allowed"
                        : "bg-rose-600"
                    )}
                  >
                    <Trash2 size="64" strokeWidth={3} /> Hapus Produk Ini
                  </Button>

                  <Button
                    type="button"
                    className="bg-teal-600 hover:bg-teal-700 my-2 w-full sm:w-42"
                    onClick={() =>
                      append({
                        nama_produk: "",
                        deskripsi_produk: "",
                        id_kategori: 0,
                        harga_produk: 0,
                        waktu_garansi: null,
                        foto_produk: [],
                      })
                    }
                  >
                    <Plus size="64" strokeWidth={3} /> Tambah Produk Lain
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
