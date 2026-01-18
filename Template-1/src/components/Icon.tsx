import feather from "feather-icons";

type FeatherName = keyof typeof feather.icons;

export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: FeatherName;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: feather.icons[name].toSvg({ width: size, height: size }),
      }}
    />
  );
}
