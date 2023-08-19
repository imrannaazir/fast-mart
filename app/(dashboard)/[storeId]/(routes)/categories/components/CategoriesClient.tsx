"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { CategoryColumn, columns } from "./category-column";
import { DataTable } from "@/components/ui/data-table";
import { useParams, useRouter } from "next/navigation";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />

      {/* data table */}
      <DataTable data={data} columns={columns} />
    </>
  );
};

export default CategoriesClient;
