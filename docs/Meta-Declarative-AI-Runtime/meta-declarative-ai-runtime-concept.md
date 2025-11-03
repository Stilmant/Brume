# Meta Declarative AI Runtime

This repository explores a meta declarative programming model. The goal is to build applications that can be fully described and modified by AI rather than hand coded by humans.

## Core idea
An application is a graph of intentions captured in a few JSON descriptors:
- `pages.json` says what screens exist and how blocks compose a page.
- `schema.json` defines the shape of data and validation rules.
- `cards.json` defines reusable content patterns.
- `machine.json` defines event reactions and state transitions.
- `i18n.json` maps keys to human text.

These files describe what the system should display and how it should react, not how to implement it.

## Execution model
A generator compiles the descriptors into a target:
- a lightweight web target with HTML plus Alpine and Pico.css
- or a full SPA target with React 18, Vite, and TypeScript

Socket.IO provides real time events. The same semantics apply to both targets.

## Why this matters
It shows what AI native development can look like:
- software defined as data
- a clear separation between semantics and interpretation
- portable across targets without rewriting the app

In short, applications as intentions, not instructions.
