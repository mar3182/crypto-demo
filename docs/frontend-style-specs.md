# Crypto Oasis: Frontend Visual Design & Styling Guide

**To the Frontend Developer:**

This document outlines the key visual styling information observed from the provided images of the Crypto Oasis Figma design. The goal is to replicate this look and feel as closely as possible for the interactive hiring platform demo.

**Important Note:** This guide is based on interpretations from the static images provided. The Figma file itself remains the ultimate source of truth for exact color codes, font names, spacing units, and asset specifications. Please refer to the Figma design for precise values whenever possible.

---

## 1. Introduction

This document provides guidance on the visual design, color palette, typography, and component styling for the Crypto Oasis platform, based on the provided Figma design screenshots. The aim is to ensure the frontend implementation accurately reflects the intended modern, dark-themed aesthetic.

---

## 2. Overall Theme & Aesthetic

* **Theme:** Dark, modern, sophisticated, with a "tech" or "gaming platform" feel.
* **Mood:** Engaging, professional, innovative.
* **Key Characteristics:**
    * High contrast between text/elements and dark backgrounds.
    * Use of vibrant accent colors for calls to action and highlights.
    * Clean lines and well-defined component areas (cards, modals).
    * Consistent use of spacing and visual hierarchy.

---

## 3. Color Palette (Estimated from Images)

* **Primary Backgrounds:**
    * **Main Page Background:** Very Dark Gray/Almost Black (e.g., observed in `00 Landing Page.jpg`).
        * *Suggested Hex:* `#121212`, `#1A1A1A`, or a very dark desaturated blue/purple like `#1A1D2F`.
    * **Content Area Background:** Slightly Lighter Dark Gray (e.g., the area holding game cards in `Schermafbeelding 2025-05-18 om 10.03.50.jpg`).
        * *Suggested Hex:* `#222222`, `#2C2C2C`.
* **Component Backgrounds:**
    * **Cards & Modals:** Dark Gray, a step lighter than their immediate section background to provide separation (e.g., game cards, "Complete profile" modal background).
        * *Suggested Hex:* `#2D2D3A`, `#33333C`.
* **Primary Accent Color:**
    * **Vibrant Green:** Used for primary Call-to-Action buttons ("GET STARTED", "Connect Wallet"), highlights, active states.
        * *Suggested Hex:* `#00FFA3`, `#32FFB1` (bright, slightly fluorescent).
* **Secondary Accent Colors (Less prominent):**
    * **Bright Blue/Cyan:** Observed for some highlights, icons (e.g., "M" icon next to "See Challenges", accents on some NFT cards in `games-1 3.jpg`).
        * *Suggested Hex:* `#00B2FF`, `#4DFFFF`.
* **Text Colors:**
    * **Primary Headings (H1, H2):** White or Very Light Gray.
        * *Suggested Hex:* `#FFFFFF`, `#F0F0F0`.
    * **Subheadings & Body Text:** Light Gray / Off-White.
        * *Suggested Hex:* `#E0E0E0`, `#CCCCCC`.
    * **Muted/Secondary Text (e.g., card details "Host:", "Players:", input field placeholders):** Medium Gray.
        * *Suggested Hex:* `#A0A0A0`, `#888888`.
    * **Link Text:** Often the primary accent green or a lighter blue/cyan for less emphasis.
* **Borders & Dividers:**
    * **Standard:** Darker Grays (`#444444`) or subtle borders using component background color with a slight shade difference.
    * **Active/Highlighted:** Sometimes the accent green or blue (e.g., for active input field borders).
* **Neutrals:**
    * Various shades of gray are used extensively for backgrounds, components, and text to create depth and hierarchy.

---

## 4. Typography (Estimated from Images)

* **Font Family:** A clean, modern Sans-Serif font family is consistently used. (Common web fonts that fit this style include Inter, Montserrat, Open Sans, Roboto. **Verify exact font from Figma.**).
* **Headings (H1, Main Titles e.g., "MultiGaming Platform..."):**
    * **Style:** Sans-Serif.
    * **Weight:** Bold or Semi-Bold.
    * **Color:** White / Very Light Gray (see Color Palette).
    * **Size:** Large and prominent, establishing clear hierarchy.
