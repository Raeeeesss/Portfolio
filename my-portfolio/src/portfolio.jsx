import React, { useState, useEffect, useCallback, useRef } from "react";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');
[data-theme="light"]{--bg:#f9f8f5;--bg-card:#fff;--bg-muted:#f2f0eb;--ink:#0f0e0c;--ink2:#2c2a27;--muted:#7a7870;--muted2:#b5b3ad;--border:#e5e3de;--border2:#d0cdc6;--acc:#c45228;--acc-bg:rgba(196,82,40,.07);--nav-bg:rgba(249,248,245,.88);}
[data-theme="dark"]{--bg:#0e0d0b;--bg-card:#161512;--bg-muted:#1a1915;--ink:#eeecea;--ink2:#c5c3be;--muted:#6b6960;--muted2:#3d3c38;--border:#242320;--border2:#302f2c;--acc:#d96535;--acc-bg:rgba(217,101,53,.1);--nav-bg:rgba(14,13,11,.9);}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Instrument Sans',sans-serif;background:var(--bg);color:var(--ink);font-size:16px;line-height:1.6;overflow-x:hidden;overflow-y:auto;cursor:none;-webkit-font-smoothing:antialiased;transition:background .5s,color .5s}
#p-dot{position:fixed;z-index:9999;pointer-events:none;width:5px;height:5px;border-radius:50%;background:var(--ink);top:0;left:0;transform:translate(-50%,-50%);transition:background .4s,transform .15s}
#p-ring{position:fixed;z-index:9998;pointer-events:none;width:32px;height:32px;border-radius:50%;border:1px solid var(--muted2);top:0;left:0;transform:translate(-50%,-50%);transition:border-color .4s,width .45s cubic-bezier(.16,1,.3,1),height .45s cubic-bezier(.16,1,.3,1)}
body.ch #p-ring{width:50px;height:50px;border-color:var(--acc)}
body.ch #p-dot{background:var(--acc);transform:translate(-50%,-50%) scale(1.5)}
.p-hdr{position:fixed;inset:0 0 auto;z-index:200;height:64px;padding:0 52px;display:flex;align-items:center;justify-content:space-between;transition:background .4s,backdrop-filter .4s,border-color .4s}
.p-hdr.stuck{background:var(--nav-bg);backdrop-filter:blur(24px) saturate(1.4);border-bottom:1px solid var(--border)}
.p-logo{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:1.05rem;font-weight:400;color:var(--ink);letter-spacing:-.01em;background:none;border:none;cursor:none;padding:0}
.p-logo em{font-style:italic;color:var(--acc)}
.p-nav{display:flex;align-items:center;gap:36px}
.p-nav button{font-family:'DM Mono',monospace;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:none;padding:0;transition:color .25s}
.p-nav button:hover{color:var(--ink)}
.p-hright{display:flex;align-items:center;gap:20px}
.p-gh{display:flex;align-items:center;gap:7px;font-family:'DM Mono',monospace;font-size:.66rem;letter-spacing:.06em;color:var(--muted);text-decoration:none;border:1px solid var(--border);padding:6px 14px;border-radius:100px;transition:color .25s,border-color .25s,background .25s}
.p-gh:hover{color:var(--ink);border-color:var(--border2);background:var(--bg-muted)}
.p-gh svg{width:13px;height:13px;fill:currentColor}
.p-tbtn{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:var(--bg-muted);display:flex;align-items:center;justify-content:center;cursor:none;font-size:14px;line-height:1;transition:border-color .25s,background .25s}
.p-tbtn:hover{border-color:var(--border2);background:var(--bg-card)}
.p-sec{padding:100px 52px}
.p-sec+.p-sec{border-top:1px solid var(--border)}
.p-slabel{display:flex;align-items:center;gap:16px;margin-bottom:56px}
.p-stag{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:4px 10px;border-radius:100px}
.p-srule{flex:1;height:1px;background:var(--border)}
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
.p-intro{padding:160px 52px 80px;border-bottom:1px solid var(--border);position:relative;overflow-x:hidden}
.p-intro::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:72px 72px;opacity:.4;mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,black 40%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,black 40%,transparent 100%)}
.p-intro-inner{position:relative;z-index:1}
.p-intro-eye{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin-bottom:24px;animation:fadeUp .6s ease .05s both}
.p-intro-title{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(52px,8vw,112px);font-weight:300;line-height:.94;letter-spacing:-.025em;color:var(--ink);animation:fadeUp .75s ease .15s both}
.p-intro-title em{font-style:italic;color:var(--acc)}
.p-intro-sub{font-size:1rem;line-height:1.75;color:var(--muted);max-width:480px;margin-top:28px;animation:fadeUp .6s ease .3s both}
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
.p-phil{background:var(--bg-card);border:1px solid var(--border);padding:56px;position:relative;overflow:hidden}
.p-phil::after{content:'"';position:absolute;right:-20px;bottom:-60px;font-family:'Fraunces',serif;font-optical-sizing:auto;font-style:italic;font-size:20rem;color:var(--border);line-height:1;pointer-events:none}
.p-phil-q{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(1.2rem,2.5vw,1.8rem);font-weight:300;font-style:italic;line-height:1.4;letter-spacing:-.01em;color:var(--ink);margin-bottom:28px;max-width:640px}
.p-phil-b{font-size:.97rem;line-height:1.9;color:var(--muted);max-width:600px;margin-top:16px}
.p-cta{text-align:center;padding:80px 52px}
.p-cta-title{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:clamp(2rem,4.5vw,3.5rem);font-weight:300;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
.p-cta-title em{font-style:italic;color:var(--acc)}
.p-cta-body{font-size:.97rem;line-height:1.8;color:var(--muted);margin-bottom:32px}
.p-cta-btns{display:flex;align-items:center;gap:16px;justify-content:center;flex-wrap:wrap}
.p-footer{border-top:1px solid var(--border);padding:28px 52px;display:flex;align-items:center;justify-content:space-between}
.p-flogo{font-family:'Fraunces',serif;font-optical-sizing:auto;font-size:.95rem;font-weight:400;color:var(--muted)}
.p-flogo em{font-style:italic;color:var(--acc)}
.p-fcopy{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.08em;color:var(--muted2)}
.p-flinks{display:flex;gap:20px}
.p-flinks button{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:none;transition:color .25s}
.p-flinks button:hover{color:var(--ink)}
.p-rev{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.p-rev.vis{opacity:1;transform:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulseDot{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(34,197,94,.4)}50%{opacity:.8;box-shadow:0 0 0 5px rgba(34,197,94,0)}}
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
}
@media(max-width:600px){
  .p-hero-bar{flex-wrap:wrap;gap:20px}
  .p-bardiv{display:none}
}
@media(max-width:480px){
  .p-pstatus{display:none}
}
`;

// ─── Inject CSS + initial theme synchronously before any React paint ──────────
// This eliminates the flash of unstyled content entirely.
if (typeof document !== "undefined") {
  const id = "p-global-css";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  const savedTheme = (() => { try { return localStorage.getItem("t") || "light"; } catch { return "light"; } })();
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("t") || "light"; } catch { return "light"; }
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("t", theme); } catch { /* ignore */ }
  }, [theme]);
  const toggle = useCallback(() => setTheme(t => (t === "light" ? "dark" : "light")), []);
  return [theme, toggle];
}

function useCursor() {
  useEffect(() => {
    const dot = document.getElementById("p-dot");
    const ring = document.getElementById("p-ring");
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    function onMove(e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    }
    function loop() {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    }
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
}

function useHoverCursor() {
  // MutationObserver handles dynamic elements — [] is correct here
  useEffect(() => {
    function on() { document.body.classList.add("ch"); }
    function off() { document.body.classList.remove("ch"); }
    function attach() {
      document.querySelectorAll("a, button, .p-pitem, .p-clink, .p-jitem").forEach(el => {
        el.removeEventListener("mouseenter", on);
        el.removeEventListener("mouseleave", off);
        el.addEventListener("mouseenter", on);
        el.addEventListener("mouseleave", off);
      });
    }
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);
}

function useScrollHeader() {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    function h() { setStuck(window.scrollY > 20); }
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return stuck;
}

// FIX: [] deps — observer is created once on mount, not every render.
// rAF ensures elements are fully laid out before observing.
function useReveal() {
  useEffect(() => {
    let obs;
    const raf = requestAnimationFrame(() => {
      obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
      document.querySelectorAll(".p-rev:not(.vis)").forEach(el => obs.observe(el));
    });
    return () => { cancelAnimationFrame(raf); if (obs) obs.disconnect(); };
  }, []);
}

// FIX: [] deps, same rAF pattern
function useSkillBars() {
  useEffect(() => {
    let obs;
    const raf = requestAnimationFrame(() => {
      obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".p-sfill").forEach(b => { b.style.width = b.dataset.w + "%"; });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      document.querySelectorAll(".p-sgrid").forEach(el => obs.observe(el));
    });
    return () => { cancelAnimationFrame(raf); if (obs) obs.disconnect(); };
  }, []);
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconGH() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function SkillsGrid() {
  const skills = [
    { name: "Python Back-End", pct: 55, chips: ["Python", "Django", "Flask", "REST APIs"] },
    { name: "Front-End",        pct: 60, chips: ["HTML5", "CSS3", "JavaScript"] },
    { name: "AI / ML",          pct: 15, chips: ["Python", "NumPy", "Learning phase"] },
    { name: "Database & Tools", pct: 50, chips: ["MySQL", "SQLite", "Git", "VS Code"] },
  ];
  return (
    <div className="p-sgrid">
      {skills.map(s => (
        <div className="p-sblock" key={s.name}>
          <div className="p-shead">
            <div className="p-sname">{s.name}</div>
            <div className="p-spct">{s.pct}%</div>
          </div>
          <div className="p-strack">
            <div className="p-sfill" data-w={s.pct} style={{ width: 0 }} />
          </div>
          <div className="p-schips">
            {s.chips.map(c => <span className="p-schip" key={c}>{c}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjItem({ num, name, tags, desc, status, href, onClick, disabled }) {
  const statusLabel = status === "live" ? "Live" : status === "soon" ? "Publishing soon" : status === "progress" ? "In progress" : status;
  const inner = (
    <>
      <div className="p-pnum">{num}</div>
      <div>
        <div className="p-pname">{name}</div>
        <div className="p-pmeta">{tags.map(t => <span className="p-ptag" key={t}>{t}</span>)}</div>
        <div className="p-pdesc">{desc}</div>
      </div>
      <div className="p-pright">
        <span className={"p-pstatus" + (status === "live" ? " live" : "")}>{statusLabel}</span>
        <div className="p-parr"><IconArrow /></div>
      </div>
    </>
  );
  if (disabled) return <div className="p-pitem dis">{inner}</div>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className="p-pitem">{inner}</a>;
  return <div className="p-pitem" style={{ cursor: "none" }} onClick={onClick}>{inner}</div>;
}

// FIX: Single nav() helper replaces the messy page-conditional nav blocks.
// Handles same-page scroll AND cross-page navigate+scroll cleanly.
function Header({ theme, toggleTheme, page, go }) {
  const stuck = useScrollHeader();

  function nav(targetPage, scrollId) {
    if (page === targetPage) {
      const el = document.getElementById(scrollId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      go(targetPage, scrollId);
    }
  }

  return (
    <header className={"p-hdr" + (stuck ? " stuck" : "")}>
      <button className="p-logo" onClick={() => go("home")}>
        Mohammed <em>Raees</em>
      </button>
      <nav className="p-nav">
        <button onClick={() => nav("home", "about")}>About</button>
        <button onClick={() => nav("home", "projects")}>Work</button>
        <button onClick={() => nav("home", "skills")}>Skills</button>
        <button onClick={() => nav("home", "contact")}>Contact</button>
      </nav>
      <div className="p-hright">
        <a href="https://github.com/Raeeeesss" target="_blank" rel="noreferrer" className="p-gh">
          <IconGH />
          GitHub
        </a>
        <button className="p-tbtn" onClick={toggleTheme}>
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </div>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="p-footer">
      <div className="p-flogo">Mohammed <em>Raees</em></div>
      <div className="p-fcopy">© 2025 — All rights reserved</div>
      <div className="p-flinks">
        <button onClick={() => go("home")}>Home</button>
        <button onClick={() => window.open("https://github.com/Raeeeesss", "_blank")}>GitHub</button>
        <button onClick={() => window.open("https://www.linkedin.com/in/mohammed-raees-9937b634a/", "_blank")}>LinkedIn</button>
        <button onClick={() => go("about")}>About</button>
      </div>
    </footer>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

const STATS = [
  { n: "5",  sup: "+", label: "Projects shipped" },
  { n: "3",  sup: "+", label: "Tech stacks" },
  { n: "19", sup: "",  label: "Years of age" },
  { n: "∞",  sup: "",  label: "Curiosity" },
];

function HomePage({ go }) {
  useReveal();
  useSkillBars();
  const [fname, setFname] = useState("");
  const [femail, setFemail] = useState("");
  const [fmsg, setFmsg] = useState("");
  const [sent, setSent] = useState(false);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function submit() {
    if (!fname.trim() || !femail.trim() || !fmsg.trim()) { alert("Please fill in all fields."); return; }
    setSent(true); setFname(""); setFemail(""); setFmsg("");
    setTimeout(() => setSent(false), 5000);
  }

  const projects = [
    {
      num: "01", name: "Expense Tracker",
      tags: ["HTML", "CSS", "JavaScript"],
      desc: "Course project — a full expense management web app with login, dashboard, and transaction tracking.",
      status: "live", href: "https://raeeeesss.github.io/EXPENCE-TRACKER/login.html",
    },
    {
      num: "02", name: "Browser Developments",
      tags: ["JavaScript", "CSS", "HTML5"],
      desc: "Websites and browser projects — publishing very soon.",
      status: "soon", disabled: true,
    },
    {
      num: "03", name: "AI / ML Exploration",
      tags: ["Python", "Machine Learning", "Beginner"],
      desc: "Just started — studying ML concepts, Python libraries, and building my first AI-powered mini projects.",
      status: "progress", disabled: true,
    },
  ];

  return (
    <>
      <section className="p-hero" id="home">
        <div className="p-hero-content">
          <div className="p-hero-tag">Available for opportunities</div>
          <h1 className="p-hero-hl">Mohammed<br /><em>Raees.</em></h1>
          <div className="p-hero-sub">
            <p className="p-hero-desc">
              <strong>Python Full-Stack Developer</strong> &amp; BCA student based in India. 19 years old, building with Python, JavaScript, and a deep curiosity for AI — one meaningful project at a time.
            </p>
            <div className="p-hero-cta">
              <button className="p-btn" onClick={() => scrollTo("projects")}><span>View my work →</span></button>
              <button className="p-ghost" onClick={() => go("about")}>Read full story <span className="arr">→</span></button>
              <a href="cv.pdf" download className="p-ghost" style={{ marginTop: 4 }}>
                <svg style={{ width: 13, height: 13, stroke: "currentColor", fill: "none", strokeWidth: 2, flexShrink: 0 }} viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV <span className="arr">↓</span>
              </a>
            </div>
          </div>
        </div>
        <div className="p-hero-bar">
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="p-bardiv" />}
              <div className="p-stat">
                <div className="p-stat-n">{s.n}{s.sup && <em>{s.sup}</em>}</div>
                <div className="p-stat-l">{s.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="p-sec" id="about">
        <div className="p-slabel p-rev">
          <div className="p-stag">01 — About</div>
          <div className="p-srule" />
        </div>
        <div className="p-about-grid">
          <div className="p-about-body p-rev">
            <p>I'm a 19-year-old developer <strong>&amp; BCA student</strong> from India, advancing in Full-Stack Development with a genuine passion for building real things. I believe the best way to learn is to <strong>ship — then ship again</strong>.</p>
            <p>Currently exploring the intersection of web development and I'm also beginning to explore <strong>AI and Machine Learning</strong> — just getting started, but genuinely excited by where it's going.</p>
            <p>I write clean, purposeful code and care deeply about the craft. Every project is a chance to raise the bar.</p>
          </div>
          <div className="p-panel p-rev" style={{ transitionDelay: "0.1s" }}>
            <div className="p-irow"><span className="p-ikey">Status</span><span className="p-ival"><span className="p-sdot">Open to work</span></span></div>
            <div className="p-irow"><span className="p-ikey">Location</span><span className="p-ival">India</span></div>
            <div className="p-irow"><span className="p-ikey">Age</span><span className="p-ival">19</span></div>
            <div className="p-irow"><span className="p-ikey">Focus</span><span className="p-ival">Python Full-Stack</span></div>
            <div className="p-irow"><span className="p-ikey">Email</span><span className="p-ival"><a href="mailto:raeeeesss0@gmail.com">raeeeesss0@gmail.com</a></span></div>
          </div>
        </div>
      </section>

      <section className="p-sec" id="projects" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="p-slabel p-rev">
          <div className="p-stag">02 — Work</div>
          <div className="p-srule" />
        </div>
        <div className="p-plist">
          {projects.map((p, i) => (
            <div key={p.num} className="p-rev" style={{ transitionDelay: i * 0.05 + "s" }}>
              <ProjItem {...p} />
            </div>
          ))}
        </div>
      </section>

      <section className="p-sec" id="skills" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="p-slabel p-rev">
          <div className="p-stag">03 — Skills</div>
          <div className="p-srule" />
        </div>
        <div className="p-rev"><SkillsGrid /></div>
      </section>

      <section className="p-sec" id="contact" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="p-slabel p-rev">
          <div className="p-stag">04 — Contact</div>
          <div className="p-srule" />
        </div>
        <div className="p-cgrid">
          <div className="p-rev">
            <div className="p-cey">Get in touch</div>
            <h2 className="p-chl">Let's build<br />something <em>great.</em></h2>
            <p className="p-cbody">Open to collaboration, freelance work, learning opportunities, and new challenges. I respond to every message.</p>
            <div className="p-clinks">
              <a href="mailto:raeeeesss0@gmail.com" className="p-clink">
                <div className="p-clink-l"><div className="p-cico"><IconEmail /></div><div><div className="p-clabel">Email</div><div className="p-cval">raeeeesss0@gmail.com</div></div></div>
                <div className="p-carr"><IconArrow /></div>
              </a>
              <a href="https://github.com/Raeeeesss" target="_blank" rel="noreferrer" className="p-clink">
                <div className="p-clink-l"><div className="p-cico"><IconGH /></div><div><div className="p-clabel">GitHub</div><div className="p-cval">github.com/Raeeeesss</div></div></div>
                <div className="p-carr"><IconArrow /></div>
              </a>
              <a href="https://www.linkedin.com/in/mohammed-raees-9937b634a/" target="_blank" rel="noreferrer" className="p-clink">
                <div className="p-clink-l"><div className="p-cico"><IconLinkedIn /></div><div><div className="p-clabel">LinkedIn</div><div className="p-cval">mohammed-raees</div></div></div>
                <div className="p-carr"><IconArrow /></div>
              </a>
              <a href="tel:+918138082848" className="p-clink">
                <div className="p-clink-l"><div className="p-cico"><IconPhone /></div><div><div className="p-clabel">Phone</div><div className="p-cval">+91 81380 82848</div></div></div>
                <div className="p-carr"><IconArrow /></div>
              </a>
            </div>
          </div>
          <div className="p-rev" style={{ transitionDelay: "0.12s" }}>
            <div className="p-form">
              <div className="p-ffield">
                <label className="p-flabel">Your name</label>
                <input className="p-finput" placeholder="Alex Johnson" value={fname} onChange={e => setFname(e.target.value)} />
              </div>
              <div className="p-ffield">
                <label className="p-flabel">Email address</label>
                <input className="p-finput" type="email" placeholder="alex@example.com" value={femail} onChange={e => setFemail(e.target.value)} />
              </div>
              <div className="p-ffield">
                <label className="p-flabel">Message</label>
                <textarea className="p-ftextarea" placeholder="Tell me about your project or just say hello..." value={fmsg} onChange={e => setFmsg(e.target.value)} />
              </div>
              <button className="p-fsubmit" onClick={submit}><span>Send message →</span></button>
              {sent && <div className="p-fsuccess">✓ Message received. I'll get back to you shortly.</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ go }) {
  useReveal();
  useSkillBars();

  const journey = [
    { num: "01", title: "Python Full Stack — BCA Course", text: "Studying Python Full Stack Development as part of my BCA degree. Built my first real deployed web project — an Expense Tracker — with Python, HTML, CSS and JavaScript. Learning by shipping, not just reading." },
    { num: "02", title: "Browser Game — Publishing Soon", text: "Currently finishing a browser-based game using HTML5 Canvas and JavaScript. Implementing game loops, collision detection, and real-time player interaction. Releasing very soon." },
    { num: "03", title: "AI & Machine Learning — Early Steps", text: "Just beginning to explore AI and Machine Learning. Working through Python libraries, core ML concepts, and small experiments. Genuinely excited about where this path leads." },
    { num: "04", title: "More Projects in Development", text: "Several Python Full Stack web projects currently being built. Each one pushes my skills further — from database design to front-end polish. Coming soon." },
  ];

  return (
    <>
      <div className="p-intro">
        <div className="p-intro-inner">
          <div className="p-intro-eye">BCA Student · Python Full Stack Developer</div>
          <h1 className="p-intro-title">About<br /><em>Raees.</em></h1>
          <p className="p-intro-sub">BCA student specialising in Python Full Stack Development. Building real projects, exploring AI/ML, and growing one commit at a time.</p>
        </div>
      </div>

      <section className="p-sec">
        <div className="p-slabel p-rev">
          <div className="p-stag">01 — Journey</div>
          <div className="p-srule" />
        </div>
        <div className="p-jlist">
          {journey.map((j, i) => (
            <div className="p-jitem p-rev" style={{ transitionDelay: i * 0.07 + "s" }} key={j.num}>
              <div className="p-jnum">{j.num}</div>
              <div className="p-jbody">
                <div className="p-jtitle">{j.title}</div>
                <p className="p-jtext">{j.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-sec" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="p-slabel p-rev">
          <div className="p-stag">02 — Skills</div>
          <div className="p-srule" />
        </div>
        <div className="p-rev"><SkillsGrid /></div>
      </section>

      <section className="p-sec" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="p-slabel p-rev">
          <div className="p-stag">03 — Philosophy</div>
          <div className="p-srule" />
        </div>
        <div className="p-phil p-rev">
          <div className="p-phil-q">"Build, break, learn, repeat. Every failure is a lesson wearing a disguise."</div>
          <p className="p-phil-b">I'm a BCA student studying Python Full Stack Development in India. I believe the best way to truly learn is to build — not just follow tutorials, but to take on real projects, hit real problems, and find real solutions.</p>
          <p className="p-phil-b">I'm also just starting to explore AI and Machine Learning, which feels like the most exciting frontier in tech right now. My goal is to grow steadily — as a developer, a problem-solver, and someone who ships things that actually work.</p>
        </div>
      </section>

      <div className="p-cta">
        <div className="p-rev">
          <h2 className="p-cta-title">Let's work <em>together.</em></h2>
          <p className="p-cta-body">Open to collaboration, freelance opportunities, and meaningful new challenges.</p>
          <div className="p-cta-btns">
            <button className="p-btn" onClick={() => go("home", "contact")}><span>Get in touch →</span></button>
            <button className="p-outline" onClick={() => go("home", "projects")}>View my work</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [page, setPage] = useState("home");

  // FIX: pendingScroll holds a section id to scroll to after page transition.
  // Replaces unreliable setTimeout — scroll fires in useEffect after React
  // commits the new page, using double rAF to ensure full layout.
  const pendingScroll = useRef(null);

  useCursor();
  useHoverCursor();

  // FIX: go(targetPage, scrollId?) — optional scrollId for cross-page scroll
  const go = useCallback((targetPage, scrollId) => {
    if (scrollId) pendingScroll.current = scrollId;
    setPage(targetPage);
  }, []);

  // FIX: On page change: instant scroll-to-top, then handle pending section scroll.
  // Double rAF guarantees the new page DOM is fully laid out before scrolling.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const id = pendingScroll.current;
    if (id) {
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      });
    }
  }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
      <div id="p-dot" />
      <div id="p-ring" />
      <Header theme={theme} toggleTheme={toggleTheme} page={page} go={go} />
      <main>
        {page === "home"  && <HomePage  go={go} />}
        {page === "about" && <AboutPage go={go} />}
      </main>
      <Footer go={go} />
    </div>
  );
}
