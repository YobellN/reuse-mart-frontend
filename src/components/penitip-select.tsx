"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

function generatePenitipRange(endId: string | undefined) {
    const startNum = 1;
    // Default to T0001 if endId is undefined or invalid
    const endNum = endId && typeof endId === 'string' 
        ? parseInt(endId.replace('T', '') || '1')
        : 1;
    
    const penitipList = [];
    
    for (let i = startNum; i <= endNum; i++) {
        const id = `T${i.toString().padStart(4, '0')}`;
        penitipList.push({
            id_penitip: id
        });
    }
    
    return penitipList;
}

export default function PenitipSelect({ endId }: { endId: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const penitipList = generatePenitipRange(endId)

    return (
        <div>
            <h3 className="text-sm font-semibold leading-none tracking-tight mb-2">Pilih Penitip</h3>
            <Select
                defaultValue={penitipList[0]?.id_penitip}
                onValueChange={(val) => {
                    const params = new URLSearchParams(searchParams)
                    params.set("id_penitip", val)
                    router.push(`?${params.toString()}`)
                }}
            >
                <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Pilih Penitip" />
                </SelectTrigger>
                <SelectContent>
                    {penitipList.map((penitip) => (
                        <SelectItem key={penitip.id_penitip} value={penitip.id_penitip}>
                            {penitip.id_penitip}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
