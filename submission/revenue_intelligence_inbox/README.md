# Signal — Revenue Intelligence Inbox

## Run locally

Requires Node.js 20 or newer; no dependency installation is needed.

```powershell
npm start
```

Open `http://127.0.0.1:4173`. The app loads both supplied deliveries into browser local storage on first run and opens in the final r2 state. Imports and routing decisions are stored in that browser only; a different browser/device has separate state. The server binds to loopback and is for local review, not production hosting.

## Replay the required sequence

1. In the left rail choose **Reset demo data** (confirm). This clears the app state for this browser.
2. Open **Imports & exports** and select **Import initial · r1**. Expect 44 unique records, 17 usable texts.
3. Select **Repeat initial (reverse order)**. Expect 0 additions, 44 ignored, and the same 44 records.
4. Open M07, choose **Override suggested route**, select Customer follow-up, and enter a reason. Save.
5. Return to Imports & exports and select **Apply update · r2**. Expect M07 to update in place, 44 unique records, 18 usable texts, and updated analysis marked pending review.
6. Select **Replay older initial · r1**. Expect all 44 records ignored; M07 stays at r2.
7. Refresh. M07's new turns and manual route remain. The route reason is visible in detail. Mark the new analysis reviewed only after checking it.

The same app buttons also accept a selected delivery `.json` file. The update replaces the entire payload for the same `(source_type, source_id)` identity, including nulls. It does not erase manual routes. Updated text is explicitly marked pending review so old analysis is not presented as current.

## Metrics and analysis

- Unique records are counted by distinct `(source_type, source_id)` after upsert. Record references, names, phone tokens, and titles are not keys.
- Transcript coverage is usable supplied text / unique sources in the current filter. Usable means a nonblank call transcript or at least one nonblank meeting turn.
- Calls use `started_at`; meetings use `starts_at`, converted to Asia/Kolkata. Delivery `exported_at` is not activity time.
- Activity by person groups calls by rep and meetings by calendar organiser. It does not establish meeting attendance, selling role, or performance.
- Review count is records without a completed human review, including records with no supplied text. Missing text is not evidence that activity did not occur.
- Routing categories are overlapping. Route assignments can exceed the number of records.
- The 44 records are a selected sample, not a complete or representative team-day. No pipeline values, win rates, account joins, or outcomes are inferred.

Analysis is pre-generated in `analyses.json` and includes source references. The browser computes metrics, filters, upserts, route state, and manifest at runtime. No paid AI or external service is called. If a higher revision changes text, the app marks the analysis pending review.

## Exports

- Click **Download outputs ZIP** in Imports & exports for a current manifest and per-route Markdown files.
- The checked-in current export is `exports/`; `manifest.json` lists all active relative paths.
- Rebuild local exports with `npm run export`. The script applies initial r1, update r2, and the documented M07 manual route before generating one current file for each route. It replaces only its generated `exports` directory.
- Run the app's ZIP export again to generate a fresh archive. A route change changes active paths on the next export; it does not append copies.

## Findings and product decisions

1. **M01 turn 21:** partner accepts a unique referral link after rejecting a manual-email-only process as unscalable. This drives the Manager brief priority to send a link, written terms, and eligibility checklist.
2. **M06 turn 10:** an expense-recovery invoice is reported unpaid for months while normal invoices are paid; the cause is unknown. The dashboard calls this an unresolved exception and routes a human investigation, not a confirmed root cause.
3. **M07 turn 15:** the alternate invoice upload path works but adds steps; the direct path remains unresolved. The detail view and M07 output explicitly label it a workaround, not a fix.

**Rejected decision:** rank reps or prospects by “best leads” from this selected, non-representative extract. There is no authoritative CRM, role directory, or outcome table. The app shows activity counts and evidence-backed follow-ups instead of a performance leaderboard or forecast.

## Deliverables and limits

Editable five-slide source is in `slides/` as PPTX; the PDF is alongside it. The college event plan is in `../growth_associate/`. The app is a local static prototype with local browser persistence; no public deployment is included. A three-minute script and recording checklist are included, but the actual screen recording and spoken narration must be captured by the candidate. The assignment materials do not contain the candidate's college name or local event/calendar/venue evidence; the event plan uses labeled placeholders and should be personalized before submission. Approximate hands-on hours were not tracked by the assistant; the candidate should state their actual time.
