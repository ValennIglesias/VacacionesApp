// English guides. body is HTML; [[fig name | caption]] inserts a screenshot from public/img/guides/en-{name}.jpg
export const GUIDES = [
  {
    slug: "how-to-split-travel-expenses",
    pair: "como-dividir-gastos-de-un-viaje",
    published: "2026-10-18",
    title: "How to split travel expenses with friends without arguing",
    desc: "A practical guide to splitting group trip expenses: what to log, how to split, when to settle up and how to pay each other back with fewer transfers, with a full worked example.",
    lead: "Group trips are cheaper and more fun, right up until it's time to settle up. A simple method means nobody overpays and nobody is left owing.",
    related: ["settle-group-debts-fewer-transfers", "group-trip-budget", "paying-abroad-cards-cash-fees"],
    body: `
<h2>The problem isn't money, it's missing records</h2>
<p>On a trip, one person rarely pays for everything. Someone books the rental on their card, someone else rents the car, one person does the big grocery run and another covers the boat tour. Three days in there are a dozen crossed payments, and by the end of the week nobody remembers who paid what.</p>
<p>The arguments are rarely about bad faith. They happen because everyone has a different picture of how much they put in, and without a shared record there's no way to check. The person who fronted a lot feels they always pay; the person who fronted little feels overcharged.</p>
<p>The fix has three parts: <strong>log everything as it happens</strong>, <strong>split each expense only among the people who took part</strong>, and <strong>settle at the end with as few payments as possible</strong>. The rest of this guide walks through each step with a real example.</p>

<h2>1. Agree on the rules before you leave</h2>
<p>Five minutes of conversation before the trip saves hours of arguing afterwards. You don't need a contract, just for everyone to hear the same thing:</p>
<ul>
<li><strong>What everyone shares</strong>: lodging, shared transport, fuel, tolls, groceries.</li>
<li><strong>What each person pays alone</strong>: personal shopping, souvenirs, individual treats.</li>
<li><strong>How restaurant meals are split</strong>: evenly, or everyone pays their own if orders vary a lot.</li>
<li><strong>Which currency you'll use to pay each other back</strong> if you travel abroad, and at what rate.</li>
<li><strong>When you'll settle</strong>: at the end, or every few days on a long trip.</li>
</ul>
<p>If someone doesn't drink, or is skipping an expensive activity, now is the time to say it. Rules are far easier to agree on when nobody owes anything yet.</p>

<h2>2. Log every expense right away</h2>
<p>The golden rule is to record each expense as soon as it's paid, with four details: <strong>amount, who paid, who it's split between, and a category</strong>. Leave it for the evening and receipts get lost; leave it for the last day and memory starts inventing.</p>
<p>Nobody needs to be the group accountant. Anyone should be able to log an expense, including on behalf of someone whose phone is dead: "Tom paid for parking, I'll add it."</p>
[[fig add-expense | Logging an expense: amount, category, who paid and who it's split between]]
<p>In TribuSplit, expenses default to the destination's currency. If someone paid in another currency (a tour charged in US dollars in Brazil, say), you tap "Other", pick the currency, and the app converts it at that day's rate, which you can adjust.</p>

<h2>3. Split only among the people who took part</h2>
<p>Splitting everything evenly sounds fair but often isn't. If someone skipped the tour, they shouldn't pay for it. Each expense should be split only among the people who actually used it.</p>
<p>An example with four friends on a week at the beach:</p>
<table>
<thead><tr><th>Expense</th><th>Paid by</th><th>Split between</th><th>Each</th></tr></thead>
<tbody>
<tr><td>Rental house 1,200</td><td>Ana</td><td>All 4</td><td>300</td></tr>
<tr><td>Car and fuel 480</td><td>Ben</td><td>All 4</td><td>120</td></tr>
<tr><td>Boat tour 270</td><td>Cara</td><td>Ana, Ben, Cara</td><td>90</td></tr>
<tr><td>Groceries 200</td><td>Dan</td><td>All 4</td><td>50</td></tr>
<tr><td>Birthday dinner 360</td><td>Ana</td><td>Ben, Cara, Dan (treating Ana)</td><td>120</td></tr>
</tbody>
</table>
<p>Look at the last row: Ana paid for dinner, but it was her birthday, so the other three are treating her. It's split among them and Ana pays nothing for it. Situations like this are impossible to reconstruct from memory and trivial if you log them on the spot.</p>

<h2>4. Work out each person's balance</h2>
<p>With a complete record, each person's balance is a subtraction: <strong>what they paid minus their share</strong>.</p>
<table>
<thead><tr><th>Person</th><th>Paid</th><th>Share</th><th>Balance</th></tr></thead>
<tbody>
<tr><td>Ana</td><td>1,560</td><td>300 + 120 + 90 + 50 = 560</td><td>+1,000</td></tr>
<tr><td>Ben</td><td>480</td><td>300 + 120 + 90 + 50 + 120 = 680</td><td>−200</td></tr>
<tr><td>Cara</td><td>270</td><td>680</td><td>−410</td></tr>
<tr><td>Dan</td><td>200</td><td>300 + 120 + 50 + 120 = 590</td><td>−390</td></tr>
</tbody>
</table>
<p>The balances add up to zero: what some owe is exactly what others are owed. If yours don't, an expense is missing or split wrong.</p>
<p>If every expense was shared by everyone, the <a href="/en/tools/split-expenses-calculator/">split expenses calculator</a> does this in a minute: enter what each person paid and it tells you who pays whom.</p>
[[fig balances | Pending balances: green is owed money, red owes money]]

<h2>5. On long trips, settle in stages</h2>
<p>On trips longer than a week, it's worth settling partway through. Nobody builds up a large debt, and whoever fronted a lot (usually the person who booked the lodging) gets paid back sooner.</p>
<p>The key is that expenses already settled <strong>don't count again in the final split</strong>, though they still show in the trip summary. In TribuSplit that's the "Split up to today" button: it takes everything pending, works out the payments and marks those expenses as settled.</p>

<h2>6. Settle with as few transfers as possible</h2>
<p>If everyone paid back each person for each expense, the example above would need at least six transfers. It doesn't have to: debtors can pay creditors directly.</p>
<ul>
<li>Cara pays Ana 410.</li>
<li>Dan pays Ana 390.</li>
<li>Ben pays Ana 200.</li>
</ul>
<p>Three transfers and everyone is at zero. In a group of N people you never need more than N − 1 payments. The method is explained step by step in <a href="/en/guides/settle-group-debts-fewer-transfers/">how to settle group debts with the fewest transfers</a>.</p>

<h2>7. Confirm every payment</h2>
<p>A small habit that prevents a lot of confusion: when someone sends money, the person receiving it confirms it arrived. That way it's clear which debts are settled and which are still open, without checking bank statements or posting screenshots in the group chat.</p>
[[fig transfers | Each transfer shows who pays, how much and its status: pending, paid or confirmed]]
<p>In the app, only the person who owes can tap "I paid", and only the person being paid can confirm it was received. Everyone adds their own payment details, so nobody sends money to the wrong account.</p>

<h2>Common mistakes</h2>
<ul>
<li><strong>Logging everything at the end.</strong> Something always gets forgotten, and it's usually a small expense from whoever complains least.</li>
<li><strong>Splitting everything among everyone.</strong> People who skipped an activity end up paying for it and feel taken advantage of.</li>
<li><strong>Rounding by eye.</strong> Across dozens of expenses, rounding adds up. Let the math close to the cent.</li>
<li><strong>Mixing currencies without converting.</strong> Adding reais to dollars gives a meaningless number. See <a href="/en/guides/travel-expenses-multiple-currencies/">how to handle travel expenses in multiple currencies</a>.</li>
<li><strong>Waiting weeks to settle.</strong> Old debts are the ones that end badly.</li>
</ul>

<h2>FAQ</h2>
<h3>Does everyone need the app?</h3>
<p>No. Whoever creates the trip adds everyone's names, and anyone can log expenses on someone else's behalf. People who want to mark their own payments or add their payment details join with the trip code, no account needed.</p>
<h3>What about expenses paid before the trip?</h3>
<p>Flights and lodging deposits are often paid weeks ahead. Log them with their real date; they show up grouped under "Before the trip" and count in the split like any other expense.</p>
<h3>What if someone leaves early?</h3>
<p>Do a partial split on the day they leave. They're settled with everyone, and later expenses are split only among those still traveling.</p>

<p><strong>In short:</strong> clear rules before you leave, every expense logged when it happens, splits only among those who took part, few transfers at the end and every payment confirmed. That's how money stops being the topic of the trip.</p>
`,
  },

  {
    slug: "travel-expenses-multiple-currencies",
    pair: "gastos-en-distintas-monedas",
    published: "2026-10-18",
    title: "How to handle travel expenses in multiple currencies",
    desc: "Which currency to log expenses in, how to convert payments made in another currency, and how to settle group debts in your home currency, with worked examples and common mistakes.",
    lead: "Traveling abroad adds a layer of complexity: you pay in the local currency, sometimes in dollars or euros, and you settle debts in your home currency. Sorting it out is simpler than it looks.",
    related: ["paying-abroad-cards-cash-fees", "how-to-split-travel-expenses", "settle-group-debts-fewer-transfers"],
    body: `
<h2>Three currencies on one trip</h2>
<p>Take a typical case: four friends from Chicago spend a week in Lisbon. The apartment was booked from home and charged in euros. In Portugal they pay almost everything in euros, but a day trip booked through a US site was charged in dollars. And when they get home, they'll pay each other back in dollars.</p>
<p>Three roles, often three currencies:</p>
<ul>
<li><strong>The trip currency</strong> (euros): where most expenses happen and where it's best to keep the books.</li>
<li><strong>Occasional currencies</strong>: one-off payments in something else.</li>
<li><strong>The settle-up currency</strong> (dollars): what the group uses to pay each other back.</li>
</ul>
<p>Mixing them up causes almost every error. The trick is to keep them separate, with three rules.</p>

<h2>Rule 1: log each expense in the currency you paid in</h2>
<p>If dinner was paid in euros, log it in euros. If the day trip was charged in dollars, log it in dollars. Converting in your head on the spot introduces errors and mixes exchange rates from different days.</p>
<p>The practical setup is a tool that defaults to the destination's currency, so 90 % of expenses need no thought, and lets you pick another currency when needed.</p>
[[fig expenses | Trip expenses, all in the destination currency, grouped by day]]

<h2>Rule 2: convert other-currency expenses at that day's rate</h2>
<p>When an expense is in a different currency from the trip, convert it to the trip currency <strong>at the rate on the day it happened</strong>, and lock that rate. That way the expense's value doesn't change if the currency moves next week.</p>
<p>Example: the day trip cost 150 dollars and that day 1 dollar was worth 0.92 euros. It's recorded as 138 euros. If the dollar drops by the end of the trip, that expense is still 138 euros: that's what it actually cost.</p>
<p>In TribuSplit, you tap "Other" when adding an expense, pick the currency and the app fetches the day's rate. If the payer knows their card charged something different, they can correct it.</p>

<h2>Rule 3: agree on the currency you'll settle in</h2>
<p>The currency you spend in and the one you settle in are separate decisions. Americans in Lisbon spend euros and settle in dollars; Canadians in Mexico spend pesos and settle in Canadian dollars; a mixed group from the UK and Germany might spend in Japanese yen and settle in euros.</p>
<p>The procedure that avoids errors is always the same:</p>
<ol>
<li>Work out all balances in the trip currency.</li>
<li>Work out the minimum transfers in that same currency.</li>
<li>Only then convert each transfer to the settle-up currency, using <strong>a single agreed rate</strong>.</li>
</ol>
<p>Converting at the end, and only the transfers, keeps every intermediate calculation exact and applies the rate exactly once.</p>
[[fig settle-fx | When settling, you choose the payment currency and rate; transfers show in both currencies]]

<h2>Which rate should you settle at?</h2>
<p>There's no single "correct" rate. Several references are reasonable:</p>
<table>
<thead><tr><th>Reference</th><th>What it is</th><th>When it fits</th></tr></thead>
<tbody>
<tr><td>Market rate</td><td>The mid-market rate published by exchange services and central banks</td><td>A neutral default when nobody has a reason for another</td></tr>
<tr><td>Card rate</td><td>What the bank actually charged, including fees</td><td>When whoever fronted the money paid mostly by card</td></tr>
<tr><td>Exchange office rate</td><td>What you got changing cash</td><td>When the trip was mostly paid in cash</td></tr>
</tbody>
</table>
<p>The question that settles it: <strong>how much did it really cost, in their own currency, the person who fronted the money?</strong> A lower rate than their real cost means they lose; a higher one means they gain at others' expense. For most trips with fee-free cards, the difference between market and card rates is small, and the market rate is the simplest choice.</p>

<h2>A full example</h2>
<p>Here's a real split from a sample trip to Brazil: balances worked out in reais, then converted to US dollars at one rate.</p>
[[fig transfers | The split stores the rate used and each amount in both currencies]]
<p>The rate is fixed when you confirm the split. If the real moves the following week, the amounts don't change: what was agreed is what gets paid.</p>

<h2>Common mistakes</h2>
<ul>
<li><strong>Adding different currencies without converting.</strong> 100 euros plus 50 dollars isn't 150 of anything.</li>
<li><strong>Converting everything at the last day's rate</strong>, even though expenses happened over weeks.</li>
<li><strong>Choosing the rate at the end</strong>, when everyone already knows which one suits them. Agree beforehand.</li>
<li><strong>Ignoring card and ATM fees</strong>: if they're significant, they can justify using the card rate. More in <a href="/en/guides/paying-abroad-cards-cash-fees/">paying abroad without hidden fees</a>.</li>
</ul>

<h2>FAQ</h2>
<h3>What if everyone lives in a different country?</h3>
<p>Pick one common settle-up currency (often dollars or euros) and let each person convert from there with their own payment method. You can also run separate splits in different currencies, but it usually complicates more than it helps.</p>
<h3>Can we change the settle-up currency mid-trip?</h3>
<p>Yes. Each split, partial or final, has its own currency and rate. You could settle a partial split in reais while in Brazil and the final one in dollars back home.</p>

<p><strong>In short:</strong> log in the currency you paid in, lock the rate for other-currency expenses, calculate everything in the trip currency, and convert only the final transfers at a rate you agreed on in advance.</p>
`,
  },

  {
    slug: "settle-group-debts-fewer-transfers",
    pair: "minimizar-transferencias",
    published: "2026-10-18",
    title: "How to settle group debts with the fewest transfers",
    desc: "The method to simplify a group's debts, step by step: each person's net balance, matching debtors with creditors, rounding, partial settlements, with examples for four and six people.",
    lead: "When six people share costs for a week, the crossed debts look like a maze. With a simple method, they come down to a handful of payments.",
    related: ["how-to-split-travel-expenses", "talking-about-money-with-friends", "splitting-bills-with-roommates"],
    body: `
<h2>The problem with crossed debts</h2>
<p>Picture six friends sharing a house for a week. Every day someone pays for something different: groceries, gas, a dinner, park tickets. If everyone pays back their share every time someone pays, each expense creates five transfers. Thirty expenses in a week means a hundred and fifty small payments.</p>
<p>Worse, many go in opposite directions. Ana sends Ben her share of the gas, and the next day Ben sends Ana his share of the groceries. Money going back and forth for nothing.</p>
<p>The good news: none of those intermediate payments are needed. All that matters is <strong>how much each person paid in total and how much their total share was</strong>.</p>

<h2>Step 1: each person's net balance</h2>
<p>For each member of the group:</p>
<p><strong>Balance = what they paid − their share</strong></p>
<ul>
<li>A <strong>positive</strong> balance means the group owes them.</li>
<li>A <strong>negative</strong> balance means they owe the group.</li>
<li>Zero means they're square.</li>
</ul>
<p>One key property: <strong>all balances always add up to zero</strong>. What some owe is exactly what others are owed. If your numbers don't add to zero, something's wrong.</p>
[[fig balances | Each member's balance: what they paid minus their share]]

<h2>Step 2: match debtors with creditors</h2>
<ol>
<li>Take the person who owes the most and the person owed the most.</li>
<li>The first pays the second the smaller of the two amounts.</li>
<li>One of them is now at zero; the other has a remainder.</li>
<li>Repeat with whoever is left until everyone is at zero.</li>
</ol>
<p>Every round settles at least one person, so it finishes quickly.</p>

<h2>Example: four people</h2>
<table>
<thead><tr><th>Person</th><th>Paid</th><th>Share</th><th>Balance</th></tr></thead>
<tbody>
<tr><td>Ana</td><td>500</td><td>250</td><td>+250</td></tr>
<tr><td>Ben</td><td>200</td><td>250</td><td>−50</td></tr>
<tr><td>Cara</td><td>300</td><td>250</td><td>+50</td></tr>
<tr><td>Dan</td><td>0</td><td>250</td><td>−250</td></tr>
</tbody>
</table>
<ol>
<li>Dan (owes 250) pays Ana (owed 250) 250. Both at zero.</li>
<li>Ben (owes 50) pays Cara (owed 50) 50. Done.</li>
</ol>
<p>Two transfers instead of the six or more you'd get by paying back each expense separately.</p>

<h2>Example: six people</h2>
<table>
<thead><tr><th>Person</th><th>Balance</th></tr></thead>
<tbody>
<tr><td>Ana</td><td>+620</td></tr>
<tr><td>Ben</td><td>+180</td></tr>
<tr><td>Cara</td><td>−90</td></tr>
<tr><td>Dan</td><td>−300</td></tr>
<tr><td>Eve</td><td>−260</td></tr>
<tr><td>Finn</td><td>−150</td></tr>
</tbody>
</table>
<ol>
<li>Dan (−300) pays Ana (+620) 300. Ana is now at +320.</li>
<li>Ana is still owed the most; Eve (−260) pays her 260. Ana is at +60.</li>
<li>Ben (+180) is now owed the most; Finn (−150) pays him 150. Ben is at +30.</li>
<li>Cara (−90) pays Ana 60 and Ben 30.</li>
</ol>
<p>Five transfers and everyone is at zero.</p>

<h2>What's the maximum number of transfers?</h2>
<p>With this method, a group of N people needs <strong>at most N − 1 transfers</strong>, often fewer. Three for four people, five for six, nine for ten. The number of expenses doesn't matter: ten or two hundred.</p>
[[fig settle | Before confirming, the app shows who pays whom]]

<h2>Details worth getting right</h2>
<h3>Rounding</h3>
<p>Split 100 three ways and each person pays 33.33, with a cent left over. It seems like nothing, but across dozens of expenses the cents add up and the totals stop matching. The fix is to assign leftover cents consistently (say, always to the first people on the list) so every expense closes exactly.</p>
<h3>Partial settlements</h3>
<p>If the group settles mid-trip, those expenses must not count again at the end. Each settlement only takes what's pending at that moment, while the trip summary still shows everything.</p>
<h3>Confirming each payment</h3>
<p>The person receiving should confirm each transfer. Without confirmation, within days nobody knows which payments were made.</p>
<h3>Payment currency</h3>
<p>If the trip was in another currency, calculate everything in that currency and convert only the final transfers. See <a href="/en/guides/travel-expenses-multiple-currencies/">how to handle travel expenses in multiple currencies</a>.</p>

<h2>Does this always give the absolute minimum?</h2>
<p>Almost always, or very close. There are rare cases where a subgroup cancels out exactly and one more payment could be saved, but finding them means trying many combinations. In practice the difference is one transfer in large groups, and the simple method has a big advantage: anyone can check it by hand.</p>

<div class="tip"><strong>In practice:</strong> you don't need to do this by hand. TribuSplit calculates the balances and proposes the transfers in the currency you choose; all that's left is to pay and confirm.</div>
`,
  },

  {
    slug: "split-expenses-as-a-couple",
    pair: "dividir-gastos-en-pareja",
    published: "2026-10-18",
    title: "How to split expenses as a couple: methods and examples",
    desc: "The most common ways couples share costs: 50/50, proportional to income, a joint account, or by category. Pros, cons, worked numbers and how to handle trips.",
    lead: "There's no single right way for couples to split costs, only the one that works for both of you. What matters is choosing it deliberately and that both of you feel it's fair.",
    related: ["splitting-bills-with-roommates", "talking-about-money-with-friends", "how-to-split-travel-expenses"],
    body: `
<h2>Why it's worth talking about</h2>
<p>In many couples the split just happens: one pays rent because the lease is in their name, the other buys groceries because they pass the store. It works for a while, until amounts change (rent goes up, a baby arrives, someone changes jobs) and the "I always pay" feeling shows up without anyone doing anything wrong.</p>
<p>Choosing an explicit method isn't distrust. It's having a shared rule for when things change. These are the four most common, with their benefits and their traps.</p>

<h2>Method 1: 50/50</h2>
<p>Every shared expense is split evenly. Simple, transparent, and no need to discuss salaries.</p>
<p><strong>Works well when:</strong> incomes and spending habits are similar.</p>
<p><strong>The trap:</strong> when one partner earns much more, the other ends up spending a much larger share of their income on shared costs. With 2,000 rent and incomes of 6,000 and 3,000, one spends 17 % of their income on rent and the other 33 %.</p>

<h2>Method 2: proportional to income</h2>
<p>Each partner contributes according to what they earn.</p>
<table>
<thead><tr><th></th><th>Income</th><th>Share</th><th>Pays of 2,000 rent</th></tr></thead>
<tbody>
<tr><td>Partner A</td><td>6,000</td><td>60 %</td><td>1,200</td></tr>
<tr><td>Partner B</td><td>4,000</td><td>40 %</td><td>800</td></tr>
</tbody>
</table>
<p><strong>Works well when:</strong> incomes differ significantly and both want the effort to feel similar.</p>
<p><strong>The trap:</strong> it requires talking openly about pay and updating the ratio when it changes. With variable income (freelance, commissions), review it every few months.</p>

<h2>Method 3: a joint account</h2>
<p>Both put a fixed amount each month (equal or proportional) into a shared account, and shared costs come out of it. No splitting individual expenses: the account pays and that's it.</p>
<p><strong>Works well when:</strong> you've lived together a while and shared costs are stable.</p>
<p><strong>The trap:</strong> when the account runs short, someone covers it "just this once" and the account stops reflecting reality. Review contributions regularly.</p>

<h2>Method 4: by category</h2>
<p>One covers rent, the other groceries and utilities. Practical, because each pays "their bills" with no transfers.</p>
<p><strong>The trap:</strong> category costs drift. Groceries rise every month, rent adjusts once a year, and the split can become lopsided without anyone noticing. Check it now and then.</p>

<h2>Quick comparison</h2>
<table>
<thead><tr><th>Method</th><th>Simplicity</th><th>Fair with unequal incomes</th><th>Upkeep</th></tr></thead>
<tbody>
<tr><td>50/50</td><td>High</td><td>Low</td><td>Low</td></tr>
<tr><td>Proportional</td><td>Medium</td><td>High</td><td>Medium</td></tr>
<tr><td>Joint account</td><td>High day to day</td><td>Depends on contributions</td><td>Medium</td></tr>
<tr><td>By category</td><td>High</td><td>Variable</td><td>High (drifts)</td></tr>
</tbody>
</table>

<h2>Trips as a couple</h2>
<p>Many couples use one method at home and another for travel: proportional for the household, 50/50 for vacations, or the other way round. Decide before booking.</p>
<p>On a trip there are many small expenses and both of you pay for different things all the time. Logging them as you go and settling once at the end is far easier than paying each other back after every meal. And if you want to see where the money went, the summary by category shows it.</p>
[[fig summary | The trip summary: how much went on transport, lodging, food and each day]]

<h2>Things worth deciding explicitly</h2>
<ul>
<li>Are trips and nights out split the same way as household costs?</li>
<li>What about gifts, each other's families, or pets?</li>
<li>How do you handle individual purchases that benefit both (a coffee machine, a sofa)?</li>
<li>What happens if one of you is out of work for a while?</li>
<li>How often will you review the arrangement?</li>
</ul>

<h2>Keeping a record helps more than you'd think</h2>
<p>Even with complete trust, logging shared expenses prevents the "I always pay" feeling. It's not about monitoring each other; it's having data instead of impressions. With a record, the conversation shifts from "I feel like I put in more" to "I paid 120 more this month, shall we even it out or carry it over?"</p>

<h2>Signs your current method isn't working</h2>
<ul>
<li>One of you avoids talking about money or gets defensive.</li>
<li>Phrases like "I always pay" or "you never chip in" start appearing.</li>
<li>Someone stops suggesting plans because they're not sure they'll be asked to pay half.</li>
<li>Small expenses cause more friction than big ones.</li>
</ul>
<p>If any of these show up, it's not a failure: it's time to revisit the arrangement. <a href="/en/guides/talking-about-money-with-friends/">How to talk about money</a> has ideas for the conversation, even if it's written with friends in mind.</p>

<div class="tip"><strong>Key:</strong> the best method is the one you both feel is fair. Start with one, review it now and then, and change it when it stops working. The only bad option is having none.</div>
`,
  },

  {
    slug: "paying-abroad-cards-cash-fees",
    pair: null,
    published: "2026-10-20",
    title: "Paying abroad: cards, cash and how to avoid hidden fees",
    desc: "How to pay when you travel abroad without losing money to foreign transaction fees, ATM charges and dynamic currency conversion, plus how it affects splitting costs with your group.",
    lead: "The exchange rate you see online is rarely the one you get. Between card fees, ATM charges and bad conversions, a trip can quietly cost several percent more than it should.",
    related: ["travel-expenses-multiple-currencies", "group-trip-budget", "esim-vs-local-sim-vs-roaming"],
    body: `
<h2>Where the money actually goes</h2>
<p>When you pay in another currency, there are up to three layers of cost on top of the price:</p>
<ul>
<li><strong>The exchange rate itself</strong>: the rate your card network or bank applies, usually close to the market rate but not identical.</li>
<li><strong>Foreign transaction fees</strong>: a percentage many banks add to every purchase in another currency. It's often around 1 to 3 %, and some cards charge nothing. Check your card's fee schedule before you leave.</li>
<li><strong>ATM fees</strong>: your bank may charge for withdrawals abroad, and the local ATM operator can add its own fee on top.</li>
</ul>
<p>None of these show up on the receipt, which is why they're easy to miss. On a 2,000 trip, a 3 % fee is 60 you never decided to spend.</p>

<h2>Always pay in the local currency</h2>
<p>Card terminals and ATMs abroad often offer to charge you "in your home currency". This is called <strong>dynamic currency conversion</strong>, and the rate it uses is usually worse than your own bank's. The rule is simple: when asked, <strong>choose the local currency</strong>, and let your bank do the conversion.</p>
<p>The same goes for ATMs: if the screen offers to "lock in" a conversion rate, decline and continue in the local currency. Some machines make the bad option the big green button; read before you tap.</p>

<h2>Cards vs cash</h2>
<table>
<thead><tr><th></th><th>Card</th><th>Cash</th></tr></thead>
<tbody>
<tr><td>Exchange rate</td><td>Usually close to market</td><td>Depends on where you exchange</td></tr>
<tr><td>Fees</td><td>Foreign transaction fee, if your card has one</td><td>ATM fees or exchange spread</td></tr>
<tr><td>Safety</td><td>Can be locked from your bank's app</td><td>Lost is lost</td></tr>
<tr><td>Record keeping</td><td>Automatic in your statement</td><td>Easy to forget</td></tr>
<tr><td>Acceptance</td><td>Near universal in cities</td><td>Needed at markets, small shops, tips</td></tr>
</tbody>
</table>
<p>For most trips, the best combination is a card without foreign transaction fees for most purchases, plus a small amount of cash for markets, tips and places that don't take cards.</p>

<h2>Getting cash without overpaying</h2>
<ul>
<li><strong>Withdraw less often, in larger amounts</strong>, if your bank charges a fixed fee per withdrawal.</li>
<li><strong>Use bank ATMs</strong> rather than standalone machines in tourist areas, which tend to charge more.</li>
<li><strong>Avoid airport exchange counters</strong> for anything beyond what you need to reach your lodging.</li>
<li><strong>Carry a backup card</strong> from a different bank in case one gets blocked.</li>
</ul>

<h2>A quick comparison with numbers</h2>
<p>Say you spend 1,000 euros on a trip and the market rate is 1 euro = 1.08 dollars. With illustrative fees:</p>
<table>
<thead><tr><th>How you pay</th><th>Approximate cost in dollars</th></tr></thead>
<tbody>
<tr><td>Card with no foreign fee</td><td>~1,080</td></tr>
<tr><td>Card with a 3 % foreign fee</td><td>~1,112</td></tr>
<tr><td>Accepting dynamic conversion at the terminal</td><td>often 1,130 or more</td></tr>
<tr><td>Cash exchanged at an airport counter</td><td>often 1,150 or more</td></tr>
</tbody>
</table>
<p>Exact figures depend on your bank and the place, but the order rarely changes: fee-free card first, airport counters last.</p>

<h2>What this means when you split costs with a group</h2>
<p>When people pay in different ways (one by card, another with cash from the airport) each effectively paid a slightly different rate. Tracking each person's exact rate gets complicated fast. Two simpler approaches work well:</p>
<ol>
<li><strong>Log every expense in the local currency</strong>, the amount on the receipt. That keeps the shared record exact and fair.</li>
<li><strong>Agree on one exchange rate when you settle up</strong>, such as the market rate on the day you settle, or the card rate if most of the money was fronted by card.</li>
</ol>
[[fig settle-fx | Settling in your home currency: one rate for the whole split, adjustable by hand]]
<p>More on this in <a href="/en/guides/travel-expenses-multiple-currencies/">how to handle travel expenses in multiple currencies</a>.</p>

<h2>Before you leave: a quick check</h2>
<ul>
<li>Look up your card's foreign transaction fee and ATM fees abroad.</li>
<li>Make sure your card works internationally and that your bank's app lets you lock or unlock it.</li>
<li>Note the approximate exchange rate so you can spot a bad deal.</li>
<li>Decide with your group which currency you'll use to pay each other back.</li>
</ul>

<h2>FAQ</h2>
<h3>Do I still need to tell my bank I'm traveling?</h3>
<p>Many banks no longer require it, but some still flag foreign purchases. Check your bank's app; a two-minute setting can save you a blocked card on day one.</p>
<h3>Is it worth getting a travel card or multi-currency account?</h3>
<p>If you travel more than once or twice a year, often yes: fee-free spending and better exchange rates add up. Compare fees and how easy it is to top up before choosing.</p>

<p class="meta">This guide is for general information and isn't financial advice. Fees and rates vary by bank and change over time.</p>
`,
  },

  {
    slug: "group-trip-budget",
    pair: "presupuesto-de-viaje-en-grupo",
    published: "2026-10-20",
    title: "How to plan a group trip budget",
    desc: "A step-by-step way to work out what a group trip costs per person: fixed costs, daily spending, a buffer for surprises, agreeing on a spending level and tracking it during the trip.",
    lead: "A good budget isn't a guess. It separates what you already know from what you need to estimate, and leaves room for the unexpected.",
    related: ["group-trip-planning-checklist", "group-travel-insurance", "paying-abroad-cards-cash-fees"],
    body: `
<h2>Why a group needs a budget</h2>
<p>Traveling alone, a budget is a personal choice. In a group, it's an agreement. If each person imagines a different trip (one pictures hostels and supermarket meals, another a hotel with breakfast and dinners out), problems start on day one. Building the budget together puts those expectations on the table before anyone books.</p>
<p>It doesn't need accountant-level precision. A rough per-person number, broken into parts everyone understands, is enough.</p>

<h2>1. Separate fixed and variable costs</h2>
<p><strong>Fixed costs</strong> are known before you leave: flights, lodging, car rental, insurance, pre-booked tours. <strong>Variable costs</strong> depend on each day: meals, local transport, nights out, shopping.</p>
<p>Add up the fixed costs and divide by the number of people. Estimate the variable ones per person, per day. Mixing them is the most common mistake: lodging doesn't depend on how often you eat out, and dinners don't depend on what the lodging cost.</p>

<h2>2. Estimate daily spending per person</h2>
<p>Picture a typical day on the trip and estimate:</p>
<ul>
<li><strong>Food</strong>: breakfast, lunch, dinner and snacks. Cooking a few meals at your rental lowers this a lot.</li>
<li><strong>Local transport</strong>: taxis, ride-hailing, public transport, fuel, parking, tolls. For a road trip, the <a href="/en/tools/gas-cost-calculator/">gas money calculator</a> estimates fuel per person.</li>
<li><strong>Activities</strong>: tickets, equipment rentals, tips.</li>
<li><strong>Going out</strong>: bars, cafés, treats.</li>
</ul>
<p>Multiply that daily figure by the number of days. If you don't know the destination, look up supermarket and restaurant prices on travel forums and review sites to calibrate. A useful trick: estimate three levels (tight, normal, comfortable) and choose one together.</p>

<h2>3. Add a buffer for surprises</h2>
<p>Something always comes up: an unplanned tour, a late-night taxi, a pharmacy run, a rainy day that changes every plan. A buffer of 10 to 15 % on top of the total is usually enough for short trips. For long trips or destinations with volatile prices, add a little more.</p>

<h2>4. Agree on a spending level</h2>
<p>This is the delicate part. If one person wants a nice restaurant every night and another prefers to cook, the same budget won't work for both. Options that work:</p>
<ul>
<li>Agree on a shared "base" level and let anything extra be paid individually.</li>
<li>Mix it up: some meals at the rental, some meals out.</li>
<li>Split each activity only among the people who join, instead of splitting everything among everyone.</li>
</ul>
<p>What doesn't work is "we'll figure it out there": on the trip, nobody wants to be the one who says something is too expensive.</p>

<h2>Worked example: one week, four people</h2>
<table>
<thead><tr><th>Item</th><th>Group total</th><th>Per person</th></tr></thead>
<tbody>
<tr><td>Lodging, 6 nights</td><td>1,200</td><td>300</td></tr>
<tr><td>Car and fuel</td><td>480</td><td>120</td></tr>
<tr><td>Daily spending (40 per person × 6 days)</td><td>960</td><td>240</td></tr>
<tr><td>Buffer (12 %)</td><td>317</td><td>79</td></tr>
<tr><td><strong>Total</strong></td><td><strong>2,957</strong></td><td><strong>739</strong></td></tr>
</tbody>
</table>
<p>Example figures in any currency: what matters is the structure. With this table, everyone knows to set aside about 740 for the trip, and that about 420 of it goes before departure (lodging and car).</p>

<h2>5. Don't forget pre-trip costs</h2>
<p>Deposits, flights and tickets are paid weeks ahead, usually on one person's card. Log them as soon as they're paid, with their real date: they're part of the trip and belong in the split. In TribuSplit they're grouped under "Before the trip" and don't count toward the daily average.</p>

<h2>6. Track spending during the trip</h2>
<p>A budget only helps if you compare it with reality. Logging every expense in a shared app lets everyone see, at any moment, the total spent, by category and by day.</p>
[[fig expenses | The trip total, the current day and the average spent per day]]
<p>If food spending is running well over plan halfway through, there's still time to adjust: a dinner at home, a beach day instead of a tour. Finding out when you get home doesn't help.</p>
[[fig summary | The summary by category shows where the money goes]]

<h2>Common mistakes</h2>
<ul>
<li><strong>Budgeting only for lodging and flights.</strong> On short trips, daily spending can match or exceed fixed costs.</li>
<li><strong>Using old prices.</strong> Look for recent information; in some destinations prices change fast.</li>
<li><strong>Ignoring exchange rates and card fees</strong> abroad. See <a href="/en/guides/paying-abroad-cards-cash-fees/">paying abroad without hidden fees</a>.</li>
<li><strong>Leaving no buffer.</strong> An exact budget breaks at the first surprise.</li>
</ul>

<div class="tip"><strong>Key:</strong> agree on the budget before, log expenses during, and glance at the summary halfway through. That way the trip doesn't end with surprises.</div>
`,
  },

  {
    slug: "group-trip-planning-checklist",
    pair: "viajar-en-grupo-checklist",
    published: "2026-10-20",
    title: "Group trip planning checklist",
    desc: "A complete checklist for planning a trip with friends or family, stage by stage: dates, budget, bookings, documents, shared expenses and getting along on the road.",
    lead: "Planning a group trip has more moving parts than traveling alone. This checklist puts the decisions in order so nothing is left to the last minute.",
    related: ["group-trip-budget", "how-to-split-travel-expenses", "talking-about-money-with-friends"],
    body: `
<h2>Before you start: who handles what</h2>
<p>The most common mistake on group trips is that one person ends up organizing everything: researching lodging, comparing flights, building the itinerary, collecting deposits. They arrive exhausted, feeling nobody helped.</p>
<p>Splitting the planning from the start changes that. A simple setup: one person handles lodging, another transport, another activities, another the money. Each brings options; the group decides.</p>

<h2>A few months ahead</h2>
<ul>
<li><strong>Decide who's going</strong> and who coordinates each area.</li>
<li><strong>Pick dates</strong> that work for everyone. A poll in the group chat saves a lot of back-and-forth. If someone can't make every day, decide whether they join for part of it or the dates move.</li>
<li><strong>Agree on a rough per-person budget</strong>. It's the most important conversation: if spending expectations differ a lot, better to know early. See <a href="/en/guides/group-trip-budget/">how to plan a group trip budget</a>.</li>
<li><strong>Check documents</strong>: valid passports (many countries require at least six months of validity), visas or travel authorizations, permissions for minors and entry requirements.</li>
<li><strong>Agree on the kind of trip</strong>: one base or moving around? Packed days or rest? Two people with opposite ideas about this can spoil it for everyone.</li>
</ul>

<h2>One or two months before</h2>
<ul>
<li><strong>Book lodging and main transport</strong>. For groups, a whole house or apartment is often cheaper per person than several hotel rooms, and gives you a common space to cook and hang out.</li>
<li><strong>Decide how you'll split costs</strong>: what everyone shares, what each person pays alone, and which currency you'll use to pay each other back.</li>
<li><strong>Create the shared expense group</strong> and add everyone, so whoever pays a deposit can log it right away.</li>
<li><strong>Get travel insurance</strong> if you're leaving the country. Check what it covers, including any adventure activities you're planning; see <a href="/en/guides/group-travel-insurance/">group travel insurance: what to check</a>.</li>
</ul>
[[fig new-trip | Creating the trip: destination, dates and currency in three steps]]
<p>When you create a trip in TribuSplit you pick the country (its currency fills in automatically), the dates and the currency you'll settle in. Then you share a six-letter code and everyone joins by picking their name.</p>
[[fig group | The invite code and the list of group members]]

<h2>The week before</h2>
<ul>
<li>Confirm bookings and transfer times.</li>
<li>Check your card's fees for foreign purchases. More in <a href="/en/guides/paying-abroad-cards-cash-fees/">paying abroad without hidden fees</a>.</li>
<li>Bring some local cash for the first expenses (taxi, tips).</li>
<li>Share a common packing list so you don't end up with five hair dryers and no charger. First-aid kit, adapters and sunscreen are usually shared.</li>
<li>Everyone adds their payment details so paying each other back is quick.</li>
<li>Sort out mobile data: <a href="/en/guides/esim-vs-local-sim-vs-roaming/">eSIM, local SIM or roaming</a>.</li>
<li>Download offline maps and save bookings on your phone.</li>
</ul>

<h2>During the trip</h2>
<ul>
<li><strong>Log every expense when it happens</strong>, with who paid and who it's split between.</li>
<li>On long trips, <strong>settle up halfway</strong> so debts don't pile up.</li>
<li>Respect everyone's pace: not everyone wants to do everything together, and that's fine. A free day midway lowers the tension in any group.</li>
<li>Keep receipts for big expenses (lodging, cars, tours) in case you need to claim anything.</li>
<li>Rotate shared chores: cooking, dishes, driving.</li>
</ul>

<h2>When you get back</h2>
<ul>
<li><strong>Settle up within the first few days</strong>, while memories are fresh.</li>
<li>Everyone confirms the payments they receive.</li>
<li>Look at the summary: knowing where the money went helps plan the next trip.</li>
<li>Share photos in a common album before they get lost across four phones.</li>
</ul>

<h2>Printable quick list</h2>
<table>
<thead><tr><th>When</th><th>Tasks</th></tr></thead>
<tbody>
<tr><td>Months ahead</td><td>Who's going, dates, budget, documents, kind of trip</td></tr>
<tr><td>1–2 months before</td><td>Lodging, transport, expense rules, expense group, insurance</td></tr>
<tr><td>Week before</td><td>Confirmations, cards, cash, shared packing, payment details, maps</td></tr>
<tr><td>During</td><td>Log expenses, partial settle-up, free time, receipts</td></tr>
<tr><td>After</td><td>Final settle-up, confirm payments, summary, photos</td></tr>
</tbody>
</table>

<div class="tip"><strong>Tip:</strong> most conflicts on group trips don't come from destinations or activities, but from different spending expectations and unclear accounts. Talking about it beforehand is the best investment of the trip.</div>
`,
  },

  {
    slug: "splitting-bills-with-roommates",
    pair: "gastos-compartidos-entre-roommates",
    published: "2026-10-20",
    title: "How to split bills with roommates",
    desc: "How to divide rent, utilities, groceries and shared costs when you live with roommates, with clear rules, a full month worked out, and what to do when someone moves out.",
    lead: "Sharing a place cuts costs but adds decisions: who pays what, how to split rent when rooms aren't equal, and what to do about shared groceries.",
    related: ["split-expenses-as-a-couple", "settle-group-debts-fewer-transfers", "talking-about-money-with-friends"],
    body: `
<h2>Separate three kinds of costs</h2>
<p>Start by agreeing on what's shared and what isn't. Almost every household cost fits one of three groups:</p>
<ul>
<li><strong>Fixed</strong>: rent, building fees, internet. Known in advance and paid every month.</li>
<li><strong>Shared variable</strong>: electricity, gas, water, cleaning supplies, shared groceries.</li>
<li><strong>Individual</strong>: each person's own food and personal purchases. These stay out of the shared account.</li>
</ul>
<p>It sounds obvious, but most conflicts come from things nobody classified: toilet paper, cooking oil, dish soap, the streaming subscription "everyone uses".</p>

<h2>Rent: equal shares?</h2>
<p>If the rooms are similar, splitting evenly is simplest. If they aren't, adjust. Common criteria:</p>
<ul>
<li><strong>Room size</strong>: whoever has the biggest room pays a bit more.</li>
<li><strong>Private bathroom or balcony</strong>: these add to a room's value.</li>
<li><strong>Number of people</strong>: a couple sharing a room uses more common space and more utilities.</li>
<li><strong>Light and noise</strong>: a room facing a busy street or without a window may be worth less.</li>
</ul>
<p>A practical approach: set a percentage per room at the start and keep it as long as you live together, for example 40/30/30 when one room has its own bathroom. What matters is that it's written down and everyone accepts it before moving in.</p>

<h2>Utilities and groceries</h2>
<p>Utilities are usually split evenly. If someone works from home all day and runs the heating or AC much more, it can make sense to adjust, but don't overcomplicate it.</p>
<p>For groceries there are two models:</p>
<ol>
<li><strong>Everything shared</strong>: you shop together and split the bill. Works when eating habits are similar and you often eat together.</li>
<li><strong>Only the basics shared</strong>: cleaning supplies, toilet paper, oil, salt, coffee. Everyone buys their own food. The most stable model when schedules and diets differ.</li>
</ol>

<h2>A full month, worked out</h2>
<p>Three roommates: Sam has the room with a bathroom (40 %), Lee and Kim the other two (30 % each). Everything else is split evenly.</p>
<table>
<thead><tr><th>Expense</th><th>Paid by</th><th>Split</th><th>Sam</th><th>Lee</th><th>Kim</th></tr></thead>
<tbody>
<tr><td>Rent 1,500</td><td>Sam</td><td>40/30/30</td><td>600</td><td>450</td><td>450</td></tr>
<tr><td>Building fees 150</td><td>Sam</td><td>40/30/30</td><td>60</td><td>45</td><td>45</td></tr>
<tr><td>Internet 60</td><td>Lee</td><td>Even</td><td>20</td><td>20</td><td>20</td></tr>
<tr><td>Electricity 90</td><td>Kim</td><td>Even</td><td>30</td><td>30</td><td>30</td></tr>
<tr><td>Cleaning supplies 45</td><td>Lee</td><td>Even</td><td>15</td><td>15</td><td>15</td></tr>
</tbody>
</table>
<p>Sam paid 1,650 and their share was 725: they're owed 925. Lee paid 105 against a share of 560: owes 455. Kim paid 90 against 560: owes 470. Two transfers close the month: Lee pays Sam 455 and Kim pays Sam 470. See <a href="/en/guides/settle-group-debts-fewer-transfers/">how to settle group debts with the fewest transfers</a>.</p>

<h2>Who pays, and when to settle</h2>
<p>The tidiest approach: whoever can pays at the moment, logs it, and once a month you settle everything at once. Nobody has to front all the costs or chase small amounts after every purchase.</p>
<p>With a shared record, the end-of-month math is automatic: everyone sees what they paid, their share and who to pay. To make transfers quick, each person adds their payment details (bank details, PayPal, Venmo handle) once.</p>
[[fig group | Group members, each with their own payment details]]

<h2>When someone moves out</h2>
<p>It's the most delicate moment of living together. Settle these in advance:</p>
<ul>
<li><strong>The deposit</strong>: if one person paid it, it goes back to them; if everyone chipped in, split it by what each put in.</li>
<li><strong>Pending debts</strong>: settle up on moving day so the person leaving is square.</li>
<li><strong>Things bought together</strong> (a microwave, a fridge): whoever stays can buy out the leaver's share, or you sell and split.</li>
<li><strong>Utilities in the leaver's name</strong>: transfer them before they go.</li>
</ul>

<h2>Rules that prevent conflict</h2>
<ul>
<li>Write down how each kind of cost is split.</li>
<li>Revisit the agreement when something changes: a new roommate, a bill goes up, someone starts working from home.</li>
<li>Settle every month: debts that pile up are the ones that end badly.</li>
<li>If someone can't pay one month, talk about it then, don't let it slide.</li>
</ul>

<h2>FAQ</h2>
<h3>What about guests who stay for days?</h3>
<p>Short visits usually cost nothing. If someone's partner is around half the week, it's reasonable for that roommate to chip in a bit more for utilities and groceries.</p>
<h3>Should we open a joint bank account?</h3>
<p>It can help for rent, but it adds paperwork and complicates things when someone moves out. For most households a shared record and monthly transfers are enough.</p>

<div class="tip"><strong>Tip:</strong> the same method you'd use for a trip works for a shared home. Create a group for the apartment, log the month's expenses and do a partial settle-up at the end of each month: settled expenses stay in the history and the next month starts from zero.</div>
`,
  },

  {
    slug: "talking-about-money-with-friends",
    pair: "hablar-de-plata-con-amigos",
    published: "2026-10-20",
    title: "How to talk about money with friends (and ask to be paid back)",
    desc: "Practical advice for handling money in a group of friends: agree before spending, ask for what you're owed without awkwardness, message templates, and how to sort out disagreements.",
    lead: "Talking about money with friends feels awkward. Not talking about it ends up feeling much worse.",
    related: ["how-to-split-travel-expenses", "settle-group-debts-fewer-transfers", "split-expenses-as-a-couple"],
    body: `
<h2>Why it's so hard</h2>
<p>Asking a friend for money can feel like distrust, and chasing a small debt can seem petty. So many people quietly absorb the cost. The trouble is that silence doesn't go away: over time it turns into resentment, and one day it comes out as a sharp comment about something unrelated.</p>
<p>The other side has its own version. Whoever owes often doesn't know how much, or forgot, or is embarrassed to ask. Nobody says anything, and the debt just hangs there.</p>
<p>The problem isn't the money: it's that nobody talked about it. These six habits make it much easier.</p>

<h2>1. Talk before, not after</h2>
<p>The best time to talk about money is before you spend it. Before a trip, a night out or a shared purchase, agree on:</p>
<ul>
<li>How it will be split: evenly, everyone pays their own, or only those who take part.</li>
<li>Who pays upfront and when they get paid back.</li>
<li>Which currency and exchange rate, if that applies.</li>
</ul>
<p>Rules are much easier to agree on when nobody owes anything yet. And if someone's budget is tight, it's the moment to say so without it sounding like an excuse.</p>

<h2>2. Use a record everyone can see</h2>
<p>When expenses are logged somewhere everyone can see, the conversation stops being "you owe me" and becomes "here's what's left". The record takes the personal edge off: it's not someone complaining, it's the numbers.</p>
<p>It also solves the memory problem. Nobody has to remember who paid for Tuesday's taxi: it's there, with the date and who was in it.</p>

<h2>3. Ask plainly, with the details</h2>
<p>If someone hasn't paid, a direct, friendly message works far better than hints. Three templates for different situations:</p>
<ul>
<li><strong>Closing the accounts:</strong> <em>"Hi! We've wrapped up the trip accounts. Your share comes to 120, here are my payment details. Thanks!"</em></li>
<li><strong>A gentle reminder:</strong> <em>"Hey, quick one about the trip: did you get a chance to look at the 120? No rush, just keeping things tidy."</em></li>
<li><strong>A large amount:</strong> <em>"I know it's a lot. If it helps, split it in two, half now and half at the end of the month."</em></li>
</ul>
<p>Specific, with the exact amount and how to pay. Making the payment easy is half the job: if they have to ask for your details and do the math, they'll put it off.</p>

<h2>4. Set a reasonable deadline</h2>
<p>Settling up in the first few days after a trip, while everything is fresh, keeps debts from being forgotten. On long trips, settling halfway keeps anyone from building up a big debt.</p>
<p>A good agreement: "we close the accounts the Sunday after we're back and everyone pays that week." Simple, and nobody has to chase anybody.</p>

<h2>5. If you disagree, go back to the rules</h2>
<p>If someone feels they overpaid or that an expense isn't theirs, look at the record and the original agreement together. Often it's a simple mix-up: an expense split among everyone that should have been split among a few, or a dinner someone thought was a treat.</p>
<p>Fixing it is easy when it's written down: edit the expense, the balances update, done. Without a record, it's one person's word against another's.</p>

<h2>6. Confirm payments</h2>
<p>When the person receiving confirms each transfer, the matter is closed for both: nobody wonders whether it arrived, and nobody has to post screenshots in the group chat.</p>
[[fig transfers | Whoever owes taps "I paid", and whoever is owed confirms it arrived]]

<h2>Tricky situations</h2>
<h3>The friend who never pays</h3>
<p>If it's a pattern, raise it privately and without blame: "I've noticed closing the accounts is hard for you, is everything OK? Would you rather we organize it differently?" Sometimes there's a money problem behind it, and it's better to know.</p>
<h3>The friend who earns much more</h3>
<p>They may offer to cover things, but it shouldn't become the norm: whoever earns less can end up feeling indebted. An alternative is picking plans everyone can afford and leaving extras to whoever wants them.</p>
<h3>The old debt nobody mentions</h3>
<p>If months have passed, "I'd forgotten about this, shall we close it?" beats staying silent. Offering a long deadline keeps it from sounding like a demand.</p>

<h2>Joining the group without an account</h2>
<p>A common barrier is that not everyone wants another app. In TribuSplit each friend joins with the trip code, picks their name from the list, and that's it: they can see the expenses, add their payment details and mark their payments without signing up.</p>
[[fig join | Joining with the code: everyone picks who they are from the group's list]]

<p><strong>In short:</strong> agree before spending, keep a record everyone can see, ask clearly and kindly, set a deadline and confirm payments. Friendships appreciate the clarity.</p>
`,
  },

  {
    slug: "group-travel-insurance",
    pair: "seguro-de-viaje-en-grupo",
    published: "2026-10-25",
    title: "Group travel insurance: what to check before you buy",
    desc: "What to look for in travel insurance when you travel as a group: medical limits, pre-existing conditions, activities, cancellation if one person drops out, and whether to buy one policy or individual ones.",
    lead: "Travel insurance is one of those things nobody wants to use and everyone is glad to have. In a group there's an extra decision: does everyone buy their own, or does one person cover everybody?",
    related: ["group-trip-planning-checklist", "group-trip-budget", "esim-vs-local-sim-vs-roaming"],
    body: `
<h2>Why it matters more than people think</h2>
<p>Most people assume their health coverage at home goes with them. Often it doesn't, or only partly. In the US, Medicare generally doesn't cover care abroad, and many private plans cover little outside their network. In the UK, the GHIC card gives access to state healthcare in EU countries, but it isn't travel insurance: it doesn't cover private treatment, repatriation or cancellations.</p>
<p>A private emergency visit, a hospital stay or a medical flight home can cost far more than insuring the whole group. And on a group trip, one person's emergency affects everyone's plans.</p>

<h2>Group policy or individual policies?</h2>
<p>Both work. The trade-offs:</p>
<table>
<thead><tr><th></th><th>One group policy</th><th>Individual policies</th></tr></thead>
<tbody>
<tr><td>Price</td><td>Some insurers discount groups or families</td><td>Each person pays for their own profile</td></tr>
<tr><td>Minimum size</td><td>Some insurers require a minimum number of travelers</td><td>None</td></tr>
<tr><td>Fit</td><td>Same cover for everyone</td><td>Each picks cover for their age, health and activities</td></tr>
<tr><td>Admin</td><td>One purchase, one contact</td><td>Everyone handles their own</td></tr>
<tr><td>Splitting the cost</td><td>One person pays and it's shared</td><td>Nothing to split</td></tr>
</tbody>
</table>
<p>A common middle ground: one policy for the people who want the same basic cover, and individual upgrades for anyone with specific needs (a pre-existing condition, diving, skiing).</p>

<h2>What to check in any policy</h2>
<ul>
<li><strong>Medical limit</strong>: the maximum paid per person and per incident. Is it enough for a hospital stay at your destination?</li>
<li><strong>Emergency evacuation and repatriation</strong>: often the most expensive item, and the one people forget to check.</li>
<li><strong>Direct billing or reimbursement</strong>: does the insurer pay the hospital, or do you pay first and claim later?</li>
<li><strong>Pre-existing conditions</strong>: excluded, covered with a declaration, or covered for an extra premium?</li>
<li><strong>Activities</strong>: hiking above a certain altitude, scuba, surfing, skiing and riding scooters are common exclusions.</li>
<li><strong>Trip cancellation and interruption</strong>: what counts as a covered reason, and how much of the prepaid trip is refunded.</li>
<li><strong>Baggage and delays</strong>: limits per item and in total.</li>
<li><strong>Deductible (excess)</strong>: what you pay before the insurer pays anything.</li>
<li><strong>Age limits</strong>: some policies cost more or cover less above certain ages.</li>
</ul>
<p>Read the exclusions as carefully as the coverage. That's where two policies that look the same turn out to be different.</p>

<h2>The group-specific question: what if one person cancels?</h2>
<p>On a group trip, costs are shared. If one person drops out a week before, the rental house still costs the same, now split among fewer people. Check two things:</p>
<ol>
<li>Does the policy refund <strong>that person's share</strong> of non-refundable costs if they cancel for a covered reason?</li>
<li>Does anyone else's cover change if the trip changes because of one person (for example, if everyone has to come home early)?</li>
</ol>
<p>Talk about it before booking: who absorbs the cost if someone cancels for a reason the insurance doesn't cover? Agreeing in advance avoids an awkward conversation later. More ideas in <a href="/en/guides/talking-about-money-with-friends/">how to talk about money with friends</a>.</p>

<h2>Splitting the cost of a shared policy</h2>
<p>If one person buys cover for everyone, log it like any other trip expense, split among the people insured. It's settled with everything else at the end.</p>
[[fig add-expense | One person pays for the group policy and logs it, split among everyone insured]]
<p>If some people chose extra cover, split the base policy among everyone and have each person pay their own upgrade.</p>

<h2>Budgeting for it</h2>
<p>Price depends on trip length, destination, ages and cover, so there's no universal number. Get two or three quotes for the same dates and add the chosen one to the trip's fixed costs per person, just like lodging. See <a href="/en/guides/group-trip-budget/">how to plan a group trip budget</a>.</p>

<h2>Before you leave</h2>
<ul>
<li>Save the policy PDF and the emergency number on your phone.</li>
<li>Share everyone's insurer contact details in the group chat.</li>
<li>If your credit card includes travel cover, check the limits and conditions; many require the trip to be paid with that card.</li>
<li>If someone has a medical condition, make sure at least one other person in the group knows.</li>
</ul>

<h2>FAQ</h2>
<h3>Is credit card travel insurance enough?</h3>
<p>Sometimes. Card cover often has lower limits and activation conditions. Compare it against the checklist above.</p>
<h3>What should I do if I need to use it?</h3>
<p>Call the insurer's assistance line before going to a clinic, unless it's a serious emergency: many policies only cover care they arrange or approve. Keep every receipt.</p>

<p class="meta">This guide is general information, not insurance or legal advice. Policies, public health coverage abroad and entry requirements change; check the current terms before you travel.</p>
`,
  },

  {
    slug: "esim-vs-local-sim-vs-roaming",
    pair: null,
    published: "2026-10-25",
    title: "eSIM, local SIM or roaming: what's best for a group trip",
    desc: "How travel eSIMs, local SIM cards and roaming compare on cost, convenience and keeping your number, what your phone needs, and how a group can share and split data costs.",
    lead: "Staying connected abroad used to mean expensive roaming or hunting for a SIM shop. Now there are three real options, and on a group trip the best choice isn't always the same for everyone.",
    related: ["paying-abroad-cards-cash-fees", "group-trip-planning-checklist", "group-travel-insurance"],
    body: `
<h2>The three options</h2>
<h3>Roaming</h3>
<p>Your home plan works abroad, usually for a daily or per-trip fee. No setup at all, and you keep your number for calls and verification texts. It's typically the most expensive per gigabyte, though some plans include roaming in certain regions (for example, many European plans within the EU). Check your plan before assuming either way.</p>
<h3>Local SIM card</h3>
<p>A prepaid SIM from a local carrier at your destination. Often the cheapest per gigabyte, especially for longer stays in one country, and it usually comes with a local number. The downsides: you need to find a shop, some countries require ID registration, and if your phone has a single SIM slot, your home number goes offline while it's in use.</p>
<h3>Travel eSIM</h3>
<p>A digital SIM you buy and install online, often before you leave, which activates on arrival. Most are data-only. If your phone supports eSIM, you keep your home SIM active alongside it. Usually a middle ground on price: more than a local SIM, much less than most roaming.</p>

<h2>Side-by-side</h2>
<table>
<thead><tr><th></th><th>Roaming</th><th>Local SIM</th><th>Travel eSIM</th></tr></thead>
<tbody>
<tr><td>Setup</td><td>None</td><td>Find a shop, maybe register ID</td><td>Install via QR or app, minutes</td></tr>
<tr><td>Typical cost</td><td>Highest</td><td>Lowest per GB</td><td>Middle</td></tr>
<tr><td>Home number</td><td>Works normally</td><td>Offline if single SIM slot</td><td>Stays active (dual SIM)</td></tr>
<tr><td>Local number</td><td>No</td><td>Yes</td><td>Usually not (data only)</td></tr>
<tr><td>Multi-country trips</td><td>Easy</td><td>New SIM per country</td><td>Regional plans available</td></tr>
<tr><td>Phone requirement</td><td>None</td><td>Unlocked phone</td><td>Unlocked and eSIM-compatible</td></tr>
</tbody>
</table>

<h2>What your phone needs</h2>
<ul>
<li><strong>Unlocked</strong>: phones bought through a carrier may be locked to it. A locked phone won't accept another SIM or eSIM. Ask your carrier to unlock it before the trip.</li>
<li><strong>eSIM support</strong>: most recent iPhones and many recent Android phones support eSIM, but not all models or regional versions do. Check your phone's settings or the manufacturer's site.</li>
<li><strong>Dual SIM</strong>: to keep your home number active while using a travel data plan, your phone needs to support two lines at once.</li>
</ul>

<h2>Which one to pick</h2>
<ul>
<li><strong>Weekend or very short trip</strong>: roaming, if your plan's daily fee is reasonable. Zero hassle.</li>
<li><strong>One or two weeks, one or two countries</strong>: a travel eSIM is usually the best balance.</li>
<li><strong>Long stay in one country</strong>: a local SIM tends to be cheapest.</li>
<li><strong>You need to receive bank verification texts</strong>: keep your home line active (roaming, or eSIM in dual-SIM mode).</li>
</ul>

<h2>On a group trip: share and split</h2>
<p>Not everyone in the group needs their own plan. Some approaches that work:</p>
<ul>
<li><strong>One big plan, shared hotspot</strong>: one person buys a large local SIM or eSIM plan and shares a hotspot when the group is together. Cheap, but battery-hungry, and it doesn't help when you split up.</li>
<li><strong>Everyone their own, but the same provider</strong>: easier to help each other set it up, and you know coverage will be the same.</li>
<li><strong>Mixed</strong>: people with eSIM-compatible phones use eSIMs, others share a hotspot or use roaming.</li>
</ul>
<p>If one person pays for shared data, log it as a trip expense split among those who use it. Like any other shared cost, it's settled at the end with everything else.</p>
[[fig expenses | Shared data plans can be logged like any trip expense and split among the people using them]]

<h2>Setup checklist</h2>
<ul>
<li>Confirm your phone is unlocked and supports eSIM before buying.</li>
<li>Install the eSIM at home over Wi-Fi, but only switch it on when you land.</li>
<li>Turn off data roaming on your home line if you don't want roaming charges.</li>
<li>Download offline maps as a backup.</li>
<li>Save the provider's support contact somewhere you can reach without data.</li>
</ul>

<h2>FAQ</h2>
<h3>Can I make calls with a travel eSIM?</h3>
<p>Most are data-only, but you can use internet-based calling apps. Some providers offer plans with a number.</p>
<h3>Will I get charged on my home line by accident?</h3>
<p>It can happen if your home line's data roaming is on. Set your travel line as the data line and turn off roaming on your home line.</p>

<p class="meta">This guide is general information. Phone compatibility, prices and plan terms vary by carrier and change over time.</p>
`,
  },
  {
    slug: "splitwise-alternative",
    pair: "alternativa-a-splitwise",
    published: "2026-10-29",
    title: "Splitwise alternative for group trips: Splitwise, Tricount and TribuSplit compared",
    desc: "Splitwise's free plan now caps how many expenses you can add per day. We compare Splitwise, Tricount and TribuSplit for group travel: limits, currencies, settling up and when each one makes sense.",
    lead: "If you're looking for a Splitwise alternative, chances are you hit the free plan's daily expense limit in the middle of a trip, exactly when expenses pile up. Here is an honest comparison, including the app I built.",
    related: ["how-to-split-travel-expenses", "travel-expenses-multiple-currencies", "settle-group-debts-fewer-transfers"],
    body: `
<h2>First, who is writing this</h2>
<p>I'm Valentin and I built %BRAND%, so I'm not neutral. That's why this comparison also says where %BRAND% falls short and when another app is the better pick. I used Splitwise on several trips before building my own, and the details about the other apps come from their own help pages and store listings, checked in October 2026. Terms change, so if something is a deal-breaker for you, confirm it in the app before you decide.</p>

<h2>Why so many people look for a Splitwise alternative</h2>
<p>Splitwise is the best-known app for splitting expenses and it does the job well. What sent most people searching was a change to the free plan: it now limits how many new expenses you can add per day. In its support replies, Splitwise mentions <strong>four new expenses per day</strong> on the free plan; unlimited entry requires Splitwise Pro.</p>
<p>For a shared flat, four a day is plenty. On a group trip it isn't: a single day can bring gas, tolls, breakfast, groceries, lunch, tickets and dinner. If the limit is per person you can spread the entries across the group, but that means exactly what an expense app should prevent: remembering to log things later.</p>
<p>The free plan also shows ads, and automatic currency conversion is a Pro feature. On the free plan you can record expenses in several currencies, but balances stay separate per currency.</p>

<h2>The three options at a glance</h2>
<table>
<thead><tr><th></th><th>Splitwise (free)</th><th>Tricount</th><th>%BRAND%</th></tr></thead>
<tbody>
<tr><td>Price</td><td>Free with limits; Pro is paid</td><td>Free</td><td>Free, with ads</td></tr>
<tr><td>Expenses per day</td><td>Limited (4 per its support)</td><td>Unlimited</td><td>Unlimited</td></tr>
<tr><td>Multiple currencies</td><td>Yes; automatic conversion only in Pro</td><td>Yes</td><td>Yes, with an automatic, editable rate</td></tr>
<tr><td>Uneven splits (amounts or percentages)</td><td>Yes</td><td>Yes</td><td>No: equal shares among the people involved</td></tr>
<tr><td>Settling up mid-trip</td><td>Settle up any time</td><td>Settle up any time</td><td>Partial settle-ups that close everything so far</td></tr>
<tr><td>Payment confirmation</td><td>The payment is recorded</td><td>The payment is recorded</td><td>"I paid" and "Received", with payment details to copy</td></tr>
<tr><td>Join without an account</td><td>Everyone needs an account to see the group</td><td>Yes, with a link</td><td>Yes, with a code or link</td></tr>
<tr><td>Receipt photos</td><td>Pro only</td><td>Yes</td><td>No</td></tr>
<tr><td>Platforms</td><td>iOS, Android and web</td><td>iOS and Android apps</td><td>Web app you can install on your phone</td></tr>
</tbody>
</table>
<p>Tricount is now owned by bunq, a European digital bank. The app is free and works with a bunq card that adds payments to the group automatically. According to its help center, the new app dropped some features of the old one, such as CSV and PDF export and statistics.</p>

<h2>When each one makes sense</h2>
<h3>Splitwise: if your group already uses it or pays for Pro</h3>
<p>If your group has years of balances in Splitwise, or uses it for the household all year, switching has a cost. Pro removes the daily limit and the ads, and adds currency conversion and receipt scanning. It is also the best option if you need complex uneven splits: by item, by percentage or by shares.</p>

<h3>Tricount: if you travel around Europe or want a free native app</h3>
<p>Tricount has no expense limit and people join with a link, no account needed. If someone in the group banks with bunq, the built-in card saves manual entry. For trips around Europe, in euros, it's a very solid choice.</p>

<h3>%BRAND%: for trips with many expenses a day or several currencies</h3>
<p>I built it for the trips I took with friends: a beach house shared by six or eight people, or a week in Brazil, with ten expenses a day and someone saying halfway through "let's settle what we have so far". What it handles best:</p>
<ul>
<li><strong>No expense limit</strong>, and nobody has to create an account: one person creates the trip, shares the code and everyone picks their name.</li>
<li><strong>Partial settle-ups.</strong> "Split up to today" works out who pays whom with everything logged so far, and anything added later goes into the next settle-up or the final one.</li>
<li><strong>Currencies.</strong> An expense in another currency is converted to the trip currency at the day's rate, and you can settle in a different currency (say, the trip in euros and paying each other back in dollars or pounds), editing the rate if your bank or card used a different one.</li>
<li><strong>Few transfers, confirmed payments.</strong> It works out the smallest number of transfers, shows the payee's payment details to copy, and a debt only counts as settled once the person receiving confirms it.</li>
</ul>
[[fig settle-fx | Settling in another currency: the rate can be edited before confirming]]
<p>Where it falls short, so you know upfront: no different amounts or percentages per person (you can choose who takes part in each expense), no receipt photos or export, and it's a web app you install on your phone, not an app-store app. It's free because it shows ads, never inside the expense form or next to payment buttons.</p>

<h2>How to switch in the middle of a trip</h2>
<p>If you started in Splitwise and ran out of entries, you don't need to copy every expense:</p>
<ol>
<li>In Splitwise, check each person's current balance.</li>
<li>In the new app, create the trip and add one expense per person that reflects their previous balance, or simply settle what you had and start fresh.</li>
<li>From then on, log everything in one place. The worst setup is half the trip in one app and half in another.</li>
</ol>
<p>The cleanest option, if possible, is to settle everything before switching, so nobody carries balances from one app to the other.</p>

<h2>FAQ</h2>
<h3>How many expenses per day does free Splitwise allow?</h3>
<p>In its support replies, Splitwise mentions four new expenses per day on the free plan. The limit resets the next day. Splitwise Pro has no limit.</p>
<h3>Is there a completely free Splitwise alternative?</h3>
<p>Yes. Tricount is free, and so is %BRAND% (with ads). Both allow unlimited expenses and let people join without creating an account.</p>
<h3>Which one is best for a trip abroad with several currencies?</h3>
<p>If you'll pay in several currencies and want to settle in your home currency at the rate you actually got, %BRAND% is built for that. See the guide on <a href="/en/guides/travel-expenses-multiple-currencies/">travel expenses in multiple currencies</a>.</p>
<h3>Can I use %BRAND% outside of travel?</h3>
<p>Yes: a shared house or a night out works the same way, as a "trip" with its group. But it's designed for trips; for year-round household bills, Splitwise is still very convenient.</p>
<p class="meta">Splitwise and Tricount are trademarks of their respective owners. %BRAND% is not affiliated with either. Information checked in October 2026.</p>
`,
  },
];
