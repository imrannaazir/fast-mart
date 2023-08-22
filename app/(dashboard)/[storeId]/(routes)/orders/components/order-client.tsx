"use client";

import { useParams, useRouter } from "next/navigation";

import { OrderColumn, columns } from "./column";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      {/* top */}
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders of your store"
        />
      </div>

      <Separator />

      {/* data table */}
      <DataTable columns={columns} data={data} searchKey="product" />
    </>
  );
};

export default OrderClient;
