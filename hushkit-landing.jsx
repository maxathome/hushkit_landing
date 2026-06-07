// hushkit — landing page. Built in the app's own visual language:
// anodized slate, dusty-pink value arcs, Space Grotesk + IBM Plex Mono,
// hardware-panel motifs. Reuses the real app screens for fidelity.

const T = {
  bg: '#0e0d12', bg2: '#16151a', card: '#1d1c22', raised: '#26242b', rim: '#2e2b34',
  ink: '#ece6dc', inkMute: 'rgba(236,230,220,0.55)', inkFaint: 'rgba(236,230,220,0.28)',
  pink: '#e2a3b1', pinkDeep: '#b87884', blue: '#a8c3d6', sand: '#d6b478', hot: '#ff7548',
  display: '"Space Grotesk", -apple-system, system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
};

// ── small hardware screw, like the faceplate corners ───
function Screw({ size = 13, angle = 24 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'radial-gradient(circle at 34% 30%, #6a727c 0%, #3a4048 55%, #1a1e24 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.6), 0 1px 1px rgba(0,0,0,0.5)',
      position: 'relative', flex: '0 0 auto',
    }}>
      <div style={{
        position: 'absolute', left: '50%', top: '50%', width: size * 0.62, height: 1.4,
        background: 'rgba(0,0,0,0.6)', transform: `translate(-50%,-50%) rotate(${angle}deg)`,
        boxShadow: '0 1px 0 rgba(255,255,255,0.12)',
      }} />
    </div>
  );
}

