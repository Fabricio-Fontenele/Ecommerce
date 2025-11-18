import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-2xl bg-[#F4EFFF] p-4 sm:rounded-3xl sm:p-6 lg:p-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="h-auto rounded-full bg-white py-2 text-xs font-semibold sm:py-3 sm:text-sm"
            asChild
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
