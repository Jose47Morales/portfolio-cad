import React, { useState, useEffect, useRef } from "react";
import useSystemMetrics from "./hooks/useSystemMetrics";

const useKonamiCode = (callback) => {
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let lastKeyTime = 0;

    const handleKeyDown = (e) => {
      const currenTime = Date.now();
      if (currenTime - lastKeyTime > 2000) konamiIndex = 0;
      lastKeyTime = currenTime;

      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          callback();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

const MatrixRain = ({ active, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black cursor-pointer" onClick={onClose}>
      <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -transalte-y-1/2 text-green-400 font-mono text-2xl border-2 border-green-500 p-6 bg-black">
          <div className="mb-2">MATRIX MODE ACTIVATED</div>
          <div className="text-sm">Click anywhere to exit</div>
        </div>
    </div>
  );
};

const TerminalCommandLine = ({ onComand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(['> Welcome to Jose47Morales Terminal v1.0', '> Type "help" for available commands', '']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const inputRef = useRef(null);

  const commands = {
    help: () => ['Available commands', ' help    - Show this hel message', ' about   - Display information about Jose', ' skills  - List technical skills', ' ls      - List available files', ' cat     - Read file content (e.g., cat ABOUT.sketch)', ' clear   - Clear terminal', ' matrix  - Activate matrix mode', ' whoami  - Display current user', ' date    - Show current date and time', ' pandasay  - Make the panda say something', ' hack    - Start hacking sequence', ' exit    - Close terminal', ],
    about: () => ['Jose Morales - Systems Engineer', '├─ Data Science & Machine Learning', '├─ Computer Vision Expert', '├─ ML Diploma Certified', '└─ Tech Event Assistant' ],
    skills: () => ['Technical Stack:', 'Python     [████████░░] 80%', 'C++        [████████░░] 80%', 'Java       [██████░░░░] 60%', 'R          [███████░░░] 70%', 'OpenCV     [██████░░░░] 60%', 'TensorFlow [███████░░░] 70%', 'JavaScript [███████░░░] 70%', 'CSS        [█████████░] 90%', 'Node.js    [██████░░░░] 60%', 'Pandas     [████████░░] 80%' ],
    ls: () => ['ABOUT.sketch', 'PROJECTS.sketch', 'SKILLS.sketch', 'CERTIFICATIONS.sketch', 'CONTACT.sketch'],
    whoami: () => ['jose47morales'],
    date: () => [new Date().toString()],
    clear: () => [],
    pandasay: (args) => {
      const message = args.join(' ') || '¡Bamboo!';
      return [' ' + '_'.repeat(message.length + 2), `< ${message} >`, ' ' + '_'.repeat(message.length + 2), '⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀', '⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣦⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀', '⠀⠀⠀⠀⠀⠀⢿⣿⠟⠋⠉⠀⠀⠀⠀⠉⠑⠢⣄⡀⠀⠀⠀⠀⠀', '⠀⠀⠀⠀⠀⢠⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣦⡀', '⠀⣀⠀⠀⢀⡏⠀⢀⣴⣶⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⠇', '⣾⣿⣿⣦⣼⡀⠀⢺⣿⣿⡿⠃⠀⠀⠀⠀⣠⣤⣄⠀⠀⠈⡿⠋⠀', '⢿⣿⣿⣿⣿⣇⠀⠤⠌⠁⠀⡀⢲⡶⠄⢸⣏⣿⣿⠀⠀⠀⡇⠀⠀', '⠈⢿⣿⣿⣿⣿⣷⣄⡀⠀⠀⠈⠉⠓⠂⠀⠙⠛⠛⠠⠀⡸⠁⠀⠀', '⠀⠀⠻⣿⣿⣿⣿⣿⣿⣷⣦⣄⣀⠀⠀⠀⠀⠑⠀⣠⠞⠁⠀⠀⠀', '⠀⠀⠀⢸⡏⠉⠛⠛⠛⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀', '⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⢿⣿⣿⣿⣿⡄⠀⠀⠀⠀', '⠀⠀⠀⢷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⡀⠀⠀⠀'];
    },
    matrix: () => {onComand('matrix'); return ['Activating Matrix mode...']; },
    hack: () => {
      const lines = [ 'Initializing hack sequence...', 'Connecting to mainframe...', 'Bypassing firewall...', 'Accessing database...', 'Downloading files... [####      ] 40%', 'WARNING: ICE detected!', 'Deploying countermeasures...', 'Success! You are now a 1337 h4x0r'];
      return lines;
    },
    cat: (args) => {
      const file = args[0];
      if (!file) return ['cat: missing file operand'];
      if (file === 'ABOUT.sketch') {
        onComand('navigate:ABOUT.sketch');
        return ['Loading ABOUT.sketch...'];
      }
      if (file === 'PROJECTS.sketch') {
        onComand('navigate:PROJECTS.sketch');
        return ['Loading PROJECTS.sketch...']
      }
      if (file === 'SKILLS.sketch') {
        onComand('navigate:SKILLS.sketch');
        return ['Loading SKILLS.sketch...']
      }
      if (file === 'CERTIFICATIONS.sketch') {
        onComand('navigate:CERTIFICATIONS.sketch');
        return ['Loading CERTIFICATIONS.sketch...']
      }
      if (file === 'CONTACT.sketch') {
        onComand('navigate:CONTACT.sketch');
        return ['Loading CONTACT.sketch...']
      }
      return [`cat: ${file}: No such file or directory`];
    },
    exit: () => { onComand('close'); return ['Closing terminal...']; }
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const [command, ...args] = trimmed.split(' ');
    const newHistory = [...history, `> ${trimmed}`];

    if (commands[command]) {
      const output = commands[command](args);
      if (command === 'clear'){
        setHistory(['']);
      } else {
        setHistory([...newHistory, ...output, '']);
      }
    } else {
      setHistory([...newHistory, `Command not found: ${command}`, '']);
    }

    setCommandHistory([...commandHistory, trimmed]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-blacj text-green-400 font-mono text-sm p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto mb-2">
        {history.map((line, i) => <div key={i} className="whitespace-pre-wrap">{line}</div>)}
      </div>
      <div className="flex items-center">
        <span className="text-green-500 mr-2">$</span>
        <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent outline-none text-green-400" autoFocus />
      </div>
    </div>
  );
};

const SnakeGame = ({ active, onClose }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const titleCount = 20;
    canvas.width = gridSize * titleCount;
    canvas.height = gridSize * titleCount;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let gameActive = true;
    let started = false;

    const drawGame = () => {

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#00ff0020';
      for (let i = 0; i <= titleCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      if (started && gameActive && (dx !==0 || dy !== 0)) {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        
        if (head.x < 0 || head.x >= titleCount || head.y < 0 || head.y >= titleCount) {
        gameActive = false;
        setGameOver(true);
        return;
        }
        
        for (let segment of snake) {
          if (head.x === segment.x && head.y === segment.y) {
            gameActive = false;
            setGameOver(true);
            return;
          }
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y){
          setScore(s => s + 10);
          food = {
            x: Math.floor(Math.random() * titleCount),
            y: Math.floor(Math.random() * titleCount)
          };
        } else {
          snake.pop();
        }
      }


      ctx.fillStyle = '#00ff00';
      snake.forEach((segment, index) => {
        ctx.fillRect(
          segment.x * gridSize + 1,
          segment.y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      });

      ctx.fillStyle = '#ff0000';
      ctx.fillRect(
        food.x * gridSize + 1,
        food.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2
      );

      if (!started) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7';
        ctx.fillRect(50, 180, 300, 40);
        ctx.fillStyle = '#00ff00';
        ctx.font = '14px monospace';
        ctx.fillText('Press arrow key to start', 70, 205)
      }
    };

    const handleKeyPress = (e) => {
      e.preventDefault();

      if (!started) {
        started = true;
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
      }

      switch (e.key) {
        case 'ArrowUp':
          if (dy === 0) { dx = 0; dy = -1; }
          break;
        case 'ArrowDown':
          if (dy === 0) { dx = 0; dy = 1; }
          break;
        case 'ArrowLeft':
          if (dx === 0) { dx = -1; dy = 0; }
          break;
        case 'ArrowRight':
          if (dx === 0) { dx = 1; dy = 0; }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    const gameLoop = setInterval(drawGame, 100);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [active, onClose]);

  useEffect(() => {
    if (active) {
      setScore(0);
      setGameOver(false);
      setGameStarted(false);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      <div className="border-2 border-green-500 p-4 bg-black">
        <div className="text-green-400 font-mono text-sm mb-2 flex justify-between">
          <span>SNAKE GAME</span>
          <span>SCORE: {score}</span>
        </div>
        <canvas ref={canvasRef} className="border border-green-600" />
        <div className="text-green-400 font-mono text-sm mt-2 text-center">
          {gameOver ? (
            <div>
              <div className="text-red-400 mb-2">GAME OVER! Move the cursor to reset</div>
              <div>Final Score: {score}</div>
              <button
                onClick={onClose}
                className="mt-2 border border-green-600 px-3 py-1 hover:bg-green-900"
              >
                CLOSE (or press ESC)
              </button>
            </div>
          ) : (
            <div>
              {!gameStarted ? 'Press any arrow key to start' : 'Use arrow keys to move'} | ESC to exit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, imageUrl, githubUrl, videoUrl, stack, features, type, year }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="border-2 border-green-600 hover:border-green-400 transition-all bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-1 border border-green-600 p-2 relative h-48 bg-black justify-items-center">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20 pointer-events-none">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-green-700"></div>
            ))}
          </div>
          <img 
            src={imageUrl} 
            alt={title}
            className="h-full object-cover relative z-10 transition-opacity duration-500"
            style={{
              opacity: imageLoaded ? 1 : 0
            }} 
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML += '<div class="flex items-center justify-center h-full text-green-700 text-6xl">◘</div>'
            }}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg text-green-400 mb-1 font-bold">
                → {title}
              </h3>
              <p className="text-xs text-green-500 mb-2">{description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-green-600 px-2 py-1 text-xs hover:bg-green-900 transition-all"
                >
                  GITHUB
                </a>
              )}
              {videoUrl && (
                <a 
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-green-600 px-2 py-1 text-xs hover:bg-green-900 transition-all"
                >
                    VIDEO
                  </a>
              )}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-green-500 text-xs mb-1">STACK:</div>
            <div className="flex flex-wrap gap-1">
              {stack.map((tech, i) => (
                <span
                  key={i}
                  className="border border-green-600 px-2 py-0.5 text-xs bg-green-950"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setExpanded(!expanded)}
            className="border border-green-600 px-3 py-1 text-xs hover:bg-green-900 transition-all w-full text-left">
              {expanded ? '▼' : '▶'} {expanded ? 'HIDE' : 'SHOW'} DETAILS
            </button>

            <div 
              className={`overflow-hidden transition-all duration-300 ${
                expanded ? 'max-h-96 mt-3' : 'max-h-0'
              }`}
            >
              <div className="border border-green-600 p-3 bg-black">
                <div className="text-green-500 text-xs mb-2">FEATURES:</div>
                <div className="space-y-1 text-xs">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-greeen-500 mr-2">├─</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>

      <div className="border-t border-green-600 px-4 py-2 text-xs flex justify-between bg-black">
        <span>TYPE: {type}</span>
        <span>STATUS: <span className="text-green-500">COMPLETED</span></span>
        <span>YEAR: {year}</span>
      </div>
    </div>
  );
};

const TerminalText = ({ text, speed = 30, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && showCursor && <span className="text-green-500">█</span>}
    </span>
  );
};

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing system...");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadingSequence = [
      { progress: 10, text: "Loading kernel modules...", delay: 200 },
      { progress: 25, text: "Mounting filesystems...", delay: 300 },
      { progress: 40, text: "Starting network services...", delay: 250 },
      { progress: 55, text: "Loading portfolio data...", delay: 300 },
      { progress: 70, text: "Initializing drawing tools...", delay: 200 },
      { progress: 85, text: "Configuring user interface...", delay: 250 },
      { progress: 100, text: "System ready!", delay: 300 }
    ];

    let currentStep = 0;
    const runSequence = () => {
      if (currentStep < loadingSequence.length) {
        const step = loadingSequence[currentStep];
        setTimeout(() => {
          setProgress(step.progress);
          setLoadingText(step.text);
          setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${step.text}`]  );
          currentStep++;
          runSequence();
        }, step.delay);
      } else {
        setTimeout(() => {
          onLoadComplete();
        }, 500);
      }
    };

    runSequence();
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-3/4 max-w-2xl">
        <div className="border-2 border-green 500 p-6">
          <div className="text-green-400 font-mono text-sm mb-4">
            <div className="text-xl mb-4 text-green-500">◉ JOSE47MORALES.PORTFOLIO v1.0</div>
            <div className="mb-2">BIOS Version: 1.0.0</div>
            <div className="mb-4">Copyright (C) 2025 Jose Morales. All rights reserved.</div>
          </div>

          <div className="border-t border-green-600 pt-4 mb-4">
            <div className="text-green-400 font-mono text-xs space-y-1 h-32 overflow-hidden">
              {logs.map((log, i) => (
                <div key={i} className="opacity-80">
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-green-400 font-mono text-xs mb-1">
              <span>{loadingText}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-6 border-2 border-green-600 realative bg-black">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
              <div className="absolute inset-0 grid grid-cols-20 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="border-r border-green-700"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-green-400 font-mono text-xs mt-4">
            Press any key to continue...
          </div>
        </div>
      </div>
    </div>
  );
};

// System Info Bar at the top
const SystemInfo = ({ onTerminalOpen, onMenuToggle }) => {
  const [time, setTime] = useState(new Date());
  const { cpu, mem } = useSystemMetrics(1000);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Jose_Morales_CV.pdf';
    link.download = 'Jose_Morales_CV.pdf';
    link.click();
  };

  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-2 border-b border-cyan-600 text-green-400 font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-2">
        <button onClick={onMenuToggle} className="md:hidden border border-green-600 px-2 py-1 hover-bg-green-900">☰</button>
        <span 
          className="text-green-500 text-xl cursor-pointer hover:animate-pulse"
          onClick={onTerminalOpen}
          title="Click to open terminal"
        >
          ◉
        </span>
        <span className="font-bold hidden sm:inline">JOSE47MORALES.PORTFOLIO v1.0</span>
        <span className="font-bold sm:hidden">J47M.PORT</span>
      </div>
      <span className="text-cyan-500 hidden md:inline">SYSTEM READY</span>
      <div className="flex gap-2 sm:gap-4 text-xs items-center">
        <button
          onClick={handleDownloadCV}
          className="border border-green-600 px-2 py-1 hover:bg-green-900 transition-all hidden sm:inline"
        >
          ↓ CV
        </button>
        <span className="border border-green-600 px-1 sm:px-2 hidden sm:inline">MEM: {mem === null ? "N/A" : `${mem}%`}</span>
        <span className="border border-green-600 px-1 sm:px-2 hidden sm:inline">CPU: {cpu}%</span>
        <span className="border border-green-600 px-1 sm:px-2 hidden md:inline">TIME: {time.toLocaleTimeString()}</span>
        <span className="border border-green-600 px-1 sm:px-2 text-green-500">ONLINE</span>
      </div>
    </div>
  );
};

// Sidebar with tools and navigation
const DrawingTools = ({ selectedTool, setSelectedTool, gridOn, setGridOn, onClearCanvas, drawColor, setDrawColor, onUndo, isOpen, onClose }) => {
  const tools = ["SELECT", "RECTANGLE", "LINE", "CIRCLE"];
  const colors = [
    { name: "GREEN", value: "#00ff00" },
    { name: "CYAN", value: "#00ffff" },
    { name: "YELLOW", value: "#ffff00" },
    { name: "RED", value: "#ff0000" },
    { name: "MAGENTA", value: "#ff00ff" }
  ]

  return (
      <>
        {isOpen && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={onClose} />}
        <div className={`w-64 border-r border-green-600 p-3 text-green-400 font-mono text-xs bg-black overflow-y-auto fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <button onClick={onClose} className="lg:hidden absolute top-2 right-2 text-red-400 border border-red-600 px-2 py-1 hover:bg-red-900">✕</button>
          
          <div className="mb-4">
            <h3 className="text-green-500 mb-2 pb-1 border-b border-green-700">DRAWING TOOLS</h3>
            {tools.map(tool => (
              <button key={tool} className={`w-full text-left px-3 py-2 mb-1 border border-green-600 transition-all ${selectedTool === tool ? "bg-green-500 text-black" : "hover:bg-green-900"}`} onClick={() => setSelectedTool(tool)}>
                {tool === "SELECT" && "→ "}{tool === "LINE" && "/ "}{tool === "CIRCLE" && "○ "}{tool === "RECT" && "□ "}{tool}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-green-500 mb-2 pb-1 border-b border-green-700">COLOR</h3>
            {colors.map(color => (
              <button key={color.name} className={`w-full text-left px-3 py-2 mb-1 border border-green-600 transition-all ${drawColor === color.value ? "bg-green-900" : "hover:bg-green-900"}`} style={{ color: color.value }} onClick={() => setDrawColor(color.value)}>
                ■ {color.name}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-green-500 mb-2 pb-1 border-b border-green-700">PRECISION</h3>
            <button className={`w-full px-3 py-2 border border-green-600 transition-all ${gridOn ? "bg-green-500 text-black" : ""}`} onClick={() => setGridOn(!gridOn)}>GRID: {gridOn ? "ON" : "OFF"}</button>
          </div>

          <div className="mb-4">
            <button className="w-full px-3 py-2 mb-2 border border-green-600 hover:bg-blue-900 text-blue-400 transition-all" onClick={onUndo}>↶ UNDO</button>
            <button className="w-full px-3 py-2 border border-green-600 hover:bg-red-900 text-red-400 transition-all" onClick={onClearCanvas}>✕ CLEAR CANVAS</button>
          </div>

          <div>
            <h3 className="text-green-500 mb-2 pb-1 border-b border-green-700">SYSTEM</h3>
            <div className="mb-1">MODE: DRAFT</div>
            <div>UNITS: MM</div>
          </div>
        </div>
      </>
    );
  };

const DrawingCanvas = ({ selectedTool, gridOn, drawColor, shapes, setShapes }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gridOn) {
      ctx.strokeStyle = '#00ff0020';
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    shapes.forEach(shape => {
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2;

      if (shape.type === 'LINE') {
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
      } else if (shape.type === 'RECTANGLE') {
        const width = shape.x2 - shape.x1;
        const height = shape.y2 - shape.y1;
        ctx.strokeRect(shape.x1, shape.y1, width, height);
      } else if (shape.type === 'CIRCLE') {
        const radius = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));
        ctx.beginPath();
        ctx.arc(shape.x1, shape.y1, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });

    if (isDrawing && selectedTool !== "SELECT") {
      ctx.strokeStyle = drawColor + '80';
      ctx.lineWidth = 2;

      if (selectedTool === 'RECTANGLE') {
        const width = mousePos.x - startPos.x;
        const height = mousePos.y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, width, height);
      } else if (selectedTool === 'CIRCLE') {
        const radius = Math.sqrt(Math.pow(mousePos.x - startPos.x, 2) + Math.pow(mousePos.y - startPos.y, 2));
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (selectedTool === 'LINE') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
      }
    }

    if (selectedTool !== "SELECT") {
      ctx.strokeStyle = drawColor + '60';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mousePos.x - 10, mousePos.y);
      ctx.lineTo(mousePos.x + 10, mousePos.y);
      ctx.moveTo(mousePos.x, mousePos.y - 10);
      ctx.lineTo(mousePos.x, mousePos.y + 10);
      ctx.stroke();
    }
  }, [shapes, isDrawing, startPos, mousePos, selectedTool, gridOn, drawColor]);

  const handleMouseDown = (e) => {
    if (selectedTool === "SELECT") return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartPos({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || selectedTool === "SELECT") return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes([...shapes, { type: selectedTool, x1: startPos.x, y1: startPos.y, x2: x, y2: y, color: drawColor }]);

    setIsDrawing(false);
  };

  useEffect(() => {
    window.clearDrawingCanvas = () => setShapes([]);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDrawing(false)}
    />
  );
};

const PortfolioNav = ({ currentFile, onFileChange, isTransitioning, isOpen, onClose }) => {
  const files = ["ABOUT.sketch", "PROJECTS.sketch", "SKILLS.sketch", "CERTIFICATIONS.sketch", "CONTACT.sketch"];

  return (
    <>
      {isOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={onClose} />}
      <div className={`w-64 border-r border-cyan-400 p-3 text-cyan-400 font-mono text-xs bg-black fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <button onClick={onClose} className="md:hidden absolute top-2 right-2 text-red-400 border border-red-600 px-2 py-1 hover:bg-red-900">✕</button>
        <h2 className="text-cyan-400 mb-2 pb-1 border-b border-cyan-700">PORTFOLIO</h2>
        <ul>
          {files.map((file) => (
            <li
              key={file}
              className={`cursor-pointer mb-1 px-3 py-2 border border-cyan-600 transition-all ${
                currentFile === file ? "bg-cyan-500 text-black" : "hover:bg-cyan-900"
              } ${isTransitioning ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => {onFileChange(file); onClose(); }}
            >
              → {file}
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-3 border-t border-green-700">
          <div className="text-cyan-500">CURRENT: {currentFile}</div>
        </div>
      </div>
    </>
    
  );
};

const SkillBar = ({ name, percentage, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);


  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-4 border border-green-600 relative bg-black">
        <div 
          className="h-full bg-green-500 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}></div>
        <div className="absolute inset-0 grid grid-cols-10 opacity-30">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border-r border-green-700"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CertificationBadge = ({ title, issuer, date, credentialId, credentialUrl, icon = "🏆", delay = 0 }) => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setUnlocked(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`border-2 border-green-600 p-4 bg-black transition-all duration-500 transform ${unlocked ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} hover:border-green-400 hover:shadow-lg hover:shadow-green-900`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl sm:text-5xl text-green-500 animate-pulse">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-green-400 font-bold text-sm sm:text-base">
              {unlocked ? <TerminalText text={title} speed={30} /> : title}
            </h3>
              {unlocked && (
                <span className="text-green-500 text-xs border border-green-500 px-2 py-0.5 whitespace-nowrap">
                  UNLOCKED
                </span>
              )}
          </div>

          <div className="text-xs space-y-1 text-green-500">
            <div>ISSUER: {issuer}</div>
            <div>DATE: {date}</div>
            {credentialId && <div>ID: {credentialId}</div>}
          </div>

          {credentialUrl && (
            <a 
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 border border-green-600 px-3 py-1 text-xs hover:bg-green-900 transition-all"
            >
              VIEW CREDENTIAL →
            </a>
          )}
        </div>
      </div>

      {unlocked && (
        <div className="mt-3 pt-3 border-t border-green-700">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-green-500">⚡</span>
            <div className="flex-1 h-2 border border-green-600 relative bg-black overflow-hidden">
              <div className="h-full bg-green-500 animate-pulse" style={{ width: '100%' }} />
            </div>
            <span className="text-green-500">100%</span>
          </div>
        </div>
      )}
    </div>
  );
};

const FileTransition = ({ show, fileName, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex items-center justify-center">
      <div className="border-2 border-green-500 p-8 bg-black">
        <div className="text-green-400 font-mono text-sm">
          <div className="mb-4">
            <TerminalText text={`$ cat ${fileName}`} speed={50} />
          </div>
          <div className="flex items-center gap-2">
            <div className="animate-spin">⟳</div>
            <div>Loading file...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentArea = ({ currentFile, selectedTool, gridOn, drawColor, shapes, setShapes }) => {
  const [showContent, setShowContent] = useState(false);

  const skills = [
    { name: "Python", percentage: 80 },
    { name: "C++", percentage: 80 },
    { name: "Java", percentage: 60 },
    { name: "R", percentage: 70 },
    { name: "OpenCV", percentage: 60 },
    { name: "TensorFlow", percentage: 70 },
    { name: "JavaScript", percentage: 70 },
    { name: "CSS", percentage: 90 },
    { name: "Node.js", percentage: 60 },
    { name: "Pandas", percentage: 80 },
  ];

  useEffect(() => {
    setShowContent(false);
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, [currentFile]);

  if (selectedTool !== "SELECT") {
    return (
      <div className="flex-1 relative bg-black">
        <div className="absolute top-4 left-4 z-10 border border-green-500 bg-black px-3 py-2 text-green-500 font-mono text-sm">
          DRAWING MODE: {selectedTool} | COLOR: <span style={{ color: drawColor }}>■</span>
        </div>
        <DrawingCanvas 
          selectedTool={selectedTool}
          gridOn={gridOn}
          drawColor={drawColor}
          shapes={shapes}
          setShapes={setShapes} 
        />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 text-green-400 font-mono text-sm bg-black transition-all overflow-y-auto">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
          linear-gradient(to right, #00ff00 1px, transparent 1px),
          linear-gradient(to bottom, #00ff00 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10">
        {currentFile === "ABOUT.sketch" && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="border-2 border-green-500 p-4 mb-4 inline-block">
                <h2 className="text-lg sm:text-xl mb-1">
                  <TerminalText text="JOSE MORALES" speed={50} />
                </h2>
                <div className="text-green-500 text-sm sm:text-base">
                  <TerminalText text="Systems Engineer" speed={50} />
                </div>
              </div>

              <div className="border border-green-600 p-4 mb-4">
                <div className="mb-2 text-xs sm:text-sm">
                  <TerminalText text="> PROFILE.exe" speed={40} />
                </div>
                <div className="pl-4 space-y-1 text-xs sm:text-sm">
                  <div><TerminalText text="┌─ Systems Engineer" speed={30} /></div>
                  <div><TerminalText text="├─ Data Science + ML" speed={30} /></div>
                  <div><TerminalText text="├─ Computer Vision Expert" speed={30} /></div>
                  <div><TerminalText text="├─ ML Diploma Certified" speed={30} /></div>
                  <div><TerminalText text="├─ Tech Event Assistant" speed={30} /></div>
                  <div><TerminalText text="└─ AI Knowledge Extractor" speed={30} /></div>
                </div>
              </div>

              <div className="border border-green-600 p-4 mb-4">
                <div className="text-green-500 mb-2 text-xs sm:text-sm">CORE_STACK:</div>
                <div className="space-y-1 text-xs">
                  {skills.slice(0, 5).map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96">
              <div className="border border-green-600 p-4 mb-4 h-48 sm:h-64 flex items-center justify-center">
                <img 
                  src="/images/profile.png" 
                  alt="Jose Morales"
                  className="h-full object-cover"
                />
              </div>

              <div className="border border-green-600 p-4">
                <div className="text-green-500 mb-2 text-xs sm:text-sm">
                  <TerminalText text="DESING_PHILOSOPHY {" speed={40} />
                </div>
                <div className="pl-4 space-y-1 text-xs">
                  <div><TerminalText text='innovation: "retro-futurism"' speed={30} /></div>
                  <div><TerminalText text='focus: "user-centered"' speed={30} /></div>
                  <div><TerminalText text='style: "minimal + functional"' speed={30} /></div>
                </div>
                <div>&#125;</div>
              </div>

              <div className="border border-green-600 p-3 mt-4 text-xs">
                <div className="mb-1">└─ CONNECT:</div>
                <div className="pl-4">
                  <a href="https://github.com/Jose47Morales" target="_blank"><div>&gt; GitHub</div></a>
                  <a href="https://www.linkedin.com/in/jose-alberto-morales-leon-963935346" target="_blank"><div>&gt; LinkedIn</div></a>
                  <a href="mailto:josemoralesleon58@gmail.com" target="_blank"><div>&gt; Email</div></a>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentFile === "PROJECTS.sketch" && (
          <div>
            <h2 className="text-xl border-b-2 border-green-500 pb-2 mb-4">
              <TerminalText text="PROJECTS" speed={50} />
            </h2>
            <div className="space-y-6">
              <ProjectCard
                title="POS System"
                description="Point of Sale system for retail"
                imageUrl="/images/pos-system.png"
                githubUrl="https://github.com/Jose47Morales/discoteca-pos"
                stack={["Laravel", "MySQL", "TailwindCSS", "Blade"]}
                features={[
                  "Inventory management",
                  "Sales tracking & reports",
                  "User authentication",
                ]}
                type="Web Application"
                year="2025"
              />

              <ProjectCard 
                title="FlySmart"
                description="Flight route optimization platform"
                imageUrl="/images/flysmart.png"
                githubUrl="https://github.com/Jose47Morales/flysmart"
                stack={["C++", "Flask", "Dijkstra Algorithm", "JavaScript"]}
                features={[
                  "Optimized flight route alorithms",
                  "Real-time cost calculation",
                  "Interactive route visualization",
                  "Multi-criteria optimization"
                ]}  
                type="Web Application"
                year="2025"
              />

              <ProjectCard
                title="Game Control with Computer Vision"
                description="Interactive game using hand gestures"
                imageUrl="/images/game-cv.png"
                videoUrl="https://www.youtube.com/watch?v=u31dSN0eUxA&t=112s"
                stack={["JavaScript", "C#"]}
                features={[
                  "Real-time hand tracking",
                  "Gesture recognition system",
                  "Low latency processing",
                  "Custom game mechanics"
                ]}
                type="Web Application"
                year="2024"
              />
            </div>
          </div>
        )}

        {currentFile === "SKILLS.sketch" && (
          <div>
            <h2 className="text-xl border-b-2 border-green-500 pb-2 mb-4">
              <TerminalText text="CORE_STACK" speed={50} /></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {skills.slice(0, 5).map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={i * 100} />
                ))}
              </div>
              <div>
                {skills.slice(5).map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={(i + 5) * 100} />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentFile === "CERTIFICATIONS.sketch" && (
          <div>
            <h2 className="text-xl border-b-2 border-green-500 pb-2 mb-4">
              <TerminalText text="CERTIFICATIONS & ACHIEVEMENTS" speed={50}/>
            </h2>

            <div className="mb-6 border border-green-500 p-4 bg-black">
              <div className="flex items-center justify-between">
                <div className="text-green-500 text-sm">ACHIEVEMENTS UNLOCKED:</div>
                <div className="text-green-400 text-2xl font-bold">3/3</div>
              </div>
              <div className="mt-2 h-3 border border-green-600 relative bg-black">
                <div className="h-full bg-green-500 transition-all duration-2000" style={{width: '100%'}} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CertificationBadge 
                icon="👁"
                title="Attendance at the 5th International Congress on Systems Engineering - VCIIS2023"
                issuer="Universidad de Córdoba"
                date="2023"
                credentialId="d8970298f0aac7df7ffcf26b4ab995bc"
                credentialUrl="http://cintiarepositorio.unicordoba.edu.co:8095/inscripciones/certificados"
                delay={100}
              />

              <CertificationBadge
                icon="🖨"  
                title="Machine Learning Diploma"
                issuer="Universidad de Córdoba"
                date="2024"
                credentialId="0fc2644c253a9c2c0aa0d139c69996d1"
                credentialUrl="http://cintiarepositorio.unicordoba.edu.co:8095/inscripciones/certificados"
                delay={200}
              />

              <CertificationBadge
                icon="🖥"  
                title="Systems Engineering"
                issuer="Universidad de Córdoba"
                date="2025"
                credentialId="784D85B0-957A-4C6A-85F5-6141AE218E4A"
                credentialUrl="https://www.etitulo.com/validate/v/784D85B0-957A-4C6A-85F5-6141AE218E4A"
                delay={300}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-green-600 p-3 text-center">
                <div className="text-2xl text-green-500 mb-1">
                  <TerminalText text="3" speed={50} />
                </div>
                <div className="text-xs">
                  <TerminalText text="CERTIFICATIONS" speed={40} />
                </div>
              </div>
              <div className="border border-green-600 p-3 text-center">
                <div className="text-2xl text-green-500 mb-1">
                  <TerminalText text="100%" speed={50} />
                </div>
                <div className="text-xs">
                  <TerminalText text="COMPLETION" speed={40} />
                </div>
              </div>
              <div className="border border-green-600 p-3 text-center">
                <div className="text-2xl text-green-500 mb-1">
                  <TerminalText text="2025" speed={50} />
                </div>
                <div className="text-xs">
                  <TerminalText text="LAST YEAR" speed={40} />
                </div>
              </div>
              <div className="border border-green-600 p-3 text-center">
                <div className="text-2xl text-green-500 mb-1">
                  <TerminalText text="∞" speed={50} />
                </div>
                <div className="text-xs">
                  <TerminalText text="LEARNING" speed={40} />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentFile === "CONTACT.sketch" && (
          <div>
            <h2 className="text-xl border-b-2 border-green-500 pb-2 mb-4">
              <TerminalText text="CONNECT" speed={50} />
            </h2>
            <div className="mb-6 border-2 border-green-500 p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-green-500 text-lg mb-2">
                    <TerminalText text="CURRICULUM VITAE" speed={40}/>
                  </div>
                  <div className="text-xs">
                    <TerminalText text="Download my complete resume in PDF format" speed={40}/>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/Jose_Morales_CV.pdf';
                    link.download = 'Jose_Morales_CV.pdf';
                    link.click();
                  }}
                  className="border-2 border-green-500 px-6 py-3 hover:bg-green-500 hover:text-black transition-all text-green-500 font-bold"
                >
                  ↓ DOWNLOAD CV.PDF
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-green-600 p-4">
                <a href="https://github.com/Jose47Morales" target="_blank">
                  <div className="text-green-500 mb-2">
                    <TerminalText text="GitHub" speed={40} />
                  </div>
                  <div className="text-xs">
                    <TerminalText text="https://github.com/Jose47Morales" speed={40} /></div>
                </a>
              </div>
              <div className="border border-green-600 p-4">
                <a href="https://www.linkedin.com/in/jose-alberto-morales-leon-963935346" target="_blank">
                  <div className="text-green-500 mb-2">
                    <TerminalText text="LinkedIn" speed={40} />
                  </div>
                  <div className="text-xs">
                    <TerminalText text="https://www.linkedin.com/in/jose-alberto-morales-leon-963935346" speed={40} />
                  </div>
                </a>
              </div>
              <div className="border border-green-600 p-4">
                <a href="mailto:josemoralesleon58@gmail.com" target="_blank">
                  <div className="text-green-500 mb-2">
                    <TerminalText text="Email" speed={40} />
                  </div>
                  <div className="text-xs">
                    <TerminalText text="josemoralesleon58@gmail.com" speed={40} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBar = ({ currentFile, mousePos }) => {
  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-1 border-t border-cyan-600 text-cyan-400 font-mono text-xs bg-black">
      <span>X: {mousePos.x.toFixed(2)}   Y: {mousePos.y.toFixed(2)}</span>
      <span>FILE: {currentFile}</span>
      <span>VIEWING PROFILE</span>
      <span>LAST SAVE: 2025</span>
      <span className="border border-green-500 px-2 text-green-500">READY</span>
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFile, setCurrentFile] = useState("ABOUT.sketch");
  const [pendingFile, setPendingFile] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedTool, setSelectedTool] = useState("SELECT");
  const [gridOn, setGridOn] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [drawColor, setDrawColor] = useState("#00ff00");
  const [shapes, setShapes] = useState([]);
  const [matrixMode, setMatrixMode] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [snakeGame, setSnakeGame] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useKonamiCode(() => {
    setMatrixMode(true);
  });

  useEffect(() => {
    const handleKeyCombo = (e) => {

      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        console.log('Opening terminal');
        setTerminalOpen(true);
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        e.preventDefault();
        console.log('Opening Snake Game');
        setSnakeGame(true);
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        console.log('Activating Matrix Mode');
        setMatrixMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyCombo);
    return () => window.removeEventListener('keydown', handleKeyCombo);
  }, []);

  const handleClearCanvas = () => {
    setShapes([]);
  };

  const handleUndo = () => {
    if (shapes.length > 0) {
      setShapes(shapes.slice(0, -1));
    }
  };

  const handleFileChange = (file) => {
    if (file === currentFile) return;
    setPendingFile(file);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setCurrentFile(pendingFile);
    setIsTransitioning(false);
    setPendingFile(null);
  };

  const handleTerminalCommand = (cmd) => {
    if (cmd === 'matrix') {
      setMatrixMode(true);
      setTerminalOpen(false);
    } else if (cmd === 'close') {
      setTerminalOpen(false);
    } else if (cmd.startsWith('navigate:')) {
      const file = cmd.split(':')[1];
      handleFileChange(file);
      setTerminalOpen(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="bg-black h-screen flex flex-col">
      <MatrixRain active={matrixMode} onClose={() => setMatrixMode(false)} />
      {snakeGame && <SnakeGame active={snakeGame} onClose={() => setSnakeGame(false)} />}

      {terminalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl h-2/3 border-2 border-green-500 bg-black relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setTerminalOpen(false)}
              className="border border-green-600 px-3 py-1 text-xs hover:bg-red-900 text-red 400"
            >
              ✕ CLOSE
            </button>
          </div>
          <TerminalCommandLine onComand={handleTerminalCommand} />
        </div>
      </div>
    )}
      <FileTransition
        show={isTransitioning}
        fileName={pendingFile}
        onComplete={handleTransitionComplete}
      />
      <SystemInfo onTerminalOpen={() => setTerminalOpen(true)} onMenuToggle={() => setRightSidebarOpen(!rightSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <DrawingTools 
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          gridOn={gridOn}
          setGridOn={setGridOn}
          onClearCanvas={handleClearCanvas}
          drawColor={drawColor}
          setDrawColor={setDrawColor}
          onUndo={handleUndo}
          isOpen={leftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
        />
        <PortfolioNav 
          currentFile={currentFile} 
          onFileChange={handleFileChange}
          isTransitioning={isTransitioning} 
          isOpen={rightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
        />
        <ContentArea 
          currentFile={currentFile} 
          selectedTool={selectedTool} 
          gridOn={gridOn}
          drawColor={drawColor}
          shapes={shapes}
          setShapes={setShapes} 
        />
      </div>
      <StatusBar currentFile={currentFile} mousePos={mousePos} />

      <div className="hidden lg:block fixed bottom-16 right-4 text-green-700 font-mono text-xs opacity-30 hover:opacity-100 transition-opacity">
        <div className="text-green-500 mb-1">Easter Eggs:</div>
        <div>• Click ● for Terminal</div>
        <div>• Ctrl+Shift+T: Terminal</div>
        <div>• Ctrl+Shift+G: Snake Game</div>
        <div>• Ctrl+Shift+M: Matrix</div>
        <div>• Konami Code: ↑↑↓↓←→←→BA</div>
      </div>
    </div>
  );
}