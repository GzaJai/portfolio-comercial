export default function UiTooltip({ text, children, className = "" }) {
  if (!text) return children;

  return (
    <div className={`relative group inline-block ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-semibold text-on-primary bg-primary rounded-lg shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 origin-bottom w-max max-w-[200px] text-center z-[10010]">
        {text}
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
      </div>
    </div>
  );
}
