# Frontend Adaptation Guide: Crypto Oasis Portfolio Homepage

**To the Frontend Developer:**

This guide outlines how to adapt the existing "Crypto Oasis Multigaming Platform" homepage design (as seen in the provided screenshot `Schermafbeelding 2025-05-18 om 10.03.50.jpg`) for our "Crypto Oasis Portfolio Project."

**Objective:** Maintain the existing modern visual style (dark theme, card layouts, green accents) while repurposing content and functionality to serve as an interactive portfolio. This platform is designed to showcase MERN stack and blockchain development skills to a recruiter.

---

## Homepage Element Transformation (`Schermafbeelding 2025-05-18 om 10.03.50.jpg`)

### 1. Header Section

* **Original Element:** Logo ("CRYPTO OASIS", top left)
    * **Adaptation for Portfolio:**
        * **Text/Visual:** Keep as "CRYPTO OASIS" or the finalized project name.
        * **Functionality:** This should be a link to this Homepage (main dashboard).

* **Original Element:** Navigation Links ("Who we are", "Features", "Roadmap", "Team", "FAQ", "Profile", "Challenges")
    * **Adaptation for Portfolio - New Navigation Links & Functions:**
        * Replace "Who we are" with **"Dashboard"**
            * **Links to:** This Homepage.
        * Replace "Features" with **"My CV NFT"**
            * **Links to:** A dedicated view/page displaying the developer's CV as an ERC-721 NFT.
        * Replace "Roadmap" with **"Skill Demos"**
            * **Links to:** A page listing interactive quizzes and mini-challenges (e.g., "Solidity Quiz," "JS Debug Task").
        * Replace "Team" with **"Live DApps"**
            * **Links to:** A page listing interactive DApps for the interview (e.g., "Blockchain Poll," "Buzzword Bingo").
        * Replace "FAQ" with **"About This Demo"**
            * **Links to:** A page explaining the project's purpose (as a portfolio), the tech stack used, and the GitHub repository link.
        * Keep **"Profile"** but adapt its behavior:
            * **If wallet connected:** Displays the user's connected address (e.g., `0x123...abc`).
            * **Dropdown Menu (on click):**
                * "My Achievements" (Links to a page displaying earned Soul-Bound Tokens/SBTs).
                * "Disconnect Wallet".
            * **If wallet NOT connected:** This link might be less prominent or change to "Connect Wallet," complementing the main "Connect Wallet" button in the header.
        * Keep **"Challenges"** OR rename to **"SBT Mint (Demo)"**:
            * **Visibility:** This link might be hidden by default or styled less prominently, as it's a developer tool for the demo.
            * **Functionality (for Developer during Demo):** Links to a simple, admin-like interface to manually mint an Achievement SBT after a skill or challenge is demonstrated live. This is not a primary path for the recruiter.

### 2. Main Title Section (Hero Area)

* **Original Element:** Main Title ("MultiGaming Platform for NFT Communities")
    * **Adaptation for Portfolio:**
        * **New Text:** **"Crypto Oasis: An Interactive Full-Stack & Blockchain Portfolio"**
        * **Purpose:** Clearly state the project's identity as a portfolio showcase.

* **Original Element:** Subtitle ("Crypto Oasis is a multigaming platform for NFT communities to come together, compete, and have fun.")
    * **Adaptation for Portfolio:**
        * **New Text:** **"Showcasing MERN & Solidity development skills through interactive DApps, an on-chain CV, and skill demonstrations."**
        * **Purpose:** Briefly explain what the recruiter will find and the key technologies being highlighted.

* **Original Element:** CTA Button ("GET STARTED")
    * **Adaptation for Portfolio:**
        * **New Text:** **"Explore My Profile & CV NFT"**
        * **Functionality:** This is the primary call to action. It should navigate the recruiter directly to the "My CV NFT" page/view.
        * **Styling:** Maintain the prominent green styling from the original design.

### 3. Content Area (Below "GET STARTED" / Main Hero)

* **Original Element:** Tab Bar ("Play Games" / "Host Games")
    * **Adaptation for Portfolio:**
        * **Action:** **Remove this tab bar entirely.** The portfolio project will present all interactive elements as direct showcases, not requiring different modes.

* **Original Element:** Connected Wallet Address Display (`0x...C91` - shown top right of the content area in the screenshot)
    * **Adaptation for Portfolio:**
        * **Action:** **Relocate this display.** The connected wallet address should be clearly visible in the main **Header's "Profile" section** or alongside the "Connect Wallet" button/status in the header. It should not float within the main content body here.

* **Original Element:** Search Bar ("Search games...")
    * **Adaptation for Portfolio:**
        * **Action:** **Remove the search bar.** The portfolio will feature a curated and limited number of showcase items, making a search function unnecessary.

