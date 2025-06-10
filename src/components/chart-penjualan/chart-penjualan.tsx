"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LaporanPenjualanKotor } from "@/services/laporan/schema-laporan";

const chartConfig = {
  jumlahPendapatan: {
    label: "Pendapatan Kotor",
    color: "#2563eb",
  },
  jumlahBarang: {
    label: "Jumlah Barang Terjual",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ChartPenjualan({
  data,
  tahun,
}: {
  data: LaporanPenjualanKotor[];
  tahun: string;
}) {
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = allMonths.map((month) => {
    const found = data.find(
      (item) => item.bulan.toLowerCase() === month.toLowerCase()
    );
    return {
      month,
      jumlahPendapatan: Number(found?.jumlah_penjualan_kotor || 0),
      jumlahBarang: found?.jumlah_barang_terjual || 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Penjualan Kotor</CardTitle>
        <CardDescription>Januari - Desember {tahun}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="jumlahPendapatan"
              fill="var(--color-jumlahPendapatan)"
              radius={4}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="jumlahBarang"
              fill="var(--color-jumlahBarang)"
              radius={4}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Harga berupa penjualan kotor <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Menampilkan total penjualan dan jumlah barang per bulan
        </div>
      </CardFooter>
    </Card>
  );
}
