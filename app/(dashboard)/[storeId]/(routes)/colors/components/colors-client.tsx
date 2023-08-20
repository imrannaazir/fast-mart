"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { ColorColumn, columns } from "./color-column";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ColorsClientProps {
  data: ColorColumn[];
}

const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      {/* top */}
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="w-4 h-4 mr-2 " />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable data={data} columns={columns} searchKey="name" />

      {/* api list */}
      <Heading title="API" description="API Calls for colors." />

      <Separator />

      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorsClient;
