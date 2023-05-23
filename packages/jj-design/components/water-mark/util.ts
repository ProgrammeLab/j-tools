export function rotateCvs(ctx: CanvasRenderingContext2D, degree: number, width: number) {
  // 改变 rotate 中心点
  ctx.translate(width / 2, width / 2);
  ctx.rotate((Math.PI / 180) * degree);
  ctx.translate(-width / 2, -width / 2);
}

export function calculateWidth(text: string, fontSize: number = 14) {
  const basePadding = 20;
  return Boolean(text.length) ? text.length * fontSize + basePadding : basePadding + fontSize;
}

export function getCenterPoint(text: string, fontSize: number = 14): [x: number, y: number] {
  const width = calculateWidth(text, fontSize);
  return [width / 2, width / 2];
}
