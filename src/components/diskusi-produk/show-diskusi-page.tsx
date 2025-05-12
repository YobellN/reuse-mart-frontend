import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductDiscussionCard from "@/components/diskusi-produk/card-tampil-diskusi-produk";
import { Separator } from "../ui/separator";

export default function ShowDiskusiPage({ id_produk }: { id_produk: string }) {
  return (
    <Accordion
      defaultValue="item-0"
      type="single"
      collapsible
      className="mt-4 w-full px-3 bg-white"
    >
      <AccordionItem
        value="item-0"
        className=" data-[state=open]:border-b-2 data-[state=open]:border-green-600 dark:data-[state=open]:border-green-500"
      >
        <AccordionTrigger className="border-1 px-3 py-3 group hover:no-underline hover:text-green-600 data-[state=open]:text-green-600 my-3 font-semibold text-xl [&>svg]:w-8 [&>svg]:h-8">
          <div>
            <h2>DISKUSI PRODUK</h2>
            <div className="w-64 my-1">
              <Separator className="border-3 border-green-500 rounded-full" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-3">
          <ProductDiscussionCard id_produk={id_produk} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
