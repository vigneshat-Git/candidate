export const identity=(type,id)=>`${type}::${id}`;
export function usableText(type,payload,transcriptPayload){
 if(type==='call')return typeof payload?.transcript==='string'&&payload.transcript.trim().length>0;
 return Array.isArray(transcriptPayload?.turns)&&transcriptPayload.turns.some(t=>typeof t?.text==='string'&&t.text.trim().length>0);
}
export function applyBatch(records,batch,prepare){
 let added=0,updated=0,ignored=0;
 for(const x of batch.records){
  const k=identity(x.source_type,x.source_id),old=records[k];
  if(old&&batch.revision<=old.appliedRevision){ignored++;continue}
  const incoming={sourceType:x.source_type,sourceId:x.source_id,recordRef:x.record_ref,payload:x.payload,transcriptPayload:x.transcript_payload??null};
  const changed=!!old&&JSON.stringify([old.payload,old.transcriptPayload])!==JSON.stringify([incoming.payload,incoming.transcriptPayload]);
  const a=prepare(x.record_ref);
  records[k]={...(old||{}),...incoming,appliedRevision:batch.revision,suggestedRoutes:a.routes,analysis:a,analysisRevision:batch.revision,reviewStatus:changed&&usableText(incoming.sourceType,incoming.payload,incoming.transcriptPayload)?'Needs review':(old?.reviewStatus||a.review),analysisFreshness:changed?'Pending review':'Current'};
  old?updated++:added++;
 }
 return {added,updated,ignored};
}
