# Jane's Amex Offers: Design Notes

Redesign on Oct 10, 2026: a blend of Tinder, Zillow and the Tesla app, inside Max's brand. The rules are light mode only, Khand and Hind fonts, square outlined buttons, `.mw-hover`, Title Case headings, and the restrained answer colors from Brand Swipe.

Sources: Tinder swipe-deck breakdowns (vinova.sg React Native report, soarias.com SwiftUI guide, rationalgo deck spec), Zillow IA and property-card write-ups (getia-md Zillow IA, Sam Cook "Property Card Pattern", TYPENORM, Mobbin Zillow iOS list), and Tesla app and nav analyses (VP0 "Tesla-style car app", UX Planet heuristic review, 2026 mobile nav best practices).

## From Tinder
- **Card stack with depth:** the top card is live, and the 2 cards behind it are scaled (0.95 / 0.90) and nudged down, so the deck reads as a pile.
- **The card follows the finger 1:1**, with rotation proportional to the horizontal offset (clamped to about ±15°) and pivoting from below the card for a natural arc.
- **Velocity-based fling:** the release commits if the drag passes about 30% of the card width **or** the flick speed passes about 0.5 px/ms. The throw continues in the drag direction off-screen, and its duration scales with speed.
- **Spring-back** when the throw is too short, using an overshoot cubic-bezier.
- **YES / NO stamps** fade in with drag distance (tilted outline stamps in the answer colors).
- **Round button bar under the deck:** the buttons trigger the same throw animation (Undo · No · Maybe · Love · Yes). Undo replays the last card back onto the stack.

## From Zillow
- **Image-forward listing card:** a big visual header on top, then the "price" line, where the offer value ("$25 back") is the largest text on the card. The spend condition, expiry and category sit under it like beds/baths/sq ft.
- **Badges in the header's corner** ("Ending Soon", "You Said Yes"), like Zillow's "New" / "Price Cut" tags.
- **A heart in the header's top-right** saves the offer from anywhere: the deck, search results or Saved.
- **Search bar on top**, with a row of horizontally scrolling **filter chips** below it (All, Ending Soon, Your Brands, then categories).
- **A "Saved" tab** listing saved offers as compact cards grouped by Love, Yes and Maybe, plus a "Not Interested" drawer to bring dismissed offers back (like Zillow's saved homes and hidden homes).

## From the Tesla App
- **Calm, status-first header:** a small wordmark, the title, and one quiet status line ("Updated Oct 10, 2026 · 12 Saved").
- **Generous white space and large type;** one primary thing per screen (the card).
- **A minimal bottom tab bar** with thin line icons and short labels: For You · Search · Saved, plus a quiet Share item. The active state is a darker label and a short underline, not a color block.
- **Subtle motion only:** 150–250ms ease-out, nothing bouncy except the deliberate spring-back. All motion turns off under `prefers-reduced-motion`.

## Brand Guardrails
- White page, near-black text, #E5E5E5 hairlines. The card headers use **very soft per-category gradients** (pastel tints), not photos or scraped logos. The merchant's initial is set big in Khand.
- Answer colors are the same as Brand Swipe: Love #E0245E, Yes #2E9E6A, Maybe #D99A1E, No #9A7B7B.
- **Proposal (new beyond the guide):** the 12 pastel category tints for the card headers. They need branding-agent review.

## Update, Oct 10, 2026, 8:30 PM: Scrolling Feed
- Per Max, For You is now a **Zillow-style vertical feed** instead of a swipe stack. The sections are Your Brands (pinned, can never be dismissed), Picked For You, and More Offers.
- "Not Interested" is a small footer button, only on cards that aren't in Your Brands. It shows an Undo popup, and dismissed offers can be restored from Saved.
- Each section sits in a softly outlined, cream-tinted container (#E6E1D8 border), and the cards have a 1px #E6E1D8 border.
- Brand logos (Max approved) are downloaded once into `logos/`, with `logos/manifest.json` mapping each merchant to its domain and logo file. A logo shows in a white rounded tile; if a logo is missing or blurry, the merchant's initial shows instead.

## Update, Oct 10, 2026, 8:45 PM: Carousel Rows
- Each section of For You (Your Brands, Picked For You, More Offers) and each Saved group is now a horizontal carousel row, like Zillow or Netflix: compact cards, scroll-snap, the next card peeking in, hidden scrollbars, an "N offers" count, and ‹ › arrow buttons on tablet and desktop (mouse devices only).
- The page doesn't scroll vertically at 390x844, 768x1024, 1280x800 or 1440x900. At 360x740, the feed scrolls about 93px as a fallback.
