import Page from "@/components/layout/Page";
import PageSection from "@/components/ui/page-section";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type TBrandFormSkeletonProps = {
  isInModal?: boolean;
};

const BrandFormSkeleton: React.FC<TBrandFormSkeletonProps> = ({ isInModal = false }) => {
  return (
    <div>
      <Page title={"Brand tittle."} size="sm" action={<ActionSkeleton />} isInModal={isInModal}>
        <div className={cn(isInModal ? "my-4 flex justify-end" : "hidden")}>
          <ActionSkeleton />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="lg:w-[66%]">
            <PageSection>
              {/* Name */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              {/* Slogan */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-32 w-full" />
              </div>
            </PageSection>
          </div>
          {/* Right side */}
          <div className="flex-grow space-y-6">
            <PageSection>
              {/* Logo */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-32 w-full" />
              </div>
            </PageSection>
            <PageSection>
              {/* Cover image */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-48 w-full" />
              </div>
            </PageSection>
          </div>
        </div>
      </Page>
    </div>
  );
};

const ActionSkeleton = () => {
  return <Skeleton className="h-9 w-16" />;
};

export default BrandFormSkeleton;
