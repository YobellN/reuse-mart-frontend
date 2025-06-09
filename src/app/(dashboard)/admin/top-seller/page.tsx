"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { TopSeller } from "@/services/top_seller/schema-top-seller";
import { generateTopSeller } from "@/services/top_seller/top-seller-service";
import { BadgeCheck, Info, XCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function TopSellerPage() {
  const [topSeller, setTopSeller] = useState<TopSeller | null>(null);
  const [status, setStatus] = useState<"success" | "info" | "error" | null>(
    null
  );
  const [message, setMessage] = useState("");

  const form = useForm();

  const handleClick = async () => {
    setStatus(null);
    setTopSeller(null);

    try {
      const res = await generateTopSeller();

      if (!res?.data) {
        setStatus("error");
        setMessage("Gagal mengambil data Top Seller.");
        return;
      }

      setTopSeller(res.data);

      if (res.data.bonus === 0) {
        setStatus("info");
        setMessage(
          "Top Seller bulan lalu sudah ditentukan. Tidak dapat dikirim ulang."
        );
      } else {
        setStatus("success");
        setMessage("Top Seller berhasil dibuat dan diberikan bonus.");
      }
    } catch {
      setStatus("error");
      setMessage("Gagal memuat data Top Seller.");
    }
  };

  const renderAlert = () => {
    switch (status) {
      case "success":
        return (
          <Alert className="mb-6">
            <BadgeCheck className="h-4 w-4" />
            <AlertTitle>Berhasil!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        );
      case "info":
        return (
          <Alert className="mb-6" variant="default">
            <Info className="h-4 w-4" />
            <AlertTitle>Sudah Ada</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        );
      case "error":
        return (
          <Alert className="mb-6" variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Gagal</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SiteHeader title="Cek Top Seller" />
      <div>
        <Card className="w-5/6 mx-auto mt-10 shadow-md">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Cek Top Seller Bulan Ini
              </h2>
              <Button
                variant="default"
                onClick={handleClick}
                disabled={!!topSeller}
              >
                Lihat Sekarang
              </Button>
            </div>

            {renderAlert()}

            {topSeller && (
              <Form {...form}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <FormField
                    name="id_top_seller"
                    render={() => (
                      <FormItem>
                        <FormLabel>ID Top Seller</FormLabel>
                        <FormControl>
                          <Input value={topSeller.id_top_seller} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="nama"
                    render={() => (
                      <FormItem>
                        <FormLabel>Nama Penitip</FormLabel>
                        <FormControl>
                          <Input value={topSeller.penitip.user.nama} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    render={() => (
                      <FormItem>
                        <FormLabel>Email Penitip</FormLabel>
                        <FormControl>
                          <Input
                            value={topSeller.penitip.user.email}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="no_telp"
                    render={() => (
                      <FormItem>
                        <FormLabel>No. Telepon</FormLabel>
                        <FormControl>
                          <Input
                            value={topSeller.penitip.user.no_telp}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="total_penjualan"
                    render={() => (
                      <FormItem>
                        <FormLabel>Total Penjualan</FormLabel>
                        <FormControl>
                          <Input
                            value={`Rp${Number(
                              topSeller.total_penjualan
                            ).toLocaleString("id-ID")}`}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="bonus"
                    render={() => (
                      <FormItem>
                        <FormLabel>Bonus</FormLabel>
                        <FormControl>
                          <Input
                            value={`Rp${Number(topSeller.bonus).toLocaleString(
                              "id-ID"
                            )}`}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="periode"
                    render={() => (
                      <FormItem>
                        <FormLabel>Periode</FormLabel>
                        <FormControl>
                          <Input
                            value={`${topSeller.tanggal_mulai} s/d ${topSeller.tanggal_selesai}`}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="saldo"
                    render={() => (
                      <FormItem>
                        <FormLabel>Saldo Sekarang</FormLabel>
                        <FormControl>
                          <Input
                            value={`Rp${Number(
                              topSeller.penitip.saldo
                            ).toLocaleString("id-ID")}`}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="poin"
                    render={() => (
                      <FormItem>
                        <FormLabel>Poin Sekarang</FormLabel>
                        <FormControl>
                          <Input value={topSeller.penitip.poin} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
