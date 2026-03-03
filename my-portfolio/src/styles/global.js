export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');

[data-theme="light"]{--bg:#f9f8f5;--bg-card:#fff;--bg-muted:#f2f0eb;--ink:#0f0e0c;--ink2:#2c2a27;--muted:#7a7870;--muted2:#b5b3ad;--border:#e5e3de;--border2:#d0cdc6;--acc:#c45228;--acc-bg:rgba(196,82,40,.07);--nav-bg:rgba(249,248,245,.88);}
[data-theme="dark"]{--bg:#0e0d0b;--bg-card:#161512;--bg-muted:#1a1915;--ink:#eeecea;--ink2:#c5c3be;--muted:#6b6960;--muted2:#3d3c38;--border:#242320;--border2:#302f2c;--acc:#d96535;--acc-bg:rgba(217,101,53,.1);--nav-bg:rgba(14,13,11,.9);}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Instrument Sans',sans-serif;background:var(--bg);color:var(--ink);font-size:16px;line-height:1.6;overflow-x:hidden;overflow-y:auto;cursor:none;-webkit-font-smoothing:antialiased;transition:background .5s,color .5s}

/* ── Cursor ── */
#p-dot{position:fixed;z-index:9999;pointer-events:none;width:5px;height:5px;border-radius:50%;background:var(--ink);top:0;left:0;transform:translate(-50%,-50%);transition:background .4s,transform .15s}
#p-ring{position:fixed;z-index:9998;pointer-events:none;width:32px;height:32px;border-radius:50%;border:1px solid var(--muted2);top:0;left:0;transform:translate(-50%,-50%);transition:border-color .4s,width .45s cubic-bezier(.16,1,.3,1),height .45s cubic-bezier(.16,1,.3,1)}
body.ch #p-ring{width:50px;height:50px;border-color:var(--acc)}
body.ch #p-dot{background:var(--acc);transform:translate(-50%,-50%) scale(1.5)}

/* ── Header ── */
.p-hdr{position:fixed;inset:0 0 auto;z-index:200;height:64px;padding:0 52px;display:flex;align-items:center;justify-content:space-between;transition:background .4s,backdrop-filter .4s,border-color .4s}
.p-hdr.stuck{background:var(--nav-bg);backdrop-filter:blur(24px) saturate(1.4);border-bottom:1px solid var(--border)}
.p-logo{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:1.05rem;font-weight:400;color:var(--ink);letter-spacing:-.01em;background:none;border:none;cursor:none;padding:0}
.p-logo em{font-style:italic;color:var(--acc)}
.p-nav{display:flex;align-items:center;gap:36px}
.p-nav button{font-family:'DM Mono',monospace;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:none;padding:0;transition:color .25s}
.p-nav button:hover,.p-nav button.active{color:var(--ink)}
.p-nav button.active{color:var(--acc)}
.p-hright{display:flex;align-items:center;gap:20px}
.p-gh{display:flex;align-items:center;gap:7px;font-family:'DM Mono',monospace;font-size:.66rem;letter-spacing:.06em;color:var(--muted);text-decoration:none;border:1px solid var(--border);padding:6px 14px;border-radius:100px;transition:color .25s,border-color .25s,background .25s}
.p-gh:hover{color:var(--ink);border-color:var(--border2);background:var(--bg-muted)}
.p-gh svg{width:13px;height:13px;fill:currentColor}
.p-tbtn{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:var(--bg-muted);display:flex;align-items:center;justify-content:center;cursor:none;font-size:14px;line-height:1;transition:border-color .25s,background .25s}
.p-tbtn:hover{border-color:var(--border2);background:var(--bg-card)}

/* ── Layout ── */
.p-sec{padding:100px 52px}
.p-sec+.p-sec{border-top:1px solid var(--border)}
.p-slabel{display:flex;align-items:center;gap:16px;margin-bottom:56px}
.p-stag{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:4px 10px;border-radius:100px}
.p-srule{flex:1;height:1px;background:var(--border)}

/* ── Hero ── */
.p-hero{min-height:100vh;display:flex;flex-direction:column;justify-content:space-between;padding:128px 52px 0;position:relative;overflow-x:hidden}
.p-hero::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:72px 72px;opacity:.4;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)}
.p-hero-content{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px;position:relative;z-index:1}
.p-hero-tag{display:inline-flex;align-items:center;gap:10px;font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin-bottom:36px;animation:fadeUp .6s ease .05s both}
.p-hero-tag::before{content:'';width:20px;height:1px;background:var(--acc)}
.p-hero-hl{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(52px,8.5vw,128px);font-weight:300;line-height:.94;letter-spacing:-.025em;color:var(--ink);animation:fadeUp .75s ease .15s both}
.p-hero-hl em{font-style:italic;color:var(--acc)}
.p-hero-sub{display:flex;align-items:flex-start;gap:48px;margin-top:40px;animation:fadeUp .6s ease .35s both}
.p-hero-desc{font-size:1rem;line-height:1.75;color:var(--muted);max-width:380px}
.p-hero-desc strong{color:var(--ink2);font-weight:500}
.p-hero-cta{display:flex;flex-direction:column;gap:12px;align-items:flex-start;flex-shrink:0}
.p-hero-bar{display:flex;align-items:center;justify-content:space-between;padding:24px 0;border-top:1px solid var(--border);flex-shrink:0;position:relative;z-index:1;animation:fadeUp .6s ease .55s both}
.p-stat{display:flex;flex-direction:column;gap:2px}
.p-stat-n{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:1.5rem;font-weight:300;letter-spacing:-.02em;color:var(--ink)}
.p-stat-n em{font-style:italic;color:var(--acc)}
.p-stat-l{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.p-bardiv{width:1px;height:32px;background:var(--border)}

/* ── Buttons ── */
.p-btn{display:inline-flex;align-items:center;gap:10px;padding:12px 24px;background:var(--ink);color:var(--bg);font-family:'Instrument Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:.02em;border:none;border-radius:6px;cursor:none;position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s}
.p-btn::after{content:'';position:absolute;inset:0;background:var(--acc);transform:translateX(-101%);transition:transform .45s cubic-bezier(.16,1,.3,1);border-radius:6px}
.p-btn span{position:relative;z-index:1}
.p-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.12)}
.p-btn:hover::after{transform:translateX(0)}
.p-ghost{display:inline-flex;align-items:center;gap:8px;font-family:'DM Mono',monospace;font-size:.66rem;font-weight:500;letter-spacing:.08em;color:var(--muted);background:none;border:none;cursor:none;padding:0;text-decoration:none;transition:color .25s}
.p-ghost:hover{color:var(--ink)}
.p-ghost .arr{display:inline-block;transition:transform .3s cubic-bezier(.16,1,.3,1)}
.p-ghost:hover .arr{transform:translateX(5px)}
.p-outline{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:transparent;color:var(--ink);border:1px solid var(--border);font-family:'Instrument Sans',sans-serif;font-size:.82rem;font-weight:500;text-decoration:none;border-radius:6px;cursor:none;transition:border-color .25s,background .25s}
.p-outline:hover{border-color:var(--border2);background:var(--bg-muted)}

