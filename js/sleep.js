// 🗓️ 这里填入你的早睡记录
// 格式："YYYY-MM-DD": "HH:MM" (24小时制)
const sleepRecords = {
  "2026-02-01": "",
  "2026-02-02": "",
  "2026-02-03": "",
  "2026-02-04": "",
  "2026-02-05": "04:00",
  "2026-02-06": "00:00",
  "2026-02-07": ""
  // 每天起床后，来这里加一行，然后 hexo d 部署即可
};

function generateSleepMap() {
  const target = document.getElementById('recent-posts');
  if (!target) return;
  if (document.getElementById('sleep-calendar-card')) return;

  // 1. 获取当月数据
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = `${year}年 ${month + 1}月`;

  // 2. 创建卡片 HTML
  // 核心修改：
  // (1) 使用 afterbegin 插入到内部
  // (2) width: 100% !important 强制满宽
  // (3) order: -1 确保它永远在第一个
  const cardHtml = `
    <div id="sleep-calendar-card" style="width: 100% !important; flex: 0 0 100% !important; max-width: 100% !important; margin-bottom: 20px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06); text-align: center; box-sizing: border-box; order: -1;">
      <div class="sleep-title" style="font-weight: bold; font-size: 1.2em; margin-bottom: 15px; color: #4c4948;">
        💤 早睡记录 <span style="font-size:0.8em; color:#999; margin-left:10px;">(${monthLabel})</span>
      </div>
      <div id="sleep-grid-container" class="sleep-grid" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 6px;"></div>
    </div>
  `;

  // 3. 改为插入到 target 的【内部最前面】(afterbegin)
  // 这样它就变成了文章列表的大哥，而不是外人
  target.insertAdjacentHTML('afterbegin', cardHtml);

  // 4. 生成格子
  const container = document.getElementById('sleep-grid-container');
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const timeStr = sleepRecords[dateStr];
    
    let levelClass = '';
    if (timeStr) {
      const hour = parseInt(timeStr.split(':')[0]);
      if (hour >= 21 && hour < 23) levelClass = 'level-perfect';
      else if (hour >= 23 && hour < 24) levelClass = 'level-good';
      else if (hour >= 0 && hour < 1) levelClass = 'level-late';
      else levelClass = 'level-bad';
    } else {
      // 没到的日子，给个透明度或者浅色，区分开
      // 这里我不加 class，就让它显示默认灰色，但你可以加上 style="opacity: 0.3"
    }

    const dayDiv = document.createElement('div');
    dayDiv.className = `sleep-day ${levelClass}`;
    if (!timeStr) dayDiv.style.opacity = "0.4"; // 让未来的日子变淡
    
    dayDiv.setAttribute('data-date', `${month + 1}月${day}日`);
    dayDiv.setAttribute('data-time', timeStr ? `入睡: ${timeStr}` : '未记录');
    dayDiv.style.width = "18px";
    dayDiv.style.height = "18px";
    
    container.appendChild(dayDiv);
  }
}

document.addEventListener('DOMContentLoaded', generateSleepMap);
document.addEventListener('pjax:complete', generateSleepMap);