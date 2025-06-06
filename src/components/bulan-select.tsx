"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const bulanList = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
]

export default function LaporanBulanSelect({ bulan }: { bulan: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <Select
            defaultValue={bulan}
            onValueChange={(val) => {
                const params = new URLSearchParams(searchParams)
                params.set("bulan", val)
                router.push(`?${params.toString()}`)
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
                {bulanList.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                        {b.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
