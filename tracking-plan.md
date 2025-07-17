# Firebase Analytics Tracking Plan

## Overview

This document outlines all analytics events, parameters, and integration points for Firebase Analytics in the project.

---

## Event Table

| Event Name         | Purpose                        | Parameters                                   | File/Function Example                |
|--------------------|--------------------------------|----------------------------------------------|--------------------------------------|
| screen_view        | Track page views               | screen_name, user_id                         | App.tsx (router effect)              |
| cta_clicked        | Track CTA button clicks        | cta_label, user_id                           | CallToActionSection.tsx (onClick)    |
| login              | User login                     | method, user_id                              | Login.tsx (onSuccess)                |
| logout             | User logout                    | user_id                                      | LogoutButton.tsx (onClick)           |
| sign_up            | User registration              | method, user_id                              | Login.tsx (onSignup)                 |
| purchase           | Transaction completed          | transaction_id, value, currency, items, user_id | Payment.tsx (onSuccess)           |
| form_submitted     | Form submission                | form_name, user_id                           | FeedbackForm.tsx (onSubmit)          |
| error_occurred     | Error tracking                 | error_message, location, user_id              | ErrorBoundary.tsx (onError)          |
| database_uploaded  | Database file uploaded         | file_type, user_id                           | DatabaseUpload.tsx (onUpload)        |
| query_executed     | User ran a query               | query_length, user_id                        | QueryInput.tsx (onRun)               |

---

## Custom User Properties

- `user_id` (set after login)
- `user_role` (if roles exist)

---

## Naming Conventions

- Use `snake_case` for event names and parameters.
- Prefix custom events with context (e.g., `database_`, `query_`).
- Use clear, descriptive parameter names.

---

## Example: Event Logging

```ts
import { trackEvent } from "../lib/trackEvent";

// CTA click
trackEvent("cta_clicked", { cta_label: "Get Started", user_id });

// Page view (auto-tracked in App.tsx)
trackEvent("screen_view", { screen_name: location.pathname, user_id });

// Login
trackEvent("login", { method: "email", user_id });

// Error
trackEvent("error_occurred", { error_message: error.message, location: "DatabaseUpload", user_id });
```

---

## Compliance & Privacy

- Do **not** log PII (emails, names, etc.) in event parameters.
- Only log anonymized user IDs.
- If users are in the EU, implement a cookie consent banner and only initialize analytics after consent.
- Provide a way for users to opt out of analytics.

---

## Dashboard Suggestions

- Funnel analysis (signup → upload → query)
- Retention (returning users)
- Conversion (CTA clicks → signups)
- Error tracking (error_occurred events)
- User segments (by user_role, user_id, etc.)

---