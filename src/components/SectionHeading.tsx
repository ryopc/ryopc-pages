type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ kicker, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
