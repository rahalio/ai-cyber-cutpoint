# Cutpoint — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Threat intelligence analyst

- As a threat intelligence analyst, I want candidate chains queued for my adjudication with the originating post, the buy evidence, and the subsequent sale side by side, so that I can accept or reject a dependency in one screen instead of reconstructing it from raw threads.
- As a threat intelligence analyst, I want to see which product categories feed the category I care about and in what volume, so that I can tell the difference between a hub dependency worth a control change and a one-off coincidence.
- As a threat intelligence analyst, I want to mark a rejected chain with a reason — unrelated products, misclassified post, no actual purchase — so that the rejection improves the next cycle rather than disappearing.
- As a threat intelligence analyst, I want the platform to tell me what fraction of this market's traffic my current taxonomy does not describe, so that I can decide whether to add a category before I trust the chain map.
- As a threat intelligence analyst, I want to search chains by the language used in the market, not by an English gloss, so that a Russian-language market is not silently under-covered.

### Trust and safety investigator

- As a trust and safety investigator, I want to know which upstream service a stolen-handle seller most likely bought from, so that my case notes describe an acquisition path rather than a single suspicious account.
- As a trust and safety investigator, I want a chain that touches our platform to open a linked case with the evidence attached, so that enforcement and intelligence stop keeping separate records of the same event.
- As a trust and safety investigator, I want to see whether the sellers we banned last quarter were replaced by substitutes on the same chain, so that I can argue for a control change instead of another ban wave.

### Abuse detection engineer

- As an abuse detection engineer, I want each recommended control change expressed as a concrete change to an authentication, recovery, or rate-limiting flow with the harm volume it should remove, so that it can enter the identity roadmap with a number attached.
- As an abuse detection engineer, I want the platform to hold the before-measurement for a control change and take the after-measurement automatically on an agreed window, so that we learn whether removing a recovery path actually reduced takeovers.
- As an abuse detection engineer, I want to register an intervention we chose not to implement along with the reason, so that the same recommendation is not re-litigated every quarter.

### Annotation lead and forum linguist

- As an annotation lead, I want a labelling batch sized against a committed budget with progress and remaining effort visible, so that onboarding a market is a project with an end date rather than an open-ended reading task.
- As an annotation lead, I want the platform to alert me when classification quality in a market has decayed against a recent holdout, so that I re-label before findings degrade rather than after an analyst notices.
- As an annotation lead, I want to see disagreement between labellers on the same posts, so that a category whose definition is genuinely ambiguous gets rewritten instead of quietly producing bad edges.

### Platform administrator, legal and compliance

- As a compliance officer, I want a per-corpus record of lawful basis, licence terms, retention expiry, and confirmation that no personally identifiable enrichment was performed, so that I can answer a privacy review about a finding derived from a leaked dump years after ingestion.
- As a compliance officer, I want referral package generation to be a privileged action with its own custody log and hash manifest, so that an artefact we hand to law enforcement can be shown to be the one we produced.
- As a platform administrator, I want to prevent publication of chains from any market whose drift threshold or retention window has been breached, so that governance failures stop findings rather than being noted after they ship.
