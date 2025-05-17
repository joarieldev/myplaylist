export interface IVisualizer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  analyserNode: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
  capPositions: number[];
}

export const lineWave = (vis: IVisualizer) => {
  vis.analyserNode.getByteTimeDomainData(vis.dataArray);

  vis.ctx.clearRect(0, 0, vis.canvas.width, vis.canvas.height);
  vis.ctx.lineWidth = 2;
  vis.ctx.strokeStyle = "white";

  vis.ctx.beginPath();

  const sliceWidth = vis.canvas.width / vis.bufferLength;
  let x = 0;

  for (let i = 0; i < vis.bufferLength; i++) {
    const v = vis.dataArray[i] / 128.0;
    const y = (v * vis.canvas.height) / 2;

    if (i === 0) {
      vis.ctx.moveTo(x, y);
    } else {
      vis.ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  vis.ctx.lineTo(vis.canvas.width, vis.canvas.height / 2);
  vis.ctx.stroke();
}

export const lineWaveChill = (vis: IVisualizer) => {
  vis.analyserNode.getByteFrequencyData(vis.dataArray);
  vis.ctx.clearRect(0, 0, vis.canvas.width, vis.canvas.height);

  const centerY = vis.canvas.height / 2;
  const amplitudeFactor = 0.5;

  vis.ctx.beginPath();
  vis.ctx.moveTo(0, vis.canvas.height / 2);

  for (let i = 0; i < vis.bufferLength; i++) {
    const value = vis.dataArray[i] / 256;
    const amplitude = value * amplitudeFactor * vis.canvas.height;
    const x = (i / vis.bufferLength) * vis.canvas.width;
    const y = centerY + Math.sin(x * 0.05 + Date.now() * 0.002) * amplitude;

    vis.ctx.lineTo(x, y);

    vis.ctx.strokeStyle = "cyan";
  }

  vis.ctx.lineWidth = 3;
  vis.ctx.stroke();
}

export const spectrumCenter = (vis: IVisualizer) => {
  vis.ctx.clearRect(0, 0, vis.canvas.width, vis.canvas.height);
  vis.analyserNode.getByteFrequencyData(vis.dataArray);

  const barWidth = (vis.canvas.width / vis.bufferLength) * 1.5;
  let barHeight;
  let x = 0;
  const initialHeight = 2;

  for (let i = 0; i < vis.bufferLength; i++) {
    barHeight = (vis.dataArray[i] / 256) * vis.canvas.height * 0.4 + initialHeight;
    vis.ctx.fillStyle = "white";
    vis.ctx.fillRect(x, vis.canvas.height / 2 - barHeight + 1, barWidth, barHeight);
    vis.ctx.fillRect(x, vis.canvas.height / 2, barWidth, barHeight);

    x += barWidth + 1;
  }
}

export const spectrumPlain = (vis: IVisualizer) => {
  vis.analyserNode.getByteFrequencyData(vis.dataArray);

  vis.ctx.clearRect(0, 0, vis.canvas.width, vis.canvas.height);
  const barWidth = (vis.canvas.width / vis.bufferLength) * 2;
  let barHeight;
  let x = 0;

  for (let i = 0; i < vis.bufferLength; i++) {
    barHeight = vis.dataArray[i];

    vis.ctx.fillStyle = `#C4D9FF`;
    vis.ctx.fillRect(x, vis.canvas.height - barHeight, barWidth, barHeight);

    const capHeight = 5;
    if (barHeight > vis.capPositions[i]) {
      vis.capPositions[i] = barHeight;
    } else {
      vis.capPositions[i] -= 2;
      if (vis.capPositions[i] < 0) vis.capPositions[i] = 0;
    }
    vis.ctx.fillStyle = `#E8F9FF`;
    vis.ctx.fillRect(
      x,
      vis.canvas.height - vis.capPositions[i] - capHeight,
      barWidth,
      capHeight
    );

    x += barWidth + 1;
  }
}

export const spectrumWide = (vis: IVisualizer) => {
  vis.analyserNode.getByteFrequencyData(vis.dataArray);

  vis.ctx.clearRect(0, 0, vis.canvas.width, vis.canvas.height);
  const barWidth = (vis.canvas.width / vis.bufferLength) * 2.5;
  let barHeight;
  let x = 0;
  const initialHeight = 20;
  const radius = 10;

  for (let i = 0; i < vis.bufferLength; i++) {
    barHeight = vis.dataArray[i] + initialHeight;
    const y = vis.canvas.height - barHeight;
    vis.ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
    vis.ctx.beginPath();
    vis.ctx.moveTo(x + radius, y);
    vis.ctx.lineTo(x + barWidth - radius, y);
    vis.ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
    vis.ctx.lineTo(x + barWidth, y + barHeight - radius);
    vis.ctx.quadraticCurveTo(
      x + barWidth,
      y + barHeight,
      x + barWidth - radius,
      y + barHeight
    );
    vis.ctx.lineTo(x + radius, y + barHeight);
    vis.ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius);
    vis.ctx.lineTo(x, y + radius);
    vis.ctx.quadraticCurveTo(x, y, x + radius, y);
    vis.ctx.closePath();
    vis.ctx.fill();

    x += barWidth + 1;
  }
}

export const circleSpectrum = (vis: IVisualizer) => {
  const centerX = vis.canvas.width / 2;
  const centerY = vis.canvas.height / 2;
  const radius = 150;
  const barWidth = 3;
  const initialHeight = 20;

  vis.analyserNode.getByteFrequencyData(vis.dataArray);

  vis.ctx.clearRect(0, 0, vis.canvas.width, vis.canvas.height);

  const angleStep = (2 * Math.PI) / vis.bufferLength;

  for (let i = 0; i < vis.bufferLength; i++) {
    const barHeight = vis.dataArray[i] + initialHeight;
    const angle = angleStep * i;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    vis.ctx.save();

    vis.ctx.translate(x, y);
    vis.ctx.rotate(angle);

    vis.ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
    vis.ctx.fillRect(-barWidth / 2, -barHeight, barWidth, barHeight);

    vis.ctx.restore();
  }
}

export const circleSpectrumSpring = (vis: IVisualizer) => {
  const defaultHeight = 0.01;
  vis.analyserNode.getByteFrequencyData(vis.dataArray);
  vis.ctx.clearRect(0, 0, vis.canvas.width, vis.canvas.height);

  const centerX = vis.canvas.width / 2;
  const centerY = vis.canvas.height / 2;

  const bassCount = 10;
  let bassSum = 0;
  for (let i = 0; i < bassCount; i++) {
    bassSum += vis.dataArray[i];
  }
  const bassAverage = bassSum / bassCount;
  const radius = 50 + (bassAverage / 255) * 100;

  const barCount = vis.bufferLength;
  const angleStep = (Math.PI * 3) / barCount;

  for (let i = 0; i < barCount; i++) {
    const value = vis.dataArray[i] ? vis.dataArray[i] / 426 : defaultHeight;
    const barLength = radius + (vis.canvas.height / 2) * value;
    const angle = i * angleStep;

    const x1 = centerX + Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    const x2 = centerX + Math.cos(angle) * barLength;
    const y2 = centerY + Math.sin(angle) * barLength;

    vis.ctx.strokeStyle = `hsl(${(i / barCount) * 360}, 100%, 50%)`;
    vis.ctx.lineWidth = 2;

    vis.ctx.beginPath();
    vis.ctx.moveTo(x1, y1);
    vis.ctx.lineTo(x2, y2);
    vis.ctx.stroke();
  }

  for (let i = 0; i < barCount; i++) {
    const value = vis.dataArray[i] ? vis.dataArray[i] / 426 : defaultHeight;
    const barLength = radius + (vis.canvas.height / 2) * value;
    const angle = i * angleStep;

    const x1 = centerX - Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    const x2 = centerX - Math.cos(angle) * barLength;
    const y2 = centerY + Math.sin(angle) * barLength;

    vis.ctx.strokeStyle = `hsl(${(i / barCount) * 360}, 100%, 50%)`;
    vis.ctx.lineWidth = 2;

    vis.ctx.beginPath();
    vis.ctx.moveTo(x1, y1);
    vis.ctx.lineTo(x2, y2);
    vis.ctx.stroke();
  }
}
