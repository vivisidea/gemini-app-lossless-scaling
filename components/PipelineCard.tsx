import React from 'react';
import { Layers, Cpu, Monitor, Eye } from 'lucide-react';

const PipelineCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* Native Pipeline */}
        <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/30 opacity-50 hover:opacity-100 transition duration-300">
            <h3 className="text-xl font-bold text-slate-400 mb-4 flex items-center gap-2">
                <Cpu size={20} />
                传统 DLSS/FSR (原生)
            </h3>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-8 h-8 rounded bg-indigo-900 flex items-center justify-center font-bold">1</div>
                    <span>游戏引擎 (DX11/12)</span>
                </div>
                <div className="h-4 w-0.5 bg-slate-600 ml-4"></div>
                <div className="flex items-center gap-3 text-sm text-indigo-300">
                    <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-bold">2</div>
                    <span>读取内部运动矢量 (Motion Vectors)</span>
                </div>
                <div className="h-4 w-0.5 bg-slate-600 ml-4"></div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center font-bold">3</div>
                    <span>GPU 渲染 + 补帧</span>
                </div>
            </div>
        </div>

        {/* LSFG Pipeline */}
        <div className="p-6 rounded-xl border-2 border-cyan-500/30 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cyan-600 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">
                Lossless Scaling 方式
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Layers size={20} />
                LSFG (屏幕叠加)
            </h3>
            
            <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center font-bold border border-slate-500">1</div>
                    <span className="flex-1">任何窗口化游戏 / 播放器 / 模拟器</span>
                </div>
                
                <div className="h-6 w-0.5 bg-gradient-to-b from-slate-500 to-yellow-500 ml-4"></div>

                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                    <div className="w-8 h-8 rounded bg-yellow-600/20 border border-yellow-500 flex items-center justify-center font-bold text-yellow-500">2</div>
                    <div className="flex-1 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                        图像捕获 + ML 分析
                        <div className="text-xs font-normal text-yellow-200/70 mt-1">
                           猜测运动方向 (无矢量数据)
                        </div>
                    </div>
                </div>

                <div className="h-6 w-0.5 bg-gradient-to-b from-yellow-500 to-cyan-500 ml-4"></div>

                <div className="flex items-center gap-3 text-sm text-cyan-300">
                    <div className="w-8 h-8 rounded bg-cyan-900 flex items-center justify-center font-bold border border-cyan-500">3</div>
                    <span className="flex-1">生成透明叠加层 (Overlay) 显示补帧</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PipelineCard;
