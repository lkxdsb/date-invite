const steps = [...document.querySelectorAll('.step')];
const progress = document.getElementById('progress');
const sticker = document.getElementById('sticker');

const state = {
  available: '',
  invite: '',
  food: '',
  activity: '',
  time: ''
};

let currentStep = 1;
let hesitateCount = 0;

const stickers = {
  1: 'assets/bear.svg',
  2: 'assets/bunny.svg',
  3: 'assets/bear-food.svg',
  4: 'assets/bunny-star.svg',
  5: 'assets/bear-clock.svg',
  6: 'assets/together.svg'
};

function showStep(step) {
  currentStep = step;
  steps.forEach(el => el.classList.toggle('active', Number(el.dataset.step) === step));
  progress.textContent = `${step} / 6`;
  sticker.src = stickers[step];
  sticker.classList.remove('pop');
  requestAnimationFrame(() => sticker.classList.add('pop'));

  if (step === 6) celebrate();
}

function nextStep() {
  if (currentStep < 6) showStep(currentStep + 1);
}

function updateLoveCard() {
  document.getElementById('ticketFood').textContent = state.food || '小黄安排';
  document.getElementById('ticketActivity').textContent = state.activity || '秘密安排';
  document.getElementById('ticketTime').textContent = state.time || '到时候见';
}

function celebrate() {
  const symbols = ['♡', '✦', '✿'];
  for (let i = 0; i < 14; i += 1) {
    const piece = document.createElement('span');
    piece.textContent = symbols[i % symbols.length];
    piece.style.position = 'fixed';
    piece.style.zIndex = '99';
    piece.style.left = `${12 + Math.random() * 76}vw`;
    piece.style.top = '-20px';
    piece.style.color = i % 2 ? '#e994aa' : '#d7ad68';
    piece.style.fontSize = `${12 + Math.random() * 13}px`;
    piece.style.pointerEvents = 'none';
    piece.style.transition = `transform ${1.8 + Math.random()}s ease-out, opacity 2.2s ease`;
    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform = `translate(${(Math.random() - .5) * 120}px, ${65 + Math.random() * 75}vh) rotate(${Math.random() * 260}deg)`;
      piece.style.opacity = '0';
    });

    setTimeout(() => piece.remove(), 2800);
  }
}

steps.forEach(step => {
  step.addEventListener('click', (e) => {
    const btn = e.target.closest('.choice');
    if (!btn || btn.id === 'restartBtn') return;

    const value = btn.dataset.value;
    const stepNo = Number(step.dataset.step);

    if (btn.id === 'hesitateBtn') {
      hesitateCount += 1;
      const tip = document.getElementById('hesitateTip');
      const texts = [
        '没关系，小黄可以等你慢慢想 ♡',
        '答案不用急，我只是想让你知道我很期待。',
        '那就先把这个小邀请放在这里，等你想好了再点“好呀”。'
      ];
      tip.textContent = texts[Math.min(hesitateCount - 1, texts.length - 1)];
      return;
    }

    if (stepNo === 1) state.available = value;
    if (stepNo === 2) state.invite = value;
    if (stepNo === 3) state.food = value;
    if (stepNo === 4) state.activity = value;
    if (stepNo === 5) {
      state.time = value;
      updateLoveCard();
    }

    nextStep();
  });
});

document.getElementById('restartBtn').addEventListener('click', () => {
  state.available = '';
  state.invite = '';
  state.food = '';
  state.activity = '';
  state.time = '';
  hesitateCount = 0;
  document.getElementById('hesitateTip').textContent = '';
  showStep(1);
});
