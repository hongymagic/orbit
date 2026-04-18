// Shared atomic components for Orbit IDP
// Exposes to window for cross-file usage.

const { useState, useEffect, useRef, useMemo } = React;

// —— Icons (all stroke-based, 1.5 width) ——
const Icon = {
  dash: <svg viewBox="0 0 16 16" className="side-icon"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>,
  deploy: <svg viewBox="0 0 16 16" className="side-icon"><path d="M2 11l6 3 6-3M2 8l6 3 6-3M8 2L2 5l6 3 6-3-6-3z"/></svg>,
  git: <svg viewBox="0 0 16 16" className="side-icon"><circle cx="4" cy="4" r="1.5"/><circle cx="4" cy="12" r="1.5"/><circle cx="12" cy="8" r="1.5"/><path d="M4 5.5v5M5.5 4h3a2 2 0 012 2v.5"/></svg>,
  logs: <svg viewBox="0 0 16 16" className="side-icon"><path d="M2 3h12M2 6h12M2 9h8M2 12h10"/></svg>,
  db: <svg viewBox="0 0 16 16" className="side-icon"><ellipse cx="8" cy="3" rx="5" ry="1.5"/><path d="M3 3v10c0 .8 2.2 1.5 5 1.5s5-.7 5-1.5V3M3 8c0 .8 2.2 1.5 5 1.5s5-.7 5-1.5"/></svg>,
  key: <svg viewBox="0 0 16 16" className="side-icon"><circle cx="5" cy="11" r="2.5"/><path d="M7 9.5l5-5M10 4l2 2M8.5 5.5l2 2"/></svg>,
  team: <svg viewBox="0 0 16 16" className="side-icon"><circle cx="6" cy="6" r="2"/><circle cx="11.5" cy="7" r="1.5"/><path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4M10 13c0-1.5 1-2.5 2.5-2.5S15 11.5 15 13"/></svg>,
  settings: <svg viewBox="0 0 16 16" className="side-icon"><circle cx="8" cy="8" r="2"/><path d="M8 1v2M8 13v2M15 8h-2M3 8H1M13 3l-1.5 1.5M4.5 11.5L3 13M13 13l-1.5-1.5M4.5 4.5L3 3"/></svg>,
  plus: <svg viewBox="0 0 16 16" className="side-icon"><path d="M8 3v10M3 8h10"/></svg>,
  search: <svg viewBox="0 0 16 16" className="side-icon"><circle cx="7" cy="7" r="4"/><path d="M10 10l3 3"/></svg>,
  bell: <svg viewBox="0 0 16 16" className="side-icon"><path d="M4 6a4 4 0 018 0v3l1.5 2h-11L4 9V6zM6.5 13a1.5 1.5 0 003 0"/></svg>,
  cmd: <svg viewBox="0 0 16 16" className="side-icon"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 7h6M5 10h4"/></svg>,
  chev: <svg viewBox="0 0 16 16" className="side-icon"><path d="M4 6l4 4 4-4"/></svg>,
  dots: <svg viewBox="0 0 16 16" className="side-icon"><circle cx="4" cy="8" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="12" cy="8" r="1"/></svg>,
  check: <svg viewBox="0 0 16 16" className="side-icon"><path d="M3 8l3.5 3.5L13 5"/></svg>,
  x: <svg viewBox="0 0 16 16" className="side-icon"><path d="M4 4l8 8M12 4l-8 8"/></svg>,
  play: <svg viewBox="0 0 16 16" className="side-icon" style={{fill:'currentColor'}}><path d="M5 3l8 5-8 5z"/></svg>,
  globe: <svg viewBox="0 0 16 16" className="side-icon"><circle cx="8" cy="8" r="6"/><path d="M2 8h12M8 2c2 2 3 4 3 6s-1 4-3 6c-2-2-3-4-3-6s1-4 3-6z"/></svg>,
  fn: <svg viewBox="0 0 16 16" className="side-icon"><path d="M3 3l2 10 3-8 3 5 2-4"/></svg>,
};

// —— Button ——
function Btn({ children, variant = 'default', size, icon, onClick, ...rest }) {
  const cls = ['btn'];
  if (variant === 'primary') cls.push('btn-primary');
  if (variant === 'accent') cls.push('btn-accent');
  if (variant === 'ghost') cls.push('btn-ghost');
  if (size === 'sm') cls.push('btn-sm');
  if (size === 'lg') cls.push('btn-lg');
  if (icon && !children) cls.push('btn-icon');
  return <button className={cls.join(' ')} onClick={onClick} {...rest}>{icon}{children}</button>;
}

