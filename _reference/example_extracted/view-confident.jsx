// Confident variation — hero-led, sharp metrics, bigger type.

function ConfidentView() {
  const projects = [
    { name:'atlas-web', region:'iad1', domain:'atlas.orbit.app', status:'ok', latency:'42ms', req:'1.2M', cpu:42, branch:'main' },
    { name:'atlas-api', region:'sfo1', domain:'api.atlas.orbit.app', status:'ok', latency:'18ms', req:'4.8M', cpu:61, branch:'main' },
    { name:'atlas-edge', region:'global', domain:'edge.atlas.orbit.app', status:'warn', latency:'88ms', req:'680K', cpu:33, branch:'main' },
    { name:'atlas-admin', region:'iad1', domain:'admin.atlas.orbit.app', status:'ok', latency:'58ms', req:'14K', cpu:8, branch:'main' },
  ];
  const statusTxt = { ok:['ok','Operational'], warn:['warn','Degraded'], err:['err','Incident'] };

  return (
    <div className="view confident">
      <div className="page">
        <div className="hero">
          <div className="hero-main">
            <div className="hero-grid" />
            <div className="kicker" style={{position:'relative'}}>Orbit · platform</div>
            <h1 className="h1" style={{marginTop:10, position:'relative'}}>
              Ship code at the speed of thought.
            </h1>
            <div className="sub" style={{position:'relative'}}>
              Four services. One control plane. Deploy on push, preview on PR, promote with a click — with guardrails your security team actually trusts.
            </div>
            <div className="hero-cta" style={{position:'relative'}}>
              <Btn variant="accent" size="lg">Start a deployment</Btn>
              <Btn size="lg" variant="ghost">Open runbook</Btn>
              <div className="row" style={{marginLeft:12, color:'var(--fg-subtle)'}}>
                <Badge tone="ok" dot>all systems nominal</Badge>
              </div>
            </div>
          </div>
          <div className="hero-stat">
            <div>
              <div className="kicker">This month</div>
              <div className="big" style={{marginTop:10}}>1,842</div>
              <div className="muted" style={{marginTop:4, fontSize:13}}>deployments across 4 services</div>
            </div>
            <div style={{marginTop:20}}>
              <div className="row" style={{justifyContent:'space-between'}}>
                <span className="mono subtle" style={{fontSize:11}}>P50 BUILD</span>
                <span className="mono" style={{fontSize:12}}>47s</span>
              </div>
              <div className="row" style={{justifyContent:'space-between', marginTop:6}}>
                <span className="mono subtle" style={{fontSize:11}}>P95 BUILD</span>
                <span className="mono" style={{fontSize:12}}>2m 14s</span>
              </div>
              <div className="row" style={{justifyContent:'space-between', marginTop:6}}>
                <span className="mono subtle" style={{fontSize:11}}>ROLLBACKS</span>
                <span className="mono" style={{fontSize:12}}>3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-split">
          <Card title="Services" sub="4 projects · 3 regions" pad={false} actions={
            <Btn size="sm" icon={Icon.plus} variant="ghost">Add service</Btn>
          }>
            <table className="table">
              <thead><tr>
                <th>Service</th><th>Region</th><th>Status</th><th style={{textAlign:'right'}}>P50 latency</th><th style={{textAlign:'right'}}>Req · 24h</th><th style={{textAlign:'right'}}>CPU</th>
              </tr></thead>
              <tbody>
                {projects.map(p => {
                  const [tone, txt] = statusTxt[p.status];
                  return (
                    <tr key={p.name}>
                      <td>
                        <div className="dep-name">{p.name}</div>
                        <div className="dep-sha" style={{marginTop:2}}>{p.domain}</div>
                      </td>
                      <td className="mono" style={{color:'var(--fg-muted)'}}>{p.region}</td>
                      <td><Badge tone={tone} dot>{txt}</Badge></td>
                      <td className="mono" style={{textAlign:'right'}}>{p.latency}</td>
                      <td className="mono" style={{textAlign:'right', color:'var(--fg-muted)'}}>{p.req}</td>
                      <td style={{textAlign:'right'}}>
                        <div style={{display:'inline-flex', alignItems:'center', gap:8}}>
                          <div style={{width:60, height:4, background:'var(--bg-muted)', borderRadius:2, boxShadow:'var(--ring-1)', overflow:'hidden'}}>
                            <div style={{width:`${p.cpu}%`, height:'100%', background: p.cpu > 70 ? 'var(--warn)' : 'var(--accent)'}} />
                          </div>
                          <span className="mono" style={{fontSize:12, minWidth:28, textAlign:'right'}}>{p.cpu}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          <Card title="Quick start" sub="Wire up the CLI" pad={true}>
            <div className="code">
              <div><span className="c"># install the Orbit CLI</span></div>
              <div><span className="k">curl</span> -fsSL orbit.app/install <span className="n">|</span> sh</div>
              <div style={{marginTop:10}}><span className="c"># link an existing project</span></div>
              <div><span className="k">orbit</span> link <span className="s">./my-app</span></div>
              <div style={{marginTop:10}}><span className="c"># deploy a preview from your laptop</span></div>
              <div><span className="k">orbit</span> deploy <span className="n">--env</span>=<span className="s">preview</span></div>
            </div>
            <div className="mt-4 row">
              <Btn size="sm" variant="ghost">Copy</Btn>
              <Btn size="sm" variant="ghost">Open docs</Btn>
              <div style={{flex:1}} />
              <Badge tone="info" dot>CLI v3.4.1</Badge>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid-3">
          <Card title="Build queue" sub="3 in flight">
            <div className="col gap-3">
              {[
                { b:'feat/billing-v2', pct:78, eta:'22s' },
                { b:'fix/rate-limit', pct:34, eta:'1m 08s' },
                { b:'chore/deps', pct:12, eta:'1m 42s' },
              ].map((b, i) => (
                <div key={i}>
                  <div className="row" style={{justifyContent:'space-between'}}>
                    <span className="mono" style={{fontSize:12}}>{b.b}</span>
                    <span className="mono subtle" style={{fontSize:11}}>{b.eta}</span>
                  </div>
                  <div style={{width:'100%', height:3, background:'var(--bg-muted)', borderRadius:2, marginTop:6, overflow:'hidden', boxShadow:'var(--ring-1)'}}>
                    <div style={{width:`${b.pct}%`, height:'100%', background:'var(--accent)'}} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Uptime · 30d" sub="99.94% overall">
            <div style={{display:'flex', gap:2, alignItems:'flex-end', height:48}}>
              {Array.from({length:30}).map((_, i) => {
                const h = 28 + (i % 5) * 4 + (Math.sin(i) * 6);
                const bad = i === 18 || i === 22;
                return <div key={i} style={{flex:1, height: bad ? 12 : h, background: bad ? 'var(--warn)' : 'var(--accent)', opacity:0.85, borderRadius:1}} />;
              })}
            </div>
            <div className="row mt-4" style={{justifyContent:'space-between'}}>
              <span className="mono subtle" style={{fontSize:11}}>30d ago</span>
              <span className="mono subtle" style={{fontSize:11}}>today</span>
            </div>
          </Card>

          <Card title="Secrets rotation" sub="Next due in 4 days">
            <div className="col gap-2">
              {[
                ['STRIPE_WEBHOOK_KEY', 'rotated 3d', 'ok'],
                ['DATABASE_URL', 'rotated 11d', 'ok'],
                ['OPENAI_API_KEY', 'due in 4d', 'warn'],
                ['AUTH_SIGNING_SECRET', 'due in 12d', 'neutral'],
              ].map(([k, t, tone]) => (
                <div key={k} className="row" style={{justifyContent:'space-between'}}>
                  <span className="mono" style={{fontSize:12}}>{k}</span>
                  <Badge tone={tone}>{t}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

window.ConfidentView = ConfidentView;
