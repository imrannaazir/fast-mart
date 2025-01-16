import Page from "@/components/layout/Page";
import PageSection from "@/components/ui/page-section";
import { Skeleton } from "@/components/ui/skeleton";

type TCategoryFormSkeletonProps = {
  isInModal?: boolean;
};

const CategoryFormSkeleton: React.FC<TCategoryFormSkeletonProps> = ({ isInModal = false }) => {
  return (
    <div>
      <Page size="sm" title={"Category title"} action={<ActionSkeleton />} isInModal={isInModal}>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="lg:w-[66%]">
            <PageSection>
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              {/* Collection */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
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

export default CategoryFormSkeleton;