* **Subheadings (Section titles e.g., "WHO WE ARE", card titles e.g., "Poker Masters"):**
    * **Style:** Sans-Serif.
    * **Weight:** Medium, Semi-Bold, or Bold depending on its level in the hierarchy.
    * **Color:** White / Light Gray.
* **Body Text (Paragraphs, descriptions, modal content):**
    * **Style:** Sans-Serif.
    * **Weight:** Regular.
    * **Color:** Light Gray / Off-White.
    * **Line Height:** Appears comfortable and readable (e.g., 1.5 - 1.7, verify in Figma).
* **Button Text:**
    * **Style:** Sans-Serif.
    * **Weight:** Medium or Semi-Bold.
    * **Color:** White (on green buttons), or the accent color itself for text/link buttons.
    * **Case:** Often All Caps or Title Case (e.g., "GET STARTED").
* **Muted/Detail Text (e.g., "Host: NikiV" on game cards):**
    * **Style:** Sans-Serif.
    * **Weight:** Regular or Light.
    * **Color:** Medium Gray.

**Note:** Adherence to the font sizes, weights, and line heights specified in Figma is crucial for maintaining the design's intended visual hierarchy and readability.

---

## 5. UI Component Styling Guide (Based on Images)

* **Buttons:**
    * **Primary CTA (e.g., "GET STARTED", "Save" in modal):**
        * **Shape:** Rounded corners (medium radius, e.g., 4px-8px, verify in Figma).
        * **Background:** Vibrant Green (Primary Accent).
        * **Text:** White, often uppercase or title case, bold/semi-bold.
        * **Padding:** Generous for a good click target (e.g., 12px 24px, verify in Figma).
        * **Hover/Active States:** (Infer from Figma - likely slightly darker/brighter green or a subtle scale/shadow effect).
    * **Secondary Buttons (e.g., an alternative action button):**
        * **Shape:** Rounded corners.
        * **Style:** Could be an outline button (transparent background, accent color border and text) or a more subdued solid color (e.g., dark gray with light text).
    * **Text/Link Buttons (e.g., "Import using Secret Recovery Phrase"):**
        * **Style:** Plain text, often in an accent color (blue/cyan or green) to indicate interactivity. Underline may appear on hover.

* **Cards (e.g., "Game Cards" from `Schermafbeelding 2025-05-18 om 10.03.50.jpg` & `games-1 3.jpg`):**
    * **Background:** Dark Gray (distinct from the section background it sits on).
    * **Border:** Subtle or none. Sometimes a thin, darker border or a highlight border (e.g., the cyan outline on some cards in `games-1 3.jpg`).
    * **Corner Radius:** Medium rounded corners (e.g., 8px-12px, verify in Figma).
    * **Shadow:** Subtle drop shadow for a lifting effect (if present in Figma).
    * **Structure:** Typically an image/visual area at the top, followed by Title, Details (key-value pairs or tags), and an Action Button.

* **Modals (e.g., "Connect to a wallet" from `00 Connect Wallet1.jpg`, "Complete profile" from `00 Connect Wallet 4.jpg`):**
    * **Background:** Dark Gray, similar to cards.
    * **Page Overlay:** Semi-transparent dark overlay for the page background when a modal is active (to focus attention).
    * **Corner Radius:** Rounded corners (e.g., 8px-16px).
    * **Padding:** Adequate internal padding for content.
    * **Shadow:** Often a more pronounced drop shadow to make it float above the content.
    * **Header/Title Area:** Clear title, often with a close (X) icon (top right).
    * **Content Area:** Well-structured form elements or lists.
    * **Footer/Action Area:** Buttons typically aligned to the right or centered.

* **Input Fields (from "Complete profile" modal `00 Connect Wallet 4.jpg`):**
    * **Background:** Darker gray, distinct from modal background.
    * **Border:** Thin, subtle border (e.g., 1px solid medium gray). May change color on focus (e.g., to the green accent).
    * **Text Color (Input):** Light Gray / White.
    * **Placeholder Text Color:** Muted Gray.
    * **Corner Radius:** Slightly rounded (e.g., 4px-6px).
    * **Labels:** Positioned above the input field, clear white/light gray text.

