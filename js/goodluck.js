// 每次页面加载或 Pjax 跳转完成后执行
document.addEventListener('pjax:complete', initGoodLuck);
document.addEventListener('DOMContentLoaded', initGoodLuck);

function initGoodLuck() {
  // 1. 找到 Butterfly 主题作者卡片里的按钮
  const btn = document.getElementById('card-info-btn');
  if (!btn) return;

  // 2. 防止刷新或跳转时重复添加
  if (document.getElementById('good-luck-counter')) return;

  // 3. 创建一个用来显示文字的 <div>
  const counterDiv = document.createElement('div');
  counterDiv.id = 'good-luck-counter';
  // 排版样式：居中、与按钮拉开一点距离
  counterDiv.style.textAlign = 'center';
  counterDiv.style.marginTop = '12px';
  counterDiv.style.fontSize = '14px';
  counterDiv.style.color = '#888';
  counterDiv.style.fontWeight = 'bold';

  // 4. 把这个 <div> 插到按钮的正下方
  btn.parentNode.insertBefore(counterDiv, btn.nextSibling);

  // 5. 从浏览器记忆中读取之前积攒的好运值（如果没有就是 0）
  let count = localStorage.getItem('myGoodLuckCount') || 0;
  
  // 渲染初始文字
  counterDiv.innerHTML = `🌟 已积攒 <span style="color: #ff5722; font-size: 16px;">${count}</span> 次好运`;

  // 6. 给按钮绑定点击事件
  btn.addEventListener('click', function(e) {
    e.preventDefault(); // 阻止按钮默认的跳转行为
    
    // 好运值 +1
    count++;
    
    // 把新的好运值存进浏览器
    localStorage.setItem('myGoodLuckCount', count);
    
    // 更新页面上的数字
    document.querySelector('#good-luck-counter span').innerText = count;

    // 添加一个极其微小的按钮按压反馈效果
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => { btn.style.transform = ''; }, 100);
  });
}