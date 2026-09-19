const poemLines = [
  "artık hatırlarken tek dinlediğim",
  "senin sesin olsun...",
  "tutamıyorum zamanı",
  "eriyen hatıralarda boğuluyorum",
  "her şeyi silip yatağa",
  "yatay geçiş yapacağım",
  "ne kadar kolay olsa zaten",
  "çoktan 12’den vurmuştum",
  "sonumuz deniz kenarı-",
  "kenarlarında bir ev olsun"
];

const processedPoem = [];
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

canvas.setAttribute("aria-hidden", "true");
canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.zIndex = "0";
canvas.style.pointerEvents = "none";
document.body.appendChild(canvas);

function addGif(source, alt, width, height, zIndex, left, top, className = "", objectFit = "cover") {
  const image = document.createElement("img");

  image.src = source;
  image.alt = alt;
  image.className = className;
  image.width = width;
  image.height = height;
  image.style.position = "fixed";
  image.style.left = `${left}px`;
  image.style.top = `${top}px`;
  image.style.width = `${width}px`;
  image.style.height = `${height}px`;
  image.style.objectFit = objectFit;
  image.style.zIndex = String(zIndex);
  image.style.pointerEvents = "none";
  document.body.appendChild(image);
}

function processPoem() {
  for (const line of poemLines) {
    let processedLine = "";

    for (const character of line) {
      const shouldObscure = character !== " " &&
        character !== "…" &&
        character !== "-" &&
        Math.random() < 0.15;

      processedLine += shouldObscure ? "█" : character;
    }

    processedPoem.push(processedLine);
  }
}

function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function drawPoem() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "white";
  context.font = "20px monospace";
  context.textAlign = "left";
  context.textBaseline = "top";

  const startX = window.innerWidth * 0.083;
  const startY = window.innerHeight * 0.32;
  const lineSpacing = 38;

  processedPoem.forEach((line, index) => {
    context.fillText(line, startX, startY + index * lineSpacing);
  });
}

function setup() {
  processPoem();
  addGif(
    "GIF from GIFER.gif",
    "background animation",
    window.innerWidth,
    window.innerHeight,
    -1,
    0,
    0
  );
  addGif(
    "animation-50.gif",
    "corner animation",
    900,
    900,
    10,
    Math.max(0, window.innerWidth - 900),
    60,
    "foreground-gif",
    "contain"
  );
  addGif(
    "chiikawa.png",
    "Chiikawa illustration",
    100,
    100,
    5,
    window.innerWidth * 0.083,
    Math.min(
      window.innerHeight * 0.32 + poemLines.length * 38 + 10,
      window.innerHeight - 110
    ),
    "poem-image",
    "contain"
  );
  addGif("animation-48.gif", "top left animation", 150, 150, 1, 15, 15);
  resizeCanvas();
  drawPoem();
}

window.addEventListener("resize", () => {
  resizeCanvas();
  drawPoem();
});

setup();
