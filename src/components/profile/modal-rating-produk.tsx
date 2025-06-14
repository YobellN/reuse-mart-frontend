"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { id } from "date-fns/locale/id";
import { Gift, CreditCard, ShoppingBag, Star } from "lucide-react";
import ProductImage from "../product/product-image";
import { Card } from "../ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { DetailProdukTitipan } from "@/services/penitipan/schema-penitipan";
import { Penjualan } from "@/services/penjualan/schema-penjualan";
import { Input } from "../ui/input";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateRatingProduk } from "@/services/produk/produk-services";

const formSchema = z.object({
  rating: z.number().gte(1).lte(5),
});

export default function ModalRatingProduk({
  penjualan,
  trx,
}: {
  penjualan: Penjualan;
  trx: DetailProdukTitipan;
}) {
  const [rating, setRating] = React.useState(5);
  const [rateColor] = React.useState(0);
  const [rateText, setRateText] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (rating === 1) {
      setRateText("Sangat Buruk");
    } else if (rating === 2) {
      setRateText("Buruk");
    } else if (rating === 3) {
      setRateText("Biasa Saja");
    } else if (rating === 4) {
      setRateText("Bagus");
    } else if (rating === 5) {
      setRateText("Bagus Sekali");
    }
  }, [rating]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true);
    try {
      const res = await updateRatingProduk(trx.id_produk, values.rating);

      if (res.message === "Rating Produk Berhasil") {
        toast.success("Rating Produk Berhasil Ditambahkan");
        setOpen(false);
        setSubmit(false);
        form.reset();
        router.refresh();
        router.push("/profile/transaksi/selesai");
      } else {
        setSubmit(false);
        toast.error("Gagal memberikan rating produk");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full lg:w-auto border-primary bg-white text-primary border"
          size="sm"
        >
          Beri Rating
        </Button>
      </DialogTrigger>

      <DialogContent
        id={`nota-${penjualan.id_penjualan}`}
        className={`w-full max-w-sm sm:max-w-2xl  max-h-[calc(100vh-4rem)] overflow-y-auto p-3 sm:p-5 bg-gradient-to-b from-green-50 to-green-100`}
      >
        <DialogHeader className="flex items-center justify-between pb-1">
          <DialogTitle className="text-lg font-bold">Nilai Produk</DialogTitle>
        </DialogHeader>

        <Separator className="my-1" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">No. Pesanan</p>
            <Link
              href={`/profile/transaction/${penjualan.id_penjualan}`}
              className="font-medium text-primary"
            >
              {penjualan.id_penjualan}
            </Link>
          </div>
          <div>
            <p className="text-muted-foreground">Tanggal</p>
            <p className="font-medium">
              {format(
                new Date(penjualan.tanggal_penjualan),
                "dd MMM yyyy, HH:mm",
                {
                  locale: id,
                }
              )}
            </p>
          </div>
        </div>

        <Separator className="my-1" />

        <h3 className="font-medium  text-sm">Detail Produk</h3>
        <div className="space-y-2 ">
          <Card
            key={trx.id_produk}
            className="relative flex flex-col sm:flex-row items-start gap-2 p-3"
          >
            <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded overflow-hidden">
              <ProductImage
                filename={trx.foto_produk[0].path_foto}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-2">
              <p className="font-medium text-sm mb-2">{trx.nama_produk}</p>
              <div className="flex items-center gap-1 mt-1 text-xs">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="font-sm">
                  Rp{trx.harga_produk.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs">
                <ShoppingBag className="w-4 h-4 text-primary" />
                {trx.kategori.nama_kategori}
              </div>
            </div>
          </Card>
        </div>

        <Separator className="my-1" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  <FormLabel>Kualitas Produk</FormLabel>
                  <FormControl>
                    <div className="space-y-2 ">
                      <Card
                        key={trx.id_produk}
                        className="relative mt-2 mb-4 flex flex-col sm:flex-row items-start gap-2 sm:gap-10 p-3"
                      >
                        <div className="flex gap-2">
                          {[...Array(5)].map((star, index) => {
                            const currentRate = index + 1;
                            return (
                              <label key={index} className="cursor-pointer">
                                <Input
                                  type="radio"
                                  name="rating"
                                  value={currentRate}
                                  onClick={() => {
                                    setRating(currentRate);
                                    form.setValue("rating", currentRate);
                                  }}
                                  className="hidden"
                                />
                                <Star
                                  size={26}
                                  color="#ffa500"
                                  fill={
                                    currentRate <= (rateColor || rating)
                                      ? "#fdc017"
                                      : "none"
                                  }
                                />
                              </label>
                            );
                          })}
                        </div>
                        <p className="text-[#ffa500] font-semibold">
                          {rateText}
                        </p>
                      </Card>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <Separator className="my-1" />
                  <div className="flex flex-wrap justify-between items-center ">
                    <span className="text-base font-medium w-full sm:w-1/2">
                      Nilai Produk Sekarang
                    </span>

                    <DialogFooter className="flex-row my-4 justify-between w-full sm:w-1/2">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-4/9">
                          Batal
                        </Button>
                      </DialogClose>
                      <Button type="submit" className="w-4/9" disabled={submit}>
                        {submit ? "Memproses..." : "Kirim Penilaian"}
                      </Button>
                    </DialogFooter>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