* **Original Element:** Game Cards (e.g., "Poker Masters", "Bingo Night", "Agar Arena")
    * **Adaptation for Portfolio - Repurpose as "Showcase Cards":**
        * **Layout & Style:** Keep the card layout, dimensions, and visual style (image placeholder area, title, details section).
        * **Functionality:** Each card will represent a key feature or module of the portfolio project.
        * **Card 1: CV NFT Showcase**
            * **Image Placeholder:** Use a stylized image representing an NFT (e.g., a abstract professional card design, an identity icon).
            * **Title:** "My Decentralized CV"
            * **Details Section (replace game-specific details):**
                * `Type: ERC-721 NFT`
                * `Focus: On-Chain Identity, Metadata`
                * `Skills: Solidity, IPFS`
            * **Button/Link on Card:** "View CV Details"
            * **Action:** Navigates to the "My CV NFT" page.
        * **Card 2: Skill Demo Showcase**
            * **Image Placeholder:** Icon representing a quiz, a brain, a challenge (e.g., a lightbulb, a gear).
            * **Title:** "Interactive Skill Quiz"
            * **Details Section:**
                * `Type: Frontend Challenge`
                * `Focus: React, State Management`
                * `Topics: JavaScript/Solidity`
            * **Button/Link on Card:** "Try the Quiz"
            * **Action:** Navigates to the "Skill Demos" page, or directly into a specific quiz module.
        * **Card 3: Live DApp Showcase**
            * **Image Placeholder:** Icon representing blockchain interaction, voting, or a simple DApp (e.g., intertwined blocks, a poll graph icon).
            * **Title:** "Live Blockchain Poll"
            * **Details Section:**
                * `Type: On-Chain DApp`
                * `Focus: Smart Contracts, Ethers.js`
                * `Network: Sepolia Testnet`
            * **Button/Link on Card:** "Participate Now"
            * **Action:** Navigates to the "Live DApps" page, specifically to the Blockchain Poll DApp module.
        * **(Optional) Card 4: Achievements Showcase**
            * **Image Placeholder:** Image of a sample achievement badge or a trophy icon.
            * **Title:** "Verifiable Achievements (SBTs)"
            * **Details Section:**
                * `Type: Soul-Bound Tokens`
                * `Focus: Digital Credentials`
                * `Concept: Skill Verification`
            * **Button/Link on Card:** "View My SBTs"
            * **Action:** Navigates to the "My Achievements" page.

* **Original Element:** Button below cards ("See Challenges Ⓜ")
    * **Adaptation for Portfolio:**
        * **New Text:** **"View All Demonstrations"** or **"Explore All Features"**
        * **Functionality:** If more showcases/demos exist than fit on the homepage cards, this button links to a page that lists all of them (e.g., a combined view or direct links to "Skill Demos," "Live DApps," and "My Achievements"). Alternatively, this button could be repurposed to link directly to the "About This Demo" page for more context.
        * **Styling:** Maintain the visual style, including the icon if desired.

### 4. Wallet Connection Prompt

*This section typically appears if the wallet is not connected. In the screenshot, it's shown at the bottom, but it could also be a modal triggered from a "Connect Wallet" button in the header.*

* **Original Element:** Title ("Connect Your Wallet")
    * **Adaptation for Portfolio:**
        * **Text:** Keep "Connect Your Wallet."

* **Original Element:** Subtitle ("Connect your wallet to access challenges and games")
    * **Adaptation for Portfolio:**
        * **New Text:** **"Connect your wallet to interact with DApps and on-chain features of this portfolio."**

* **Original Element:** Buttons ("Connect MetaMask", "Use Demo Wallet")
    * **Adaptation for Portfolio:**
        * **"Connect MetaMask" Button:**
            * **Action:** Keep this as the primary connection method. Functionality should trigger the MetaMask browser extension for wallet connection.
        * **"Use Demo Wallet" Button:**
            * **Action:** **Remove this button** for the portfolio project to simplify and focus on live MetaMask interactions. A "demo wallet" mode might dilute the impact of showcasing real blockchain interactions on the Sepolia testnet.

---

**Developer Summary:**

The primary objective is to leverage the strong visual foundation of the existing design (dark theme, card components, typography, accent colors) while completely overhauling the content, navigation, and specific functionalities to align with the goals of an interactive developer portfolio.

* **Focus on Clarity:** Ensure all text and navigation clearly guides the recruiter to understand the purpose of the project and the skills being demonstrated.
* **Content Relevancy:** Replace all gaming-specific terminology and features with portfolio-centric elements (CV NFT, skill demos, DApp showcases, achievement SBTs).
* **Interactive Pathways:** All CTAs and interactive elements on this adapted homepage should lead to the correct internal views or modules where the specific portfolio features are presented.

By following this guide, the homepage will be effectively transformed into a compelling entry point for the Crypto Oasis Portfolio Project.