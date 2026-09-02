# Village Pickles

A responsive React + TypeScript + Vite farm-to-home e-commerce website based on the supplied Village Pickles reference design.

## Features

- Reference-style green/yellow premium village-food UI
- 50-acre lemon farm branding
- Product categories and product cards
- Product search/filtering
- Cart with quantity controls
- Local in-memory cart state
- WhatsApp ordering
- Contact form -> WhatsApp
- Bulk-order section
- Gated-community messaging
- Responsive mobile navigation
- SEO metadata
- No backend required for the first version

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Change WhatsApp number

Edit:

`src/utils/whatsapp.ts`

```ts
export const WHATSAPP_NUMBER = "91+91 9959414445";
```

## Change products and prices

Edit:

`src/data/products.ts`

Each product has:

- id
- name
- category
- description
- price
- unit
- image
- featured

## Replace images

Change each `image` URL in `src/data/products.ts`.

## Important

The prices are demo values based on the requested design. Update them before publishing.

The site currently sends enquiries/orders to WhatsApp and does not process online payments.
