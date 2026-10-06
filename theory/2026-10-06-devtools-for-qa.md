# DevTools for QA

Date: 2026-10-06
Type: study notes
Source: "DevTools para QA" guide from Material QA

The notes were written by Joaquín in Spanish and translated to English with AI assistance. The corrections at the end were added by Claude.

## What they are and why they matter

- DevTools are developer tools built into every browser. They let you look "inside" a web page: its HTML, errors, API calls, cookies, and more.
- They are useful for a QA because they turn "the button doesn't work" into "the button calls the API and it returns a 500", so bug reports are much more precise.
- Anything changed in the page is local: nothing in the real system breaks.

## Network tab

It shows the API calls with Name, Status, Type, Time, Headers, Payload, Preview/Response, among others.

Key options:

- **Fetch/XHR:** a filter that shows only API calls, without images, CSS, etc.
- **Preserve Log:** keeps the requests when the page reloads or redirects.
- **Disable cache:** simulates a user visiting for the first time.
- **Throttling:** simulates slow connections or no internet. Ideal to test loaders, timeouts and error messages.
- **Copy as cURL:** copy it and paste it into Postman. It builds the full request so you can keep testing it.

## QA tip

When you report an API bug, include the endpoint, the method, the status, the body that was sent (Payload) and the response (Response). With that, the development team can reproduce it without asking you anything.

## Corrections and clarifications from the mentor

- Changing the page (HTML, styles) is local. But if you resend a request, or paste it into Postman and run it, it hits the **real server** and can create or delete data. Do it only in test environments.
- **Copy as cURL** also copies the session cookies and tokens. Never paste it into a public repo or a social network without removing them first.
- Disable cache only works while DevTools is open. To simulate a truly new user you also need to clear cookies and storage.
