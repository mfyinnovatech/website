---
title: "KNET Payment Gateway Integration in Kuwait: How It Works, What It Costs and How Long It Takes"
seoTitle: "KNET Payment Gateway Integration: Kuwait Guide (2026)"
description: "How to add KNET to your website, app or ERP in Kuwait: direct bank vs MyFatoorah, Tap or UPayments, documents, fees, testing, Apple Pay and the 2026 changes."
summary: "To accept KNET online in Kuwait you either integrate directly through a KNET member bank or go through a licensed payment provider such as MyFatoorah, Tap, UPayments or Hesabe. The direct route needs a merchant agreement with your bank, Transportal credentials, an HTTPS site and KNET certification, and usually has the lowest per-transaction fee; one bank's March 2026 schedule lists KD 200 setup, KD 30 a year and 0.100% plus KD 0.080 per KNET transaction. Providers are faster to start and bundle cards and Apple Pay, at a higher rate. Since a Central Bank of Kuwait circular in September 2025, merchants may not charge customers extra for paying by KNET or card."
date: "2026-11-15"
author: "Maryam Mehboob"
category: "Payments & integrations"
tags: ["KNET", "Payment gateway", "Kuwait", "E-commerce", "Integration", "MyFatoorah", "Tap Payments", "Apple Pay", "Odoo"]
faqs:
  - q: "How do I get a KNET payment gateway for my website?"
    a: "Apply to a KNET member bank for an e-commerce payment gateway, or sign up with a licensed payment provider such as MyFatoorah, Tap, UPayments or Hesabe. Banks usually ask for your commercial registration, the authorised signatory's ID, your company IBAN and details of your website or app. Your developer then integrates the gateway, tests it and, for the direct route, passes KNET certification before going live."
  - q: "How much does KNET payment gateway integration cost?"
    a: "There are two costs: the payment fees and the development work. One Kuwaiti bank's March 2026 schedule lists a KD 200 setup fee, KD 30 a year and 0.100% plus KD 0.080 per KNET transaction for a direct gateway. Payment providers quote per merchant, and publish card rates from around 2% per transaction. Development depends on whether you use a ready plugin or a custom integration with your ERP."
  - q: "Can I charge customers a fee for paying with KNET?"
    a: "No. The Central Bank of Kuwait prohibits merchants from collecting extra fees or commissions from customers for paying with KNET, debit cards, credit cards or other electronic payment methods in Kuwait. Payment providers have updated their merchant agreements to say so."
  - q: "Should I use KNET directly or MyFatoorah, Tap or UPayments?"
    a: "Use a payment provider if you want to start quickly, accept KNET, Visa, Mastercard and Apple Pay through one integration, or sell through Shopify or a similar platform. Go direct through your bank when your KNET volume is high enough that the lower per-transaction fee matters, and you can manage certification and a separate card agreement."
  - q: "Does KNET work with Apple Pay?"
    a: "Yes. KNET cards can be used through Apple Pay, and several gateways support Apple Pay via KNET. Banks also offer Apple Pay as an option on the KNET gateway service request form. Confirm with your bank or provider that it is enabled for your merchant account."
  - q: "Can KNET payments post automatically into Odoo or another ERP?"
    a: "Yes. Through the provider's plugin or a custom integration, each successful payment can create the payment in the ERP, reconcile it against the invoice or order and record the gateway fee, so finance does not re-key transactions from the gateway portal."
---

Almost every online purchase in Kuwait starts with the same question at checkout: can I pay with KNET? KNET is the national network that links Kuwaiti banks' debit cards, and for many customers it is the default way to pay online. If your website, app or customer portal does not accept it, you lose orders.

This guide explains the two ways to add KNET, what each costs, how the integration and testing work, and what changed in 2025 and 2026.

## Two ways to accept KNET online

| | Direct through your bank | Through a payment provider |
|---|---|---|
| Who you contract with | A KNET member bank (your acquiring bank) | A licensed provider such as MyFatoorah, Tap Payments, UPayments or Hesabe |
| Payment methods | KNET; cards usually under a separate agreement | KNET, Visa, Mastercard, Apple Pay and more in one account |
| Fees | Usually the lowest per KNET transaction | Higher, quoted per merchant; card rates published from around 2% |
| Set-up effort | Bank application, Transportal credentials, KNET certification | Online sign-up and the provider's API or plugin |
| Typical fit | Higher KNET volumes, established companies, custom systems | New stores, Shopify and similar platforms, quick launch, mixed payment methods |

Neither route is "better" in general. The right one depends on your volume, which payment methods your customers use, and how much integration work you are willing to own.

## What a direct KNET gateway costs

