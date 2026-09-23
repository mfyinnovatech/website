import Image from "next/image";
import Link from "next/link";

type Props = {
  variant?: "blue" | "white" | "navy";
  kind?: "lockup" | "mark";
  className?: string;
  priority?: boolean;
  width?: number;
};

/* Brand rule: the mark is never redrawn. We only ever place the supplied artwork. */
export function Logo({
  variant = "blue",
  kind = "lockup",
  className = "",
  priority,
  width = 132,
}: Props) {
  const src = `/brand/${kind === "lockup" ? "logo" : "mark"}-${variant}.png`;
  // lockup 1600x902 · mark 1600x749 (source ratios)
  const ratio = kind === "lockup" ? 1600 / 902 : 1600 / 749;
  return (
    <Image
      src={src}
      alt="MFY Innovatech"
      width={width}
      height={Math.round(width / ratio)}
      priority={priority}
      className={className}
      style={{ height: "auto" }}
    />
  );
}

export function LogoLink(props: Props & { href?: string }) {
  const { href = "/", ...rest } = props;
  return (
    <Link href={href} aria-label="MFY Innovatech — home" className="inline-flex items-center">
      <Logo {...rest} />
    </Link>
  );
}
