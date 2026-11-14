# ANAS MANZOOR — Interactive Developer Portfolio

A bespoke, monochrome (`#050505` × `#FFFFFF` × grayscale) interactive developer portfolio engineered for **Anas Manzoor** (Software Engineering Student & Aspiring Full-Stack Web Developer).

## Visual Identity & Color System

- **Primary Black**: `#050505`
- **Secondary Black**: `#111111`
- **Dark Gray**: `#222222`
- **Medium Gray**: `#777777`
- **Light Gray**: `#E5E5E5`
- **Pure White**: `#FFFFFF`

## Architecture

```text
src/
  app/
    globals.css
    icon.svg
    layout.tsx
    page.tsx
  components/
    intro/
      CinematicIntroExperience.tsx
      SeatedCharacterScene.tsx
    navigation/
      MinimalNavbar.tsx
    hero/
      MainHeroSection.tsx
    about/
      AboutSection.tsx
    skills/
      SkillsSection.tsx
    journey/
      JourneySection.tsx
    projects/
      ProjectsSection.tsx
    contact/
      ContactSection.tsx
    footer/
      MinimalFooter.tsx
  data/
    portfolio-data.ts
  hooks/
    useMousePosition.ts
    useReducedMotion.ts
  lib/
    utils.ts
  styles/
    design-system.ts
public/
  images/
    profile.png (optional portrait slot)
    projects/
      wifivision.svg
      cortex.svg
      learnloop.svg
      noirtable.svg
      mirau.svg
  models/
```

## Running Locally

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm start
```
