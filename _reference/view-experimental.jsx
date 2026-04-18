// Experimental variation — mono-forward, terminal-esque, ASCII flourishes.

function ExperimentalView() {
  const ascii = '━'.repeat(240);
  const rows = [
    ['14:22:34', 'deploy',  'atlas-web',   'main',            '4e2a1b7', 'READY',   '1m 24s'],
    ['14:08:12', 'deploy',  'atlas-web',   'feat/billing-v2', '9f1c8e3', 'BUILD',   '54s'],
    ['13:40:02', 'deploy',  'atlas-api',   'fix/rate-limit',  'a7b02d4', 'QUEUE',   '-'],
    ['13:22:48', 'rollback','atlas-web',   'main',            'c45ff91', 'DONE',    '36s'],
    ['11:22:01', 'deploy',  'atlas-edge',  'main',            '1e0a762', 'READY',   '48s'],
    ['09:41:19', 'deploy',  'atlas-api',   'main',            '880fa0c', 'READY',   '1m 52s'],
    ['08:12:04', 'secret',  'atlas-web',   '-',               'STRIPE_WEBHOOK_KEY', 'ROTATED', '-'],
  ];
  const statusTone = { READY:'ok', BUILD:'info', QUEUE:'warn', DONE:'ok', ROTATED:'info', FAILED:'err' };

  return (
    <div className="view experimental">
      <div className="page">
        <div className="page-head">
          <div>
            <div className="kicker">~/atlas-web $ orbit ps</div>
            <h1 className="h1" style={{marginTop:8}}>Operations</h1>
            <div className="sub">Flat event log. No dashboards. Grep-friendly by design.</div>
          </div>
          <div className="row">
            <Btn size="sm" variant="ghost">[?] help</Btn>
            <Btn size="sm" variant="ghost">[/] filter</Btn>
            <Btn size="sm" variant="primary">[n] new deployment</Btn>
          </div>
        </div>

        <div className="metric-grid">
          <Metric label="UPTIME" value="99.94%" delta="30d" />
          <Metric label="P50 LATENCY" value="42ms" delta="−4ms" deltaDir="up" />
          <Metric label="ERR RATE" value="0.018%" delta="+0.002" deltaDir="down" />
          <Metric label="QPS" value="4,812" delta="rolling 1m" />
        </div>

        <div className="ascii-divider">{ascii}</div>

        <div className="row" style={{marginBottom:12, gap:0}}>
          <div className="tag-strip">
            <Badge tone="neutral">env:prod</Badge>
            <Badge tone="neutral">region:iad1</Badge>
            <Badge tone="neutral">svc:*</Badge>
            <Badge tone="neutral">kind:deploy|rollback|secret</Badge>
            <Badge tone="neutral">since:24h</Badge>
          </div>
        </div>

        <Card className="brutal-card" pad={false}>
          <table className="table" style={{fontFamily:'var(--font-mono)', fontSize:12}}>
            <thead><tr>
              <th>ts</th><th>kind</th><th>service</th><th>ref</th><th>sha / target</th><th>state</th><th style={{textAlign:'right'}}>dur</th><th style={{width:40}}></th>
            </tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{color:'var(--fg-subtle)'}}>{r[0]}</td>
                  <td style={{color:'var(--fg-muted)'}}>{r[1]}</td>
                  <td style={{fontWeight:600, color:'var(--fg)'}}>{r[2]}</td>
                  <td style={{color:'var(--fg-muted)'}}>{r[3]}</td>
                  <td style={{color:'var(--fg-muted)'}}>{r[4]}</td>
                  <td><Badge tone={statusTone[r[5]] || 'neutral'} dot>{r[5]}</Badge></td>
                  <td style={{textAlign:'right', color:'var(--fg-muted)'}}>{r[6]}</td>
                  <td style={{textAlign:'right', color:'var(--fg-faint)'}}>→</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="ascii-divider">{ascii}</div>

        <div className="grid-split">
          <Card title="$ orbit logs --tail" sub="atlas-web · prod" pad={false}>
            <div className="console" style={{maxHeight:300, margin:0, boxShadow:'none', borderRadius:0}}>
              <div className="log-row"><span className="log-time">14:22:34</span><span className="log-level ok">ok</span><span className="log-msg"><span className="k">GET</span> /api/billing/plans · 200 · 18ms · cache=HIT</span></div>
              <div className="log-row"><span className="log-time">14:22:33</span><span className="log-level ok">ok</span><span className="log-msg"><span className="k">POST</span> /api/sessions · 201 · 34ms</span></div>
              <div className="log-row"><span className="log-time">14:22:32</span><span className="log-level info">info</span><span className="log-msg">fn:resize-image · cold start · 312ms</span></div>
              <div className="log-row"><span className="log-time">14:22:31</span><span className="log-level warn">warn</span><span className="log-msg">rate-limit hit · ip=192.0.2.14 · route=/api/search</span></div>
              <div className="log-row"><span className="log-time">14:22:30</span><span className="log-level ok">ok</span><span className="log-msg"><span className="k">GET</span> /dashboard · 200 · 22ms · ssr</span></div>
              <div className="log-row"><span className="log-time">14:22:29</span><span className="log-level error">error</span><span className="log-msg"><span className="k">POST</span> /api/webhook/stripe · 500 · StripeSignatureVerificationError</span></div>
              <div className="log-row"><span className="log-time">14:22:28</span><span className="log-level ok">ok</span><span className="log-msg"><span className="k">GET</span> /pricing · 200 · 12ms · cache=HIT</span></div>
              <div className="log-row"><span className="log-time">14:22:27</span><span className="log-level info">info</span><span className="log-msg">fn:auth-session · warm · 4ms</span></div>
              <div className="log-row"><span className="log-time">14:22:26</span><span className="log-level ok">ok</span><span className="log-msg"><span className="k">GET</span> /api/me · 200 · 8ms</span></div>
            </div>
          </Card>

          <Card title="routes" sub="edge · 12 fns" pad={false}>
            <table className="table" style={{fontFamily:'var(--font-mono)', fontSize:12}}>
              <tbody>
                {[
                  ['GET', '/',                  '4ms',  'iad1'],
                  ['GET', '/dashboard',         '22ms', 'iad1'],
                  ['GET', '/api/me',            '8ms',  'edge'],
                  ['POST','/api/sessions',      '34ms', 'edge'],
                  ['GET', '/api/billing/plans', '18ms', 'edge'],
                  ['POST','/api/webhook/stripe','94ms', 'iad1'],
                  ['GET', '/api/search',        '42ms', 'edge'],
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{color:'var(--accent)', width:60}}>{r[0]}</td>
                    <td style={{fontWeight:500}}>{r[1]}</td>
                    <td style={{color:'var(--fg-muted)', textAlign:'right'}}>{r[2]}</td>
                    <td style={{color:'var(--fg-subtle)', width:50, textAlign:'right'}}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="ascii-divider">{ascii}</div>

        <div className="row subtle mono" style={{fontSize:11, justifyContent:'space-between'}}>
          <span>orbit · 7 events · prod · iad1</span>
          <span>[j/k] navigate · [enter] open · [r] refresh · [q] quit</span>
        </div>
      </div>
    </div>
  );
}

window.ExperimentalView = ExperimentalView;
