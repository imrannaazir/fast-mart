import PageSection from "@/components/ui/page-section";
import { Skeleton } from "@/components/ui/skeleton";
import Page from "../layout/Page";

const ProductFormSkeleton = () => {
  return (
    <Page size={"sm"} title="Product form loading...">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left section */}
        <div className="space-y-6 lg:w-[66%]">
          {/* Basic Info */}
          <PageSection className="space-y-4">
            {/* Title */}
            <div>
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="mt-2 h-10 w-full" />
            </div>

            {/* Description */}
            <div>
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="mt-2 h-32 w-full" />
            </div>
          </PageSection>

          {/* Media */}
          <PageSection>
            <div>
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="mt-2 h-48 w-full" />
            </div>
          </PageSection>

          {/* Pricing */}
          <PageSection title="Pricing">
            <div className="mt-2 flex space-x-4">
              <div>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="mt-2 h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="mt-2 h-10 w-full" />
              </div>
            </div>
          </PageSection>

          {/* Inventory */}
          <PageSection title="Inventory">
            <div>
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="mt-2 h-10 w-[200px]" />
            </div>
          </PageSection>

          {/* Shipping */}
          <PageSection title="Shipping">
            <div className="flex space-x-4">
              <div>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="mt-2 h-10 w-[200px]" />
              </div>
              <div>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="mt-2 h-10 w-[200px]" />
              </div>
            </div>
          </PageSection>

          {/* Variants */}
          <PageSection title="Variants">
            <Skeleton className="mt-2 h-10 w-full" />
          </PageSection>
        </div>

        {/* Right section */}
        <div className="space-y-6 lg:flex-grow">
          {/* Status */}
          <PageSection>
            <div>
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="mt-2 h-10 w-full" />
            </div>
          </PageSection>

          {/* Product Organization */}
          <PageSection title="Product organization">
            <Skeleton className="mt-2 h-10 w-full" />
            <Skeleton className="mt-2 h-10 w-full" />
            <Skeleton className="mt-2 h-10 w-full" />
            <Skeleton className="mt-2 h-10 w-full" />
          </PageSection>
        </div>
      </div>
    </Page>
  );
};

export default ProductFormSkeleton;
