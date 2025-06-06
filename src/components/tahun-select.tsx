"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LaporanTahunSelect({ tahun }: { tahun: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

    return (
        <div>
            <h3 className="text-sm font-semibold leading-none tracking-tight mb-2">Pilih Tahun</h3>
            <Select
                defaultValue={tahun}
                onValueChange={(val) => {
                    const params = new URLSearchParams(searchParams)
                    params.set("tahun", val)
                    router.push(`?${params.toString()}`)
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
