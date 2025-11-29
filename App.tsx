import React from 'react';
import { TEXT_CONTENT } from './constants';
import SimulationDemo from './components/SimulationDemo';
import PipelineCard from './components/PipelineCard';
import FeatureGrid from './components/FeatureGrid';
import { Github, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 selection:bg-cyan-500 selection:text-white">
      {/* Hero Section */}
      <header className="relative pt-20 pb-12 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full -z-10"></div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight">
          Lossless Scaling
        </h1>
        <h2 className="text-xl md:text-2xl text-slate-400 font-medium mb-8">
          LSFG Frame Generation Tech Demo
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          {TEXT_CONTENT.intro}
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Interactive Demo */}
        <section id="demo" className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{TEXT_CONTENT.sim_title}</h2>
            <p className="text-slate-400">{TEXT_CONTENT.sim_desc}</p>
          </div>
          <SimulationDemo />
        </section>

        {/* Technical Pipeline */}
        <section id="how-it-works">
           <div className="text-center mb-10">
             <h2 className="text-3xl font-bold text-white mb-4">技术原理</h2>
             <p className="text-slate-400 max-w-3xl mx-auto">
               LSFG 是如何做到在没有游戏源代码访问权限的情况下实现补帧的？
             </p>
           </div>
           <PipelineCard />
        </section>

        {/* Features Grid */}
        <section id="features">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-slate-800"></div>
                <h2 className="text-2xl font-bold text-white">核心特性与局限分析</h2>
                <div className="h-px flex-1 bg-slate-800"></div>
            </div>
            <FeatureGrid />
        </section>

        {/* Best Use Case / Summary */}
        <section className="mb-20 p-8 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">什么时候使用 LSFG?</h3>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h4 className="text-green-400 font-bold mb-2 uppercase text-sm tracking-wider">推荐场景</h4>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                        <li>基础帧率稳定在 40 FPS 以上的游戏</li>
                        <li>慢节奏的 RPG、模拟经营或策略游戏</li>
                        <li>模拟器 (Switch/PS3) 锁 30 FPS 的游戏</li>
                        <li>观看低帧率视频或动漫</li>
                    </ul>
                </div>
                <div className="w-px bg-slate-700 hidden md:block"></div>
                <div className="flex-1">
                    <h4 className="text-red-400 font-bold mb-2 uppercase text-sm tracking-wider">不推荐场景</h4>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                        <li>基础帧率非常低 (低于 30 FPS)</li>
                        <li>竞技类 FPS (CS:GO, Valorant) - 延迟影响大</li>
                        <li>画面含有大量快速滚动的文本或复杂 UI</li>
                        <li>鼠标移动非常剧烈的场景</li>
                    </ul>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-8 border-t border-slate-800 bg-[#0b1120] text-center">
        <p className="text-slate-500 text-sm">
          Generated for educational purposes based on Lossless Scaling technical documentation.
        </p>
      </footer>
    </div>
  );
};

export default App;
