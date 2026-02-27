export default function SectionDivider() {
    return (
      <div className="relative my-15">
        {/* linha fina */}
        <div className="h-px bg-gradient-to-r from-transparent via-black/40 to-transparent dark:via-white/10" />
        {/* glow central */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-24 rounded-full bg-gradient-to-r from-purple-900 to-purple-400 opacity-80 blur-md" />
        </div>
      </div>
    );
  }
  