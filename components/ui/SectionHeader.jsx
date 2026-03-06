export default function SectionHeader({ label, title, subtitle, center = true }) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      <span className="section-label">{label}</span>
      <h2 className={`text-3xl md:text-4xl font-bold mt-3 text-white ${center ? "" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-text-sec text-base leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