// ── mono eyebrow / spec label ──────────────────────────
function Eyebrow({ children, color = T.pink, style }) {
  return (
    <div style={{
      fontFamily: T.mono, fontSize: 11, letterSpacing: 2.4, fontWeight: 600,
      textTransform: 'uppercase', color, display: 'flex', alignItems: 'center', gap: 9, ...style,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 7px ${color}` }} />
      {children}
    </div>
  );
}

// ── App Store download button (official Apple badge) ──
function AppStore({ small }) {
  const h = small ? 40 : 52;
  const w = Math.round(h * (119.66407 / 40));
  return (
    <a href="#" onClick={e => e.preventDefault()} style={{
      display: 'inline-flex', textDecoration: 'none',
      transition: 'transform .18s ease, opacity .18s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.82'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1'; }}>
      <img src="images/app-store-badge.svg" alt="Download on the App Store" width={w} height={h} style={{ display: 'block' }} />
    </a>
  );
}

// ── scaled screenshot wrapper ──────────────────────────
function Device({ src, scale = 0.6, glow = T.pink }) {
  // Bezel thickness around the screen (unscaled px)
  const bx = 11, bt = 13, bb = 13;
  const sw = 390, sh = 844;
  const fw = sw + bx * 2, fh = sh + bt + bb; // frame outer dims
  const frameR = 56, screenR = 47;
  // Button positions are relative to the top of the frame
  const btns = [
    // left side: action, vol-up, vol-down
    { side: 'left', top: bt + 82,  h: 26 },
    { side: 'left', top: bt + 132, h: 34 },
    { side: 'left', top: bt + 178, h: 34 },
    // right side: power
    { side: 'right', top: bt + 152, h: 70 },
  ];
  return (
    <div style={{ position: 'relative', width: fw * scale, height: fh * scale, flex: '0 0 auto' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: '-12% -16%', borderRadius: '50%',
        background: `radial-gradient(closest-side, ${glow}26, transparent 72%)`,
        filter: 'blur(8px)', pointerEvents: 'none',
      }} />
      {/* Everything below is rendered at 1× then scaled */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: fw, height: fh, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {/* Phone frame body */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: frameR,
          background: 'linear-gradient(160deg, #3d3b41 0%, #1e1c22 45%, #2c2a31 100%)',
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.14)',
            'inset 0 -1px 0 rgba(0,0,0,0.55)',
            '0 0 0 0.75px rgba(0,0,0,0.85)',
            '0 22px 64px rgba(0,0,0,0.55)',
            '0 4px 14px rgba(0,0,0,0.4)',
          ].join(', '),
        }} />
        {/* Screen */}
        <div style={{
          position: 'absolute', top: bt, left: bx, width: sw, height: sh,
          borderRadius: screenR, overflow: 'hidden', background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.7)',
        }}>
          <img src={src} style={{ width: sw, height: sh, display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
        </div>
        {/* Side buttons */}
        {btns.map(({ side, top, h }, i) => (
          <div key={i} style={{
            position: 'absolute',
            [side]: -3, top,
            width: 4, height: h,
            borderRadius: side === 'left' ? '3px 0 0 3px' : '0 3px 3px 0',
            background: side === 'left'
              ? 'linear-gradient(90deg, #242228, #3a373f)'
              : 'linear-gradient(270deg, #242228, #3a373f)',
            boxShadow: side === 'left'
              ? 'inset 1px 0 1px rgba(255,255,255,0.07)'
              : 'inset -1px 0 1px rgba(255,255,255,0.07)',
          }} />
        ))}
      </div>
    </div>
  );
}

// ── section wrapper ────────────────────────────────────
function Section({ children, style, id }) {
  return (
    <section id={id} style={{ width: '100%', maxWidth: 1180, margin: '0 auto', padding: '0 40px', ...style }}>
      {children}
    </section>
  );
}

// ── thin panel screws frame (4 corners absolute) ───────
function PanelScrews({ inset = 16 }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', top: inset, left: inset, zIndex: 4 }}><Screw angle={28} /></div>
      <div style={{ position: 'absolute', top: inset, right: inset, zIndex: 4 }}><Screw angle={-14} /></div>
      <div style={{ position: 'absolute', bottom: inset, left: inset, zIndex: 4 }}><Screw angle={62} /></div>
      <div style={{ position: 'absolute', bottom: inset, right: inset, zIndex: 4 }}><Screw angle={-44} /></div>
    </React.Fragment>
  );
}

// ════════════════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════════════════
function Nav() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(14,13,18,0.78)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${T.rim}`,
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
          <span style={{ fontFamily: T.display, fontSize: 19, fontWeight: 600, letterSpacing: -0.4, color: T.ink }}>hushkit</span>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.pink, alignSelf: 'center', boxShadow: `0 0 7px ${T.pink}` }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {[['the kit', '#kit'], ['features', '#features'], ['sounds', '#sounds']].map(([l, h]) => (
            <a key={l} href={h} style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkMute, textDecoration: 'none', transition: 'color .15s' }}
               onMouseEnter={e => e.currentTarget.style.color = T.ink}
               onMouseLeave={e => e.currentTarget.style.color = T.inkMute}>{l}</a>
          ))}
          <AppStore small />
        </div>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════
function Hero() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ambient backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 76% 28%, rgba(226,163,177,0.13) 0%, transparent 52%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(100% 70% at 12% 96%, rgba(168,195,214,0.08) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <Section style={{ padding: '92px 40px 86px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center' }}>
          {/* left — copy */}
          <div className="reveal" style={{ minWidth: 0 }}>
            <Eyebrow>HK-001 · White noise & shushing</Eyebrow>
            <h1 style={{
              fontFamily: T.display, fontWeight: 500, fontSize: 78, lineHeight: 0.96,
              letterSpacing: -3, margin: '22px 0 0', color: T.ink, textWrap: 'balance',
            }}>
              One kit.<br />Full quiet<span style={{ color: T.pink }}>.</span>
            </h1>
            <p style={{
              fontFamily: T.display, fontWeight: 400, fontSize: 19, lineHeight: 1.55,
              color: T.inkMute, margin: '26px 0 0', maxWidth: 480, textWrap: 'pretty',
            }}>
              Hushkit is a white noise and shushing app built to get your baby to sleep — and keep them there. Shush, brown noise, and white noise, all in one place.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 34, flexWrap: 'wrap' }}>
              <AppStore />
              <a href="#features" style={{ fontFamily: T.mono, fontSize: 11.5, letterSpacing: 1.6, textTransform: 'uppercase', color: T.ink, textDecoration: 'none', borderBottom: `1px solid ${T.pinkDeep}`, paddingBottom: 3 }}>See the kit →</a>
              <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: T.inkFaint }}>Free to download</span>
            </div>
          </div>

          {/* right — device pair */}
          <div className="reveal" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 540 }}>
            <div style={{ position: 'absolute', transform: 'translateX(-58px) rotate(-5deg)', opacity: 0.62, filter: 'saturate(0.85)' }}>
              <Device src="images/white.png" scale={0.52} glow={T.blue} />
            </div>
            <div style={{ position: 'relative', zIndex: 2, transform: 'translateX(40px) rotate(3deg)', boxShadow: '0 50px 90px rgba(0,0,0,0.6)', borderRadius: 30 }}>
              <Device src="images/shush.png" scale={0.62} glow={T.pink} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// THE KIT — spec strip ("Everything in the kit")
