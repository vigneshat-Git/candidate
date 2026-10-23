import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const skill='C:/Users/vicky/.codex/plugins/cache/openai-primary-runtime/presentations/26.1022.11436/skills/presentations';
const build=path.join(root,'tmp/presentations'),out=path.join(root,'submission/revenue_intelligence_inbox/slides');
await fs.mkdir(build,{recursive:true});await fs.mkdir(out,{recursive:true});
const p=Presentation.create({slideSize:{width:1280,height:720}});
const C={navy:'#111D2B',ink:'#192535',muted:'#647285',teal:'#0D9B8D',mint:'#DDF3EE',paper:'#F5F7F8',white:'#FFFFFF',line:'#E1E7EB',amber:'#F2B64A',red:'#CA6868',soft:'#EAF0F3',blue:'#647BCC'};
function rect(s,x,y,w,h,fill,round=false,line='none'){return s.shapes.add({geometry:round?'roundRect':'rect',position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill:line,width:line==='none'?0:1},borderRadius:round?'rounded-xl':undefined})}
function txt(s,x,y,w,h,text,size=18,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{style:'solid',fill:'none',width:0}});sh.text=text;sh.text.style={fontFamily:'Aptos',fontSize:size,color,bold,verticalAlignment:'middle',wrap:true};return sh}
function base(kicker,title,num){const s=p.slides.add();s.background.fill=C.paper;rect(s,0,0,1280,9,C.teal);txt(s,64,34,850,20,kicker.toUpperCase(),12,C.teal,true);txt(s,64,63,1120,48,title,32,C.ink,true);txt(s,64,678,800,16,'SIGNAL  /  REVENUE INTELLIGENCE INBOX  /  PRIVATE ASSESSMENT SAMPLE',10,C.muted,true);txt(s,1182,678,40,16,String(num).padStart(2,'0'),10,C.muted,true);return s}
function card(s,x,y,w,h,title,body,accent=C.teal){rect(s,x,y,w,h,C.white,true,C.line);rect(s,x,y,5,h,accent,true);txt(s,x+20,y+15,w-40,25,title,16,C.ink,true);txt(s,x+20,y+49,w-40,h-58,body,13,C.muted,false)}
// 1
{
 const s=p.slides.add();s.background.fill=C.navy;rect(s,64,61,54,54,C.teal,true);txt(s,64,62,54,52,'S',25,C.white,true);txt(s,64,156,900,24,'REVENUE INTELLIGENCE INBOX  /  PRIVATE HIRING EXERCISE',13,'#7DD9C9',true);txt(s,64,207,860,94,'One selected day.\nA queue of decisions.',43,C.white,true);txt(s,64,397,620,62,'21 August 2026  ·  Asia/Kolkata\nEvidence-led routing for calls and meetings',18,'#B8C5D0',false);rect(s,760,155,438,390,'#1B2C3B',true,'#344553');txt(s,800,185,360,25,'THE SAMPLE AT A GLANCE',12,'#91A3B2',true);[['44','unique sources'],['18','usable transcripts'],['40.9%','text coverage']].forEach((v,i)=>{const y=235+i*91;txt(s,800,y,130,47,v[0],34,i===1?'#7DD9C9':C.white,true);txt(s,944,y+12,210,25,v[1],15,'#BAC5CE',false);if(i<2)rect(s,800,y+63,350,1,'#344553')});txt(s,64,590,600,38,'Selected activity, not a team performance report.',16,'#91A3B2',false);txt(s,64,678,900,16,'SIGNAL  /  FIVE-SLIDE PRODUCT REVIEW',10,'#91A3B2',true);txt(s,1182,678,40,16,'01',10,'#91A3B2',true)
}
// 2
{
 const s=base('01  /  Manager problem','A queue that puts evidence before activity totals',2);
 card(s,64,137,350,148,'ACTIVITY','30 calls + 14 meetings\nOne day in Asia/Kolkata\nDistinct identity: (type, source ID)',C.teal);
 card(s,435,137,350,148,'TEXT COVERAGE','18 / 44 = 40.9% after update\n17 / 44 = 38.6% initially\nMissing text stays visible as intake.',C.blue);
 card(s,806,137,410,148,'REVIEW PRIORITY','M07: multiple reported product issues\nM06: one old unpaid exception\nM09: fresh invite still expired',C.red);
 txt(s,64,324,520,24,'THREE FINDINGS THAT SHAPED THE PRODUCT',12,C.teal,true);
 card(s,64,359,360,227,'01  PARTNER PATH','M01 · turn 21\nThe partner accepted a unique referral link after rejecting manual email introductions as hard to scale.\n\nProduct effect: Manager brief prioritises written terms, referral link and eligibility checklist.',C.teal);
 card(s,447,359,360,227,'02  COLLECTION EXCEPTION','M06 · turn 10\nOne expense-recovery invoice had been unpaid for months; the reason was still unknown.\n\nProduct effect: surfaced as an unresolved customer issue, not a confirmed product fit or fixed problem.',C.amber);
 card(s,830,359,386,227,'03  WORKAROUND ≠ FIX','M07 · turn 15\nThe alternate upload path worked, but added steps. The direct path still needed investigation.\n\nProduct effect: detail view keeps workaround and unresolved defect distinct.',C.red);
 txt(s,64,611,1150,28,'No pipeline value, win rate, or account relationship is inferred from conversation text.',13,C.muted,false)
}
// 3
{
 const s=base('02  /  Interface choices','A compact workspace for triage, evidence, and correction',3);
 card(s,64,145,555,192,'OVERVIEW','Four headline counts define their denominators. Hourly activity uses local start time. Filters cover source type, person, route, and review state. Metric clicks open the matching inbox view.\n\nCall reps and calendar organisers remain separate roles.',C.teal);
 card(s,645,145,571,192,'CONVERSATION INBOX','Search, sort, filter, and open all 44 source records. Missing transcripts receive an intake state instead of invented analysis. Each detail view shows raw metadata, supplied text, evidence, uncertainty, next action, owner, and revision.',C.blue);
 card(s,64,365,555,194,'ROUTING & REVIEW','Suggested routes stay distinct from human overrides. One or more routes can be assigned with a required reason. Mark reviewed or reopen. A newer source revision marks analysis pending review and does not clear the override.',C.amber);
 card(s,645,365,571,194,'OUTPUTS','Each active route gets a separate Markdown file. The JSON manifest preserves source ID, revision, routes, review state, freshness, override flag, and relative output paths. Repeat export replaces the archive; it does not accumulate duplicate active files.',C.teal);
 rect(s,64,587,1152,48,C.navy,true);txt(s,85,596,1105,30,'Deliberately left out: forecasts, revenue totals, win rates, CRM account matching, and automated prospect scoring.',14,C.white,true)
}
// 4
{
 const s=base('03  /  Routing and the hard case','M07: keep the customer issue visible without claiming a fix',4);
 rect(s,64,144,1152,115,C.navy,true);txt(s,88,161,1090,25,'CUSTOMER EVIDENCE  /  M07 · TURN 15',12,'#7DD9C9',true);txt(s,88,194,1080,45,'“The workaround does not mean the direct upload issue has been resolved.”',22,C.white,true);
 const steps=[['01','Description','Saved edit stayed stale on the displayed screen.','Root cause unknown'],['02','Attachment','Recreate payment failed; Review path uploaded.','Workaround only'],['03','Reimbursements','Processing state disabled selection.','Status unconfirmed'],['04','Mark as paid','Previous amount carried into the next payment.','Refresh defect reported']];
 steps.forEach((x,i)=>{const xx=64+i*293;rect(s,xx,291,272,150,C.white,true,C.line);txt(s,xx+16,306,36,22,x[0],12,C.teal,true);txt(s,xx+16,335,240,23,x[1],15,C.ink,true);txt(s,xx+16,365,240,44,x[2],11,C.muted,false);txt(s,xx+16,413,240,17,x[3].toUpperCase(),9,i===1?C.amber:C.red,true)});
 txt(s,64,477,540,24,'ROUTING DECISION',12,C.teal,true);card(s,64,508,545,124,'MANUAL ROUTE: CUSTOMER FOLLOW-UP','Override reason: keep an active customer response visible while the product investigation remains open. Human review stays in the analysis and is available as an additional route.',C.amber);
 txt(s,650,477,560,24,'SOURCE / ANALYSIS / DECISION',12,C.teal,true);card(s,650,508,566,124,'THREE SEPARATE LAYERS','r2 replaces source payload and transcript. Analysis freshness changes independently. The saved route and reason persist through later imports and refresh.',C.blue)
}
// 5
{
 const s=base('04  /  Verification & trade-offs','A reproducible replay, with uncertainty made visible',5);
 const seq=['Import r1','Repeat shuffled r1','Manually route M07','Apply update r2','Replay older r1','Refresh'];
 seq.forEach((x,i)=>{const xx=64+i*193;rect(s,xx,147,175,61,i===3?C.mint:C.white,true,C.line);txt(s,xx+12,158,151,25,`0${i+1}  ${x}`,12,i===3?C.teal:C.ink,true);if(i<5)txt(s,xx+172,164,26,22,'→',18,C.teal,true)});
 card(s,64,244,352,183,'CHECKED COUNTS','Initial: 44 unique, 17 usable\nRepeat: +0 records\nUpdate: still 44, now 18 usable\nOlder r1: ignored for all 44\nM07: r2 transcript visible; route preserved.',C.teal);
 card(s,439,244,352,183,'IMPLEMENTATION','Static app with localStorage persistence. Imports use full-payload upsert by source type + ID. Analyses are pre-generated and evidence-linked; no runtime AI or paid service.',C.blue);
 card(s,814,244,402,183,'DELIBERATELY REJECTED','No “best leads” or rep ranking from a selected, non-representative day. Trade-off: less apparent sales scoring, but fewer unsupported claims and no fabricated pipeline.',C.red);
 txt(s,64,460,1120,22,'OTHER TRADE-OFFS',12,C.teal,true);
 txt(s,64,491,1130,58,'Local browser storage is simple to reproduce but not shared across devices. Analysis of new transcripts becomes “Pending review”; a human must confirm it. Missing text stays an intake state.',15,C.ink,false);
 rect(s,64,572,1152,1,C.line);txt(s,64,594,1130,36,'Source checks: M01 turn 21 · M06 turn 10 · M07 turn 15. Export manifest and replay tests are included with editable source.',12,C.muted,false)
}
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
for(let i=0;i<p.slides.items.length;i++){const blob=await p.export({slide:p.slides.items[i],format:'png',scale:1});await fs.writeFile(path.join(build,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()))}
const draft=path.join(build,'revenue-intelligence-review-draft.pptx');await (await PresentationFile.exportPptx(p)).save(draft);
const final=path.join(out,'revenue-intelligence-review.pptx');
await finalizePresentation({explicitTotalSlideCount:5,requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],workspaceDir:root,candidatePath:draft,finalPath:final,pythonExecutable:'C:/Users/vicky/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],fontPolicy:{basis:'design',families:['Aptos']},verifyArtifactToolImport:true,receiptPath:path.join(build,'revenue-intelligence-review.validation.json')});
console.log(`Created and finalized five-slide deck: ${final}`);
