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

// ── App Store download button ──────────────────────────
function AppStore({ small }) {
  return (
    <a href="#" onClick={e => e.preventDefault()} style={{
      display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none',
      padding: small ? '9px 16px' : '13px 22px',
      background: T.ink, color: '#13121a', borderRadius: 12,
      boxShadow: '0 6px 22px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
      transition: 'transform .18s ease, box-shadow .18s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)'; }}>
      <svg width={small ? 19 : 24} height={small ? 19 : 24} viewBox="0 0 24 24" fill="#13121a">
        <path d="M16.36 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.29 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.23.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.42-.93-2.44-3.68zM14.1 5.86c.64-.78 1.07-1.85.95-2.93-.92.04-2.04.61-2.7 1.38-.59.69-1.11 1.79-.97 2.85 1.03.08 2.08-.52 2.72-1.3z"/>
      </svg>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: 1.2, opacity: 0.6, textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1 }}>Download on the</div>
        <div style={{ fontFamily: T.display, fontSize: small ? 15 : 18, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.1, marginTop: 3, whiteSpace: 'nowrap' }}>App Store</div>
      </div>
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
            AirPlay, Bluetooth, background playback, and listen detection — built in. No add-ons, no upgrades. Everything in the kit.
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
            {['privacy', 'support', 'press'].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: 1.4, color: T.inkMute, textTransform: 'uppercase', textDecoration: 'none' }}>{l}</a>
            ))}
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
            body="Hushkit comes with a default shush ready to go. When you're ready, record your own — so your baby hears exactly what they know. Trim it, crossfade it, and normalize the volume until it's just right."
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
