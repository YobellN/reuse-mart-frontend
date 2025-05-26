"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { getAlamat } from "@/services/alamat/alamat-services"
import { Alamat } from "@/services/alamat/schema-alamat"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { getPoinPembeli, getTotalHarga } from "@/services/detail_keranjang/detail_keranjang-services"
import { CheckoutModal } from "./checkout-modal"
import { KeranjangResponse } from "@/services/detail_keranjang/schema-detail_keranjang"
import { Separator } from "@radix-ui/react-separator"

const FormSchema = z.object({
    metode_pengiriman: z.enum(["Ambil di gudang", "Antar Kurir"], {
        required_error: "Pilih metode pengiriman",
    }),
    alamat: z.string().optional(),
    poin: z.number().min(0).optional(),
})

export function RadioKeranjangGroupForm() {
    const [open, setOpen] = React.useState(false)
    const [addresses, setAddresses] = React.useState<Alamat[]>([])
    const [maxPoin, setMaxPoin] = React.useState(0)
    const [poinValue, setPoinValue] = React.useState(0)
    const [showCheckout, setShowCheckout] = React.useState(false)
    const [checkoutData, setCheckoutData] = React.useState<{
        response: KeranjangResponse;
        metode_pengiriman: string;
        alamat?: Alamat;
    } | null>(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            metode_pengiriman: "Ambil di gudang",
            poin: 0,
        },
    })

    // Fetch addresses and poin when component mounts
    React.useEffect(() => {
        const fetchAddresses = async () => {
            const data = await getAlamat()
            setAddresses(data)
        }
        const fetchPoin = async () => {
            const response = await getPoinPembeli()
            if (response.data) {
                setMaxPoin(response.data)
            }
        }
        fetchAddresses()
        fetchPoin()
    }, [])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const formData = new FormData()
            formData.append("poinKepakai", data.poin?.toString() || "0")
            formData.append("metode_pengambilan", data.metode_pengiriman)

            const response = await getTotalHarga(formData)
            
            if (response.data) {
                const selectedAddress = data.alamat && data.metode_pengiriman === "Antar Kurir"
                    ? addresses.find(a => a.id_alamat.toString() === data.alamat)
                    : undefined

                setCheckoutData({
                    response: response.data,
                    metode_pengiriman: data.metode_pengiriman,
                    alamat: selectedAddress
                })
                setShowCheckout(true)
            } else {
                toast.error("Gagal mendapatkan total harga")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan")
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Pengiriman</h3>
                        <FormField
                            control={form.control}
                            name="metode_pengiriman"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="flex items-start space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                                                <RadioGroupItem
                                                    value="Ambil di gudang"
                                                    id="Ambil di gudang"
                                                />
                                                <div className="space-y-1">
                                                    <Label htmlFor="Ambil di gudang" className="font-medium">
                                                        Ambil di gudang
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Ambil pesanan Anda langsung di gudang ReuseMart
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                                                <RadioGroupItem
                                                    value="Antar Kurir"
                                                    id="Antar Kurir"
                                                />
                                                <div className="space-y-1">
                                                    <Label htmlFor="Antar Kurir" className="font-medium">
                                                        Antar Kurir
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Diantar ke alamat yang Anda pilih
                                                    </p>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {/* Conditional Address Selection */}
                        {form.watch("metode_pengiriman") === "Antar Kurir" && (
                            <FormField
                                control={form.control}
                                name="alamat"
                                render={({ field: addressField }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel>Pilih Alamat</FormLabel>
                                        <FormControl>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        className="w-full justify-between"
                                                    >
                                                        {addressField.value
                                                            ? addresses.find((alamat) => alamat.id_alamat.toString() === addressField.value)?.label
                                                            : "Pilih alamat pengiriman..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[400px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Cari alamat..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>Alamat tidak ditemukan.</CommandEmpty>
                                                            <CommandGroup>
                                                                {addresses.map((alamat) => (
                                                                    <CommandItem
                                                                        key={alamat.id_alamat}
                                                                        value={alamat.id_alamat.toString()}
                                                                        onSelect={(value) => {
                                                                            addressField.onChange(value)
                                                                            setOpen(false)
                                                                        }}
                                                                    >
                                                                        <div className="flex flex-col gap-1">
                                                                            <div className="font-medium">{alamat.label}</div>
                                                                            <div className="text-sm text-muted-foreground">
                                                                                {alamat.detail_alamat}, {alamat.kecamatan}, {alamat.kabupaten_kota} {alamat.kode_pos}
                                                                            </div>
                                                                        </div>
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                addressField.value === alamat.id_alamat.toString() ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-semibold mb-6">Poin</h3>
                        <FormField
                            control={form.control}
                            name="poin"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <FormLabel>Gunakan Poin</FormLabel>
                                            <span className="text-muted-foreground">
                                                Tersedia: {maxPoin} poin
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Slider
                                                value={[field.value || 0]}
                                                onValueChange={(value) => {
                                                    field.onChange(value[0])
                                                    setPoinValue(value[0])
                                                }}
                                                max={maxPoin}
                                                step={1}
                                                className="flex-1"
                                            />
                                            <Input
                                                type="number"
                                                value={field.value || 0}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value)
                                                    if (value >= 0 && value <= maxPoin) {
                                                        field.onChange(value)
                                                        setPoinValue(value)
                                                    }
                                                }}
                                                className="w-24"
                                            />
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                        Lanjut ke Pembayaran
                    </Button>
                </form>
            </Form>
            
            {checkoutData && (
                <CheckoutModal
                    open={showCheckout}
                    onOpenChange={setShowCheckout}
                    data={checkoutData}
                />
            )}
        </>
    )
}
