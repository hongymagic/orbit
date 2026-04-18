// Conservative variation — clean, restrained, maximum familiarity.

function ConservativeView() {
  const deployments = [
    { id:'dpl_x8Ra', name:'atlas-web', branch:'main', sha:'4e2a1b7', status:'ok', env:'Production', author:'Rhea Lin', time:'2m ago', duration:'1m 24s' },
    { id:'dpl_pK3m', name:'atlas-web', branch:'feat/billing-v2', sha:'9f1c8e3', status:'info', env:'Preview', author:'Kian Park', time:'14m ago', duration:'54s' },
    { id:'dpl_qL92', name:'atlas-api', branch:'fix/rate-limit', sha:'a7b02d4', status:'warn', env:'Preview', author:'Dana Soto', time:'42m ago', duration:'2m 08s' },
    { id:'dpl_mN04', name:'atlas-web', branch:'main', sha:'c45ff91', status:'err', env:'Production', author:'Rhea Lin', time:'1h ago', duration:'36s' },
    { id:'dpl_tR55', name:'atlas-edge', branch:'main', sha:'1e0a762', status:'ok', env:'Production', author:'bot · scheduler', time:'3h ago', duration:'48s' },
    { id:'dpl_zS18', name:'atlas-api', branch:'main', sha:'880fa0c', status:'ok', env:'Production', author:'Kian Park', time:'5h ago', duration:'1m 52s' },
  ];
  const statusMap = { ok:['ok','Ready'], info:['info','Building'], warn:['warn','Queued'], err:['err','Failed'] };
  const spark1 = [12,14,13,17,15,19,21,18,22,25,24,27,30,28];
  const spark2 = [8,9,9,10,11,12,11,12,13,12,13,14,13,14];
  const spark3 = [45,42,40,38,36,37,35,34,33,31,30,29,28,27];
  const spark4 = [99.1,99.3,99.2,99.4,99.5,99.6,99.5,99.7,99.6,99.8,99.7,99.8,99.9,99.9];

  return (
    <div className="view">
      <div className="page">
        <div className="page-head">
          <div>
            <div className="kicker">Project · atlas-web</div>
            <h1 className="h1" style={{marginTop:8}}>Deployments</h1>
            <div className="sub">Every push to a branch creates a preview. Promotion to production requires approval.</div>
          </div>
          <div className="row">
            <Btn icon={Icon.git} size="sm">Import Git repo</Btn>
            <Btn icon={Icon.plus} variant="primary" size="sm">New deployment</Btn>
          </div>
        </div>

        <div className="metric-grid">
          <Metric label="Deployments · 7d" value="247" delta="+18 vs prev week" deltaDir="up" data={spark1} />
          <Metric label="Avg build time" value="1m 12s" delta="−9s vs prev week" deltaDir="up" data={spark3} />
          <Metric label="Success rate" value="99.8%" delta="+0.2 pp" deltaDir="up" data={spark4} />
          <Metric label="Active branches" value="18" delta="+2 this week" deltaDir="up" data={spark2} />
        </div>

        <div className="mt-6" />
        <Card title="Recent deployments" sub="Last 24 hours" actions={<>
          <Btn size="sm" variant="ghost">All environments</Btn>
          <Btn size="sm" icon={Icon.dots} variant="ghost" />
        </>} pad={false}>
          <table className="table">
            <thead><tr>
              <th>Status</th><th>Project</th><th>Branch</th><th>Commit</th><th>Environment</th><th>Author</th><th style={{textAlign:'right'}}>Duration</th><th style={{textAlign:'right'}}>Age</th>
            </tr></thead>
            <tbody>
              {deployments.map(d => {
                const [tone, txt] = statusMap[d.status];
                return (
                  <tr key={d.id}>
                    <td><Badge tone={tone} dot>{txt}</Badge></td>
                    <td className="dep-name">{d.name}</td>
                    <td><span className="dep-branch">{d.branch}</span></td>
                    <td><span className="dep-sha">{d.sha}</span></td>
                    <td>{d.env === 'Production' ? <Badge tone="neutral">Production</Badge> : <Badge tone="info">Preview</Badge>}</td>
                    <td className="muted">{d.author}</td>
                    <td className="mono" style={{textAlign:'right', color:'var(--fg-muted)'}}>{d.duration}</td>
                    <td className="mono" style={{textAlign:'right', color:'var(--fg-subtle)'}}>{d.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="mt-6 grid-split">
          <Card title="Pipeline" sub="Develop → Preview → Ship" pad={true}>
            <div className="pipeline">
              <div className="pipeline-step step-dev">
                <div className="kicker">Develop</div>
                <div className="title">feat/billing-v2</div>
                <div className="sub">3 commits ahead · Kian Park</div>
              </div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step step-preview">
                <div className="kicker">Preview</div>
                <div className="title">dpl_pK3m · building</div>
                <div className="sub">ETA 22s · automated checks queued</div>
              </div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step step-ship">
                <div className="kicker">Ship</div>
                <div className="title">Requires approval</div>
                <div className="sub">2 reviewers · 1 check passing</div>
              </div>
            </div>
            <div className="mt-4 row">
              <Btn size="sm" variant="ghost">View checks</Btn>
              <Btn size="sm" variant="ghost">Runtime config</Btn>
              <div style={{flex:1}} />
              <Btn size="sm" variant="primary">Promote to production</Btn>
            </div>
          </Card>

          <Card title="Activity" sub="Team · today" pad={false}>
            <div className="activity">
              {[
                { a:'KP', actor:'Kian Park', verb:'opened PR', obj:'#482 feat/billing-v2', t:'14m' },
                { a:'RL', actor:'Rhea Lin', verb:'promoted', obj:'dpl_x8Ra → production', t:'2h' },
                { a:'DS', actor:'Dana Soto', verb:'rolled back', obj:'atlas-api to c45ff91', t:'3h' },
                { a:'··', actor:'scheduler', verb:'deployed', obj:'atlas-edge cron', t:'3h' },
                { a:'RL', actor:'Rhea Lin', verb:'updated secret', obj:'STRIPE_WEBHOOK_KEY', t:'5h' },
              ].map((e, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-avatar">{e.a}</div>
                  <div className="activity-msg">
                    <span className="actor">{e.actor}</span> <span className="muted">{e.verb}</span> <span className="obj">{e.obj}</span>
                  </div>
                  <div className="activity-time">{e.t}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Card title="Build output" sub="dpl_pK3m · feat/billing-v2 · building" actions={
            <Btn size="sm" variant="ghost" icon={Icon.dots} />
          }>
            <div className="console">
              <div className="log-row"><span className="log-time">14:22:01</span><span className="log-level ok">ready</span><span className="log-msg"><span className="k">$</span> installing dependencies · bun install</span></div>
              <div className="log-row"><span className="log-time">14:22:03</span><span className="log-level info">info</span><span className="log-msg">resolved 1,204 packages in 1.87s</span></div>
              <div className="log-row"><span className="log-time">14:22:04</span><span className="log-level info">info</span><span className="log-msg"><span className="k">$</span> next build · v16.0.2</span></div>
              <div className="log-row"><span className="log-time">14:22:09</span><span className="log-level info">info</span><span className="log-msg">collecting page data · 38 routes</span></div>
              <div className="log-row"><span className="log-time">14:22:14</span><span className="log-level ok">pass</span><span className="log-msg">type-check · 0 errors in 4.2s</span></div>
              <div className="log-row"><span className="log-time">14:22:21</span><span className="log-level warn">warn</span><span className="log-msg">route /api/webhook/stripe uses dynamic rendering</span></div>
              <div className="log-row"><span className="log-time">14:22:28</span><span className="log-level info">info</span><span className="log-msg">compiling edge functions · 12 functions · 418 KB</span></div>
              <div className="log-row"><span className="log-time">14:22:34</span><span className="log-level ok">pass</span><span className="log-msg">build · 1m 12s · bundle 1.1 MB (−38 KB from main)</span></div>
              <div className="log-row"><span className="log-time">14:22:35</span><span className="log-level info">info</span><span className="log-msg">deploying to preview · atlas-web-pk3m.orbit.app</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

window.ConservativeView = ConservativeView;
