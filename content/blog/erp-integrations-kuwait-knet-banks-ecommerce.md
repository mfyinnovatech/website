---
title: "Connecting Your ERP to KNET, Banks and E-commerce in Kuwait"
seoTitle: "ERP Integration in Kuwait: KNET, Banks & E-commerce"
description: "How Kuwaiti companies connect their ERP to KNET payments, bank statements, online stores and WhatsApp orders, so payments, orders and stock reconcile automatically."
summary: "In Kuwait, the integrations that matter most connect your ERP to KNET and card payments, your bank statements, your online store and the channels customers order through, including WhatsApp. KNET is usually connected through your acquiring bank or a gateway such as MyFatoorah or Tap, and each payment should create or match an invoice in the ERP automatically. Plan refunds, settlement reports and the Kuwaiti dinar's three decimals from the start, because that is where reconciliation breaks."
date: "2026-11-08"
author: "Maryam Mehboob"
category: "Odoo ERP"
tags: ["Kuwait", "KNET", "ERP integration", "Odoo", "E-commerce"]
faqs:
  - q: "How do I accept KNET payments on my website?"
    a: "KNET is enabled on your merchant account, either directly through your acquiring bank or through a payment gateway such as MyFatoorah, Tap or UPayments. The gateway gives you the connection your website, app or ERP uses to take payments."
  - q: "Can Odoo accept KNET payments?"
    a: "Yes. KNET can be connected to Odoo through payment provider modules or through a gateway that supports KNET. Test refunds and reconciliation before go-live, not only successful payments."
  - q: "Why don't our KNET payments match the bank statement?"
    a: "Usually because payments settle in batches, fees are deducted before settlement, refunds are processed separately, or amounts are rounded to two decimals instead of the Kuwaiti dinar's three. Matching rules in the ERP should handle each of these."
  - q: "Can WhatsApp orders go into our ERP?"
    a: "Yes. WhatsApp Business conversations and orders can be captured in the CRM or sales app, so an order taken on WhatsApp follows the same flow to delivery, invoice and payment as any other order."
---

Kuwaiti companies rarely sell through one channel. A distributor takes orders from sales reps, an online store, WhatsApp and phone calls, gets paid by KNET, card and bank transfer, and reconciles it all at month end. When the ERP is not connected to those channels, someone re-types orders and matches payments by hand. This guide covers the integrations that matter most in Kuwait and how to plan them so they reconcile.

## Why integration decides whether the ERP pays off

An ERP gives you one database for sales, stock, purchasing and accounting. Integrations decide whether the data reaching that database is complete. Without them, the ERP holds part of the truth and spreadsheets hold the rest, which is the problem the ERP was supposed to solve.

## KNET and card payments

KNET is Kuwait's national debit network, and for most local customers it is the default way to pay online.

- **How it is connected.** KNET is enabled on your merchant account, either directly with your acquiring bank or through a gateway such as MyFatoorah, Tap or UPayments. Gateways usually add card payments and other methods through the same connection.
- **How it charges.** KNET takes the payment in a single step. There is no separate authorisation and capture, so refunds and partial refunds are handled as their own transactions. Your ERP must record them that way.
- **What to automate.** Each successful payment should create or match an invoice payment in the ERP, and each refund should create a credit and a refund entry, with the gateway reference stored on both.

## Bank statements and reconciliation

Gateways settle in batches, often net of fees. Bank lines then show one amount for many customer payments.

- Import bank statements into the ERP automatically or on a schedule.
- Set matching rules for gateway settlements, fees and refunds.
- **Use three decimals.** The Kuwaiti dinar is divided into 1,000 fils. Any system that rounds to two decimals will create small differences on every reconciliation.

## Online store and stock

Whether you sell on WooCommerce, Shopify or a custom store, the essentials are the same:

- Orders flow into the ERP as sales orders, with customer and delivery details.
- Stock levels flow from the ERP to the store, so you never sell what is not on the shelf.
- Prices and promotions are managed in one place.
- Payments from the store match the right orders in the ERP.

## Marketplaces and delivery platforms

If you sell through marketplaces or delivery apps, treat each as a sales channel with its own settlement: orders in, settlement report in, commission recorded, net payment matched. A weekly import is often enough to start; automate once the volume justifies it.

## WhatsApp orders

Many Kuwaiti customers prefer to order on WhatsApp. With WhatsApp Business connected to your CRM or sales app, a conversation becomes a quotation or order in the ERP, and the rest of the flow, delivery, invoice and KNET payment link, follows automatically.

## Arabic data

Customer names, addresses and product descriptions often exist in Arabic and English. Decide which fields are bilingual before migration, so invoices, delivery notes and reports print correctly in both languages.

## A planning checklist

1. List every sales channel and payment method you use today.
2. Decide which gateway or bank connection you will use for KNET and cards.
3. Define how refunds and partial refunds are recorded.
4. Set the Kuwaiti dinar to three decimals everywhere before transactions start.
5. Agree bank statement import and matching rules.
6. Decide which data is bilingual.
7. Test the full cycle, order to payment to reconciliation to refund, before go-live.

## Connecting Odoo in Kuwait

Odoo connects to KNET through payment provider modules or KNET-enabled gateways, imports bank statements, syncs with online stores and runs CRM and sales for WhatsApp orders. As an [official Odoo partner serving Kuwait](/odoo-partner-kuwait), MFY Innovatech sets up the dinar, bilingual documents and these integrations, and tests reconciliation before go-live. See also our [automation and integrations service](/services/automation-cloud-integrations) and the guide to [choosing an Odoo implementation company in Kuwait](/blog/best-odoo-implementation-company-in-kuwait).
