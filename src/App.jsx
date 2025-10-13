import React, { useState, useEffect } from "react";
import useSystemMetrics from "./hooks/useSystemMetrics";

// System Info Bar at the top
const SystemInfo = () => {
  const [time, setTime] = useState(new Date());
  const { cpu, mem } = useSystemMetrics(1000);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-cyan-400 text-green-400 font-mono text-sm">
      <div className="flex items-center gap-2">
        <span className="text-green-500 text-xl">◉</span>
        <span className="font-bold">JOSE47MORALES.PORTFOLIO v1.0</span>
      </div>
      <span className="text-cyan-500">SYSTEM READY</span>
      <div className="flex gap-4">
        <span className="border border-green-600 px-2">MEM: {mem === null ? "N/A" : `${mem}%`}</span>
        <span className="border border-green-600 px-2">CPU: {cpu}%</span>
        <span className="border border-green-600 px-2">TIME: {time.toLocaleTimeString()}</span>
        <span className="border border-green-600 px-2 text-green-500">ONLINE</span>
      </div>
    </div>
  );
};

// Sidebar with tools and navigation
const DrawingTools = () => {
  const [selectedTool, setSelectedTool] = useState("SELECT");
  const [gridOn, setGridOn] = useState(true);

  const tools = ["SELECT", "RECTANGLE", "LINE", "CIRCLE"];
  const constraints = ["HORIZONTAL", "VERTICAL", "PARALLEL", "PERPENDICULAR", "TANGENT"];

  return (
    <div className="w-64 border-cyan-400 p-3 text-green-400 font-mono text-xs bg-black">
      <div className="mb-4">
        <h3 className="text-cyan-400 mb-2 pb-1 border-b border-green-700">DRAWING TOOLS</h3>
        {tools.map((tool) => (
          <button
            key={tool}
            className={`w-full text-left px-3 py-2 mb-1 border border-green-600 ${selectedTool === tool ? "bg-green-500 text-black" : "hover:bg-green-900"}`}
            onClick={() => setSelectedTool(tool)}
          >
            {tool === "SELECT" && "→ "}
            {tool === "RECTANGLE" && "▭ "}
            {tool === "LINE" && "／ "}
            {tool === "CIRCLE" && "◯ "}
            {tool}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-cyan-400 mb-2 pb-1 border-b border-green-700">CONSTRAINTS</h3>
        {constraints.map((constraint) => (
          <div
            key={constraint}
            className="px-3 py-1 mb-1 border border-green-600 hover:bg-green-900 cursor-pointer"
          >
            {constraint}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-cyan-400 mb-2 pb-1 border-b border-green-700">PRECISION</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-cyan-400">DECIMAL:</span>
          <select className="bg-black border border-cyan-400 text-white px-2 py-1">
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <button
          className={`w-full px-3 py-2 border border-green-600 ${gridOn ? "bg-green-500 text-black" : ""
            }`}
          onClick={() => setGridOn(!gridOn)}
        >
          GRID: {gridOn ? "ON" : "OFF"}
        </button>
      </div>

      <div>
        <h3 className="text-cyan-400 mb-2 pb-1 border-b border-green-700">SYSTEM</h3>
        <div className="text-cyan-400 mb-1">MODE: DRAFT</div>
        <div className="text-cyan-400">UNITS: MM</div>
      </div>
    </div>
  );
}

const PortfolioNav = ({ currentFile, setCurrentFile }) => {
  const files = ["ABOUT.sketch", "PROJECTS.sketch", "SKILLS.sketch", "CONTACT.sketch"];

  return (
    <div className="w-64 border-r border-cyan-400 p-3 text-cyan-400 font-mono text-xs bg-black">
      <h3 className="text-cyan-400 mb-2 pb-1 border-b border-cyan-700">PORTFOLIO</h3>
      <ul>
        {files.map((file) => (
          <li
            key={file}
            className={`cursor-pointer mb-1 px-3 py-2 border border-cyan-600 ${currentFile === file ? "bg-cyan-500 text-black" : "hover:bg-cyan-900"
              }`}
            onClick={() => setCurrentFile(file)}
          >
            → {file}
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-3 border-t border-green-700">
        <div className="text-cyan-500">CURRENT: {currentFile}</div>
      </div>
    </div>
  );
};

const SkillBar = ({ name, percentage }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-4 border border-green-600 relative bg-black">
        <div className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}></div>
        <div className="absolute inset-0 grid grid-cols-10 opacity-30">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border-r border-green-700"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContentArea = ({ currentFile }) => {
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

  return (
    <div className="flex-1 p-6 text-green-400 font-mono text-sm overflow-hidden bg-black">
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
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="border-2 border-green-500 p-4 mb-4 inline-block">
                <h2 className="text-xl mb-1">JOSE MORALES</h2>
                <div className="text-green-500">Systems Engineer</div>
              </div>

              <div className="border border-green-600 p-4 mb-4">
                <div className="mb-2">&gt; PROFILE.exe</div>
                <div className="pl-4 space-y-1">
                  <div>┌─ Systems Engineer</div>
                  <div>├─ Data Science + ML</div>
                  <div>├─ Computer Vision Expert</div>
                  <div>├─ ML Diploma Certified</div>
                  <div>├─ Tech Event Assistant</div>
                  <div>└─ AI Knowledge Extractor</div>
                </div>
              </div>

              <div className="border border-green-600 p-4 mb-4">
                <div className="text-green-500 mb-2">CORE_STACK:</div>
                <div className="space-y-1 text-xs">
                  {skills.slice(0, 5).map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-96">
              <div className="border border-green-600 p-4 mb-4 h-64 flex items-center justify-center">
                <img className="h-60" src="./src/images/profile.png" alt="Jose Morales"/>
              </div>

              <div className="border border-green-600 p-4">
                <div className="text-green-500 mb-2">DESING_PHILOSOPHY &#123;</div>
                <div className="pl-4 space-y-1 text-xs">
                  <div>innovation: "retro-futurism"</div>
                  <div>focus: "user-centered"</div>
                  <div>style: "minimal + functional"</div>
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
            <h2 className="text-xl border-b-2 border-green-500 pb-2 mb-4">PROJECTS</h2>
            <div className="space-y-4">
              <div className="border border-green-600 p-4">
                <a href="https://github.com/Jose47Morales/flysmart" target="_blank">
                  <div className=" text-green-500 mb-2">→ FlySmart</div>
                  <div className="text-xs">Flight route optimization platform</div>
                </a>
              </div>
              <div className="border border-green-600 p-4">
                <a href="https://www.youtube.com/watch?v=u31dSN0eUxA&t=112s" target="_blank">
                  <div className=" text-green-500 mb-2">→ Game Control with Computer Vision</div>
                  <div className="text-xs">Interactive game using hand gestures</div>
                </a>
              </div>
              <div className="border border-green-600 p-4">
                <a href="https://github.com/Jose47Morales/discoteca-pos" target="_blank">
                  <div className=" text-green-500 mb-2">→ POS System</div>
                  <div className="text-xs">Point of Sale system for retail</div>
                </a>
              </div>
            </div>
          </div>
        )}

        {currentFile === "SKILLS.sketch" && (
          <div>
            <h2 className="text-xl border-b-2 border-green-500 pb-2 mb-4">CORE_STACK</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {skills.slice(0, 5).map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
                ))}
              </div>
              <div>
                {skills.slice(5).map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentFile === "CONTACT.sketch" && (
          <div>
            <h2 className="text-xl border-b-2 border-green-500 pb-2 mb-4">CONNECT</h2>
            <div className="space-y-4">
              <div className="border border-green-600 p-4">
                <a href="https://github.com/Jose47Morales" target="_blank">
                  <div className="text-green-500 mb-2">GitHub</div>
                  <div className="text-xs">https://github.com/Jose47Morales</div>
                </a>
              </div>
              <div className="border border-green-600 p-4">
                <a href="https://www.linkedin.com/in/jose-alberto-morales-leon-963935346" target="_blank">
                  <div className="text-green-500 mb-2">LinkedIn</div>
                  <div className="text-xs">https://www.linkedin.com/in/jose-alberto-morales-leon-963935346</div>
                </a>
              </div>
              <div className="border border-green-600 p-4">
                <a href="mailto:josemoralesleon58@gmail.com" target="_blank">
                  <div className="text-green-500 mb-2">Email</div>
                  <div className="text-xs">josemoralesleon58@gmail.com</div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBar = ({ currentFile }) => {
  return (
    <div className="flex justify-between items-center px-4 py-1 border-t border-cyan-600 text-cyan-400 font-mono text-xs bg-black">
      <span>X: 0.00   Y: 0.00</span>
      <span>FILE: {currentFile}</span>
      <span>VIEWING PROFILE</span>
      <span>LAST SAVE: 2025</span>
      <span className="border border-green-500 px-2 text-green-500">READY</span>
    </div>
  );
};

export default function App() {
  const [currentFile, setCurrentFile] = useState("ABOUT.sketch");

  return (
    <div className="bg-black h-screen flex flex-col">
      <SystemInfo />
      <div className="flex flex-1 overflow-hidden">
        <DrawingTools />
        <PortfolioNav currentFile={currentFile} setCurrentFile={setCurrentFile} />
        <ContentArea currentFile={currentFile} />
      </div>
      <StatusBar currentFile={currentFile} />
    </div>
  );
}