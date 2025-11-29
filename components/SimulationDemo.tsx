import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Info, Monitor, Zap, Ghost } from 'lucide-react';

const SimulationDemo: React.FC = () => {
  // Configuration State
  const [lsfgEnabled, setLsfgEnabled] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Render State (updated by loop for React UI)
  const [renderState, setRenderState] = useState({
    pos: 50,
    ghostPos: 50,
    isGen: false,
    fps: 0
  });

  // Refs for Animation Loop Logic (Mutable)
  const configRef = useRef({ lsfgEnabled, slowMotion, isPlaying });
  const stateRef = useRef({
    lastTime: 0,
    phase: 0,
    lastNativeUpdate: 0,
    nativePos: 50,
    frameCount: 0,
    lastFpsTime: 0,
    currentFps: 0
  });
  const requestRef = useRef<number>(0);

  // Sync state to ref for the loop
  useEffect(() => {
    configRef.current = { lsfgEnabled, slowMotion, isPlaying };
  }, [lsfgEnabled, slowMotion, isPlaying]);

  const animate = (time: number) => {
    const { lsfgEnabled, slowMotion, isPlaying } = configRef.current;
    const state = stateRef.current;

    if (!isPlaying) {
      state.lastTime = time;
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    // Calculate Delta
    const rawDelta = time - (state.lastTime || time);
    state.lastTime = time;
    
    // Apply Slow Motion to Physics
    // If slow motion, physics moves 5x slower
    const timeScale = slowMotion ? 0.2 : 1.0;
    state.phase += rawDelta * timeScale;

    // --- 1. Physics Layer (True Movement) ---
    // A simple Sine wave: Center 50%, Amplitude 40%
    const frequency = 0.002; 
    const truePos = 50 + 40 * Math.sin(state.phase * frequency);

    // --- 2. Native Game Layer (Low FPS) ---
    // Simulates the game engine rendering at a fixed low framerate (e.g., 15 FPS)
    // We keep this constant regardless of slow motion to visually exaggerate the "stutter" 
    // relative to the movement.
    const NATIVE_FPS = 12; 
    const NATIVE_INTERVAL = 1000 / NATIVE_FPS;
    
    // If slow motion is on, we also slow down the native update rate visually 
    // so the "Jump" happens in sync with the slowed movement? 
    // No, to best demo LSFG, we want to see the *gap* between frames.
    // Let's simply check if enough Real Time has passed to trigger a "Game Frame".
    // But if we slow down time, the Game FPS should theoretically also drop if strictly simulated?
    // Let's scale interval by 1/timeScale to keep "Game Frames per Unit of Movement" constant.
    // This ensures the "Choppiness" looks consistent.
    const effectiveInterval = NATIVE_INTERVAL / timeScale; 

    if (time - state.lastNativeUpdate > effectiveInterval) {
      state.lastNativeUpdate = time;
      state.nativePos = truePos; // The game snaps to current physics
    }

    // --- 3. Render Layer (Display) ---
    let finalPos = 0;
    let isGenerated = false;

    if (lsfgEnabled) {
      // LSFG Mode: We output at Monitor Refresh Rate (High FPS)
      // Ideally LSFG introduces latency, but for this visual demo:
      // We show smooth motion (truePos) vs the choppy ghost (nativePos).
      finalPos = truePos;
      
      // Visual check: Are we near a native update?
      // If the displayed pos is significantly different from the last native render, it's "Generated"
      const diff = Math.abs(finalPos - state.nativePos);
      isGenerated = diff > 0.5; // Threshold
    } else {
      // Native Mode: We only show what the game renders
      finalPos = state.nativePos;
      isGenerated = false;
    }

    // FPS Counter Logic
    state.frameCount++;
    if (time - state.lastFpsTime >= 1000) {
        // If LSFG is OFF, our "Effective" FPS seen by user is NATIVE_FPS (even if screen refreshes 60 times)
        // If LSFG is ON, it is Monitor FPS (approx 60)
        // But to be accurate to the browser loop:
        state.currentFps = lsfgEnabled 
            ? Math.round(state.frameCount * 1000 / (time - state.lastFpsTime)) 
            : Math.round(NATIVE_FPS * timeScale); // Simulated number
        state.frameCount = 0;
        state.lastFpsTime = time;
    }

    // Update React State for rendering
    setRenderState({
        pos: finalPos,
        ghostPos: state.nativePos,
        isGen: isGenerated,
        fps: state.currentFps || (lsfgEnabled ? 60 : Math.round(NATIVE_FPS * timeScale))
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Monitor className={lsfgEnabled ? "text-yellow-400" : "text-blue-400"} />
                LSFG 实时模拟器
            </h2>
            <p className="text-xs text-slate-400 mt-1">
               {lsfgEnabled ? "模式: LSFG (补帧开启)" : "模式: 原生渲染 (低帧率)"}
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
             <div className="text-right px-2">
                 <div className="text-[10px] text-slate-400 uppercase tracking-wider">Display FPS</div>
                 <div className={`text-xl font-mono font-bold leading-none ${lsfgEnabled ? 'text-yellow-400' : 'text-blue-500'}`}>
                    {renderState.fps}
                 </div>
             </div>
             <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-md bg-slate-700 hover:bg-slate-600 transition active:scale-95"
             >
                {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white" />}
             </button>
          </div>
        </div>

        {/* Screen Area */}
        <div className="relative w-full h-56 bg-[#050914] rounded-xl overflow-hidden border-2 border-slate-700 mb-8 shadow-inner">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                    backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                 }}>
            </div>
            
            {/* Axis Line */}
            <div className="absolute top-1/2 w-full h-px bg-slate-800/50"></div>

            {/* 1. Ghost / Native Frame (Always visible in LSFG mode to show the difference) */}
            {lsfgEnabled && (
                <div 
                    className="absolute top-1/2 -translate-y-1/2 w-14 h-14 border-2 border-dashed border-blue-500/40 rounded-xl flex items-center justify-center grayscale opacity-60 z-0"
                    style={{ left: `${renderState.ghostPos}%`, transition: 'none' }} // No CSS transition, we want raw snap
                >
                   <Ghost size={20} className="text-blue-500/50" />
                </div>
            )}

            {/* 2. Main Display Object */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.6)] z-10
                transition-colors duration-100
                ${lsfgEnabled 
                    ? (renderState.isGen ? 'bg-yellow-400 shadow-yellow-400/20' : 'bg-blue-500') 
                    : 'bg-blue-600'
                }
              `}
              style={{ 
                  left: `${renderState.pos}%`, 
                  // In native mode, no CSS transition to show stutter. In LSFG, linear update from loop is smooth enough, 
                  // but adding a tiny transition smooths out browser jitter.
                  transition: 'none' 
              }}
            >
              {lsfgEnabled && renderState.isGen ? (
                  <>
                    <Zap size={20} className="text-black animate-pulse" fill="currentColor" />
                    <span className="text-[9px] font-black text-black/70 leading-none mt-0.5">AI</span>
                  </>
              ) : (
                  <>
                    <div className="w-3 h-3 bg-white rounded-full mb-1"></div>
                    <span className="text-[9px] font-bold text-white/90 leading-none">GPU</span>
                  </>
              )}
            </div>
            
            {/* Labels */}
            <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-500 flex gap-4">
               <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                  <span>原生帧 (Native)</span>
               </div>
               {lsfgEnabled && (
                   <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-sm"></div>
                      <span>生成帧 (LSFG)</span>
                   </div>
               )}
            </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Toggle Switch LSFG */}
          <div 
            onClick={() => setLsfgEnabled(!lsfgEnabled)}
            className={`cursor-pointer group relative overflow-hidden rounded-xl p-4 border transition-all duration-300
                ${lsfgEnabled ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}
            `}
          >
             <div className="flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                    <span className={`font-bold text-lg ${lsfgEnabled ? 'text-cyan-400' : 'text-slate-300'}`}>
                        LSFG 补帧
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                        {lsfgEnabled ? "已开启 (模拟 60 FPS)" : "已关闭 (模拟 12 FPS)"}
                    </span>
                </div>
                <div className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors duration-300 ${lsfgEnabled ? 'bg-cyan-500' : 'bg-slate-600'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${lsfgEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
             </div>
             {/* Background Glow */}
             {lsfgEnabled && <div className="absolute inset-0 bg-cyan-500/5 blur-xl"></div>}
          </div>

          {/* Toggle Switch Slow Motion */}
          <div 
            onClick={() => setSlowMotion(!slowMotion)}
            className={`cursor-pointer group relative overflow-hidden rounded-xl p-4 border transition-all duration-300
                ${slowMotion ? 'bg-indigo-900/20 border-indigo-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}
            `}
          >
             <div className="flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                    <span className={`font-bold text-lg ${slowMotion ? 'text-indigo-400' : 'text-slate-300'}`}>
                        慢动作分析
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                        {slowMotion ? "速度: 20%" : "速度: 100%"}
                    </span>
                </div>
                 <div className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors duration-300 ${slowMotion ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${slowMotion ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="mt-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex gap-3 text-sm text-slate-300">
             <Info className="shrink-0 text-cyan-400 mt-0.5" size={18} />
             <div>
               {lsfgEnabled ? (
                 <p>
                   <strong className="text-yellow-400">正在运行 LSFG 模式：</strong> 
                   注意观察 <span className="text-blue-400 font-mono">[虚线框]</span> 代表原始渲染位置，而 <span className="text-yellow-400 font-mono">[实心方块]</span> 是屏幕实际显示的画面。
                   即使原始游戏很卡顿 (蓝框跳跃)，LSFG 也能通过预测生成中间帧 (变黄)，让移动看起来如丝般顺滑。
                 </p>
               ) : (
                 <p>
                   <strong className="text-blue-400">正在运行原生模式：</strong> 
                   这是游戏原本的样子。由于帧率较低（模拟 12 FPS），物体移动时会出现明显的“瞬移”或卡顿感。
                 </p>
               )}
             </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationDemo;