# Merval Calculator

A financial analysis tool for stocks listed on the Argentine Merval index. Enter company data manually and the calculator computes key financial ratios automatically, organized by category and color-coded for quick interpretation.

**Live demo:** _coming soon_

---

## Features

- Automatic calculation of 14 financial ratios across 4 categories: Valuation, Profitability, Risk, and Liquidity
- Traffic light system (🟢 🟡 🔴) for instant interpretation without financial expertise
- Contextual tooltips on every input field
- Guided info panel for new users
- Real-time updates as you type — no submit button needed

---

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- No backend, no database — all calculations run client-side

---

## Architecture decisions

### No backend in Phase 1

The risk-return analysis this tool performs is based entirely on data the user provides. There is no need to persist or process data server-side at this stage. Keeping everything client-side simplifies deployment, eliminates latency, and lets the tool run as a static site.

_Reconsidered for Phase 2: a backend will be introduced to store analysis history and enable comparison over time._

### ARS as the standard currency

The Merval operates in Argentine pesos. All inputs are expected in ARS. For companies with USD-denominated revenue, users are expected to convert manually before entering data. This avoids a dependency on exchange rate APIs in Phase 1 and keeps the data source transparent to the user.

### Separate result interfaces per block

Ratios are grouped into four blocks — Valuation, Profitability, Risk, Liquidity — each exposed as a separate TypeScript interface and rendered in its own tab. This avoids overwhelming the user with 14 numbers at once and allows them to focus on the category relevant to their analysis.

### Traffic light as affordance

Color-coded status indicators (green / yellow / red) were chosen over raw number comparisons because they communicate meaning instantly, regardless of the user's financial background. Thresholds are general references based on conventional financial analysis benchmarks and are not investment advice.

### Tooltips + info panel for guidance

Two layers of user guidance were implemented intentionally:
- **Tooltips** on each field for users who know what they're doing but need a quick reminder
- **Info panel** for users unfamiliar with financial statements, explaining what the tool does and how to interpret results

---

## Roadmap

### Phase 1 — Manual calculator ✅
Input company data manually. The app calculates and displays all ratios with traffic light indicators.

### Phase 2 — Automation (planned)
Enter a ticker symbol and the app fetches financial data automatically via API. Manual override will remain available. Data will be end-of-day or intraday (15–20 min delay) — real-time data was considered and discarded due to cost and unnecessary complexity for a portfolio analysis tool.

### Phase 3 — History and export (planned)
Save analysis sessions to compare a company's ratios over time. Export reports as PDF or image for offline review or sharing.

---

## Ratios calculated

| Block | Ratio | Formula |
|---|---|---|
| Valuation | P/E | Price / EPS |
| Valuation | P/B | Price / Book value per share |
| Valuation | EV/EBITDA | Enterprise Value / EBITDA |
| Valuation | P/S | Market Cap / Revenue |
| Valuation | P/FCF | Market Cap / Free Cash Flow |
| Profitability | ROE | Net Income / Equity |
| Profitability | ROA | Net Income / Total Assets |
| Profitability | Net margin | Net Income / Revenue |
| Profitability | Operating margin | EBIT / Revenue |
| Risk | Debt/EBITDA | Net Debt / EBITDA |
| Risk | Debt/Equity | Total Debt / Equity |
| Risk | Interest coverage | EBIT / Interest Expense |
| Liquidity | Current ratio | Current Assets / Current Liabilities |
| Liquidity | Cash ratio | Cash / Current Liabilities |

---

## Why this project

Analyzing a Merval stock manually requires computing a dozen ratios from three different financial statements. This tool was built to automate that process — enter the numbers once and get an instant structured overview instead of a spreadsheet full of formulas.

---

## Disclaimer

This tool is for informational purposes only and does not constitute investment advice. Ratio thresholds are general references and may not apply to all sectors or market conditions.
