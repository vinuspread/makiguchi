const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const atImport = require("postcss-import");

const inputPath = path.resolve("./css/main.css"); // 변환전 상대경로
const outputPath = path.resolve("./css/style.css"); // 변환후 상대경로

if (!fs.existsSync("css")) {
  fs.mkdirSync("css", { recursive: true });
}

// CSS 파일 읽기
const css = fs.readFileSync(inputPath, "utf8");

// postcss 실행
postcss()
  .use(atImport())
  .process(css, {
    from: inputPath,
  })
  .then((result) => {
    fs.writeFileSync(outputPath, result.css);
    console.log(`✅ CSS 병합 완료: ${outputPath}`);
  })
  .catch((err) => console.error("❌ 오류 발생:", err));
