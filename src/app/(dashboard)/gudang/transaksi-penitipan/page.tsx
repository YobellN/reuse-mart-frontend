"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { getAllDataPenitipan } from "@/services/penitipan/penitipan-services";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Penitipan } from "@/services/penitipan/schema-penitipan";

export default function Page() {
  const [penitipan, setPenitipan] = useState<Penitipan[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getAllDataPenitipan();
      setPenitipan(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <SiteHeader title="Data Master Penitipan" />
      <DataTable columns={columns} data={penitipan} />
    </div>
  );
}