/* ── About ── */
.p-about-grid{display:grid;grid-template-columns:1fr 320px;gap:80px;align-items:start}
.p-about-body p{font-size:1.05rem;line-height:1.85;color:var(--ink2);margin-bottom:20px}
.p-about-body p:last-child{margin-bottom:0}
.p-about-body strong{color:var(--ink);font-weight:600}
.p-panel{display:flex;flex-direction:column}
.p-irow{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid var(--border)}
.p-irow:last-child{border-bottom:none}
.p-ikey{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.p-ival{font-size:.88rem;font-weight:500;color:var(--ink2);text-align:right}
.p-ival a{color:var(--acc);text-decoration:none}
.p-sdot{display:inline-flex;align-items:center;gap:6px}
.p-sdot::before{content:'';width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulseDot 2s ease-in-out infinite}

/* ── Project List ── */
.p-plist{display:flex;flex-direction:column}
.p-pitem{display:grid;grid-template-columns:56px 1fr auto;gap:28px;align-items:center;padding:28px 0;border-bottom:1px solid var(--border);text-decoration:none;color:inherit;cursor:none;position:relative;transition:background .3s}
.p-pitem:first-child{border-top:1px solid var(--border)}
.p-pitem::before{content:'';position:absolute;inset:0 -52px;background:var(--bg-muted);opacity:0;transition:opacity .3s;pointer-events:none}
.p-pitem:hover::before{opacity:1}
.p-pitem > *{position:relative}
.p-pnum{font-family:'Fraunces',serif;font-optical-sizing:auto;font-style:italic;font-size:.82rem;color:var(--muted2)}
.p-pname{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(18px,2.2vw,26px);font-weight:400;letter-spacing:-.015em;color:var(--ink);margin-bottom:6px;transition:color .25s}
.p-pitem:hover .p-pname{color:var(--acc)}
.p-pmeta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px}
.p-ptag{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:3px 8px;border-radius:100px}
.p-pdesc{font-size:.88rem;color:var(--muted)}
.p-pright{display:flex;align-items:center;gap:16px}
.p-pstatus{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
.p-pstatus.live{color:#22c55e;display:flex;align-items:center;gap:5px}
.p-pstatus.live::before{content:'';width:5px;height:5px;border-radius:50%;background:#22c55e;animation:pulseDot 2s ease-in-out infinite}
.p-parr{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;transition:border-color .25s,background .25s,transform .35s cubic-bezier(.16,1,.3,1)}
.p-parr svg{width:14px;height:14px;stroke:var(--muted);fill:none;stroke-width:1.5;transition:stroke .25s}
.p-pitem:hover .p-parr{border-color:var(--acc);background:var(--acc-bg);transform:rotate(-35deg)}
.p-pitem:hover .p-parr svg{stroke:var(--acc)}
.p-pitem.dis{cursor:default}
.p-pitem.dis:hover::before{opacity:0}
.p-pitem.dis:hover .p-pname{color:var(--ink)}
.p-pitem.dis:hover .p-parr{border-color:var(--border);background:transparent;transform:none}
.p-pitem.dis:hover .p-parr svg{stroke:var(--muted)}

/* ── Skills Grid ── */
.p-sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--border);border:1px solid var(--border)}
.p-sblock{background:var(--bg);padding:36px 40px;transition:background .3s}
.p-sblock:hover{background:var(--bg-card)}
.p-shead{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:20px}
.p-sname{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:1.2rem;font-weight:400;letter-spacing:-.01em;color:var(--ink)}
.p-spct{font-family:'DM Mono',monospace;font-size:.7rem;color:var(--acc);letter-spacing:.04em}
.p-strack{height:1px;background:var(--border2);margin-bottom:18px;position:relative;overflow:visible}
.p-sfill{position:absolute;top:0;left:0;height:100%;background:var(--acc);width:0;transition:width 1.4s cubic-bezier(.16,1,.3,1)}
.p-sfill::after{content:'';position:absolute;right:-3px;top:-3px;width:7px;height:7px;border-radius:50%;background:var(--acc)}
.p-schips{display:flex;flex-wrap:wrap;gap:6px}
.p-schip{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:4px 10px;border-radius:100px;background:var(--bg-muted)}

/* ── Contact ── */
.p-cgrid{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.p-cey{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin-bottom:20px}
.p-chl{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(28px,3.2vw,44px);font-weight:300;letter-spacing:-.02em;line-height:1.15;color:var(--ink);margin-bottom:20px}
.p-chl em{font-style:italic;color:var(--acc)}
.p-cbody{font-size:.97rem;line-height:1.8;color:var(--muted);margin-bottom:40px}
.p-clinks{display:flex;flex-direction:column;gap:1px}
.p-clink{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:var(--bg-card);border:1px solid var(--border);text-decoration:none;color:inherit;cursor:none;transition:border-color .25s,background .25s,transform .35s cubic-bezier(.16,1,.3,1)}
.p-clink:hover{border-color:var(--border2);background:var(--bg-muted);transform:translateX(6px)}
.p-clink-l{display:flex;align-items:center;gap:14px}
.p-cico{width:32px;height:32px;border-radius:8px;background:var(--bg-muted);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;transition:background .25s}
.p-clink:hover .p-cico{background:var(--acc-bg);border-color:var(--acc)}
.p-cico svg{width:14px;height:14px;fill:var(--acc)}
.p-clabel{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:1px}
.p-cval{font-size:.88rem;font-weight:500;color:var(--ink2)}
.p-carr svg{width:14px;height:14px;stroke:var(--muted2);fill:none;stroke-width:1.5;transition:stroke .25s,transform .3s}
.p-clink:hover .p-carr svg{stroke:var(--acc);transform:translateX(3px)}

/* ── Form ── */
.p-form{display:flex;flex-direction:column;gap:16px}
.p-ffield{display:flex;flex-direction:column;gap:6px}
.p-flabel{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.p-finput,.p-ftextarea{width:100%;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:6px;color:var(--ink);font-family:'Instrument Sans',sans-serif;font-size:.92rem;outline:none;transition:border-color .25s,box-shadow .25s}
.p-finput:focus,.p-ftextarea:focus{border-color:var(--acc);box-shadow:0 0 0 3px var(--acc-bg)}
.p-ftextarea{height:120px;resize:none}
.p-finput::placeholder,.p-ftextarea::placeholder{color:var(--muted2)}
.p-fsubmit{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:var(--ink);color:var(--bg);border:none;font-family:'Instrument Sans',sans-serif;font-size:.85rem;font-weight:600;border-radius:6px;cursor:none;align-self:flex-start;position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s}
.p-fsubmit::after{content:'';position:absolute;inset:0;background:var(--acc);transform:translateX(-101%);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.p-fsubmit span{position:relative;z-index:1}
.p-fsubmit:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.12)}
.p-fsubmit:hover::after{transform:translateX(0)}
.p-fsuccess{padding:12px 16px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:6px;font-size:.85rem;color:#16a34a}
[data-theme="dark"] .p-fsuccess{color:#4ade80}

/* ── Intro Banner (About/Work pages) ── */
.p-intro{padding:160px 52px 80px;border-bottom:1px solid var(--border);position:relative;overflow-x:hidden}
.p-intro::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:72px 72px;opacity:.4;mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,black 40%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,black 40%,transparent 100%)}
.p-intro-inner{position:relative;z-index:1}
.p-intro-eye{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin-bottom:24px;animation:fadeUp .6s ease .05s both}
.p-intro-title{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(52px,8vw,112px);font-weight:300;line-height:.94;letter-spacing:-.025em;color:var(--ink);animation:fadeUp .75s ease .15s both}
.p-intro-title em{font-style:italic;color:var(--acc)}
.p-intro-sub{font-size:1rem;line-height:1.75;color:var(--muted);max-width:480px;margin-top:28px;animation:fadeUp .6s ease .3s both}

/* ── Journey List (About page) ── */
.p-jlist{display:flex;flex-direction:column}
.p-jitem{display:grid;grid-template-columns:80px 1fr;border-bottom:1px solid var(--border);position:relative;transition:background .3s}
.p-jitem:first-child{border-top:1px solid var(--border)}
.p-jitem::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--acc);transform:scaleY(0);transform-origin:top;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.p-jitem:hover::before{transform:scaleY(1)}
.p-jitem:hover{background:var(--bg-muted)}
.p-jnum{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:1.4rem;font-style:italic;font-weight:300;color:var(--muted2);display:flex;align-items:flex-start;padding:36px 0 32px 52px}
.p-jbody{padding:32px 52px 32px 28px;border-left:1px solid var(--border)}
.p-jtitle{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:1.2rem;font-weight:400;letter-spacing:-.01em;color:var(--ink);margin-bottom:10px}
.p-jtext{font-size:.93rem;line-height:1.85;color:var(--muted)}

/* ── Philosophy Block ── */
.p-phil{background:var(--bg-card);border:1px solid var(--border);padding:56px;position:relative;overflow:hidden}
.p-phil::after{content:'"';position:absolute;right:-20px;bottom:-60px;font-family:'Fraunces',serif;font-optical-sizing:auto;font-style:italic;font-size:20rem;color:var(--border);line-height:1;pointer-events:none}
.p-phil-q{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(1.2rem,2.5vw,1.8rem);font-weight:300;font-style:italic;line-height:1.4;letter-spacing:-.01em;color:var(--ink);margin-bottom:28px;max-width:640px}
.p-phil-b{font-size:.97rem;line-height:1.9;color:var(--muted);max-width:600px;margin-top:16px}

/* ── CTA Block ── */
.p-cta{text-align:center;padding:80px 52px}
.p-cta-title{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(2rem,4.5vw,3.5rem);font-weight:300;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
.p-cta-title em{font-style:italic;color:var(--acc)}
.p-cta-body{font-size:.97rem;line-height:1.8;color:var(--muted);margin-bottom:32px}
.p-cta-btns{display:flex;align-items:center;gap:16px;justify-content:center;flex-wrap:wrap}

/* ── Project Cards (Web / App pages) ── */
.p-cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1px;background:var(--border);border:1px solid var(--border)}
.p-card{background:var(--bg);padding:36px 32px;display:flex;flex-direction:column;gap:20px;transition:background .3s;position:relative;overflow:hidden}
.p-card:hover{background:var(--bg-card)}
.p-card-badge{display:inline-flex;align-items:center;gap:6px;font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:3px 10px;border-radius:100px;width:fit-content}
.p-card-badge.live{color:#22c55e;border-color:rgba(34,197,94,.3)}
.p-card-badge.live::before{content:'';width:5px;height:5px;border-radius:50%;background:#22c55e;animation:pulseDot 2s ease-in-out infinite}
.p-card-badge.soon{color:var(--muted)}
.p-card-badge.progress{color:#f59e0b;border-color:rgba(245,158,11,.3)}
.p-card-num{font-family:'Fraunces',serif;font-optical-sizing:auto;font-style:italic;font-size:.75rem;color:var(--muted2)}
.p-card-title{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(1.1rem,1.8vw,1.5rem);font-weight:400;letter-spacing:-.015em;color:var(--ink);line-height:1.2}
.p-card-desc{font-size:.88rem;line-height:1.75;color:var(--muted);flex:1}
.p-card-tags{display:flex;flex-wrap:wrap;gap:6px}
.p-card-tag{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:3px 8px;border-radius:100px;background:var(--bg-muted)}
.p-card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid var(--border)}
.p-card-link{display:inline-flex;align-items:center;gap:6px;font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--acc);text-decoration:none;transition:gap .3s}
.p-card-link:hover{gap:10px}
.p-card-link svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2}
.p-card-soon{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted2)}

