---
name: Civic Innovation Architecture
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006056'
  on-tertiary: '#ffffff'
  tertiary-container: '#007b6e'
  on-tertiary-container: '#b1fff1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#71f8e4'
  tertiary-fixed-dim: '#4fdbc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.25rem
    fontWeight: '800'
    lineHeight: 3.75rem
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-desktop: 1.5rem
  gutter-mobile: 1rem
  container-max: 80rem
---

## Brand & Style

This design system establishes a high-trust digital ecosystem positioned at the convergence of public governance, academic research, and modern enterprise software. It bridges the authority of institutional civic initiatives with the velocity and ergonomic precision of modern SaaS platforms.

The visual style embraces an elevated modern-flat aesthetic augmented by selective, low-noise glassmorphism. Surfaces maintain exceptional clarity and purpose: transparent scrims, soft boundary definitions, and deliberate chromatic accents communicate institutional credibility while remaining approachable to citizens, students, and municipal officials.

Interface elements prioritize accessible, high-legibility typographic hierarchies and crisp structural delineation over decorative excess. The emotional output is reassuring, focused, and forward-looking—eliminating administrative friction to accelerate multi-stakeholder problem solving.

## Colors

The palette establishes institutional rigor paired with active technological guidance.

- **Primary (`#2563EB`)**: Royal Blue anchors primary calls-to-action, active navigational anchors, focused interactive states, and trusted verification badges.
- **Secondary (`#0F172A`)**: Deep Navy Slate drives high-order typographic hierarchy, dense visual structures, sidebar headers, and dark container accents.
- **Tertiary (`#14B8A6`)**: Vibrant Teal signals innovation milestones, collaboration activity, telemetry metrics, and AI-assisted actions.
- **Highlight (`#F59E0B`)**: Amber directs user attention to alerts, pending civic reviews, triage priority items, and evaluation statuses.
- **Functional Semantics**:
  - Success: `#10B981` (Emerald) for verified resolutions, funded projects, and passed civic criteria.
  - Danger: `#EF4444` (Red) for critical system alerts, compliance failures, and destructive operations.
- **Neutral Foundation**: `#F8FAFC` (Slate 50) forms the default canvas. Surface tiers transition upward to pure `#FFFFFF` for prominent cards, with `#E2E8F0` (Slate 200) serving as the structural boundary anchor to maintain strict WCAG AA/AAA compliance across all interface density states.

## Typography

Typographic choices pair the structural authority of **Plus Jakarta Sans** for display tiers with the micro-legibility of **Inter** for data grids, administrative tables, and interactive elements.

- **Headlines (`Plus Jakarta Sans`)**: Leveraged for landing statements, page headers, modal titles, and card headers. The geometric proportions project institutional confidence and modern academic prestige. Tracking is slightly tightened across large scale headers to maintain visual cohesion.
- **Body & Controls (`Inter`)**: Deployed for deep reading, policy briefs, multi-column analytics, input labels, and table cells. The tall x-height guarantees readability on dense civic dashboard layouts.
- **Labels & Micro-copy**: Employs uppercase or elevated tracking on small label tiers to distinguish status badges, timeline markers, and AI insight descriptors from surrounding contextual text.

## Layout & Spacing

The layout is built upon an 8-point base grid system, operating within a 12-column responsive fluid grid framework bounded by an 80rem (1280px) outer container for standard portal views, expanding to 100rem (1600px) for analytics and workflow canvases.

- **Desktop (1024px+)**: 12 columns with `1.5rem` (24px) gutters and variable outer padding (minimum `2rem`). Left-hand global navigation persists at 260px fixed width or collapses into an 80px icon strip.
- **Tablet (768px – 1023px)**: 8 columns with `1rem` (16px) gutters and `1.5rem` edge margins. Utility panels slide over as drawers rather than side-by-side dockings.
- **Mobile (<768px)**: 4 columns with `1rem` (16px) gutters and `1rem` edge margins. All sidebars collapse into a persistent, accessible bottom sheet or modal drawer. Multi-step progress tracks collapse from horizontal step indicators into vertical milestone accordions.

## Elevation & Depth

This system avoids heavy drop shadows, opting instead for ambient, cool-tinted elevation layers mixed with structural borders (`#E2E8F0`).