* **Navigation Bar / Header:**
    * **Background:** Dark, often matching the main page background or a distinct dark shade.
    * **Logo:** Prominently placed (top left).
    * **Nav Links:** Clearly legible text. Potential highlight/underline on hover or for the active page (e.g., the yellow underline for "Who we are" in `00 Connect Wallet 03.jpg`).
    * **Buttons (Connect Wallet/Login/Sign Up):** Styled as primary or secondary buttons, consistent with overall button styling.

* **Footer (as seen in `00 Landing Page.jpg`):**
    * **Background:** Dark, consistent with the main page background.
    * **Layout:** Typically multi-column for links (e.g., sitemap, social media), copyright information.
    * **Text:** Muted grays and whites for readability.

* **Icons:**
    * **Style:** Clean, modern. Predominantly line-style or subtly filled, as seen with wallet options, social media icons, and UI action icons.
    * **Color:** White, light gray, or accent colors (green/blue) depending on context and interactivity. SVG format is preferred for scalability.

---

## 6. Layout & Spacing

* **Grid Systems:** Card listings (like games or our adapted Portfolio NFT themes) appear to use a grid layout (e.g., 3-column in `Schermafbeelding 2025-05-18 om 10.03.50.jpg`). Verify grid specifications (columns, gutters) from Figma.
* **Consistency:** Strive for consistent padding within components (e.g., cards, modals) and margins between sections/elements. A base spacing unit (e.g., 8px) is often used in design systems.
* **White Space (Negative Space):** The design effectively uses dark space to make content areas stand out and reduce visual clutter. Respect this in implementation.
* **Alignment:** Strong and consistent alignment of text and UI elements is crucial for a polished, professional look.

---

## 7. Imagery & Graphics

* **Hero Backgrounds:** The main landing page (`00 Landing Page.jpg`) features a dynamic hero graphic with floating elements (dice, chips, NFTs). This creates an engaging, high-quality feel. If exact replication is complex, aim for a similar dark, abstract, tech-themed background that complements the foreground UI.
* **NFT Visuals:**
    * The pedestal graphic (`games-1 2.png`) provides a stylized way to showcase a featured NFT. This should be adapted for showcasing your Portfolio NFTs, changing the text "YOUR NFT GOES HERE" as previously discussed.
    * Your specific Portfolio NFTs (`nft-avatar-*.png`) should be displayed clearly, with high resolution, within cards or profile sections.
* **Iconography:** Utilize SVG icons wherever possible for sharp rendering at all sizes and ease of color manipulation via CSS.
* **Placeholders:** Use the provided `placeholder image.jpg` or similar neutral, dark-themed placeholders if actual images for certain "To Be Developed" sections are not yet finalized.

---

## 8. "To Be Developed" Markers Styling

* **Visual Indication:** For sections of the UI that are implemented visually (to match Figma) but are not functionally part of this demo:
    * **Overlay Method:** A semi-transparent dark overlay (e.g., `rgba(0,0,0,0.5)`) on the specific section or component.
    * **Text Label:** Centered on the overlay or component, a clear text label: "Feature To Be Developed for Full Crypto Oasis Platform" or "Coming Soon."
        * **Font:** Use the standard body text font.
        * **Color:** A contrasting but not overly distracting color (e.g., medium gray or a muted version of an accent color).
    * **Disabled State for Interactive Elements:** Buttons, input fields, or other interactive elements within these "To Be Developed" sections should appear visually disabled (e.g., reduced opacity, greyed-out colors, `cursor: not-allowed` CSS property).
* **Goal:** To clearly communicate the scope of the current demo's functionality while still acknowledging the full UI design from Figma. This manages recruiter expectations effectively.

---

This guide should assist in recreating the visual essence of the Crypto Oasis platform. **Always prioritize the Figma file as the definitive source for all design specifications.**