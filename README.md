# Hospital Triage Design System

**CST3106 – Lab 10**

| | |
|---|---|
| **Team member(s)** | Reece Hannah |
| **GitHub repository** | https://github.com/PhantomXReborn/cst3106_labs/tree/lab-10 |
| **Document version** | 1.0 |
| **Last updated** | *[YYYY-MM-DD]* |

---

## Table of Contents

1. [Introduction & Design Philosophy](#1-introduction--design-philosophy)
2. [Typography](#2-typography)
3. [Colour Palette](#3-colour-palette)
4. [App Components](#4-app-components)
5. [Layout & Navigation](#5-layout--navigation)
6. [Consistency & Accessibility](#6-consistency--accessibility)
7. [Design System Summary](#7-design-system-summary)
8. [References](#8-references)

---

## 1. Introduction & Design Philosophy

The Hospital Triage App is a two-sided tool: patients submit their symptoms, and administrative staff prioritize and manage the queue. Because it operates in a high-stress, time-sensitive emergency-room context, the design system is built around three principles:

- **Clarity first** — every screen must communicate its purpose within seconds.
- **Reduced cognitive load** — minimal choices, obvious labels, predictable behaviour.
- **Safety and trust** — calm, professional visuals on the patient side; authoritative, high-contrast visuals on the admin side.

This document defines the fonts, colours, components, layout, and consistency rules that govern the app so that every screen feels like part of one coherent product.

---

## 2. Typography

### 2.1 Font Stack

| Role | Font | Weights used |
|---|---|---|
| Headings & titles | Arial (fallback: Helvetica, sans-serif) | **700** (Bold), **600** (Semibold) |
| Buttons & labels | Arial | **600**, **700** |
| Body text & descriptions | Times New Roman (fallback: Georgia, serif) | **400** (Regular), **600** (Semibold) |
| Data & tables (admin) | Arial | **400**, **600** |

### 2.2 Visual Reference

> **`[TODO]`** Replace the text samples below with rendered screenshots from the app showing each weight in use (e.g., a heading in Arial Bold and a description paragraph in Times New Roman). Commit them to `/docs/typography/` and embed them here.

**Arial — weight options**

| Weight | Sample |
|---|---|
| Arial Regular (**400**) | The quick brown fox jumps over the lazy dog. |
| Arial Semibold (**600**) | The quick brown fox jumps over the lazy dog. |
| Arial Bold (**700**) | The quick brown fox jumps over the lazy dog. |

**Times New Roman — weight options**

| Weight | Sample |
|---|---|
| Times Regular (**400**) | The quick brown fox jumps over the lazy dog. |
| Times Semibold (**600**) | The quick brown fox jumps over the lazy dog. |

### 2.3 Reasoning

- **Arial for headings and controls.** Arial is a humanist sans-serif with a high x-height and open apertures, making it extremely legible on screens of all sizes — critical for a triage app used on phones by anxious patients and on desktops by busy staff. Bold weights give titles and buttons strong visual hierarchy and make interactive elements instantly recognisable.
- **Times New Roman for body text.** A serif face in body copy provides comfortable, familiar reading for longer explanatory paragraphs (e.g., the admin instructions and the patient questionnaire description). It also creates a clear typographic contrast with the sans-serif headings, so users can distinguish structure from content at a glance.
- **Pairing rationale.** Sans-serif + serif is a classic, low-risk pairing: Arial signals *interface and action*; Times New Roman signals *information to read*. Both are system fonts with near-universal availability, meaning no loading delay, no missing-font fallback, and consistent rendering across devices — important for an app that must work reliably in an emergency.

---

## 3. Colour Palette

### 3.1 Patient (User) Interface

| Swatch | Name | Hex | Usage |
|---|---|---|---|
| 🟦 | Calming Blue | `#2E6DA4` | Primary buttons, headings, active states |
| ⬜ | Neutral Grey | `#F2F4F6` | Page background, cards, input backgrounds |
| ⬛ | Charcoal | `#333333` | Body text |
| 🟩 | Success Green | `#2E7D32` | Confirmation of submitted entry |

### 3.2 Admin Interface

| Swatch | Name | Hex | Usage |
|---|---|---|---|
| ⬛ | Dark Grey | `#37474F` | Header bar, table header row, primary admin elements |
| 🟥 | Alert Red | `#C62828` | Urgent alerts, high-attention indicators, destructive actions |
| 🟧 | Attention Amber | `#EF6C00` | *Increase Necessary Attention* / mid-priority states |
| ⬜ | Light Grey | `#ECEFF1` | Table rows, panel backgrounds |
| ⬛ | Near-Black | `#212121` | Admin body text |

### 3.3 Contrast Verification

> **`[TODO]`** Verify each pair below with a contrast checker (e.g., WebAIM) and record the ratio. The WCAG 2.2 AA threshold is **≥ 4.5:1** for body text and **≥ 3:1** for large text (≥ 18 pt / 24 px, or ≥ 14 pt / 18.66 px bold) and UI boundaries.

| Foreground | Background | Ratio | Passes AA (body)? |
|---|---|---|---|
| Charcoal `#333333` | Neutral Grey `#F2F4F6` | *[x.x:1]* | *[ ]* |
| White `#FFFFFF` | Calming Blue `#2E6DA4` | *[x.x:1]* | *[ ]* |
| White `#FFFFFF` | Alert Red `#C62828` | *[x.x:1]* | *[ ]* |
| White `#FFFFFF` | Dark Grey `#37474F` | *[x.x:1]* | *[ ]* |
| Near-Black `#212121` | Light Grey `#ECEFF1` | *[x.x:1]* | *[ ]* |
| White `#FFFFFF` | Attention Amber `#EF6C00` | *[x.x:1]* | *[ ]* *(likely fails for body — reserve for large text/labels only)* |

### 3.4 Reasoning

- **Calming Blue (patient side).** Blue is strongly associated with healthcare, calm, and trust. Using it for primary actions and headings soothes anxious patients while keeping the *next step* unmistakable.
- **Neutral Grey backgrounds (patient side).** Low-saturation backgrounds reduce visual strain and make the blue buttons pop through contrast, guiding the eye to the questionnaire and Submit button.
- **Dark Grey (admin side).** A darker, desaturated palette conveys seriousness and authority and visually separates the staff environment from the patient environment — staff instantly know which *mode* they are in.
- **Red and Amber accents (admin side).** Red is reserved only for urgent/high-attention states and destructive actions (e.g., *Remove From Triage*), while Amber flags moderate priority and the *increase attention* control. This creates a traffic-light mental model: the more urgent the case, the warmer the colour.
- **Accessibility.** All text/background pairs are chosen for **WCAG** AA contrast (≥ 4.5:1 for body text, ≥ 3:1 for large text and UI boundaries). Colour is never the only signal — urgency is also shown numerically (Necessary Attention out of 10) and through text labels, supporting colour-blind users.

---

## 4. App Components

### 4.1 Titles

| Component | Specification |
|---|---|
| User page title | *Hospital Triage – User* — Arial Bold **700**, centred, Calming Blue, large (e.g., 2 rem / 32 px) |
| Admin page title | *Hospital Triage – Admin* — Arial Bold **700**, centred, Attention Amber/Orange, large |
| Section subtitles | Arial Semibold **600**, Charcoal/Dark Grey, left-aligned |

**Design choice:** Titles are large and centred so the page's purpose is identifiable at a glance. The colour shift between blue (user) and amber (admin) reinforces which environment the person is in — a safety feature in a shared-device hospital setting.

### 4.2 Description Text

- **Location:** Directly below the title on both pages.
- **Style:** Times New Roman Regular **400**, Charcoal, max-width ~65 characters per line for readability.
- **Purpose:** Explains what the page does and what the user must do next (e.g., *"Please select your type of injury and the level of pain associated with such reason."*).

**Design choice:** Serif body text distinguishes instructions from interface chrome, and short line lengths keep instructions scannable for stressed users.

### 4.3 Buttons

| Property | Specification |
|---|---|
| Shape | Rectangular with rounded corners (8 px radius) |
| Primary (user) | Calming Blue background, white Arial Bold text |
| Primary (admin) | Dark Grey background, white text |
| Destructive (admin) | Alert Red background, white text (e.g., *Remove From Triage*) |
| Secondary / neutral | Light Grey background, dark text, thin border |
| Minimum size | 44 × 44 px touch target |

**States**

| State | Visual treatment |
|---|---|
| Default | As specified above |
| Hover | Background darkened ~10 % |
| Focus | 2 px visible outline (offset 2 px), distinct from hover |
| Active / pressed | Background darkened ~15 % |
| Disabled | 40 % opacity, `cursor: not-allowed`, no hover response |

**Design choice:** Rounded rectangles read as *pressable* and are easy to hit on mobile. Consistent sizing, bold labels, and distinct colour roles (blue = go, red = destructive) let users predict what a button will do before they tap it. Explicit focus outlines support keyboard navigation for staff.

### 4.4 Input Fields

- **Style:** Outlined fields with 8 px radius, 12 px internal padding, Neutral Grey background, 1 px border.
- **Placeholder text:** Grey, descriptive (e.g., *Select type of injury…*).
- **Labels:** Always visible above the field (never placeholder-only) in Arial Semibold, so users never lose context.
- **Error state:** Red border + red helper text beneath the field.

**Design choice:** Generous padding and visible labels reduce mis-taps and mistakes — crucial when a patient is in pain or distress. Errors are explained in text, not just colour.

### 4.5 Patient Questionnaire (User Page)

- **Injury-type selector:** List/radio options — Head, Heart, Lung, Neck, Stomach, Bone or Muscle, Burn or Cut.
- **Pain-level selector:** 1 (Not bad) → 10 (Unbearable), presented as a clear numbered scale.
- **Submit Entry button:** Primary Calming Blue button, full width on mobile.
- **Confirmation:** Success Green message (*Entry submitted — please wait to be called*).

**Design choice:** A short, single-screen form with two questions keeps cognitive load minimal. The 1–10 pain scale is a familiar, universally understood format. Immediate confirmation reassures the patient their submission reached staff.

### 4.6 Admin Summary (Admin Page)

- **Data table** with columns: Entry Number, Necessary Attention (out of 10), Injury Type, Pain Level, and a Select action per row.
- **Table styling:** Dark Grey header row with white Arial text; alternating Light Grey rows for scanability.
- **Controls:** *Load Data*, *Remove From Triage* (red), *Increase Necessary Attention* (amber), *Decrease Necessary Attention* (grey).
- **Selected-entry indicator:** *Selected Entry: [n]* displayed clearly before actions are applied.

**Design choice:** The table mirrors the mental model of a triage queue — sorted by necessary attention so the most urgent cases surface first. Row-level Select buttons plus a single action panel prevent accidental bulk actions. Destructive actions are red and separated from routine ones to reduce errors. The controls make the workflow explicit: **select → review → act**.

### 4.7 Feedback & Status Components

- **Success message:** Green banner/toast after patient submission.
- **Attention badges:** Small coloured chips showing attention level (Red ≥ 8, Amber 4–7, Green ≤ 3) alongside the numeric value.
- **Empty states:** *No entries yet — submissions will appear here* in grey.

---

## 5. Layout & Navigation

### 5.1 Layout Structure

The app uses a responsive, mobile-first, grid-based layout.

```text
┌─────────────────────────────────────────────┐
│ HEADER: App title + role indicator │
│ (Hospital Triage – User / – Admin) │
├─────────────────────────────────────────────┤
│ │
│ MAIN CONTENT (single column on mobile, │
│ centred max-width column on desktop) │
│ │
│ USER PAGE ADMIN PAGE │
│ ┌───────────────────┐ ┌───────────────┐ │
│ │ Title │ │ Title │ │
│ │ Description │ │ Description │ │
│ │ Injury selector │ │ Data table │ │
│ │ Pain level 1–10 │ │ (Entry No., │ │
│ │ [Submit Entry] │ │ Attention, │ │
│ │ Confirmation msg │ │ Injury, Pain) │ │
│ └───────────────────┘ │ [Load Data] │ │
│ │ Selection │ │
│ │ actions: │ │
│ │ [Remove] │ │
│ │ [Increase] │ │
│ │ [Decrease] │ │
│ └───────────────┘ │
├─────────────────────────────────────────────┤
│ NAVIGATION: bottom bar (mobile) / │
│ top bar (desktop) with role switch │
└─────────────────────────────────────────────┘
```

> **`[TODO]`** Export this ASCII layout as a diagram (draw.io, Figma, or Excalidraw) and commit it to `/docs/wireframes/` in the GitHub repository. Reference it here as:
>
> ```markdown
> ![User and Admin wireframes](docs/wireframes/user_admin_wireframes.png)
> ```

### 5.2 Navigation Flow

```text
┌────────────────────┐
│ App Entry Point │
└─────────┬──────────┘
│
┌─────────┴─────────┐
▼ ▼
┌─────────────┐ ┌─────────────┐
│ User Page │ │ Admin Page │
│ (patient) │ │ (staff) │
└──────┬──────┘ └──────┬──────┘
│ │
Fill questionnaire Load Data → review table
│ │
Submit Entry ──────────▶ appears in table
│ │
Confirmation screen Select row → Increase /
Decrease / Remove
│
Table updates, queue
re-sorted by attention
```

- **Mobile:** A fixed bottom navigation bar keeps the primary role switch and key actions within thumb reach.
- **Desktop:** A top navigation bar places the same actions in the conventional location for pointer users.

**Flow rationale:** Navigation is deliberately shallow — at most one level deep — so neither patients nor staff ever need to search for their next action. The user flow (submit → confirm) and admin flow (load → select → act) are each three steps or fewer, which is essential in a high-paced emergency environment. The role switch is always visible, making it impossible to confuse the patient and admin environments.

### 5.3 Responsive Breakpoints

| Breakpoint | Width | Layout behaviour |
|---|---|---|
| Mobile | `< 768 px` | Single column, full-width buttons, bottom nav bar |
| Tablet | `768–1023 px` | Single centred column (max ~600 px), top nav |
| Desktop | `≥ 1024 px` | Centred max-width column (max ~960 px), top nav |

---

## 6. Consistency & Accessibility

### 6.1 How Consistency Is Achieved

- **Token-based design.** All colours, fonts, spacing (8 px grid: 8 / 16 / 24 / 32), and corner radii (8 px) are defined once as design tokens and reused everywhere. No ad-hoc values.

  | Token | Value | Used for |
  |---|---|---|
  | `--space-1` | 8 px | Tight gaps, icon padding |
  | `--space-2` | 16 px | Field padding, list gaps |
  | `--space-3` | 24 px | Section spacing |
  | `--space-4` | 32 px | Page-level spacing |
  | `--radius` | 8 px | Buttons, inputs, cards |
  | `--touch-min` | 44 px | Minimum interactive target |

- **Reusable components.** Buttons, input fields, titles, and tables are built as single components with variants (primary / secondary / destructive; user theme / admin theme) rather than re-styled per page.
- **Two themes, one system.** The User and Admin interfaces share identical typography, spacing, component shapes, and interaction states — only the colour tokens change (blue/neutral vs dark grey/red/amber). This makes the app feel like one product while still giving each audience its own visual identity.
- **Consistent language.** Labels are short, action-oriented verbs (*Submit Entry*, *Load Data*, *Remove From Triage*, *Increase Necessary Attention*) and terminology is identical across screens (e.g., *Necessary Attention* is always capitalised and always *out of 10*).
- **Predictable interaction patterns.** Every button has the same hover/focus/disabled behaviour; every destructive action is red and confirmed; every form shows inline errors the same way.

### 6.2 Accessibility Considerations

| Requirement | Implementation | Status |
|---|---|---|
| Contrast (WCAG AA) | All text ≥ 4.5:1; UI boundaries ≥ 3:1 | *[TODO: verify with ratios in §3.3]* |
| Colour independence | Urgency conveyed by number and text label as well as colour | ✅ |
| Touch targets | Minimum 44 × 44 px for all interactive elements | ✅ |
| Keyboard support | Visible focus outlines on all controls; logical tab order | ✅ |
| Typography | Large headings (≥ 32 px), body text ≥ 16 px, comfortable line lengths | ✅ |
| Plain language | Instructions avoid jargon; pain scale uses plain descriptors (*1 – Not bad*, *10 – Unbearable*) | ✅ |
| Screen-reader semantics | Buttons use `<button>`, labels bound via `for`/`id`, table has `<th scope="col">` | *[TODO: confirm during implementation]* |

---

## 7. Design System Summary

| Category | Decision | Why it matters |
|---|---|---|
| Headings font | Arial Bold / Semibold | Instant legibility, strong hierarchy, no loading delay |
| Body font | Times New Roman Regular | Comfortable reading, clear contrast with headings |
| User colours | Calming Blue + Neutral Grey | Trust, calm, guided attention |
| Admin colours | Dark Grey + Red / Amber accents | Authority, urgency signalling, error prevention |
| Buttons | Rounded rectangles, role-coloured, 44 px min | Predictable, touch-friendly, safe destructive actions |
| Inputs | Outlined, visible labels, inline errors | Fewer mistakes under stress |
| Layout | Mobile-first, single column → centred desktop | Works on any device in the ER |
| Navigation | Bottom bar (mobile) / top bar (desktop), ≤ 3 steps | Fast, shallow, always-visible next action |
| Consistency | Design tokens + shared components + two themes | One coherent product, predictable behaviour |

**Conclusion.** This design system gives the Hospital Triage App a single source of truth for typography, colour, components, layout, and interaction. It prioritises clarity, speed, and safety — the qualities that matter most when patients are anxious and staff are under pressure — while remaining consistent and accessible across both the patient and admin experiences.

---

## 8. References

- Markdown Guide – Cheat Sheet: <https://www.markdownguide.org/cheat-sheet/>
- Dillinger (Markdown editor): <https://dillinger.io/>
- GitHub Docs: <https://docs.github.com/en>
- GitHub Desktop Docs: <https://docs.github.com/en/desktop>
- Hurna Git Academy: <https://hurna.io/academy/git/index.html>
- Reference example (CST3106): <https://github.com/kvhuang23/cst3106_labs/blob/236d6e01304896696d0514b230eb1cf4a450153f/lab10/hospital_triage_design_system.md>
- WCAG 2.2 Contrast Guidance: <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
