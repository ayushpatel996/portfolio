import { useRef, useState, type FormEvent } from 'react';
import { ChevronDown, Terminal } from 'lucide-react';
import { RonaldoCelebration } from './RonaldoCelebration';
import { TerminalAnimation } from './TerminalAnimation';

const coffeeCup = [
  '   .______.',
  '   |      |]',
  '   \\______/',
  '  ----------',
];

const coffeeFrames = [
  ['', '', '', '      ~'],
  ['', '', '     ~ ~', '      ('],
  ['', '      ~', '    (  )', '     )'],
  ['       ~', '    (  )', '     ) (', '    (   )'],
  ['    ~   ~', '     ( )', '    )   (', '      ~'],
].map((steam) => [...steam, ...coffeeCup].join('\n'));

type TerminalOutput = { text: string; art?: 'ronaldo' | 'coffee' };

function runCommand(command: string): TerminalOutput | null {
  if (/^siu+$/.test(command) || command === 'cr7' || command === 'ronaldo') {
    return {
      text: 'Cristiano Ronaldo doing his SIUUU celebration in a number 7 shirt.',
      art: 'ronaldo',
    };
  }

  switch (command) {
    case 'help':
      return { text: 'help    Show available commands\nwhoami  About Ayush\nclear   Clear the output' };
    case 'whoami':
      return { text: 'Ayush Patel · Software Engineer 2\nBackend engineering, distributed systems, and AI development.' };
    case 'clear':
      return null;
    case 'coffee':
      return { text: 'A cup of coffee, ready to go.', art: 'coffee' };
    default:
      return { text: 'Unknown command. Type help for available commands.' };
  }
}

export function HeroTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<(TerminalOutput & { submission: number }) | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedCommand = command.trim().toLowerCase();
    if (!normalizedCommand) return;
    const result = runCommand(normalizedCommand);
    setOutput((previous) => result ? { ...result, submission: (previous?.submission ?? 0) + 1 } : null);
    setCommand('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-divider bg-surface">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="hero-terminal-console"
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-11 w-full items-center gap-2 rounded-t-xl border-b border-divider px-4 text-left text-secondary-text transition-colors hover:bg-section hover:text-theme-accent"
      >
        <Terminal aria-hidden="true" className="size-4" />
        <span className="font-mono text-xs">ayush@portfolio</span>
        <ChevronDown aria-hidden="true" className={`ml-auto size-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className="flex flex-1 items-center gap-4 p-4">
        <img
          src={import.meta.env.BASE_URL + 'photo.jpg'}
          alt="Ayush Patel"
          width="80"
          height="80"
          className="size-[4.5rem] shrink-0 rounded-lg border border-divider object-cover sm:size-20"
        />
        <nav aria-label="Terminal shortcuts" className="flex min-w-0 flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
          <a href="#experience" className="text-theme-accent hover:underline">$ experience</a>
          <a href="#skills" className="text-theme-accent hover:underline">$ skills</a>
          <a href="#contact" className="text-theme-accent hover:underline">$ contact</a>
        </nav>
      </div>

      <div
        id="hero-terminal-console"
        role="region"
        aria-label="Terminal console"
        hidden={!isOpen}
        className="rounded-b-xl border-t border-divider bg-section p-4"
      >
        {isOpen && (
          <>
            <form
              onSubmit={handleSubmit}
              onKeyDown={(event) => {
                if (event.key !== 'Escape') return;
                setIsOpen(false);
                toggleRef.current?.focus();
              }}
              className="flex items-center gap-2"
            >
              <label htmlFor="hero-terminal-command" className="sr-only">Terminal command</label>
              <span aria-hidden="true" className="font-mono text-theme-accent">$</span>
              <input
                ref={inputRef}
                id="hero-terminal-command"
                type="text"
                autoFocus
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="go"
                maxLength={40}
                placeholder="Type help"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                className="min-h-11 min-w-0 flex-1 rounded-lg border border-divider bg-surface px-2 font-mono text-base text-content placeholder:text-secondary-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent"
              />
              <button type="submit" className="min-h-11 rounded-lg bg-theme-accent px-3 text-sm font-semibold text-on-accent transition-colors hover:bg-theme-accent/90">
                Run
              </button>
            </form>
            <div role="status">
              {output && (
                <>
                  <p className={output.art ? 'sr-only' : 'mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-content'}>
                    {output.text}
                  </p>
                  {output.art === 'ronaldo' && <RonaldoCelebration key={output.submission} />}
                  {output.art === 'coffee' && (
                    <TerminalAnimation key={output.submission} frames={coffeeFrames} frameDuration={240} />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
