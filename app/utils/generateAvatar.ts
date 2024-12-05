const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#1ABC9C', '#F1C40F'
];

const shapes = [
  // 圆形
  (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
    ctx.fill();
  },
  // 方形
  (ctx: CanvasRenderingContext2D, size: number) => {
    const padding = size / 4;
    ctx.fillRect(padding, padding, size - padding * 2, size - padding * 2);
  },
  // 三角形
  (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.beginPath();
    ctx.moveTo(size / 2, size / 4);
    ctx.lineTo(size / 4, size * 3 / 4);
    ctx.lineTo(size * 3 / 4, size * 3 / 4);
    ctx.closePath();
    ctx.fill();
  }
];

export const generateAvatar = (name: string): string => {
  // 创建 canvas
  const canvas = document.createElement('canvas');
  const size = 200;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // 设置背景色
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, size, size);

  // 根据名字生成随机但固定的数字
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // 选择颜色和形状
  const color = colors[Math.abs(hash) % colors.length];
  const shape = shapes[Math.abs(hash) % shapes.length];

  // 绘制形状
  ctx.fillStyle = color;
  shape(ctx, size);

  // 添加文字
  const initial = name.charAt(0).toUpperCase();
  ctx.fillStyle = '#ffffff';
  ctx.font = `${size / 3}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initial, size / 2, size / 2);

  // 转换为 base64
  return canvas.toDataURL('image/png');
}; 