Banks publish their own fee schedules. As one example, a [KNET service request form](https://www.cbk.com/media/c4f2e764-edef-4294-9334-d39c4d99363e/Z6X9ug/Electronic%20Payment%20Service%20Request%20-%20V8%20-%202026-03.pdf) published by the Commercial Bank of Kuwait in March 2026 lists:

| Item | Fee |
|---|---|
| Gateway setup | KD 200 |
| Annual fee | KD 30 |
| Per KNET transaction | 0.100% + KD 0.080 |

On a KD 50 order, that per-transaction fee comes to about 130 fils. Other banks' terms differ, and card acceptance usually needs a separate agreement, so ask your bank for its current schedule.

Payment providers publish less detail for KNET and quote per merchant. Compare quotes on your real transaction mix: average order value, the share paid by KNET versus card, refunds and settlement time.

## No surcharges: the 2025 Central Bank rule

The Central Bank of Kuwait has [prohibited collecting additional fees or commissions](https://www.arabtimesonline.com/news/kuwait-prohibits-additional-charges-on-debit-and-credit-card-payments) from customers who pay with KNET, debit or credit cards, or other electronic payment methods in Kuwait. Payment companies cite Circular No. 2/RBA/600/2025 of 30 September 2025 and have updated merchant agreements accordingly. Build the gateway fee into your prices, not into a "payment fee" line at checkout.

## What changed at KNET in 2026

From 5 June 2026, KNET [changed its online payment page](https://www.arabtimesonline.com/news/knet-set-to-modify-access-to-gateway/) so customers enter their card number directly instead of first choosing their bank. KNET said the change also prepares the gateway for more payment methods, such as digital wallets from payment companies licensed by the Central Bank. If your checkout includes screenshots or instructions that mention choosing a bank, update them.

## How the direct integration works

### 1. Apply to your bank

Banks typically ask for:

- Commercial registration (CR) and the business activity
- Civil ID of the authorised signatory
- The company's IBAN for settlement
- The website or app address and a description of what you sell
- A signed merchant agreement and the bank's service request form

### 2. Receive your credentials

Once approved, you receive the details that identify your merchant terminal on KNET, usually a **Transportal ID**, a **Transportal password** and a **terminal resource key**. Treat these like passwords: store them in your server's secret store, never in the website's front-end code or a public repository.

### 3. Build the payment flow

The usual flow uses a payment page hosted by the bank, which keeps card data off your servers:

1. The customer clicks Pay; your server creates a payment request with the amount in KWD (three decimals) and your order reference.
2. The customer is redirected to the hosted KNET page and enters their card details.
3. KNET returns the result to your response and error URLs.
4. Your server **verifies the response on the server side** before marking the order paid, then records the payment ID, result code and reference.

Communication with the gateway must use HTTPS. Never trust a "success" message from the browser alone; confirm it from your server.

### 4. Test and certify

Banks provide a test environment and test cards. Test successful payments, declined cards, cancelled payments, timeouts, duplicate clicks and refunds. For a direct gateway, KNET certifies the integration before the bank enables live payments.

### 5. Go live and reconcile

After go-live, match gateway settlements to orders every day. This is where an ERP integration pays for itself.

## Connecting KNET to Odoo, Shopify or your own system

- **Shopify and similar platforms:** usually through a payment provider's app, because the platform limits custom checkout code.
- **Odoo and other ERPs:** through the provider's module or a custom payment connector. Each successful payment can register against the sales order or invoice, the gateway fee can post to an expense account, and daily settlements can reconcile against the bank statement.
- **Custom websites and mobile apps:** direct integration or the provider's API and SDKs. In apps, open the hosted payment page in a secure in-app browser and confirm the result from your server.

Our guide to [connecting your ERP to KNET, banks and e-commerce](/blog/erp-integrations-kuwait-knet-banks-ecommerce) covers the reconciliation side in more depth.

## Apple Pay and cards

KNET cards can be used through Apple Pay, and gateways such as [Checkout.com](https://www.checkout.com/docs/payments/add-payment-methods/apple-pay/apple-pay-via-knet) support Apple Pay via KNET. Banks list Apple Pay as an option on the KNET gateway request form. Many Kuwaiti customers also pay by Visa or Mastercard, so most stores need cards as well as KNET. If you go direct, that usually means a second agreement; a payment provider covers both in one account.

## Checklist before you launch

1. Choose the route: direct bank or payment provider, based on volume and payment methods.
2. Get written fees, settlement times and refund rules.
3. Show prices in KWD with three decimals, and no payment surcharge.
4. Keep credentials server-side only.
5. Verify every payment result on the server before fulfilling the order.
6. Test declines, cancellations, timeouts and refunds, not just the happy path.
7. Reconcile settlements to orders daily, ideally automatically in your ERP.
8. Update checkout instructions for the June 2026 KNET page change.

## How MFY Innovatech helps

Our team builds websites, mobile apps and ERP integrations for Kuwaiti companies, including KNET and card payments through banks and payment providers, with automatic reconciliation into Odoo. See our [automation and integrations services](/services/automation-cloud-integrations), [custom software development](/services/custom-software-development) and our [software company in Kuwait](/software-company-kuwait) page.

### Sources

- Commercial Bank of Kuwait: [Electronic Payment Service Request, March 2026](https://www.cbk.com/media/c4f2e764-edef-4294-9334-d39c4d99363e/Z6X9ug/Electronic%20Payment%20Service%20Request%20-%20V8%20-%202026-03.pdf)
- Arab Times: [Kuwait prohibits additional charges on card payments](https://www.arabtimesonline.com/news/kuwait-prohibits-additional-charges-on-debit-and-credit-card-payments) and [KNET set to modify access to gateway](https://www.arabtimesonline.com/news/knet-set-to-modify-access-to-gateway/)
- Mastercard Gateway: [KNET documentation](https://developer.mastercard.com/mastercard-gateway/documentation/payment-methods/cards/domestic-schemes/knet/)
- Checkout.com: [Apple Pay via KNET](https://www.checkout.com/docs/payments/add-payment-methods/apple-pay/apple-pay-via-knet)

Fees and rules change; figures were checked in November 2026. Confirm current terms with your bank or provider.
