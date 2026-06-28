# CODEX INSTRUCTIONS｜More Fun OS

## 1. Role

You are building a production-ready mobile ordering website for More Fun / 磨飯.

Do not invent business rules.  
Follow the documents in this repository.

## 2. Priority Order

When there is conflict, follow this order:

1. `docs/business-rules/`
2. `docs/google-sheet/`
3. `docs/ui/`
4. `PROJECT_BRIEF.md`
5. `README.md`

## 3. Development Principles

- Mobile first
- Fast ordering flow
- Simple code structure
- Small business friendly
- No unnecessary enterprise features
- No paid API dependency unless explicitly approved
- Google Sheet should be treated as the main CMS data source
- WhatsApp should be the first order submission channel

## 4. Before Coding

Before implementing any feature, check:

- Is there a business rule?
- Is there a UI rule?
- Is there a Google Sheet field requirement?
- Is there a WhatsApp order format requirement?
- Will this make store operation easier or harder?

If uncertain, create a clear TODO instead of guessing.

## 5. Output Requirement

When modifying code, always explain:

- Files changed
- Feature completed
- Testing steps
- Remaining issues

## 6. Not Allowed

Do not add these unless explicitly requested:

- Online payment
- Delivery system
- POS API integration
- Complex membership redemption
- Inventory system
- AI recommendation engine
- Paid SaaS dependency
- Over-complicated admin dashboard

## 7. First Build Target

Build the smallest usable version first:

1. Product data from Google Sheet
2. Menu page
3. Product detail page
4. Cart / Memory Jar
5. Checkout form
6. WhatsApp order message
7. Sold-out handling
8. Basic responsive mobile UI

## 8. Language

User-facing interface should support Traditional Chinese first.  
English may be added where useful for non-Chinese customers.
