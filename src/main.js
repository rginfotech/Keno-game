const { createElement: h } = React;

const selectedNumbers = [13, 15, 17, 20, 24, 57, 65];
const drawnNumbers = [13, 15, 17, 19, 20, 24, 26, 27, 29, 36, 40, 46, 47, 49, 57, 59, 65, 68, 69, 70];
const hitNumbers = [13, 15, 17, 20, 24, 57, 65];
const hotPickNumbers = [19, 26, 27, 29, 36, 40, 59, 68, 69, 70];

function NeonFrame({ children, className = '', ...props }) {
  return h('div', { className: `neon-frame ${className}`, ...props }, children);
}

function KenoCell({ number }) {
  const isHit = hitNumbers.includes(number);
  const isSelected = selectedNumbers.includes(number);
  const isDrawn = drawnNumbers.includes(number);
  const isHot = hotPickNumbers.includes(number);
  const className = [
    'keno-cell',
    isSelected ? 'selected' : '',
    isHit ? 'hit' : '',
    isDrawn && !isSelected ? 'drawn' : '',
    isHot ? 'hot' : '',
  ].filter(Boolean).join(' ');

  return h(
    'button',
    {
      className,
      style: { '--spark-delay': `${(number % 8) * 0.21}s` },
      'aria-label': `Keno number ${number}`,
    },
    h('span', null, number),
  );
}

function KenoGrid() {
  return h(
    NeonFrame,
    { className: 'board-frame' },
    h(
      'div',
      { className: 'keno-grid' },
      Array.from({ length: 80 }, (_, index) => h(KenoCell, { key: index + 1, number: index + 1 })),
    ),
    h(WinnerBanner),
  );
}

function WinnerBanner() {
  return h(
    'section',
    { className: 'winner-banner', 'aria-live': 'polite' },
    h('div', { className: 'coin coin-one' }, '◉'),
    h('div', { className: 'coin coin-two' }, '◎'),
    h('div', { className: 'coin coin-three' }, '◉'),
    h('strong', null, 'Winner!'),
    h('span', { className: 'win-amount' }, '$ 4.00'),
    h('div', { className: 'coin coin-four' }, '◎'),
  );
}

function DrawnBall({ number, index }) {
  return h(
    'div',
    { className: 'drawn-ball', style: { '--drop-index': index } },
    h('span', null, number),
  );
}

function DrawnNumbersPanel() {
  return h(
    NeonFrame,
    { className: 'draw-panel', 'aria-label': 'Opened keno numbers' },
    drawnNumbers.map((number, index) => h(DrawnBall, { key: number, number, index })),
  );
}

function StatRow({ label, value, accent = 'green' }) {
  return h(
    'div',
    { className: 'stat-row' },
    h('span', { className: `stat-label ${accent}` }, label),
    h('strong', null, value),
  );
}

function ActionButton({ children, color = 'orange', className = '' }) {
  return h('button', { className: `action-button ${color} ${className}` }, h('span', null, children));
}

function ControlPanel() {
  return h(
    NeonFrame,
    { className: 'control-panel' },
    h('div', { className: 'brand-card' }, h('h1', null, 'TouchEasy Keno')),
    h(
      'div',
      { className: 'top-actions' },
      h(ActionButton, null, 'Help'),
      h(ActionButton, null, ['Exit', h('br', { key: 'br' }), 'Game']),
      h(
        'div',
        { className: 'pick-card' },
        h(StatRow, { label: 'Picks', value: '5', accent: 'blue' }),
        h(
          'div',
          { className: 'pay-table' },
          h('div', { className: 'pay-heading' }, h('span', null, 'Hits'), h('span', null, 'Pays')),
          h('div', null, h('span', null, '5 $'), h('strong', null, '170.00')),
          h('div', null, h('span', null, '4 $'), h('strong', null, '24.00')),
          h('div', null, h('span', null, '3 $'), h('strong', null, '2.00')),
          h('div', null, h('span', null, '2 $'), h('strong', null, '1.00')),
        ),
      ),
    ),
    h(
      'div',
      { className: 'money-panel' },
      h(StatRow, { label: 'Cash $', value: '4.00' }),
      h(StatRow, { label: 'Bet $', value: '1.00', accent: 'gold' }),
      h(StatRow, { label: 'Wins $', value: '4.00', accent: 'blue' }),
    ),
    h(
      'div',
      { className: 'button-grid' },
      h(ActionButton, { color: 'pink' }, ['Wipe', h('br', { key: 'br' }), 'Card']),
      h(ActionButton, null, ['⇧⇧', h('br', { key: 'br' }), 'Bet']),
      h(ActionButton, { color: 'cyan' }, ['Quick', h('br', { key: 'br' }), 'Pick']),
      h(ActionButton, null, ['Bet', h('br', { key: 'br' }), '⇩⇩']),
    ),
    h(ActionButton, { color: 'magenta', className: 'play-button' }, 'Play Game'),
  );
}

function App() {
  return h(
    'main',
    { className: 'game-shell' },
    h('div', { className: 'aurora aurora-one' }),
    h('div', { className: 'aurora aurora-two' }),
    h(KenoGrid),
    h(DrawnNumbersPanel),
    h(ControlPanel),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
