'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import React from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../ui/alert-dialog"
import { toast } from "sonner"
import { DonasiFormSchema, DonasiSchema, DropdownProduk, RequestDonasi } from "@/services/organisasi/schema-organisasi"
import { handleNewDonasi } from "@/services/organisasi/organisasi-services"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { CalendarDMY } from "../ui/calendar-month-year"
import { cn } from "@/lib/utils"
import { format } from "date-fns"


export default function NewDonasiForm({ requestDonasi, produk_donasi }: { requestDonasi: RequestDonasi, produk_donasi: DropdownProduk[] | [] }) {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<DonasiFormSchema>({
        resolver: zodResolver(DonasiSchema),
        defaultValues: {
            id_request_donasi: requestDonasi.id_request_donasi || 0,
            nama_organisasi: requestDonasi.organisasi?.user.nama || "",
            deskripsi_request: requestDonasi.deskripsi_request || "",
            id_produk: "",
            nama_penerima: "",
            tanggal_donasi: new Date(),
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: DonasiFormSchema) {
        const isValid = await form.trigger();

        if (isValid) {
            const formData = new FormData();
            formData.append("id_request_donasi", values.id_request_donasi.toString());
            formData.append("id_produk", values.id_produk.toString());
            formData.append("tanggal_donasi", format(values.tanggal_donasi, "yyyy-MM-dd"));
            formData.append("nama_penerima", values.nama_penerima);
            finalFormData.current = formData;
            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            const res = await handleNewDonasi(data);

            if (res.message === "Donasi berhasil ditambahkan") {
                router.push("/owner/request-donasi");
                toast.success("Donasi berhasil ditambahkan");
                setOpen(false);
            } else {
                if (res.errors) {
                    Object.entries(res.errors).forEach(([field, message]) => {
                        form.setError(field as keyof DonasiFormSchema, {
                            type: "server",
                            message: Array.isArray(message) ? message[0] : String(message),
                        });
                    });
                }
                setSubmit(false);
                toast.error("Gagal menambahkan donasi" + res.message);
            }
        } catch (err) {
            setSubmit(false);
            toast.error("Terjadi kesalahan server");
        } finally {
            setOpen(false);
        }
    }

    return (
        <Card className="max-w-2xl mx-auto mt-10 shadow-md relative overflow-visible">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Tambah Donasi</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="id_request_donasi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Request</FormLabel>
                                    <FormControl>
                                        <Input readOnly {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nama_organisasi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Organisasi</FormLabel>
                                    <FormControl>
                                        <Input readOnly {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deskripsi_request"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi Request</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Kulkas untuk menyimpan ASI dan makanan bayi"
                                            className="min-h-[50px]"
                                            readOnly
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nama_penerima"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Penerima</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama penerima" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="id_produk"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Produk</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-[280px]">
                                                <SelectValue placeholder="Daftar Produk" />
                                            </SelectTrigger>
                                            <SelectContent position="popper" className="z-50">
                                                <SelectGroup>
                                                    <SelectLabel>Produk</SelectLabel>
                                                    {produk_donasi.length > 0 ? (
                                                        produk_donasi.map((produk) => (
                                                            <SelectItem key={produk.id_produk} value={String(produk.id_produk)}>
                                                                {produk.nama_produk}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="Tidak ada produk">Tidak ada produk</SelectItem>
                                                    )
                                                    }
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
                            name="tanggal_donasi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Donasi</FormLabel>
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
                                                        format(field.value, "yyyy-MM-dd")
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
                                <Button type="submit" className="w-full" disabled={submit}>{submit ? "Memproses..." : "Donasikan"}</Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Donasi</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah data Anda sudah benar?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setOpen(false)} disabled={submit}>Batal</AlertDialogCancel>
                                        <Button
                                            type="button"
                                            onClick={() => handleSubmit(finalFormData.current)}
                                            disabled={submit}
                                        >
                                            {submit ? "Memproses..." : "Ya, Saya yakin"}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}
