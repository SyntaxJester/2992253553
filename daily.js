// daily.js - Modified to generate a block for insertion
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');

const indexFilePath = path.join(__dirname, 'quotation_index.txt');
const quotationsPath = path.join(__dirname, 'quotations.md');
const outputBlockPath = path.join(__dirname, 'daily_quotation_block.txt'); // 输出文件路径

function getCurrentIndex() {
  if (fs.existsSync(indexFilePath)) {
    return parseInt(fs.readFileSync(indexFilePath, 'utf-8'), 10);
  } else {
    return 0;
  }
}

function saveCurrentIndex(index) {
  fs.writeFileSync(indexFilePath, index.toString());
}

function run() {
  try {
    // 1. 读取 quotations.md 并选择每日一言
    const quotation = fs.readFileSync(quotationsPath, 'utf-8');
    const quotations = quotation.split('\n').filter((it) => it.startsWith('-'));
    let currentIndex = getCurrentIndex();
    const daily = quotations[currentIndex];
    currentIndex = (currentIndex + 1) % quotations.length; // 更新索引
    saveCurrentIndex(currentIndex);

    // 2. 格式化日期
    const date = dayjs().locale('zh-cn').format('YYYY-MM-DD');

    // 3. 构建要插入的完整内容块
    // 注意：这里生成的内容块格式是为插入到 "很高兴认识你" (紧跟在 Privat5418的GitHub页面 之后) 之前设计的
    // 它以一个换行符开头，以确保与前面的内容分开
    const newContentBlock = `\n<h4> <img src="https://github.com/2992253553/2992253553/blob/main/images/cat-roll.gif" width="28" /> <a href="https://github.com/2992253553/2992253553/blob/main/quotations.md"> 每日一言</a></h4>
<kbd>${date}</kbd>
${daily}\n`; // 以换行结尾，确保与后面的内容分开

    // 4. 将格式化后的内容写入临时文件
    fs.writeFileSync(outputBlockPath, newContentBlock);

    console.log('Generated daily quotation block successfully for insertion!');
    console.log('Content to be inserted:');
    console.log(newContentBlock);

  } catch (error) {
    console.log('Error in daily.js:', error.message);
  }
}

run();