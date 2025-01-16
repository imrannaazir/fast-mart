import Page from "@/components/layout/Page";
import PageSection from "@/components/ui/page-section";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type TCollectionFormSkeletonProps = {
  isInModal?: boolean;
};

const CollectionFormSkeleton: React.FC<TCollectionFormSkeletonProps> = ({ isInModal = false }) => {
  return (
    <div>
      <Page size="sm" title={"Collection tittle"} action={<ActionSkeleton />} isInModal={isInModal}>
        <div className={cn(isInModal ? "my-4 flex justify-end" : "hidden")}>
          <ActionSkeleton />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="lg:w-[66%]">
            <PageSection>
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-32 w-full" />
              </div>
              {/* Icon */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-10 w-10 rounded-full" />
                  ))}
                </div>
              </div>
            </PageSection>
          </div>
          {/* Right side */}
          <div className="flex-grow">
            <PageSection>
              <div className="space-y-2">
                <Skeleton className="h-4 w-14" />
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

export default CollectionFormSkeleton;