- **Surface 0 (Base)**: `#F8FAFC`. Zero elevation, pure layout background.
- **Surface 1 (Cards & Standard Containers)**: `#FFFFFF` paired with `border: 1px solid #E2E8F0` and subtle ambient shadow `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Surface 2 (Hover States, Floating Cards, Dropdowns)**: `#FFFFFF` paired with `0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`.
- **Surface 3 (Modals, Slide-over Panels)**: `#FFFFFF` framed by `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Glassmorphism Layer (Global Header, Sticky Milestone Bars, Overlays)**: `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px)` and a bottom border of `rgba(226, 232, 240, 0.8)`. For AI-context cards, a tinted frosted gradient combines `rgba(240, 253, 250, 0.75)` to `rgba(239, 246, 255, 0.75)` with `backdrop-filter: blur(8px)` and a subtle `1px solid rgba(20, 184, 166, 0.2)` border.

## Shapes

The interface balances precision with approachability. Form controls, buttons, and inline chips adhere to `rounded-lg` (0.5rem / 8px) or standard rounded tokens. 

Content surfaces, feature containers, and dashboards adopt `rounded-xl` (1rem / 16px) and `rounded-2xl` (1.5rem / 24px) envelopes to soften large analytical displays. Status pills, circular user avatars, and progress trackers use full circular radii (`rounded-full`).

## Components

### Buttons
- **Primary**: Background `#2563EB`, text `#FFFFFF`, radius `rounded-lg`, font `label-lg`. Subtle hover elevation to `#1D4ED8`. Active scale `0.98`. Focus ring `2px solid #93C5FD` with `2px` offset.
- **Secondary / Outline**: Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`. Hover background `#F1F5F9`, border `#CBD5E1`.
- **Tertiary / Innovation Action**: Background `#14B8A6`, text `#FFFFFF`. Hover `#0D9488`. Deployed specifically for idea submissions, hackathon actions, and civic matching.
- **Ghost**: Transparent background, text `#475569`. Hover `#F1F5F9`, text `#0F172A`.

### Input Fields & Controls
- **Text Inputs**: Height `44px`, background `#FFFFFF`, border `1px solid #CBD5E1`, radius `rounded-lg`, font `body-md`. Focus state switches border to `#2563EB` with a `3px` ring in `rgba(37, 99, 235, 0.15)`.
- **Checkboxes & Radios**: Base size `18px`, border `1.5px solid #94A3B8`. Checked state fills with `#2563EB` displaying a crisp white icon checkmark.
- **Select / Dropdowns**: Mimic text inputs with an embedded chevron indicator and elevation-2 dropdown menus.

### Badges & Chips
- **Institutional Status Badges**: Padding `0.25rem 0.625rem`, radius `rounded-full`, font `label-md`.
  - In Review: Background `#FEF3C7`, text `#92400E` (Amber).
  - Verified / Active: Background `#DCFCE7`, text `#166534` (Emerald).
  - High Priority: Background `#FEE2E2`, text `#991B1B` (Red).
  - Civic Program / Hub: Background `#DBEAFE`, text `#1E40AF` (Royal Blue).
- **AI Insight Badges**: Gradient fill `linear-gradient(135deg, rgba(20, 184, 166, 0.12), rgba(37, 99, 235, 0.12))`, border `1px solid rgba(20, 184, 166, 0.3)`, text `#0F766E`, font `label-md` accompanied by a micro spark/pulse icon.

### Cards & Panels
- **Standard Card**: Background `#FFFFFF`, border `1px solid #E2E8F0`, radius `rounded-xl`, padding `1.5rem`.
- **Interactive Initiative Card**: Standard card with transition on hover: translates `-2px` on Y-axis with elevation tier 2 shadow and `border-color: #93C5FD`.
- **AI Insight Container**: Glassmorphic frosted card (`backdrop-filter: blur(8px)`), light gradient background (`#F0FDFA` to `#EFF6FF`), border `1px solid rgba(20, 184, 166, 0.25)`, radius `rounded-2xl`, with an interior subtle left-rail stroke (`3px solid #14B8A6`).

### Timelines & Step Flows
- **Horizontal Stepper (Desktop)**: Connected by a 2px horizontal track in `#E2E8F0`. Completed steps use a `#10B981` filled disc with a check icon; current active step displays a `#2563EB` disc surrounded by a `4px` pulse halo in `rgba(37, 99, 235, 0.2)`; upcoming steps render as `#F1F5F9` discs with `#64748B` label text.
- **Vertical Milestones (Submissions / Audit Logs)**: Continuous `#E2E8F0` connector rail along the left margin with contextual metadata aligned to the right.