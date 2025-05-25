'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { CalendarDMY } from "../ui/calendar-month-year"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Pengiriman, PengirimanFormSchema, PengirimanSchema } from "@/services/pengiriman/schema-pengiriman"
import { Pegawai } from "@/services/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { handlePenjadwalanPengiriman } from "@/services/pengiriman/pengiriman-service"
import { downloadNotaTransaksi } from "../transaksi/nota-transaksi-kurir"


export default function NewPengirimanForm({ pengiriman, kurir }: { pengiriman: Pengiriman, kurir: Pegawai[] }) {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<PengirimanFormSchema>({
        resolver: zodResolver(PengirimanSchema),
        defaultValues: {
            id_alamat: pengiriman.id_alamat,
            id_kurir: "",
            id_penjualan: pengiriman.id_penjualan,
            jadwal_pengiriman: new Date(),
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: PengirimanFormSchema) {
        const isValid = await form.trigger();

        if (isValid) {
            const formData = new FormData();
            formData.append("id_kurir", values.id_kurir);
            formData.append("jadwal_pengiriman", format(values.jadwal_pengiriman, "yyyy-MM-dd"));
            finalFormData.current = formData;
            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            const res = await handlePenjadwalanPengiriman(data, pengiriman.id_penjualan);

            if (res.message.includes("berhasil")) {
                if (res.data) {
                    downloadNotaTransaksi({ trx: res.data });
                }
                router.push("/gudang/pengiriman");
                toast.success("Pengiriman berhasil dan nota sedang dicetak...");
                setOpen(false);
            } else {
                if (res.errors) {
                    Object.entries(res.errors).forEach(([field, message]) => {
                        form.setError(field as keyof PengirimanFormSchema, {
                            type: "server",
                            message: Array.isArray(message) ? message[0] : String(message),
                        });
                    });
                }
                setSubmit(false);
                toast.error("Gagal menambahkan pengiriman " + res.message);
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
                <CardTitle className="text-2xl text-center">Jadwalkan Pengiriman</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="id_penjualan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Penjualan</FormLabel>
                                    <FormControl>
                                        <Input readOnly {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="id_alamat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Alamat</FormLabel>
                                    <FormControl>
                                        <Input readOnly {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="alamat"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Detail Alamat</FormLabel>
                                    <FormControl>
                                        <Input readOnly value={pengiriman.alamat.detail_alamat} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="id_kurir"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Kurir</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {kurir.find((kurir) => kurir.id_pegawai === field.value)?.user.nama ?? "Pilih Kurir"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari kurir..."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>Kurir tidak ditemukan.</CommandEmpty>
                                                    <CommandGroup>
                                                        {kurir.map((kurir) => (
                                                            <CommandItem
                                                                value={kurir.user.nama}
                                                                key={kurir.id_pegawai}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        "id_kurir",
                                                                        kurir.id_pegawai
                                                                    )
                                                                }}
                                                            >
                                                                {kurir.user.nama}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        kurir.id_pegawai === field.value
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
                            name="jadwal_pengiriman"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Pengiriman</FormLabel>
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
                                                    onSelect={(date) => {
                                                        if (date) field.onChange(date);
                                                    }}
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
                                <Button type="submit" className="w-full" disabled={submit}>{submit ? "Memproses..." : "Jadwalkan"}</Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Penjadwalan</AlertDialogTitle>
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
