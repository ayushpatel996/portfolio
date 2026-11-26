import './TerminalAnimation.css';

export function TerminalAnimation({ frames, frameDuration }: { frames: readonly string[]; frameDuration: number }) {
  return (
    <div className="mx-auto mt-4 grid w-fit max-w-full overflow-x-auto font-mono text-xs leading-tight text-theme-accent" aria-hidden="true">
      {frames.map((frame, index) => (
        <pre
          key={frame}
          className="terminal-animation-frame"
          style={{
            animationDelay: `${index * frameDuration}ms`,
            animationDuration: `${index === frames.length - 1 ? 1 : frameDuration}ms`,
          }}
        >
          {frame}
        </pre>
      ))}
    </div>
  );
}
