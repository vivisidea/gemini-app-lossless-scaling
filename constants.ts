export const TEXT_CONTENT = {
  title: "Lossless Scaling (LSFG) 技术演示",
  subtitle: "揭秘“小黄鸭”补帧技术背后的原理",
  intro: "Lossless Scaling Frame Generation (LSFG) 是一种利用机器学习在两个渲染帧之间生成全新中间帧的技术。不同于 DLSS 或 FSR，它是一个独立的后处理方案。",
  
  sim_title: "LSFG 实时模拟",
  sim_desc: "观察下方物体移动。开启 LSFG 后，系统会根据前后两帧的图像分析，预测并在中间插入生成的帧（黄色），从而提升视觉流畅度。",
  
  pipeline_title: "工作原理：屏幕叠加 (Overlay)",
  pipeline_desc: "LSFG 不读取游戏引擎内部数据（如运动矢量），而是像录屏软件一样捕获画面，进行后处理后再覆盖到屏幕上。",
  
  features_title: "核心特性与局限",
};

export const COLORS = {
  realFrame: "bg-blue-500",
  genFrame: "bg-yellow-400",
  background: "bg-slate-900",
  card: "bg-slate-800",
};
