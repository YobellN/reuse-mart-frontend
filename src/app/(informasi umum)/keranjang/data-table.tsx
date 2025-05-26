"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCartIcon } from "lucide-react"

import React, { useState } from "react"
import Link from "next/link"
import { KeranjangTablePagination } from "@/components/keranjang/keranjang-table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "id_produk",
      desc: false,
    },
  ]);
  const [globalFilter, setGlobalFilter] = useState<any>([])



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      }
    },
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter
  })

  // SUM TOTAL HARGA PRODUK
  const calculateTotal = () => {
    return data.reduce((sum, item: any) => sum + item.produk.harga_produk, 0)
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <ShoppingCartIcon className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground text-center">
            Keranjang belanja Anda masih kosong
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada data keranjang
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="border-t bg-muted/50 p-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Subtotal ({table.getRowModel().rows.length} produk)</span>
            <span className="text-lg font-semibold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(calculateTotal())}
            </span>
          </div>
        </div>
      </div>
      <KeranjangTablePagination table={table} />
    </div>
  )
}