// ════════════════════════════════════════════════════════
function Kit() {
  const items = [
    ['airplay', 'AirPlay', 'cast to any apple speaker'],
    ['bt', 'Bluetooth', 'any speaker in the house'],
    ['bg', 'Background', 'runs with the screen off'],
    ['ear', 'Listen detection', 'stops when baby settles'],
  ];
  const ic = {
    airplay: <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3 12V3h10v9h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M8 9l3.5 4.5h-7L8 9z" fill="currentColor"/></svg>,
    bt: <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M5 5l6 6-3 2.5V2.5l3 2.5-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/></svg>,
    bg: <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><rect x="4" y="2.5" width="8" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.4"/><path d="M7 11.5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    ear: <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M4 7a4 4 0 118 0c0 2-2 2.5-2 4.5s-1.5 2.5-3 2C5.5 13 4 12 4 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  };
  return (
    <Section id="kit" style={{ padding: '8px 40px 96px' }}>
      <div className="reveal" style={{
        position: 'relative', background: `linear-gradient(180deg, ${T.bg2}, #121117)`,
        border: `1px solid ${T.rim}`, borderRadius: 18, padding: '34px 40px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.35)',
      }}>
        <PanelScrews inset={14} />
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 30px' }}>
          <Eyebrow style={{ justifyContent: 'center' }}>Everything in the kit</Eyebrow>
          <p style={{ fontFamily: T.display, fontSize: 22, lineHeight: 1.5, color: T.ink, margin: '16px 0 0', fontWeight: 400, textWrap: 'pretty' }}>
            AirPlay, Bluetooth, background playback, and listen detection — all included free. Unlock brown noise, white noise, and your own recorded shush for $2.99.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {items.map(([k, name, sub]) => (
            <div key={k} style={{
              background: T.card, border: `1px solid ${T.rim}`, borderRadius: 10,
              padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <span style={{ color: T.pink }}>{ic[k]}</span>
              <div>
                <div style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: 1, fontWeight: 600, color: T.ink, textTransform: 'uppercase' }}>{name}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: 0.3, color: T.inkMute, marginTop: 5, lineHeight: 1.4 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ════════════════════════════════════════════════════════
// FEATURE MODULE (alternating)
// ════════════════════════════════════════════════════════
function Feature({ index, label, accent, title, body, device, flip, children }) {
  const Text = (
    <div style={{ minWidth: 0, maxWidth: 460 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <span style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: 1, fontWeight: 600, color: accent }}>{index} / 05</span>
        <span style={{ flex: 1, height: 1, background: T.rim, maxWidth: 60 }} />
        <Eyebrow color={accent} style={{ fontSize: 10.5 }}>{label}</Eyebrow>
      </div>
      <h2 style={{ fontFamily: T.display, fontWeight: 500, fontSize: 46, lineHeight: 1.0, letterSpacing: -1.8, margin: 0, color: T.ink, textWrap: 'balance' }}>{title}</h2>
      <p style={{ fontFamily: T.display, fontWeight: 400, fontSize: 17.5, lineHeight: 1.6, color: T.inkMute, margin: '20px 0 0', textWrap: 'pretty' }}>{body}</p>
      {children}
    </div>
  );
  const Visual = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{device}</div>
  );
  return (
    <div className="reveal" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center',
      padding: '76px 0', borderTop: `1px solid ${T.rim}`,
    }}>
      {flip ? <React.Fragment>{Visual}{Text}</React.Fragment> : <React.Fragment>{Text}{Visual}</React.Fragment>}
    </div>
  );
}

// ── feature 02 triptych: three sounds ──────────────────
function SoundsTriptych() {
  const sounds = [
    ['shush', T.pink, 'images/shush.png'],
    ['brown', T.sand, 'images/brown.png'],
    ['white', T.blue, 'images/white.png'],
  ];
  return (
    <div id="sounds" className="reveal" style={{ padding: '76px 0', borderTop: `1px solid ${T.rim}` }}>
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: 1, fontWeight: 600, color: T.pink }}>02 / 05</span>
          <span style={{ width: 60, height: 1, background: T.rim }} />
          <Eyebrow style={{ fontSize: 10.5 }}>Three sounds</Eyebrow>
        </div>
        <h2 style={{ fontFamily: T.display, fontWeight: 500, fontSize: 52, lineHeight: 1, letterSpacing: -2, margin: 0, color: T.ink }}>
          <span style={{ color: T.pink }}>Shush.</span> <span style={{ color: T.sand }}>Brown.</span> <span style={{ color: T.blue }}>White.</span>
        </h2>
        <p style={{ fontFamily: T.display, fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: T.inkMute, margin: '20px auto 0', maxWidth: 520, textWrap: 'pretty' }}>
          No scrolling through sounds you'll never use — just the ones that work, tuned to your needs.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: T.pink, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.pink }} />Shush — free
          </span>
          <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: T.inkFaint }}>·</span>
          <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: T.inkFaint, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.inkFaint }} />Brown &amp; White — $2.99 unlock
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 36, marginTop: 48, flexWrap: 'wrap' }}>
        {sounds.map(([name, accent, src]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <Device src={src} scale={0.5} glow={accent} />
            <Eyebrow color={accent} style={{ fontSize: 11 }}>{name}</Eyebrow>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── feature 05 visual: stays-on / background ───────────
function BackgroundVisual() {
  const bars = [0.3,0.5,0.75,0.55,0.9,0.65,0.4,0.85,0.7,0.45,0.8,0.6,0.9,0.5,0.7,0.85,0.4,0.65,0.9,0.55,0.75,0.6,0.8,0.45,0.7,0.55,0.85,0.4];
  return (
    <div style={{ position: 'relative', width: 360, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'radial-gradient(closest-side, rgba(226,163,177,0.16), transparent 72%)', pointerEvents: 'none' }} />
      <div style={{
        position: 'relative', width: 320,
        background: `linear-gradient(180deg, ${T.card}, #141319)`,
        border: `1px solid ${T.rim}`, borderRadius: 20, padding: '22px 22px 20px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.inkMute }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="3.5" y="7" width="9" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.3"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3"/></svg>
            <span style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.4, textTransform: 'uppercase' }}>Screen locked</span>
          </div>
          <span style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.4, color: T.pink, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.pink, boxShadow: `0 0 7px ${T.pink}` }} />running
          </span>
        </div>
        <div style={{ height: 96, borderRadius: 8, border: `1px solid ${T.rim}`, background: T.bg, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 2 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h * 72}%`, background: T.pink, opacity: 0.65, borderRadius: 1 }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
          <div style={{ width: 46, height: 46, borderRadius: 11, background: 'linear-gradient(160deg, #4a5360, #181e26)', border: `1px solid ${T.rim}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 700, color: T.pink, letterSpacing: 0.5 }}>zzz</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.display, fontSize: 17, fontWeight: 500, letterSpacing: -0.4, color: T.ink }}>shush · my voice</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1, color: T.inkMute, textTransform: 'uppercase', marginTop: 3 }}>hushkit · background</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 14px ${T.pink}40` }}>
            <div style={{ display: 'flex', gap: 3.5 }}>
              <div style={{ width: 3.5, height: 15, background: T.bg, borderRadius: 1 }} />
              <div style={{ width: 3.5, height: 15, background: T.bg, borderRadius: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// PRIVACY POLICY
// ════════════════════════════════════════════════════════
function PrivacyPolicy({ onBack }) {
  const h2 = { fontFamily: T.display, fontWeight: 500, fontSize: 22, letterSpacing: -0.5, color: T.ink, margin: '40px 0 10px', borderBottom: `1px solid ${T.rim}`, paddingBottom: 10 };
  const h3 = { fontFamily: T.display, fontWeight: 500, fontSize: 16, color: T.ink, margin: '24px 0 8px' };
  const p  = { fontFamily: T.display, fontSize: 15.5, lineHeight: 1.7, color: T.inkMute, margin: '10px 0' };
  const li = { fontFamily: T.display, fontSize: 15.5, lineHeight: 1.7, color: T.inkMute, margin: '4px 0' };
  return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      {/* sticky back bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(14,13,18,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${T.rim}`,
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: T.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase',
            color: T.inkMute, display: 'flex', alignItems: 'center', gap: 8, transition: 'color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = T.ink}
          onMouseLeave={e => e.currentTarget.style.color = T.inkMute}>
            ← hushkit
          </button>
          <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkFaint }}>Privacy Policy</span>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 40px 120px' }}>
        <Eyebrow style={{ marginBottom: 18 }}>Legal</Eyebrow>
        <h1 style={{ fontFamily: T.display, fontWeight: 500, fontSize: 52, letterSpacing: -2, lineHeight: 1, color: T.ink, margin: '0 0 8px' }}>
          Privacy Policy<span style={{ color: T.pink }}>.</span>
        </h1>
        <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 1.2, color: T.inkFaint, textTransform: 'uppercase', margin: '0 0 48px' }}>Last updated June 07, 2026</p>

        <p style={p}>This Privacy Notice for <strong style={{ color: T.ink }}>Maxim Levine, doing business as HushKit</strong> ("we," "us," or "our"), describes how and why we may access, collect, store, use, and/or share your personal information when you use our services ("Services"), including when you:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}>Download and use our mobile application (HushKit), or any other application of ours that links to this Privacy Notice</li>
          <li style={li}>Engage with us in other related ways, including any marketing or events</li>
        </ul>
        <p style={p}>Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you have any questions or concerns, please contact us at <a href="mailto:support@hushkit.co" style={{ color: T.pink, textDecoration: 'none' }}>support@hushkit.co</a>.</p>

        {/* Summary */}
        <div style={{ background: T.card, border: `1px solid ${T.rim}`, borderRadius: 14, padding: '28px 32px', margin: '40px 0' }}>
          <Eyebrow style={{ marginBottom: 14 }}>Summary of Key Points</Eyebrow>
          <p style={{ ...p, margin: '0 0 10px', fontStyle: 'italic', fontSize: 14 }}>This summary provides key points from our Privacy Notice. See the full sections below for complete details.</p>
          <ul style={{ paddingLeft: 22, margin: 0 }}>
            <li style={li}><strong style={{ color: T.ink }}>What personal information do we process?</strong> When you use our Services, we may process personal information depending on how you interact with us, the choices you make, and the features you use.</li>
            <li style={li}><strong style={{ color: T.ink }}>Do we process any sensitive personal information?</strong> No. We do not process sensitive personal information.</li>
            <li style={li}><strong style={{ color: T.ink }}>Do we collect any information from third parties?</strong> No. We do not collect any information from third parties.</li>
            <li style={li}><strong style={{ color: T.ink }}>How do we process your information?</strong> We process your information to provide and improve our Services, communicate with you, ensure security, and comply with law.</li>
            <li style={li}><strong style={{ color: T.ink }}>Do we share personal information?</strong> We may share information in specific limited situations described in this notice. We do not sell your personal information.</li>
            <li style={li}><strong style={{ color: T.ink }}>What are your rights?</strong> Depending on your location, applicable privacy law may give you certain rights regarding your personal information.</li>
          </ul>
        </div>

        {/* TOC */}
        <div style={{ background: T.bg2, border: `1px solid ${T.rim}`, borderRadius: 14, padding: '24px 28px', margin: '0 0 40px' }}>
          <p style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkFaint, margin: '0 0 14px' }}>Table of Contents</p>
          {[
            '1. What Information Do We Collect?',
            '2. How Do We Process Your Information?',
            '3. What Legal Bases Do We Rely On to Process Your Personal Information?',
            '4. When and With Whom Do We Share Your Personal Information?',
            '5. How Long Do We Keep Your Information?',
            '6. Do We Collect Information From Minors?',
            '7. What Are Your Privacy Rights?',
            '8. Controls for Do-Not-Track Features',
            '9. Do United States Residents Have Specific Privacy Rights?',
            '10. Do Other Regions Have Specific Privacy Rights?',
            '11. Do We Make Updates to This Notice?',
            '12. How Can You Contact Us About This Notice?',
            '13. How Can You Review, Update, or Delete the Data We Collect From You?',
          ].map((item, i) => (
            <div key={i} style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: 0.3, color: T.inkMute, padding: '5px 0', borderBottom: i < 12 ? `1px solid ${T.rim}` : 'none' }}>{item}</div>
          ))}
        </div>

        {/* Section 1 */}
        <h2 style={h2}>1. What Information Do We Collect?</h2>
        <h3 style={h3}>Personal information you disclose to us</h3>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: We collect only what you voluntarily provide and what is necessary to run the app. Payment processing for in-app purchases is handled entirely by Apple.</p>
        <p style={p}>We collect personal information that you voluntarily provide when you express an interest in our Services, participate in activities on the Services, or otherwise contact us.</p>
        <p style={p}>We do not process sensitive information.</p>
        <h3 style={h3}>Application Data</h3>
        <p style={p}>If you use our application, we may collect the following information if you choose to grant us access or permission:</p>
        <p style={p}><strong style={{ color: T.ink }}>Microphone Access.</strong> HushKit requests access to your device's microphone for two purposes:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}><strong style={{ color: T.ink }}>Ambient sound detection</strong> — HushKit includes an optional feature that, when explicitly enabled by you, listens for sounds from your baby while the shush is playing. When the app detects that your baby has quieted down, it automatically stops playback. This feature is off by default and only activates when you turn it on. Listening happens entirely on-device in real time and is not recorded, stored, or transmitted anywhere.</li>
          <li style={li}><strong style={{ color: T.ink }}>Custom shush recording</strong> — The "Record Your Own Shush" feature (available with the HushKit Premium unlock) allows you to capture a short audio clip for use as your shush sound within the app. This recording is saved locally on your device only and is never uploaded or shared.</li>
        </ul>
        <p style={p}>Microphone access is used solely for these in-app functions. No audio is ever transmitted to our servers. You may change microphone permissions at any time in your device's Settings. If microphone access is not granted, ambient detection and custom recording will be unavailable, but pre-loaded shush sounds will still work normally.</p>
        <p style={p}><strong style={{ color: T.ink }}>In-App Purchases.</strong> HushKit is free to download and includes the shush sound. A one-time purchase of $2.99 (HushKit Premium) unlocks brown noise, white noise, and the Record Your Own Shush feature. All payment transactions are processed by Apple through the App Store and are governed by Apple's Privacy Policy. We never receive, see, or store your payment information. The only thing we receive from Apple is a confirmation that the purchase was completed, which is stored locally on your device to enable the premium features.</p>
        <p style={p}>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes.</p>

        {/* Section 2 */}
        <h2 style={h2}>2. How Do We Process Your Information?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: We process your information to provide, improve, and operate our Services, communicate with you, and comply with applicable law.</p>
        <p style={p}>We process your personal information for the following purposes:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}>To provide and maintain core app functionality, including audio playback, the custom recording feature, and premium content unlocked via in-app purchase</li>
          <li style={li}>To verify and restore in-app purchase entitlements via Apple's StoreKit framework</li>
          <li style={li}>To diagnose technical problems and improve app performance</li>
          <li style={li}>To communicate with you regarding support requests or updates</li>
          <li style={li}>To comply with our legal obligations</li>
          <li style={li}>To protect the vital interests of users or others where necessary</li>
        </ul>

        {/* Section 3 */}
        <h2 style={h2}>3. What Legal Bases Do We Rely On to Process Your Information?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: We only process your personal information when we have a valid legal reason to do so.</p>
        <h3 style={h3}>For users in the EU and UK</h3>
        <p style={p}>The GDPR and UK GDPR require us to explain the valid legal bases we rely on. We may rely on the following:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}><strong style={{ color: T.ink }}>Consent</strong> — where you have given us permission to use your personal information for a specific purpose. You may withdraw consent at any time by contacting us.</li>
          <li style={li}><strong style={{ color: T.ink }}>Legal Obligations</strong> — where processing is necessary to comply with our legal obligations or to defend our legal rights.</li>
          <li style={li}><strong style={{ color: T.ink }}>Vital Interests</strong> — where processing is necessary to protect your vital interests or those of another person.</li>
        </ul>
        <h3 style={h3}>For users in Canada</h3>
        <p style={p}>We may process your information where you have given express or implied consent. You may withdraw consent at any time by contacting us. In some limited cases, we may be legally permitted to process your information without consent, such as:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}>For fraud detection and prevention</li>
          <li style={li}>For investigations or compliance with legal obligations</li>
          <li style={li}>Where the information is publicly available as specified by applicable regulations</li>
        </ul>

        {/* Section 4 */}
        <h2 style={h2}>4. When and With Whom Do We Share Your Personal Information?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: We may share information in specific limited situations.</p>
        <p style={p}>We may need to share your personal information in the following situations:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}><strong style={{ color: T.ink }}>Business Transfers</strong> — We may share or transfer your information in connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
        </ul>
        <p style={p}>We do not sell your personal information and have not done so in the preceding twelve (12) months.</p>

        {/* Section 5 */}
        <h2 style={h2}>5. How Long Do We Keep Your Information?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: We keep your information only as long as necessary to fulfill the purposes described in this notice.</p>
        <p style={p}>We will only retain your personal information for as long as necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required by law (such as for tax or accounting requirements).</p>
        <p style={p}>When we no longer have a legitimate business need to process your personal information, we will delete or anonymize it. If deletion is not immediately possible (for example, because data is stored in backup archives), we will securely isolate it from further processing until deletion is feasible.</p>

        {/* Section 6 */}
        <h2 style={h2}>6. Do We Collect Information From Minors?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: HushKit is intended for use by parents, caregivers, and adults. We do not knowingly collect data from children.</p>
        <p style={p}>HushKit is a baby care tool designed for use by parents, guardians, and adult caregivers. The app is not directed at children, and we do not knowingly collect, solicit, or market to children under 13 years of age (or the applicable age threshold in your jurisdiction).</p>
        <p style={p}>By using the Services, you represent that you are an adult (18 or older) or, if under 18, that you are using the app under the supervision of a parent or legal guardian who has consented to its use.</p>
        <p style={p}>If we learn that we have inadvertently collected personal information from a minor without appropriate consent, we will take prompt steps to delete such data. If you believe we may have collected information from a child, please contact us at <a href="mailto:support@hushkit.co" style={{ color: T.pink, textDecoration: 'none' }}>support@hushkit.co</a>.</p>

        {/* Section 7 */}
        <h2 style={h2}>7. What Are Your Privacy Rights?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: Depending on your location, you may have rights that give you greater access to and control over your personal information.</p>
        <p style={p}>In some regions — including the European Economic Area (EEA), United Kingdom, Switzerland, and Canada — you have rights under applicable data protection laws. These may include the right to:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}>Request access to and obtain a copy of your personal information</li>
          <li style={li}>Request correction or deletion of your personal information</li>
          <li style={li}>Restrict the processing of your personal information</li>
          <li style={li}>Request data portability, where applicable</li>
          <li style={li}>Object to the processing of your personal information</li>
          <li style={li}>Not be subject to solely automated decision-making that produces significant legal effects</li>
        </ul>
        <p style={p}>To exercise any of these rights, please contact us using the details in Section 12 below. We will respond in accordance with applicable data protection laws.</p>
        <p style={p}>If you are located in the EEA or UK and believe we are unlawfully processing your personal information, you have the right to lodge a complaint with your Member State data protection authority or the UK Information Commissioner's Office (ICO).</p>
        <p style={p}>If you are located in Switzerland, you may contact the Federal Data Protection and Information Commissioner (FDPIC).</p>
        <p style={p}><strong style={{ color: T.ink }}>Withdrawing consent:</strong> If we are relying on your consent to process your personal information, you may withdraw that consent at any time by contacting us at <a href="mailto:support@hushkit.co" style={{ color: T.pink, textDecoration: 'none' }}>support@hushkit.co</a>. Please note that withdrawing consent does not affect the lawfulness of any processing carried out prior to withdrawal.</p>

        {/* Section 8 */}
        <h2 style={h2}>8. Controls for Do-Not-Track Features</h2>
        <p style={p}>Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature you can activate to signal your preference not to have your online browsing activity monitored. At this time, no uniform technology standard for recognizing DNT signals has been finalized, and we do not currently respond to DNT signals.</p>
        <p style={p}>California law requires us to disclose how we respond to DNT signals. Because no industry or legal standard exists, we do not respond to them at this time. If a standard is adopted that we are required to follow, we will update this notice accordingly.</p>

        {/* Section 9 */}
        <h2 style={h2}>9. Do United States Residents Have Specific Privacy Rights?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: Residents of certain US states may have additional rights regarding their personal information.</p>
        <p style={p}>If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to, correction of, or deletion of your personal information, and to opt out of certain uses of it.</p>
        <h3 style={h3}>Categories of Personal Information We Collect</h3>
        <p style={p}>In the past twelve (12) months, we have not collected any of the following categories of personal information as defined under California law: identifiers, personal records, protected classification characteristics, commercial information, biometric information, internet/network activity, geolocation data, audio/visual recordings, employment/professional information, education information, sensitive personal information, or inferences. We collect only what is described in Section 1 of this notice.</p>
        <h3 style={h3}>Your Rights</h3>
        <p style={p}>Depending on your state of residence, you may have the right to:</p>
        <ul style={{ paddingLeft: 22, margin: '10px 0' }}>
          <li style={li}>Know whether and how we process your personal data</li>
          <li style={li}>Access your personal data</li>
          <li style={li}>Correct inaccuracies in your personal data</li>
          <li style={li}>Request deletion of your personal data</li>
          <li style={li}>Obtain a copy of personal data you have previously shared with us</li>
          <li style={li}>Not be discriminated against for exercising these rights</li>
          <li style={li}>Opt out of the use of your personal data for targeted advertising, sale, or profiling</li>
        </ul>
        <h3 style={h3}>How to Exercise Your Rights</h3>
        <p style={p}>To exercise these rights, please email us at <a href="mailto:support@hushkit.co" style={{ color: T.pink, textDecoration: 'none' }}>support@hushkit.co</a> or submit a data subject access request. We may need to verify your identity before processing your request.</p>
        <h3 style={h3}>Appeals</h3>
        <p style={p}>If we decline to act on your request, you may appeal by emailing <a href="mailto:support@hushkit.co" style={{ color: T.pink, textDecoration: 'none' }}>support@hushkit.co</a>. We will respond in writing with an explanation. If your appeal is denied, you may submit a complaint to your state attorney general.</p>
        <h3 style={h3}>California "Shine the Light" Law</h3>
        <p style={p}>California Civil Code Section 1798.83 permits California residents to request information about personal information disclosed to third parties for their direct marketing purposes. We do not share personal information with third parties for direct marketing purposes. If you have questions, please contact us using the details in Section 12.</p>

        {/* Section 10 */}
        <h2 style={h2}>10. Do Other Regions Have Specific Privacy Rights?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: You may have additional rights based on the country you reside in.</p>
        <h3 style={h3}>Australia and New Zealand</h3>
        <p style={p}>We collect and process personal information in accordance with Australia's Privacy Act 1988 and New Zealand's Privacy Act 2020. If you do not wish to provide the personal information necessary to deliver a specific service, it may affect our ability to provide that service.</p>
        <p style={p}>You have the right to request access to or correction of your personal information at any time by contacting us. If you believe we are in breach of the Australian Privacy Principles or New Zealand's Privacy Principles, you may file a complaint with the Office of the Australian Information Commissioner or the Office of the New Zealand Privacy Commissioner.</p>

        {/* Section 11 */}
        <h2 style={h2}>11. Do We Make Updates to This Notice?</h2>
        <p style={{ ...p, fontStyle: 'italic' }}>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
        <p style={p}>We may update this Privacy Notice from time to time. The updated version will be indicated by the "Last updated" date at the top of this notice. If we make material changes, we may notify you by posting a prominent notice within the app or by sending you a direct notification. We encourage you to review this notice periodically.</p>

        {/* Section 12 */}
        <h2 style={h2}>12. How Can You Contact Us About This Notice?</h2>
        <p style={p}>If you have questions or comments about this notice, you may email us at <a href="mailto:support@hushkit.co" style={{ color: T.pink, textDecoration: 'none' }}>support@hushkit.co</a> or contact us by post at:</p>
        <div style={{ background: T.card, border: `1px solid ${T.rim}`, borderRadius: 10, padding: '18px 22px', margin: '12px 0', fontFamily: T.mono, fontSize: 13, lineHeight: 1.8, color: T.inkMute }}>
          Maxim Levine, doing business as HushKit<br />
          105 Butler St, Apt 3<br />
          Brooklyn, NY 11231<br />
          United States
        </div>

        {/* Section 13 */}
        <h2 style={h2}>13. How Can You Review, Update, or Delete the Data We Collect From You?</h2>
        <p style={p}>You have the right to request access to the personal information we collect from you, to correct inaccuracies, or to request deletion of your personal information. To do so, please submit a data subject access request or email us at <a href="mailto:support@hushkit.co" style={{ color: T.pink, textDecoration: 'none' }}>support@hushkit.co</a>.</p>

        <div style={{ marginTop: 60, paddingTop: 24, borderTop: `1px solid ${T.rim}` }}>
          <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 1, color: T.inkFaint, textTransform: 'uppercase' }}>This privacy policy was prepared for HushKit, a sole proprietorship.</p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════
