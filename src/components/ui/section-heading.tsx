import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  introduction?: string;
  align?: "left" | "center" | "right";
  titleId?: string;
  className?: string;
  invert?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  introduction,
  align = "left",
  titleId,
  className,
  invert = false,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "section-heading",
        `section-heading--${align}`,
        invert && "section-heading--invert",
        className,
      )}
    >
      <p className="eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={titleId} className="display-heading">
        {title}
      </h2>
      {introduction ? <p className="section-intro">{introduction}</p> : null}
    </header>
  );
}
