// 第一個角色（資料夾 `1/all.png`，11 幀）
let sprite1;
const FRAME_COUNT1 = 11;
let currentFrame1 = 0;
let lastFrameTime1 = 0;
let frameW1 = 0, frameH1 = 0;
const SCALE1 = 2;

// 第二個角色（資料夾 `2/all.png`，7 幀）
// 根據圖片 `2/all.png`，實際影格數為 6
const SPRITE2_FRAMES = 6;

let sprite2;
const FRAME_COUNT2 = SPRITE2_FRAMES;
let currentFrame2 = 0;
let lastFrameTime2 = 0;
let frameW2 = 0, frameH2 = 0;
const SCALE2 = 2;
// 只使用走路的影格 (第1和第5個) 來創造連續走路的動畫
const FRAME_INTERVAL = 200; // ms per frame (5 FPS)
const GAP = 50; // 兩個角色之間間距

let isAnimating = false; // 動畫預設為暫停

function preload() {
  // 載入兩個精靈圖
  sprite1 = loadImage('1/all.png');
  sprite2 = loadImage('2/all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (sprite1) {
    // 根據使用者指定，將單張圖片寬度設為 70
    frameW1 = 70;
    frameH1 = sprite1.height;
  }
  if (sprite2) {
    frameW2 = sprite2.width / FRAME_COUNT2;
    frameH2 = sprite2.height;
  }

  imageMode(CENTER);
  noSmooth();
}

function draw() {
  background('#d8e1e9');

  const has1 = !!sprite1 && frameW1 > 0 && frameH1 > 0;
  const has2 = !!sprite2 && frameW2 > 0 && frameH2 > 0;

  if (!has1 && !has2) {
    push();
    fill(80);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('找不到 `1/all.png` 與 `2/all.png`，請把精靈圖放到資料夾 `1` 與 `2` 中。', width/2, height/2);
    pop();
    return;
  }

  // 只有在 isAnimating 為 true 時才更新動畫幀
  if (isAnimating) {
    // 更新第一個角色幀
    if (has1 && millis() - lastFrameTime1 > FRAME_INTERVAL) {
      currentFrame1 = (currentFrame1 + 1) % FRAME_COUNT1;
      lastFrameTime1 = millis();
    }

    // 更新第二個角色幀
    if (has2 && millis() - lastFrameTime2 > FRAME_INTERVAL) {
      currentFrame2 = (currentFrame2 + 1) % FRAME_COUNT2;
      lastFrameTime2 = millis();
    }
  }

  // 計算繪製尺寸
  const dw1 = has1 ? frameW1 * SCALE1 : 0;
  const dh1 = has1 ? frameH1 * SCALE1 : 0;
  const dw2 = has2 ? frameW2 * SCALE2 : 0;
  const dh2 = has2 ? frameH2 * SCALE2 : 0;

  if (has1 && has2) {
    // 兩個角色一起置中，水平間距為 GAP
    const groupWidth = dw1 + GAP + dw2;
    const x1 = width/2 - groupWidth/2 + dw1/2;
    const x2 = x1 + dw1/2 + GAP + dw2/2;
    const y = height/2;

    const sx1 = currentFrame1 * frameW1; // 角色1使用原始的 currentFrame1
    const sx2 = currentFrame2 * frameW2;
    image(sprite1, x1, y, dw1, dh1, sx1, 0, frameW1, frameH1);
    image(sprite2, x2, y, dw2, dh2, sx2, 0, frameW2, frameH2);
    return;
  }

  // 若只存在其中一個，則單獨置中顯示
  if (has1) {
    const sx1 = currentFrame1 * frameW1;
    image(sprite1, width/2, height/2, dw1, dh1, sx1, 0, frameW1, frameH1);
    return;
  }
  if (has2) {
    const sx2 = currentFrame2 * frameW2;
    image(sprite2, width/2, height/2, dw2, dh2, sx2, 0, frameW2, frameH2);
    return;
  }
}

function mousePressed() {
  // 切換動畫播放/暫停狀態
  isAnimating = !isAnimating;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
