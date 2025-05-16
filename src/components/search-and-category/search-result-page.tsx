import DisplayProdukSearch from "./display-produk-search";
import FilterAccordion from "./filter-accordion";

export default function SearchResultPage() {
  return (
    <div className="min-h-[calc(100vh-80vh)] grid grid-cols-5 gap-4">
      <div className="col-span-1">
        <FilterAccordion />
      </div>
      <div className="col-span-4">
        <DisplayProdukSearch />
      </div>
    </div>
  );
}
