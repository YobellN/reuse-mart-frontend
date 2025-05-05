import api from "../api";
import { ProdukTitipan } from "./schema-penitipan";

export async function getProdukTitipan(): Promise<ProdukTitipan[]> {
  try {
    const res = await api.get("/penitipan");
    return res.data.data;
  } catch (error) {
    return [];
  }
}
