# Didi Store — Design & Implementation Specification

## 1. Project Overview

Didi Store is a modern, multi-category retail business providing a wide range of consumer products.

The store is not limited to photography and camera equipment. Products may include:

- Photography equipment
- Cameras and camera accessories
- Lighting equipment
- Electronics
- Home & Kitchen appliances
- Fitness and gym equipment
- Wearables
- Other consumer products

The website is primarily a **product showcase and sales-conversion platform**.

The current business model is:

Browse products
→ View product details
→ Order through WhatsApp
→ Discuss with Didi Store
→ Confirm payment and delivery
→ Complete the sale

The website does NOT currently process payments or provide a traditional e-commerce checkout.

---

# 2. Business Objectives

## 2.1 Product Showcase

Present Didi Store's products in a professional, modern and trustworthy online catalog.

Customers should be able to:

- Browse products
- Browse categories
- Search for products
- Filter products
- Sort products
- View detailed product information
- See product pricing in XAF
- Check product availability
- Contact Didi Store through WhatsApp

## 2.2 Trust & Credibility

The website should make Didi Store look like an established and trustworthy retail business.

The design should communicate:

- Professionalism
- Quality
- Reliability
- Modernity
- Accessibility
- Clear product information

## 2.3 Conversion

The primary purpose of the website is to turn product discovery into a WhatsApp conversation.

Important calls to action should therefore direct users toward:

**Order on WhatsApp**

The website should make it obvious how customers can go from discovering a product to ordering it.

## 2.4 Operational Simplicity

WhatsApp is currently the primary sales channel.

The website should not introduce unnecessary e-commerce complexity.

There is currently no need for:

- Shopping cart
- Checkout
- Online payment
- Customer accounts
- Order tracking
- Complex order management

---

# 3. Target Audience

The website should primarily serve:

### Tech & Photography Customers

Users looking for:

- Cameras
- Lenses
- Tripods
- Microphones
- Lighting
- Headphones
- Other photography and production equipment

### Home & Lifestyle Shoppers

Users looking for:

- Blenders
- Air fryers
- Kitchen appliances
- Electronics
- Fitness equipment
- Gym accessories
- Wearables

### Social Media Customers

Users who discover Didi Store through:

- Instagram
- TikTok
- Facebook
- WhatsApp
- Other social platforms

The website should work especially well for users arriving from mobile devices.

---

# 4. Core User Journey

The primary customer journey is:

Homepage
↓
Browse Categories / Featured Products
↓
Product Catalog
↓
Product Detail
↓
Order on WhatsApp
↓
WhatsApp Conversation
↓
Didi Store confirms payment and delivery
↓
Sale

The website should optimize this journey rather than introducing unnecessary steps.

---

# 5. Current Product Model

Products should remain intentionally simple.

The current conceptual product structure is:

```text
Product
├── id
├── name
├── description
├── price
├── image
├── category_id (optional)
├── stock
├── is_featured
└── status
```
