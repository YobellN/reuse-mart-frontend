"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getAllKategoriProduk } from "@/services/produk/kategori-produk-services";
import { KategoriProduk } from "@/services/produk/schema-kategori-produk";
import { Skeleton } from "../ui/skeleton";

export default function FilterAccordion() {
  const [kategori, setKategori] = useState<KategoriProduk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllKategoriProduk().then((data) => {
      setKategori(data);
      setLoading(false);
    });
  }, []);

  return (
    <Accordion
      defaultValue={["item-0", "item-1"]}
      type="multiple"
      className="max-w-lg my-6 w-full bg-white rounded-md"
    >
      <p className="px-4 py-2 font-bold text-lg">Filter</p>

      {/* ===== INI UNTUK FILTER KATEGORI ===== */}
      <AccordionItem
        value={`item-0`}
        className="border border-b-0 rounded-t-md px-4"
      >
        <AccordionTrigger className="font-semibold text-md hover:no-underline">
          Kategori
        </AccordionTrigger>
        <AccordionContent>
          <RadioGroup defaultValue="option-one">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-1/2 my-2" />
                ))
              : kategori.map((item) => (
                  <div
                    key={item.id_kategori}
                    className="flex items-center space-x-2 my-2"
                  >
                    <RadioGroupItem
                      value={String(item.id_kategori)}
                      id={`kategori-${item.id_kategori}`}
                      className="peer"
                    />
                    <Label
                      htmlFor={`kategori-${item.id_kategori}`}
                      className="peer-checked:text-green-600 transition-colors"
                    >
                      {item.nama_kategori}
                    </Label>
                  </div>
                ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      {/* ===== INI UNTUK TAMBAHAN FILTER ===== */}
      <AccordionItem
        value={`item-1`}
        className="border-t border-x border-b-1 rounded-b-md px-4"
      >
        <AccordionTrigger className="font-semibold text-md hover:no-underline">
          Filter 2....
        </AccordionTrigger>
        <AccordionContent>Lorem</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
