# Design Guidelines: Lekvrijdak Dakdekker Website

## Design Approach
**Reference-Based: Service Provider Excellence**
Drawing inspiration from high-converting service platforms like HomeAdvisor and Angi, combined with Dutch market preferences for professional, trust-building design. The goal is immediate credibility and seamless conversion.

## Core Design Principles
1. **Trust-First Visual Language**: Professional imagery, clean layouts, and testimonials prominently featured
2. **Conversion-Optimized**: Clear CTAs, strategic form placement, minimal friction
3. **Dutch Market Sensibility**: Professional yet approachable, emphasizing reliability

## Color Palette

**Light Mode:**
- Primary: 210 75% 45% (Professional blue - trust, expertise)
- Primary Hover: 210 75% 38%
- Secondary: 25 85% 55% (Warm orange - Dutch heritage, action)
- Background: 0 0% 98%
- Card Background: 0 0% 100%
- Text Primary: 215 25% 15%
- Text Secondary: 215 15% 45%
- Border: 215 20% 88%
- Success: 145 65% 42%

**Dark Mode:**
- Primary: 210 70% 55%
- Primary Hover: 210 70% 48%
- Secondary: 25 80% 60%
- Background: 220 20% 10%
- Card Background: 220 18% 14%
- Text Primary: 0 0% 95%
- Text Secondary: 215 15% 70%
- Border: 215 20% 25%

## Typography

**Fonts (Google Fonts):**
- Headings: 'Poppins' (600, 700) - Modern, professional
- Body: 'Inter' (400, 500, 600) - Excellent readability

**Scale:**
- Hero H1: text-5xl lg:text-6xl font-bold
- Section H2: text-3xl lg:text-4xl font-semibold
- Card H3: text-xl lg:text-2xl font-semibold
- Body: text-base leading-relaxed
- Small: text-sm

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 lg:p-8
- Section spacing: py-16 lg:py-24
- Card gaps: gap-6 lg:gap-8
- Form field spacing: space-y-4

**Container Strategy:**
- Max width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Content sections: max-w-6xl
- Forms: max-w-md (simple) to max-w-4xl (advanced)

## Component Library

### Homepage Structure (Expanded)
1. **Hero Section** (h-auto py-12 lg:py-20)
   - Two-column layout: Left (headline + value prop), Right (simple quote form card)
   - Background: Subtle blue gradient with hero image overlay
   - Form card: White/dark elevated with shadow-xl

2. **Services Grid** (3 columns desktop, 1 mobile)
   - Cards with service icon, title, brief description, and arrow CTA
   - Hover: Subtle lift effect (shadow and translate)

3. **Reviews Section** (py-16 lg:py-20)
   - Heading: "Wat onze klanten zeggen"
   - Grid: 3 columns of testimonial cards with star ratings, quote, name, and location
   - Use Google star icons (★★★★★ - gold/yellow 45 95% 55%)

4. **FAQ Section** (py-16 lg:py-20)
   - Accordion style with expand/collapse
   - 6-8 common questions about dakdekken services
   - Icons for each question type

5. **Final CTA Section** (py-12 lg:py-16)
   - Strong conversion focus with contact details and form link

### Service Pages (Compact)
- Concise hero: Service name + key benefit + CTA button to advanced form
- Brief description (2-3 paragraphs max)
- Prominent "Offerte Aanvragen" button appearing multiple times
- Simple before/after or process visual

### Over Ons (Compact)
- Brief company story (3-4 paragraphs)
- Team values/approach
- Contact information prominently displayed
- Single image of team or work

### Advanced Quote Form
- Multi-step appearance with visual progress
- Conditional fields based on service type selection
- Large text areas for project description
- Clear submit button with confirmation message

### Admin Dashboard
- Clean table layout for quotes
- Status badges (Nieuw, In behandeling, Voltooid)
- Quick action buttons per row
- Filter and search functionality
- Login page: Centered card on gradient background

## Images

**Hero Image:** Large, high-quality photo of a completed roof project or team at work - positioned as background with dark overlay (40% opacity) for text readability

**Service Cards:** Icon-based initially with option for small accent images

**Reviews:** Optional small circular avatars (can use initials if no photos)

**Service Pages:** 1-2 relevant photos per page (roof type, equipment, completed work)

**Over Ons:** Single team photo or workshop image

**Image Treatment:** Rounded corners (rounded-lg), subtle shadow, aspect ratios: 16:9 for hero, 4:3 for service images

## Interaction Patterns
- Smooth scroll behavior
- Form validation with inline error messages (red-500)
- Success states with green checkmarks
- Loading states for form submissions
- Hover effects: Subtle scale (hover:scale-105) and shadow changes
- No distracting animations - professional and purposeful only

## Navigation
- Sticky header with logo left, nav center, CTA button right
- Mobile: Hamburger menu
- Dropdown for "Diensten" with all 10 services
- Footer: Multi-column with services, contact, legal, and login link (small, discreet)

## Forms Design
- Input fields: border, rounded, focus:ring-2 ring-primary
- Labels: font-medium text-sm above fields
- Large touch targets on mobile (min-h-12)
- Primary CTA buttons: Full width on mobile, auto on desktop
- Secondary actions: Outline variant with bg-blur when over images