// —— Badge ——
function Badge({ children, tone = 'neutral', dot = false, solid = false }) {
  const cls = ['badge', tone];
  if (solid) cls.push('badge-solid');
  return <span className={cls.join(' ')}>
    {dot && <span className="badge-dot" />}
    {children}
  </span>;
}

// —— Card ——
function Card({ title, sub, actions, children, lifted, pad = true, className = '' }) {
  return (
    <div className={`card ${lifted ? 'card-lifted' : ''} ${className}`}>
      {(title || actions) && (
        <div className="card-head">
          <div>
            {title && <div className="card-title">{title}</div>}
            {sub && <div className="card-sub">{sub}</div>}
          </div>
          <div style={{marginLeft:'auto', display:'flex', gap:6}}>{actions}</div>
        </div>
      )}
      {pad ? <div className="card-body">{children}</div> : children}
    </div>
  );
}

// —— Sparkline (simple SVG polyline) ——
function Sparkline({ data, color = 'var(--accent)' }) {
  const w = 72, h = 24;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg className="sparkline" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// —— Metric ——
function Metric({ label, value, delta, deltaDir, data }) {
  return (
    <div className="metric">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-delta">
        <span className={deltaDir === 'up' ? 'up' : deltaDir === 'down' ? 'down' : ''}>{delta}</span>
      </div>
      {data && <Sparkline data={data} />}
    </div>
  );
}

// —— Sidebar ——
function Sidebar({ active = 'deployments', onNav }) {
  const items = [
    { k: 'overview', label: 'Overview', icon: Icon.dash },
    { k: 'deployments', label: 'Deployments', icon: Icon.deploy, count: 247 },
    { k: 'branches', label: 'Branches', icon: Icon.git, count: 18 },
    { k: 'logs', label: 'Logs', icon: Icon.logs },
    { k: 'functions', label: 'Functions', icon: Icon.fn },
    { k: 'domains', label: 'Domains', icon: Icon.globe },
  ];
  const admin = [
    { k: 'storage', label: 'Storage', icon: Icon.db },
    { k: 'secrets', label: 'Secrets', icon: Icon.key, count: 34 },
    { k: 'team', label: 'Team', icon: Icon.team },
    { k: 'settings', label: 'Settings', icon: Icon.settings },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">O</div>
        <div className="brand-name">Orbit</div>
        <div className="brand-env">prod</div>
      </div>
      <div className="sidebar-scroll">
        <div className="side-section">
          <div className="side-label">Project · atlas-web</div>
          {items.map(it => (
            <div key={it.k} className="side-item" aria-current={active === it.k} onClick={() => onNav && onNav(it.k)}>
              {it.icon}
              <span>{it.label}</span>
              {it.count && <span className="count mono">{it.count}</span>}
            </div>
          ))}
        </div>
        <div className="side-section">
          <div className="side-label">Infrastructure</div>
          {admin.map(it => (
            <div key={it.k} className="side-item" aria-current={active === it.k} onClick={() => onNav && onNav(it.k)}>
              {it.icon}
              <span>{it.label}</span>
              {it.count && <span className="count mono">{it.count}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="avatar">RL</div>
          <div style={{lineHeight:1.2}}>
            <div className="user-name">Rhea Lin</div>
            <div className="user-role">platform · admin</div>
          </div>
          <div style={{marginLeft:'auto', color:'var(--fg-faint)'}}>{Icon.chev}</div>
        </div>
      </div>
    </aside>
  );
}

// —— Topbar ——
function Topbar({ crumbs = ['atlas-web', 'Deployments'], actions }) {
  return (
    <div className="topbar">
      <div className="breadcrumb">
        <div className="brand-mark" style={{width:20,height:20,fontSize:11}}>A</div>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            <span className={i === crumbs.length - 1 ? 'cur' : ''}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="topbar-spacer" />
      <div className="search">
        {Icon.search}
        <span>Search deployments, PRs, logs…</span>
        <kbd>⌘K</kbd>
      </div>
      <Btn icon={Icon.bell} variant="ghost" aria-label="Notifications" />
      {actions}
      <Btn variant="accent">Deploy</Btn>
    </div>
  );
}

Object.assign(window, { Icon, Btn, Badge, Card, Metric, Sparkline, Sidebar, Topbar });