/* ── Footer ── */
.p-footer{border-top:1px solid var(--border);padding:28px 52px;display:flex;align-items:center;justify-content:space-between}
.p-flogo{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:.95rem;font-weight:400;color:var(--muted)}
.p-flogo em{font-style:italic;color:var(--acc)}
.p-fcopy{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.08em;color:var(--muted2)}
.p-flinks{display:flex;gap:20px}
.p-flinks button{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:none;transition:color .25s}
.p-flinks button:hover{color:var(--ink)}

/* ── Reveal Animation ── */
.p-rev{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.p-rev.vis{opacity:1;transform:none}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulseDot{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(34,197,94,.4)}50%{opacity:.8;box-shadow:0 0 0 5px rgba(34,197,94,0)}}

/* ── Responsive ── */
@media(max-width:900px){
  .p-hdr{padding:0 22px}
  .p-nav{display:none}
  .p-hero{padding:100px 22px 0}
  .p-sec{padding:72px 22px}
  .p-about-grid{grid-template-columns:1fr;gap:48px}
  .p-cgrid{grid-template-columns:1fr;gap:48px}
  .p-sgrid{grid-template-columns:1fr}
  .p-hero-sub{flex-direction:column;gap:24px}
  .p-pitem{grid-template-columns:40px 1fr auto;gap:16px}
  .p-intro{padding:110px 22px 60px}
  .p-jitem{grid-template-columns:1fr}
  .p-jnum{padding:20px 22px 0}
  .p-jbody{padding:8px 22px 20px;border-left:none;border-top:1px solid var(--border)}
  .p-phil{padding:36px 22px}
  .p-cta{padding:60px 22px}
  .p-footer{flex-direction:column;gap:12px;text-align:center;padding:22px}
  .p-cards-grid{grid-template-columns:1fr}
}
@media(max-width:600px){
  .p-hero-bar{flex-wrap:wrap;gap:20px}
  .p-bardiv{display:none}
}
@media(max-width:480px){
  .p-pstatus{display:none}
}
`;

// Inject CSS + sync theme before first paint
export function injectGlobalStyles() {
  if (typeof document === "undefined") return;
  const id = "p-global-css";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  const saved = (() => { try { return localStorage.getItem("t") || "light"; } catch { return "light"; } })();
  document.documentElement.setAttribute("data-theme", saved);
}
