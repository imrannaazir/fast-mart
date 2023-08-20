"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { SizeColumn, columns } from "./size-column";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      {/* top */}
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="w-4 h-4 mr-2 " />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable data={data} columns={columns} searchKey="name" />

      {/* api list */}
      <Heading title="API" description="API Calls for sizes." />

      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizesClient;
