import React, { useState, useEffect } from "react";

// Top bar component
const SystemInfo = () => {
  const [time, setTime] = useState(new Date());
  const [cpu, setCpu] = useState(72);
  const [mem, setMem] = useState(72);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-green-600 text-green-400 font-mono text-sm">
      <span className="font-bold">JOSE47MORALES.PORTFOLIO v1.0</span>
      <div className="flex gap-4">
        <span>MEM: {mem}%</span>
        <span>CPU: {cpu}%</span>
        <span>TIME: {time.toLocaleTimeString()}</span>
        <span className="text-green-500">ONLINE</span>
      </div>
    </div>
  );
};

// Sidebar with tools and navigation
const Sidebar = ({ currentFile, setCurrentFile }) => {
  const files = ["ABOUT.sketch", "PROJECTS.sketch", "SKILLS.sketch", "CONTACT.sketch"];

  return (
    <div className="w-64 border-r border-green-600 p-2 text-green-400 font-mono text-sm">
      <h2 className="mb-2">PORTFOLIO</h2>
      <ul>
        {files.map((file) => (
          <li
            key={file}
            className={`cursor-pointer mb-1 px-2 py-1 ${currentFile === file ? "bg-green-600 text-black" : "hover:bg-green-800"}`}
            onClick={() => setCurrentFile(file)}
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Content area that changes depending on file selected
const FileViewer = ({ currentFile }) => {
  return (
    <div className="flex-1 p-4 text-green-400 font-mono text-sm">
      {currentFile === "ABOUT.sketch" && (
        <div>
          <h2 className="mb-2">JOSE MORALES</h2>
          <p>Systems Engineer</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Data Science + ML</li>
            <li>Computer Vision Enthusiast</li>
            <li>ML Diploma Certified</li>
            <li>Tech Event Assistant</li>
          </ul>
        </div>
      )}
      {currentFile === "PROJECTS.sketch" && (
        <div>
          <h2 className="mb-2">PROJECTS</h2>
          <p>- FlySmart: Flight route optimization platform</p>
          <p>- Game control with Computer Vision</p>
          <p>- Color Recognition with OpenCV</p>
        </div>
      )}
      {currentFile === "SKILLS.sketch" && (
        <div>
          <h2 className="mb-2">CORE STACK</h2>
          <ul>
            <li>Python 80%</li>
            <li>C++ 80%</li>
            <li>Java 60%</li>
            <li>R 70%</li>
            <li>OpenCV 60%</li>
            <li>TensorFlow 70%</li>
          </ul>
        </div>
      )}
      {currentFile === "CONTACT.sketch" && (
        <div>
          <h2 className="mb-2">CONNECT</h2>
          <p>- GitHub: github.com/Jose47Morales</p>
          <p>- LinkedIn: linkedin.com/in/jose-alberto-morales-leon-963935346</p>
          <p>- Email: josemoralesleon58@gmail.com</p>
        </div>
      )}
    </div>
  );
};

// Status bar bottom
const StatusBar = ({ currentFile }) => {
  return (
    <div className="flex justify-between items-center px-4 py-1 border-t border-green-600 text-green-400 font-mono text-xs">
      <span>X:0.00 Y:0.00</span>
      <span>FILE: {currentFile}</span>
      <span>READY</span>
    </div>
  );
};

// Main App
export default function App() {
  const [currentFile, setCurrentFile] = useState("ABOUT.sketch");

  return (
    <div className="bg-black h-screen flex flex-col">
      <SystemInfo />
      <div className="flex flex-1">
        <Sidebar currentFile={currentFile} setCurrentFile={setCurrentFile} />
        <FileViewer currentFile={currentFile} />
      </div>
      <StatusBar currentFile={currentFile} />
    </div>
  );
}