function Footer() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderTop: `1px solid ${T.rim}`, marginTop: 40 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 120% at 50% 0%, rgba(226,163,177,0.12), transparent 60%)', pointerEvents: 'none' }} />
      <Section style={{ padding: '100px 40px 56px', position: 'relative', textAlign: 'center' }}>
        <Eyebrow style={{ justifyContent: 'center' }}>HK-001 · now available</Eyebrow>
        <h2 style={{ fontFamily: T.display, fontWeight: 500, fontSize: 64, lineHeight: 1, letterSpacing: -2.4, margin: '22px 0 0', color: T.ink }}>
          One kit. Full quiet<span style={{ color: T.pink }}>.</span>
        </h2>
        <p style={{ fontFamily: T.display, fontSize: 18, color: T.inkMute, margin: '20px auto 34px', maxWidth: 440, lineHeight: 1.55 }}>
          Put the phone down and actually rest. Hushkit keeps going.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}><AppStore /></div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 80, paddingTop: 26, borderTop: `1px solid ${T.rim}`, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
            <span style={{ fontFamily: T.display, fontSize: 18, fontWeight: 600, letterSpacing: -0.4, color: T.ink }}>hushkit</span>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.pink, alignSelf: 'center' }} />
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: 1.4, color: T.inkFaint, textTransform: 'uppercase' }}>White noise & shushing · made for the nursery</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="/privacy" style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: 1.4, color: T.inkMute, textTransform: 'uppercase', textDecoration: 'none' }}>privacy</a>
            <a href="mailto:support@hushkit.co" style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: 1.4, color: T.inkMute, textTransform: 'uppercase', textDecoration: 'none' }}>support</a>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// PAGE
