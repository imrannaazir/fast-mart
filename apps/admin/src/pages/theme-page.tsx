export const ThemePage = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* background & foreground */}
      <div className="bg-background text-foreground flex aspect-video items-center justify-center rounded-lg">
        Background
      </div>
      <div className="bg-foreground text-background flex aspect-video items-center justify-center rounded-lg">
        Foreground
      </div>

      {/* primary & primary foreground */}
      <div className="bg-primary text-primary-foreground flex aspect-video items-center justify-center rounded-lg">
        Primary
      </div>
      <div className="bg-primary-foreground text-primary flex aspect-video items-center justify-center rounded-lg">
        Primary Foreground
      </div>
      {/* secondary & secondary foreground */}
      <div className="bg-secondary text-secondary-foreground flex aspect-video items-center justify-center rounded-lg">
        Secondary
      </div>
      <div className="bg-secondary-foreground text-secondary flex aspect-video items-center justify-center rounded-lg">
        Secondary Foreground
      </div>
      {/* muted & muted foreground */}
      <div className="bg-muted text-muted-foreground flex aspect-video items-center justify-center rounded-lg">
        Muted
      </div>
      <div className="bg-muted-foreground text-muted flex aspect-video items-center justify-center rounded-lg">
        Muted Foreground
      </div>
      {/* accent & accent foreground */}
      <div className="bg-accent text-accent-foreground flex aspect-video items-center justify-center rounded-lg">
        Accent
      </div>
      <div className="bg-muted-foreground text-muted flex aspect-video items-center justify-center rounded-lg">
        Accent Foreground
      </div>
      {/* destructive & destructive foreground */}
      <div className="bg-destructive text-destructive-foreground flex aspect-video items-center justify-center rounded-lg">
        Destructive
      </div>
      <div className="bg-destructive-foreground text-destructive flex aspect-video items-center justify-center rounded-lg">
        Destructive Foreground
      </div>
    </div>
  );
};
