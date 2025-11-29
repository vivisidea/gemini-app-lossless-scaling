import React from 'react';
import { MonitorSmartphone, Zap, AlertTriangle, Clock } from 'lucide-react';

const FeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 transition group">
            <MonitorSmartphone className="text-cyan-400 mb-3 group-hover:scale-110 transition" size={32} />
            <h3 className="font-bold text-white mb-2">通用兼容性</h3>
            <p className="text-sm text-slate-400">
                支持几乎所有能窗口化运行的 DX11/12 游戏、模拟器甚至视频播放器。
            </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-green-500 transition group">
            <Zap className="text-green-400 mb-3 group-hover:scale-110 transition" size={32} />
            <h3 className="font-bold text-white mb-2">硬件无关性</h3>
            <p className="text-sm text-slate-400">
                无需特定 Tensor Core。支持 NVIDIA、AMD、Intel 等各类 GPU 硬件。
            </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-yellow-500 transition group">
            <AlertTriangle className="text-yellow-400 mb-3 group-hover:scale-110 transition" size={32} />
            <h3 className="font-bold text-white mb-2">视觉伪影</h3>
            <p className="text-sm text-slate-400">
                由于缺乏真实运动数据，快速移动或复杂 UI 可能产生鬼影或扭曲。
            </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-red-500 transition group">
            <Clock className="text-red-400 mb-3 group-hover:scale-110 transition" size={32} />
            <h3 className="font-bold text-white mb-2">输入延迟</h3>
            <p className="text-sm text-slate-400">
                后处理需要时间。虽然看着流畅，但操作响应会略微变慢。
            </p>
        </div>
    </div>
  );
};

export default FeatureGrid;