// ════════════════════════════════════════════════════════
function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Kit />
      <div id="features">
        <Section style={{ padding: '0 40px' }}>
          <Feature
            index="01" label="My voice" accent={T.pink}
            title={<React.Fragment>Your shush, recorded<span style={{ color: T.pink }}>.</span></React.Fragment>}
            body="Hushkit comes with a default shush ready to go. Unlock the premium kit for $2.99 and record your own — so your baby hears exactly what they know. Trim it, crossfade it, and normalize the volume until it's just right."
            device={<Device src="images/preview.png" scale={0.6} glow={T.pink} />}
          />
        </Section>

        <Section style={{ padding: '0 40px' }}>
          <SoundsTriptych />
        </Section>

        <Section style={{ padding: '0 40px' }}>
          <Feature
            index="03" label="Listen detection" accent={T.pink} flip
            title={<React.Fragment>Listen<span style={{ color: T.pink }}>.</span></React.Fragment>}
            body="Set a noise threshold and a silence timer. When your baby stays quiet long enough, Hushkit stops on its own. No fumbling with your phone in the dark."
            device={<Device src="images/listen.png" scale={0.6} glow={T.pink} />}
          />
        </Section>

        <Section style={{ padding: '0 40px' }}>
          <Feature
            index="04" label="AirPlay & Bluetooth" accent={T.blue}
            title={<React.Fragment>Send it anywhere<span style={{ color: T.blue }}>.</span></React.Fragment>}
            body="AirPlay and Bluetooth support means your shush follows you — or stays in the nursery while you don't. Play through any speaker in your home."
            device={<Device src="images/output.png" scale={0.6} glow={T.blue} />}
          />
        </Section>

        <Section style={{ padding: '0 40px' }}>
          <Feature
            index="05" label="Background playback" accent={T.pink} flip
            title={<React.Fragment>Stays on.<br />You don't have to<span style={{ color: T.pink }}>.</span></React.Fragment>}
            body="Lock your screen. Switch apps. Hushkit keeps running in the background so you can put the phone down and actually rest."
            device={<BackgroundVisual />}

          />
        </Section>
      </div>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
