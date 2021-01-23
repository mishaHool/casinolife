jQuery.event.special.touchstart = { setup: function(e, t, n) { t.includes("noPreventDefault") ? this.addEventListener("touchstart", n, { passive: !1 }) : this.addEventListener("touchstart", n, { passive: !0 }) } };
var Fader = function(e) { this.$el = e, this.$slides = this.$el.children(), this.$dots = this.createDots(), this.currentIndex = 0, this.activeClass = "active", this.createArrows(), this.changeSlide() };
Fader.prototype.createDots = function() {
    var e = $('<ul class="slider-dots"></ul>'),
        t = this;
    return this.$slides.each((function(t) { e.append("<li>Slide " + (t + 1) + "</li>") })), this.$el.after(e), e.children().on("click", (function() { t.currentIndex = $(this).index(), t.changeSlide() })), e
}, Fader.prototype.changeSlide = function() { this.currentIndex = this.sanitizeIndex(), this.$slides.eq(this.currentIndex).add(this.$dots.children().eq(this.currentIndex)).addClass(this.activeClass).siblings().removeClass(this.activeClass) }, Fader.prototype.createArrows = function() {
    var e = this,
        t = $('<div class="slider-arrows"><span class="slider-arrow slider-arrow-prev" data-index="-1">Previous Slide</span> <span class="slider-arrow slider-arrow-next" data-index="1">Next Slide</span></div>');
    this.$el.after(t), t.children().on("click", (function() { e.currentIndex += $(this).data("index"), e.changeSlide() }))
}, Fader.prototype.sanitizeIndex = function() { var e = this.$slides.length - 1; return this.currentIndex < 0 ? e : this.currentIndex > e ? 0 : this.currentIndex };
var Paginator = function(e) {
    var t = this;
    this.options = e, this.$container = $(this.options.selector), this.$paginationContainer = $(this.options.paginationContainer), this.currentPage = 1, this.hiddenClass = "pagination-hidden", this.activeClass = "pagination-active", this.currentClass = "pagination-current", this.afterPageChange = this.options.afterPageChange ? this.options.afterPageChange : function() {}, this.observer = new MutationObserver((function() { t.$items = t.$container.children(":not(.pagination-excluded)"), t.totalPages = Math.ceil(t.$items.length / t.options.itemsPerPage), t.currentPage = t.totalPages < t.currentPage ? 1 : t.currentPage, t.addPagination(), t.attachEvents(), t.showPage() })), this.observer.observe(this.$container.get(0), { attributes: !0 }), this.$container.addClass("pagination")
};
Paginator.prototype.addPagination = function() {
    this.$paginationContainer.html(this.createPaginationHTML()), this.$paginationList = this.$paginationContainer.find(".pagination-list"), this.$controlBtns = this.$paginationContainer.find(".pagination-btn"), this.$counter = this.$paginationContainer.find(".pagination-total");
    for (var e = 0; e < this.totalPages; e++) this.$paginationList.append("<li>" + (e + 1) + "</li>");
    this.$paginationItems = this.$paginationList.children()
}, Paginator.prototype.showPage = function() { this.$items.addClass(this.hiddenClass), this.$items.slice((this.currentPage - 1) * this.options.itemsPerPage, this.currentPage * this.options.itemsPerPage).removeClass(this.hiddenClass), this.$counter.html(this.getCounterHTML()), this.afterPageChange() }, Paginator.prototype.attachEvents = function() {
    var e = this;
    e.$controlBtns.on("click", (function() {
        var t = $(this).data("page");
        (e.currentPage > 1 && -1 == t || e.currentPage < e.totalPages && 1 == t) && (e.currentPage += t, e.addPaginationClasses(e.$paginationItems.filter(":nth-child(" + e.currentPage + ")")), e.showPage())
    })), e.$paginationItems.on("click", (function() {
        var t = $(this);
        e.currentPage = t.index() + 1, e.addPaginationClasses(t), e.showPage()
    })), e.$paginationItems.eq(e.currentPage - 1).trigger("click")
}, Paginator.prototype.showItem = function(e) {
    var t = this;
    t.$items.each((function(n) { this === e.get(0) && (t.currentPage = Math.floor(n / t.options.itemsPerPage) + 1, t.addPaginationClasses(t.$paginationItems.filter(":nth-child(" + t.currentPage + ")")), t.showPage()) }))
}, Paginator.prototype.addPaginationClasses = function(e) {
    var t = this.currentPage - 1 - this.options.paginationDeviation < 0 ? 0 : this.currentPage - 1 - this.options.paginationDeviation,
        n = this.currentPage + this.options.paginationDeviation > this.$items.length - 1 ? this.$items.length - 1 : this.currentPage + this.options.paginationDeviation;
    this.$paginationItems.removeClass(this.activeClass + " " + this.currentClass + " last"), e.addClass(this.currentClass).add(this.$paginationItems.slice(t, n)).addClass(this.activeClass)
}, Paginator.prototype.createPaginationHTML = function() { return '<div class="pagination-container">\n\t\t<div class="pagination-total hidden-s">' + this.getCounterHTML() + '</div>\n\n\t\t<div class="pagination-group">\n\t\t\t<span class="pagination-btn pagination-prev" data-page="-1">Prev</span>\n\n\t\t\t<ul class="pagination-list"></ul>\n\n\t\t\t<span class="pagination-btn pagination-next" data-page="1">Next</span>\n\t\t</div>\n\t</div>' }, Paginator.prototype.getCounterHTML = function() { var e = (this.currentPage - 1) * this.options.itemsPerPage + 1; return "Showing <strong>" + e + "-" + (e + this.options.itemsPerPage > this.$items.length ? this.$items.length : e + this.options.itemsPerPage - 1) + " of " + this.$items.length + "</strong>" };
var WageringCalculator = function() { this.initiate(), this.assignEvents() };
WageringCalculator.prototype.initiate = function() { this.$depositAmountField = $("#deposit-amount"), this.$wageringRequirementsField = $("#wagering-requirements"), this.$bonusSelect = $("#bonus-deposit"), this.$bonusField = $("#deposit-bonus"), this.$gameContributionField = $("#game-contribution"), this.$freeBonusText = $("#free-bonus-money"), this.$totalPlayMoneyText = $("#total-play-money"), this.$betAmountText = $("#amount-bet"), this.$calculateBtn = $("#calculator-btn"), this.depositAmountValue = 0, this.wageringRequirementsValue = 0, this.bonusSelectValue = 0, this.bonusFieldValue = 0, this.gameContributionValue = 0, this.freeBonusValue = 0, this.totalPlayMoneyValue = 0, this.betAmountValue = 0 }, WageringCalculator.prototype.assignEvents = function() {
    var e = this;
    e.$depositAmountField.on("input", (function() { e.depositAmountValue = isNaN(parseFloat(this.value)) ? 0 : parseFloat(this.value) })), e.$wageringRequirementsField.on("input", (function() { e.wageringRequirementsValue = isNaN(parseFloat(this.value)) ? 0 : parseFloat(this.value) })), e.$bonusSelect.on("change", (function() { e.bonusSelectValue = parseInt(this.value) })), e.$bonusField.on("input", (function() { e.bonusFieldValue = isNaN(parseFloat(this.value)) ? 0 : parseFloat(this.value) / 100 })), e.$gameContributionField.on("input", (function() { e.gameContributionValue = isNaN(parseFloat(this.value)) ? 1 : parseFloat(this.value) / 100 })), e.$calculateBtn.on("click", (function() { e.calculateResults(), e.updateResults() }))
}, WageringCalculator.prototype.calculateResults = function() { this.freeBonusValue = this.getFreeBonus(), this.totalPlayMoneyValue = this.getTotalPlayMoney(), this.betAmountValue = this.getBetAmount() }, WageringCalculator.prototype.getFreeBonus = function() { return this.depositAmountValue * this.bonusFieldValue }, WageringCalculator.prototype.getTotalPlayMoney = function() { return this.depositAmountValue + this.freeBonusValue }, WageringCalculator.prototype.getBetAmount = function() { var e = 1 == this.bonusSelectValue ? this.depositAmountValue : 0; return (this.freeBonusValue + e) * this.wageringRequirementsValue / this.gameContributionValue }, WageringCalculator.prototype.updateResults = function() { this.$freeBonusText.text(this.freeBonusValue.toFixed(2)), this.$totalPlayMoneyText.text(this.totalPlayMoneyValue.toFixed(2)), this.$betAmountText.text(this.betAmountValue.toFixed(2)) };
var DottedText = function(e, t) { this.$element = $(e), this.$win = $(window), this.options = t, this.isOpen = !1, this.initialize() };
DottedText.prototype.initialize = function() { this.assingDynamicVars(), this.assignEvents(), this.$element.append('<span class="expand">' + this.options.showMoreText + "</span>"), this.shouldLimit && this.limitRows() }, DottedText.prototype.assingDynamicVars = function() { this.elementLineHeight = parseInt(this.$element.css("line-height")), this.shouldLimit = this.$element.height() / this.elementLineHeight > this.options.rows && this.$win.outerWidth() <= this.options.stopAt }, DottedText.prototype.limitRows = function() { this.$element.addClass("is-js-limited").outerHeight(this.options.rows * this.elementLineHeight).find(".collapse, .expand").attr("class", "expand").text(this.options.showMoreText) }, DottedText.prototype.unLimitRows = function() { this.$element.removeClass("is-js-limited").outerHeight("auto"), this.options.showLessText && this.$element.find(".expand").attr("class", "collapse").text(this.options.showLessText) }, DottedText.prototype.assignEvents = function() {
    var e = this;
    e.$win.on("resize", (function() { e.isOpen && !e.options.showLessText || (e.unLimitRows(), e.assingDynamicVars(), e.shouldLimit ? e.limitRows() : e.unLimitRows()) })), e.$element.on("click", ".expand", (function() { e.unLimitRows(), e.isOpen = !0 })).on("click", ".collapse", (function() { e.limitRows(), e.isOpen = !1 }))
}, "function" != typeof newsletter_check && (window.newsletter_check = function(e) {
    if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-]{1,})+\.)+([a-zA-Z0-9]{2,})+$/.test(e.elements.ne.value)) return alert("The email is not correct"), !1;
    if (e.elements.nn && ("" == e.elements.nn.value || e.elements.nn.value == e.elements.nn.defaultValue)) return alert("The name is not correct"), !1;
    for (var t = 1; t < 20; t++)
        if (e.elements["np" + t] && e.elements["np" + t].required && "" == e.elements["np" + t].value) return alert(""), !1;
    return !(e.elements.ny && !e.elements.ny.checked) || (alert("You must accept the privacy statement"), !1)
});
var allTermsTexts = { "21bet": "18+. New players only. Minimum deposit of ВЈ10. Bonus spins are valid on the following games only: Wild Wild West, Twin Spin Deluxe, and subject to 35x wagering, and must be used within 10 days, otherwise any unused bonus spins shall be removed. Bonus funds are 121% up to ВЈ121,000 and separate to Cash funds. 35x bonus wagering requirements. ВЈ5 max bet with bonus. Bonus must be used within 30 days otherwise any unused bonus shall be removed. Terms Apply. BeGambleAware.", "32red": "New accounts only. Wagering and terms apply. A minimum deposit of ВЈ20 is required.Please gamble responsibly! You must be 18+. T&Cs Apply.", "888casino": "No Deposit Offer : New players only вЂў ВЈ88 is granted in FreePlay (FP) вЂў FP must be claimed within 48 hrs of receiving the email and expires after 14 days вЂў FP wins are credited as bonus and capped at ВЈ15, exc. JP win вЂў Deposit Bonus Offer: ВЈ20 min deposit вЂў 100% up to ВЈ100 Bonus вЂў Bonus wins are capped at ВЈ500 вЂў To withdraw bonus & related wins, wager 30 x (bonus amount) within 90 days вЂў Restrictions apply to deposit until wagering requirement fulfilled вЂў Wagering req. vary by game вЂў This offer may not be combined with any other offer вЂў Withdrawal restrictions & full T&Cs apply: No Deposit Offer terms & Deposit Bonus Offer terms.", "888casino-live": "No Deposit Offer : new players only вЂў Up to ВЈ888 FreePlay: all prizes are FreePlay (FP) вЂў Odds vary between each prize win вЂў FP must be claimed within 48 hrs of receiving the email and expires after 14 days вЂў FP wins are credited as bonus and capped at the amount of FP received, exc. jackpot win вЂў Deposit Bonus Offer: ВЈ20 min deposit вЂў 100% up to ВЈ100 Bonus вЂў Bonus wins are capped at ВЈ500 вЂў To withdraw bonus & related wins, wager 30x (bonus amount) within 90 days вЂў Restrictions apply to deposit until wagering requirement fulfilled вЂў Wagering requirements vary by game вЂў This offer may not be combined with any other offer вЂў Withdrawal restrictions & full T&Cs apply: No Deposit Offer terms & Deposit Bonus Offer terms.", "888casino-mobile": "No Deposit Offer : new players only вЂў Up to ВЈ888 FreePlay: all prizes are FreePlay (FP) вЂў Odds vary between each prize win вЂў FP must be claimed within 48 hrs of receiving the email and expires after 14 days вЂў FP wins are credited as bonus and capped at the amount of FP received, exc. jackpot win вЂў Deposit Bonus Offer: ВЈ20 min deposit вЂў 100% up to ВЈ100 Bonus вЂў Bonus wins are capped at ВЈ500 вЂў To withdraw bonus & related wins, wager 30x (bonus amount) within 90 days вЂў Restrictions apply to deposit until wagering requirement fulfilled вЂў Wagering requirements vary by game вЂў This offer may not be combined with any other offer вЂў Withdrawal restrictions & full T&Cs apply: No Deposit Offer terms & Deposit Bonus Offer terms.", "888sport": "New Customers only - ВЈ10 minimum deposit using promo code 'FOOTBALL' - First bet must be placed on any market - Minimum stake ВЈ10 at odds of 1/2 (1.5) - Free bets credited upon qualifying bet settlement and expire after 7 days - Free bet stakes not included in returns - Deposit balance is available for withdrawal at any time. General deposit method & withdrawal restrictions apply & Full T&CвЂ™s apply - Full Terms Apply", "all-british": "New customers only | min deposit ВЈ20 | Wagering requirements 35x bonus when playing with bonus funds bet it is ВЈ5 | Welcome bonus excluded for deposits with skrill/neteller", amazingcasino: "NEW PLAYERS ONLY, MIN DEPOSIT ВЈ10, ВЈ8 MAX WIN PER 10 SPINS, MAX BONUS CONVERSION ВЈ250, 65X WAGERING REQUIREMENTS AND FULL T&CS APPLY HERE", "bet365-sport": "Up to ВЈ100 Bet Credits. New Customers Only. Sign up, deposit ВЈ5 or more to your account and bet365 will match your qualifying deposit in Bet Credits when you place qualifying bets to the same value and they are settled. Min odds/bet and payment method exclusions apply. Returns exclude Bet Credits stake. T&Cs, time limits & exclusions apply. 18+", betbright: "Key terms: 18+. New customers only. Deposit & opt in required. Wagering applies. Bonus expires in 7 days.", betfair: "Minimum deposit of ВЈ10, x45 wagering, Roulette and blackjack 50% weighting. Bonus Valid for 7 days. Not available to customers using Moneybookers/Skrill or Neteller as a payment method.", betfred: "New Casino customers only. ВЈ10 Minimum transfer. ВЈ10 Minimum stakes within 7 days. Minimum 5 game rounds. Game restrictions apply. Maximum 50 Free Spins on selected games. Free Spins expire after 7 days. Full T&Cs apply.", betvictor: "New Customers only. ВЈ50 bonus split into 1 x ВЈ20 bonus and 3 x ВЈ10 bonuses on select casino products. Credit and Debit cards only. Minimum wager of ВЈ10 with up to 60 x wagering applicable. Deposit and wager within 7 days of opening new account. T&Cs apply. Please Gamble Responsibly. You must be 18+. Click 'Play' for more details.", "betvictor-sport": "ВЈ30 Free Bets available in 3 x ВЈ10 bets. +18 T&C's Apply. BeGambleAware.org.", betway: "* New customers only. 100% match bonus based on first deposit of ВЈ/$/в‚¬20+. Additional bonuses available on 2nd, 3rd and 4th deposits. 50x bonus wagering applies. Withdrawal limitations. Other conditions apply - please see the  offer terms  Other conditions apply - see Full Terms.", "betway-sport": "Min Deposit ВЈ10. First Deposit matched up to ВЈ30, 1x wagering at odds of 1.75+ to unlock Free Bet. Credit card, debit card & PayPal deposits only. Full terms apply", bgo: "*18+. New customers only. 100% deposit match up to ВЈ200. Available on selected Games only. 7-day expiry on Bonus. 40x wagering (max bet ВЈ5) before Bonus Balance can be withdrawn. Wagering is with real money first. Game contribution weightings apply to wagering requirements. ВЈ10 min deposit + 2.5% fee (min 50p). Not available using Neteller or Skrill. Cash balance withdrawable anytime + ВЈ2.50 fee. Full Terms On the Casino Site.", "blacktype-sport": "+18 Only | Guaranteed ВЈ5 Casino Bonus and a ВЈ5 Free Sportsbook Bet if your First Bet Loses | New Customers Only | Qualifying Bet must be a Single of ВЈ10 or more at odds of Evens (2.0) or Greater | Full T&C's Apply", bwin: "18+. Invite only. Valid 17.09-30.09. Max 1 prize per player per day. Prizes vary & claim in 24 hours. Wagering applies. Full T&Cs apply.", "casino-com": "*T&Cs apply to each of the offers. Click 'Play' for more details. Please gamble responsibly! You must be 18+", casimba: "18+. New players only. 1 bonus offer per player. Min. deposit ВЈ20. Max. bonus bet is ВЈ5. Bonus spins on selected games only and must be used within 72 hours. Bonus funds expire in 30 days, unused bonus funds will be removed. Bonus funds are 200% match up to ВЈ500 on your 1st deposit, 25% match up to ВЈ1000 on your 2nd deposit, and 50% match up to ВЈ500 on your 3rd deposit. Bonus funds are separate to Cash funds, and are subject to 35x wagering the total bonus, cash & bonus spins. Terms apply. BeGambleAware.", "casino-cruise": "18+ Full T&C's Apply. New players Only. ВЈ10 minimum deposit. 40 x wagering applies. Bonus valid for 14 days. Minimum ВЈ5 wager required to activate 200 Free Spins. 20 Free Spins will be credited per day for 10 days after qualifying deposit/wager is met. Free Spins valid for 24 hours from credit - www.begambleaware.org", "casino-lasvegas": "New customers only | Min. deposit: ВЈ20 | Max. bonus: ВЈ100 | Wagering req. of 100% bonus: 20x (Bonus + Deposit) | Free Spin wagering req.: 20x Win Amount | 30 days to meet wagering req for free spins and bonus | T&Cs Apply", "casino-room": "18+. New customers only. Min deposit varies ВЈ20-ВЈ100. Max deposit varies from ВЈ50-ВЈ200. 100x wagering requirements for bonus amounts. 7 days to complete the WR. Max bet for bonus wagering is ВЈ5 per spin. Always refer to Bonus Terms for more info.", casinoheroes: "Terms and conditions apply. This Offer is only available for new customers in UK and Northern Ireland. New players must be 18+ years of age and proof of identity documents may be requested for verification purposes.", casumo: "18+ New customers only. 20 free spins in Starburst on registration. Bonuses are on opt-in basis. Min deposit is ВЈ10. 30x wagering requirements apply for bonuses and winnings to be withdrawn. Contribution % towards WR vary from 0% to 100% according to game. Participation of new customers in the Welcome Offer requires a ВЈ10 minimum deposit. Always refer to Bonus Terms for more info.", "come-on": "T&CвЂ™s вЂ“ 20 Free Spins on Starburst: 18+. New UK mainland customers only. You will receive 20 Free Spins on Starburst once registered вЂ“ no deposit required. This bonus is non-redeemable. ВЈ25 Deposit Bonus: 18+. New UK mainland customers only. You will receive a 100% matched first deposit bonus, up to ВЈ25. Min. deposit of ВЈ10 required. Max bonus is ВЈ25. 35x wagering of your deposit and bonus in the ComeOn Casino before you can withdraw. Terms and conditions apply. Find full Promotion T&CвЂ™s here and General T&CвЂ™s here.", coral: "18+. New customers only. Min ВЈ10 total stake on qualifying games. ВЈ10 Bonus, subject to 24x wager req. ВЈ10 Free Spins (20p each). ВЈ10 Golden Chips (ВЈ1 each). PayPal, certain deposit types and countries excluded. All bonuses valid for 30 days (bonus and winnings removed) on selected games.T&Cs Apply.", fun: "New customers only, min deposit ВЈ10, wagering 50x, max bet ВЈ5 with bonus funds. 11 Free Spins on registration (max withdrawal is ВЈ100). 50% up to ВЈ499 bonus + 100 Free Spins on 1st deposit. 50% up to ВЈ499 bonus on 2nd deposit. No max cash out on deposit offers. Welcome bonus excluded for players depositing with Skrill or Neteller. Full T&C's apply.", gala: "18+. New players only. Must opt-in. Min ВЈ10 deposit. Certain countries excluded. 100% bonus match max ВЈ400. 20 x (deposit & bonus) wagering reqs apply. Contribution to wagering reqs vary by game. Bonus valid for 14 days (bonus and winnings removed). Bets covering 67% or more of Roulette table don't count to wagering reqs. Games exclusions apply. T&Cs Apply. ", genesis: "18+ Full T&C's Apply. New players Only. ВЈ10 min deposit. ВЈ5 max bet using bonus. 40 x wagering applies. Bonus valid for 14 days. 30 Spins on Starburst games will be credited per day for 9 days after qualifying deposit/wager is met. Free Spins valid for 72 hours from credit. Max Free Spins winnings ВЈ100. Skrill + Neteller excluded. Always refer to Bonus Terms - www.begambleaware.org", genting: "DEPOSIT FROM ВЈ20 TO ВЈ300 NOW FOR A 100% MATCH BONUS + 20 Free Spins. Valid to 31/10/18. New players only. Deposit Match Bonus: Min 50x wagering (% game weightings apply), play restrictions apply. Max bonus bet ВЈ5, 15 days to accept & 30 days to complete wagering. Deposited funds locked to casino platform until wagering met.  Real money funds used first.  Free Spins: Available after deposit bonus is redeemed/lost, Dreamcatcher only. 1x wagering, Max bonus bet ВЈ5, 7 days to accept & 7 days to complete wagering, maximum withdrawal from winnings is ВЈ200. Bonus funds used first. Full T&CвЂ™s on the casino site.", grosvenor: "First deposit only. Min. ВЈ20 deposit. 5X wagering requirement. T&Cs apply.", guts: "*New customers only. ВЈ10 min deposit. Bonus wager 35x in 30 days. Skrill/Neteller/Paysafe excluded. Game weighting and terms apply. Full details below.", hippodrome: "* New customers only. Opt-in required. 100% Match Bonus up to ВЈ250 on 1st deposit of ВЈ20+. Additional bonuses of up to ВЈ250 on 2nd deposit of ВЈ20+ and up to ВЈ500 on 3rd deposit of ВЈ20+. 50x bonus wagering applies as do weighting requirements. Credit Card, Debit Card & PayPal deposits only. Irregular gameplay may invalidate your bonus. Full Terms apply.", intercasino: "Deposit ВЈ20 or more to receive a 100% bonus. Max bonus ВЈ100. 40x WR. Full T&Cs apply.", "karamba-sport": "New customers only. Max one ВЈ10 Free Bet. Qualifying bets must be placed at odds of 2.0(1/1) or greater. Paid as a bonus token with min odds reg. Further T&Cs apply", ladbrokes: "18+. New Customers Only.Min ВЈ20 deposit. Payment method restrictions apply. 50x (deposit and bonus) wagering reqs apply. Contributions to wagering reqs vary by game. Max bonus bet 30% of bonus. Bonus valid for 28 days (bonus+winnings removed). Restrictions apply T&C's apply.", "ladbrokes-sport": "18+. UK+IRE only. Promo code 'G30' required. Min first bet ВЈ10. Must be placed within 14 days of account reg. ВЈ30 credited as 3 x ВЈ10 free bets. Not valid with CashOut. Free bet valid for 4 days.T&Cs Apply.", ladylucks: "100% up to ВЈ100, Not claimable with Skrill, ecoPayz or Neteller, Minimum deposit ВЈ20, Maximum bonus ВЈ100, Expiry 7 days, Wagering x50. вЂў 50 Extra Spins per day: during 2 days, Expiry 24h, Wagering x50. See full terms of the offer", leovegas: "18+ New UK players only. 20 Free Spins on sign up. Deposit bonus: 100% up to ВЈ100 Bonus + 20 Bonus Spins, on each of your first 4 deposits. ВЈ10 min deposit (Skrill, Neteller excluded). ВЈ5 min. wager to activate Bonus Spins. All spins only valid on Book of Dead and expire after 7 days. 35x wagering on eligible games (ВЈ5 max stake) before Bonus, Free Spin or Bonus Spin winnings can be withdrawn. Eligibility restrictions apply. See full T&C's below. Please play responsibly - begambleaware.org.", mansion: "New customers only. Min deposit ВЈ20 max bonus amount ВЈ500. First deposit: 100% up to ВЈ200. Second deposit: 50% up to ВЈ300. Wagering 40x for each bonus. Game weighting applies. Cashback: 5% cashback on first and all other deposits during week 1, 10% cashback on all additional deposits taking place in week 2 only.   Bonus betting limits: slots - $/ВЈ/в‚¬5 all other games вЂ“ 10% of bonus amount. T&Cs apply", "mansionbet-sport": "New customers only. Min Deposit ВЈ10. Deposit & bonus amount must be wagered 6 times (min odds 4/5) prior to withdrawing bonus funds and any winnings. Wins from real money bets withdrawable at any time. Bonus on sports betting only. T&Cs apply", mfortune: "18+. no deposit required. Up to 20 locked free spins available to win once only. Free spins locked 2p bet over 20 win lines with winning awarded as bonus credit. Bonus credit cannot be withdrawn. This bomis expires 24hrs after the game launched. Max withdrawal without depositing is ВЈ200. You can withdrw any unspent deposit, in addition the funds in your cashable crdit account. T&Cs apply.", mrgreen: "T&Cs apply. New players only. 35x wagering on Deposit Bonus and Free Spins. Starburst Free Spins credited after deposit & wager of ВЈ20+ on slot games. 18+. www.begambleaware.org", netbet: "New players, ВЈ10+ deposit required, no e-wallets/prepaid cards,30x Playthrough on Bonus and 50x on Free Spins winnings.", "paddy-power": "UK & IRL only. Deposits made with e-wallets are not valid for this promo. Bonus wagering x35 on eligible games. Winnings from bonus capped at ВЈ500. Spins available after bonus is redeemed/lost. 10 per day with no wagering. Full T&Cs apply.", party: "18+. New depositors only. UK residents only. Minimum deposit ВЈ10. 10x wagering on free spin winnings. Free Spins are valid only on Starburst and expire in 7 days. Excludes deposits made via Skrill, Entropay and Neteller.", playojo: "1 Free Spin credited for every ВЈ1 deposit. Up to 50 Free Spins valued at ВЈ0.10 each on Book of Dead. Min. deposit ВЈ10. First time depositors only. OJOвЂ™s Rewards and Game Play policy applies.", "royalpanda-sport": "18+, first deposit only, T&Cs apply. Casino bonus: min. ВЈ10, max. ВЈ100. Bonus/free spins winnings wagering requirement: x35. Max. bonus bet: ВЈ5, can vary. Free sports bet: Minimum deposit and stake ВЈ20 (min odds 2.0). Credited after all qualifying bets settled.", roxy: "New accounts only, Min ВЈ10 deposit, debit/credit card and Paypal only, up to 50x wagering, game contributions vary, max stake applies, See full terms.", "royal-panda": "18+, first deposit only, T&Cs apply. Casino bonus: min. ВЈ10, max. ВЈ100. Bonus/free spins winnings wagering requirement: x35. Max. bonus bet: ВЈ5, can vary. Free sports bet: Minimum deposit and stake ВЈ20 (min odds 2.0). Credited after all qualifying bets settled.", scasino: "New customers only | Min. deposit: ВЈ20 | Max. bonus/cashback: ВЈ500 | Bonus Wagering: 20x (Bonus + Deposit) | 30 Days to meet wagering req. | T&C Apply", "slots-heaven": "T&CвЂ™s: 18+; New customers: 200 Free Spins in total with 40 given First deposit; Winning given as bonus funds; Spins and bonus wagering on вЂAge of the GodsвЂ™ games only; Wagering regulations apply;", slotsmillion: "Bonus on deposit of 100% up to ВЈ100, Not claimable with Skrill, ecoPayz or Neteller, Requires phone verification, Min deposit ВЈ20 + 5 bonuses of 20 Extra Spins each, granted each day for 5 days, available for 24h | For each bonuses: Bets limited to ВЈ3, Wagering x48 before withdrawal, Contribution to wagering varies between games, Some games cannot be played with bonus, Expiration 7 days after activation", sloty: "18+ Full T&C's Apply. New players Only. ВЈ10 min deposit. ВЈ5 max bet using bonus. 40 x wagering applies. Bonus valid for 14 days. Minimum ВЈ5 wager to activate 300 Spins. 30 Spins on pre-selected games will be credited per day for 10 days after qualifying deposit/wager is met. Free Spins valid for 72 hours from credit. Max Free Spins winnings ВЈ100. Skrill + Neteller excluded. Always refer to Bonus Terms -В ", spinit: "18+ Full T&C's Apply. New players Only. ВЈ10 min deposit. ВЈ5 max bet using bonus. 40 x wagering applies. Bonus valid for 14 days. Minimum ВЈ5 wager to activate 200 Spins. 20 Spins on Starburst will be credited per day for 10 days after qualifying deposit/wager is met. Free Spins valid for 72 hours from credit. Max Free Spins winnings ВЈ100. Skrill + Neteller excluded. Always refer to Bonus Terms", spinland: "18+. New players only. One bonus offer per player. Minimum deposit ВЈ20 Max bonus bet is ВЈ5 Bonus spins on selected games only and must be used within 72 hours. Bonus funds must be used within 30 days otherwise any unused bonus shall be removed. Bonus funds are 200% match up to ВЈ3,000 on your 1st deposit,50% match up to ВЈ250 on your 2nd deposit, and 100% match up to ВЈ250 on your 3rd deposit. Bonus funds are separate to Cash funds, and are subject to 35x wagering the total bonus, cash & bonus spins. Terms apply. BeGambleAware.", "super-casino": "GENERAL BONUS OPT IN REQUIRED. ONLY AVAILABLE ON FIRST DEPOSIT. 100% BONUS UP TO MAX ВЈ200. 25X WAGERING APPLIED FOR BONUS AND DEPOSIT. 30 DAY BONUS EXPIRY. NOT ALL GAMES CONTRIBUTE EQUALLY TOWARDS WAGERING AND BONUS FUNDS CANNOT BE USED ON CERTAIN GAMES. ELIGIBILITY RESTRICTIONS APPLY. FURTHER T'S AND C'S APPLY.", unibet: "18+ to register. www.begambleaware.org. * 10 free spins on registration *Free spins on first deposit as follows :Deposit ВЈ10 or more and receive 40 free spins * Deposit ВЈ50 or more and receive 90 free spins * Deposit ВЈ75 or more and receive 140 free spins *Deposit ВЈ100 or more and receive 190 free spins *Free Spins (35x wagering) *Deposit Bonus (35x wagering) Further T&Cs apply", "vegas-hero": "18+ Full T&C's Apply. New players Only. ВЈ10 minimum deposit. 40 x wagering applies. Bonus valid for 14 days. Minimum ВЈ5 wager required to activate 50 Free Spins. 10 Free Spins will be credited per day for 5 days after qualifying deposit/wager is met. Free Spins valid for 72 hours from credit - www.begambleaware.org", videoslots: "18+. New Customers only. ВЈ10 minimum deposit required, 20 x wagering before you can withdraw the bonus funds. Contributions to wagering vary by game. You can forfeit the bonus and take the winnings and paid out bonus funds. Bonus will be paid out in 10% increments to your cash account. Max bet per spin is 50% of your deposit up to ВЈ20. T & C apply!", williamhill: "Opt in required. Available 1x per customer. First deposit only. Minimum ВЈ10 deposit. Maximum ВЈ300 bonus. 40x wagering. Bonus expires 7 days from issue. New customers to casino page only. Player, currency, country, game restrictions & terms apply.", "williamhill-live": "Opt-in required. Only first deposit qualifies. 100% deposit bonus up to ВЈ100, with 70x wagering on Roulette tables only. Min. deposit ВЈ10. Max. bonus ВЈ100. Bonus expires 7 days from issue. Player, country, currency, game restrictions and terms apply.", winner: "200% bonus up to ВЈ300 on your first deposit вЂў New Customers Only вЂў Min Deposit ВЈ35вЂў Player must wager deposit + bonus amount 35 times вЂў offer must be accepted within 7 days. Bonus Valid for 30 Days вЂў bonus canвЂ™t be withdrawn. Not all games contribute the same percentage to the WR вЂў Skrill/Moneybookers and Neteller are not valid for this promoвЂў real money balance can always be withdrawn вЂў T&Cs Apply", cheekywin: "18+. New players only. 3 deposits only. min deposit 10 ВЈ. max deposit 1,000 ВЈ + 100 spins on Leprechaun soing. selected slots only. 4x conversion40x wagering. T&Cs apply." },
    alternativePopups = [{ goLinkHref: 'a[href^="/-/superlenny"]', popupUrl: "/wp-content/themes/modular/alternatives/superlenny.php" }, { goLinkHref: 'a[href^="/-/roxy"]', popupUrl: "/wp-content/themes/modular/alternatives/roxy-palace.php" }, { goLinkHref: 'a[href^="/-/fantasino"]', popupUrl: "/wp-content/themes/modular/alternatives/fantasino.php" }, { goLinkHref: 'a[href^="/-/chelsea-palace"]', popupUrl: "/wp-content/themes/modular/alternatives/chelsea-palace.php" }, { goLinkHref: 'a[href^="/-/7casino"]', popupUrl: "/wp-content/themes/modular/alternatives/7casino.php" }, { goLinkHref: 'a[href^="/-/bcasino"]', popupUrl: "/wp-content/themes/modular/alternatives/bcasino.php" }, { goLinkHref: 'a[href^="/-/cashino"]', popupUrl: "/wp-content/themes/modular/alternatives/cashino.php" }, { goLinkHref: 'a[href^="/-/dunder"]', popupUrl: "/wp-content/themes/modular/alternatives/dunder.php" }, { goLinkHref: 'a[href^="/-/atlanticspins"]', popupUrl: "/wp-content/themes/modular/alternatives/atlanticspins.php" }, { goLinkHref: 'a[href^="/-/betsson"]', popupUrl: "/wp-content/themes/modular/alternatives/betsson.php" }, { goLinkHref: 'a[href^="/-/betsafe"]', popupUrl: "/wp-content/themes/modular/alternatives/betsafe.php" }, { goLinkHref: 'a[href^="/-/super-casino"]', popupUrl: "/wp-content/themes/modular/alternatives/super-casino.php" }, { goLinkHref: 'a[href^="/-/jackpot247"]', popupUrl: "/wp-content/themes/modular/alternatives/jackpot247.php" }, { goLinkHref: 'a[href^="/-/kaboo"]', popupUrl: "/wp-content/themes/modular/alternatives/kaboo.php" }, { goLinkHref: 'a[href^="/-/guts"]', popupUrl: "/wp-content/themes/modular/alternatives/guts.php" }, { goLinkHref: 'a[href^="/-/casinoeuro"]', popupUrl: "/wp-content/themes/modular/alternatives/casinoeuro.php" }, { goLinkHref: 'a[href^="/-/matchbook"]', popupUrl: "/wp-content/themes/modular/alternatives/matchbook.php" }, { goLinkHref: 'a[href^="/-/highroller"]', popupUrl: "/wp-content/themes/modular/alternatives/highroller.php" }, { goLinkHref: 'a[href^="/-/redbet"]', popupUrl: "/wp-content/themes/modular/alternatives/redbet.php" }, { goLinkHref: 'a[href^="/-/winningroom"], a[href^="/-/winning-room"]', popupUrl: "/wp-content/themes/modular/alternatives/winningroom.php" }, { goLinkHref: 'a[href^="/-/moplay"]', popupUrl: "/wp-content/themes/modular/alternatives/moplay.php" }, { goLinkHref: 'a[href^="/-/casinodisco"], a[href^="/-/casinodisco-theme"]', popupUrl: "/wp-content/themes/modular/alternatives/casinodisco.php" }, { goLinkHref: 'a[href^="/-/spain/royalspinz-bitcoin"]', popupUrl: "/wp-content/themes/modular/alternatives/royalspinz-bitcoin.php" }, { goLinkHref: 'a[href^="/-/spain/merkur-magic"]', popupUrl: "/wp-content/themes/modular/alternatives/spain-merkur-magic.php" }, { goLinkHref: 'a[href^="/-/sweden/igame"]', popupUrl: "/wp-content/themes/modular/alternatives/igame-sweden.php" }, { goLinkHref: 'a[href^="/-/finland/igame"]', popupUrl: "/wp-content/themes/modular/alternatives/igame-finland.php" }, { goLinkHref: 'a[href^="/-/sweden/dunder"]', popupUrl: "/wp-content/themes/modular/alternatives/dunder-sweden.php" }, { goLinkHref: 'a[href^="/-/10bet"], a[href^="/-/10bet-bonus"], a[href^="/-/10bet-bonus-review"], a[href^="/-/10bet-live"], a[href^="/-/10bet-mobile"], a[href^="/-/10bet-sport"]', popupUrl: "/wp-content/themes/modular/alternatives/10bet.php" }, { goLinkHref: 'a[href="/-/casumo"]', popupUrl: "/wp-content/themes/modular/alternatives/casumo.php" }, { goLinkHref: 'a[href="/-/casumo-10pound"], a[href="/-/casumo-blackjack"], a[href="/-/casumo-bonus"], a[href="/-/casumo-bonus-review"], a[href="/-/casumo-live"], a[href="/-/casumo-live-dealers"], a[href="/-/casumo-mobile"], a[href="/-/casumo-mobile-top"], a[href="/-/casumo-roulette"], a[href="/-/casumo-slots"]', popupUrl: "/wp-content/themes/modular/alternatives/casumo-bonus.php" }, { goLinkHref: 'a[href="/-/gate777"]', popupUrl: "/wp-content/themes/modular/alternatives/gate-777.php" }, { goLinkHref: 'a[href="/-/gate777-theme"], a[href="/-/gate777-roulette"], a[href="/-/gate777-paypal"], a[href="/-/gate777-mobile"], a[href="/-/gate777-live"], a[href="/-/gate777-live-dealers"], a[href="/-/gate777-bonus"], a[href="/-/gate777-bonus-review"], a[href="/-/gate-777-live-dealers"], a[href="/-/gate-777-blackjack"]', popupUrl: "/wp-content/themes/modular/alternatives/gate-777-bonus.php" }, { goLinkHref: 'a[href^="/-/shadowbet"]', popupUrl: "/wp-content/themes/modular/alternatives/shadowbet.php" }, { goLinkHref: 'a[href^="/-/bethard"]', popupUrl: "/wp-content/themes/modular/alternatives/bethard.php" }, { goLinkHref: 'a[href^="/-/the-online-casino"]', popupUrl: "/wp-content/themes/modular/alternatives/the-online-casino.php" }, { goLinkHref: 'a[href^="/-/bgt-games"], a[href^="/-/bgt-games-bonus"]', popupUrl: "/wp-content/themes/modular/alternatives/bgt-games.php" }, { goLinkHref: 'a[href^="/-/betreels"], a[href^="/-/betreels-bonus"]', popupUrl: "/wp-content/themes/modular/alternatives/betreels.php" }, { goLinkHref: 'a[href^="/-/spingenie"], a[href^="/-/spingenie-bonus"]', popupUrl: "/wp-content/themes/modular/alternatives/spin-genie.php" }, { goLinkHref: 'a[href="/-/multilotto"], a[href="/-/multilotto-bonus"], a[href="/-/multilotto-mobile"]', popupUrl: "/wp-content/themes/modular/alternatives/multilotto.php" }, { goLinkHref: 'a[href="/-/eurogrand"]', popupUrl: "/wp-content/themes/modular/alternatives/eurogrand.php" }, { goLinkHref: 'a[href="/-/eurogrand-live"]', popupUrl: "/wp-content/themes/modular/alternatives/eurogrand-live.php" }, { goLinkHref: 'a[href="/-/eurogrand-live-dealers"]', popupUrl: "/wp-content/themes/modular/alternatives/eurogrand-live-dealers.php" }, { goLinkHref: 'a[href="/-/eurogrand-blackjack"]', popupUrl: "/wp-content/themes/modular/alternatives/eurogrand-blackjack.php" }, { goLinkHref: 'a[href="/-/eurogrand-bonus-review"]', popupUrl: "/wp-content/themes/modular/alternatives/eurogrand-bonus-review.php" }, { goLinkHref: 'a[href="/-/eurogrand-roulette"]', popupUrl: "/wp-content/themes/modular/alternatives/eurogrand-roulette.php" }, { goLinkHref: 'a[href="/-/eurogrand-mobile"]', popupUrl: "/wp-content/themes/modular/alternatives/eurogrand-mobile.php" }, { goLinkHref: 'a[href^="/-/luckyniki"], a[href^="/-/luckyniki-live"], a[href^="/-/luckyniki-mobile"], a[href^="/-/luckyniki-bonus-review"]', popupUrl: "/wp-content/themes/modular/alternatives/luckyniki.php" }, { goLinkHref: 'a[href^="/-/royal-panda"], a[href^="/-/royal-panda-gambling-live"], a[href^="/-/royal-panda-gambling"], a[href^="/-/royal-panda-blackjack"], a[href^="/-/royal-panda-bonus-review"], a[href^="/-/royal-panda-bonus"], a[href^="/-/royal-panda-home"], a[href^="/-/royal-panda-hp"], a[href^="/-/royal-panda-live-dealers"], a[href^="/-/royal-panda-live"], a[href^="/-/royal-panda-mobile-top"], a[href^="/-/royal-panda-mobile"], a[href^="/-/royal-panda-roulette"], a[href^="/-/royal-panda-sport"], a[href^="/-/royalpanda-sport"]', popupUrl: "/wp-content/themes/modular/alternatives/royal-panda.php" }, { goLinkHref: 'a[href^="/-/luckyniki-theme"]', popupUrl: "/wp-content/themes/modular/alternatives/luckyniki-theme.php" }, { goLinkHref: 'a[href^="/-/luckyniki-roulette"]', popupUrl: "/wp-content/themes/modular/alternatives/luckyniki-roulette.php" }, { goLinkHref: 'a[href^="/-/toptally"]', popupUrl: "/wp-content/themes/modular/alternatives/toptally.php" }, { goLinkHref: 'a[href^="/-/titanbet"]', popupUrl: "/wp-content/themes/modular/alternatives/titanbet.php" }, { goLinkHref: 'a[href^="/-/casinoheroes"], a[href^="/-/casino-heroes"]', popupUrl: "/wp-content/themes/modular/alternatives/casinoheroes.php" }, { goLinkHref: 'a[href^="/-/casino-room"]', popupUrl: "/wp-content/themes/modular/alternatives/casino-room.php" }, { goLinkHref: 'a[href^="/-/ladylucks"]', popupUrl: "/wp-content/themes/modular/alternatives/ladylucks.php" }, { goLinkHref: 'a[href^="/-/winner"]', popupUrl: "/wp-content/themes/modular/alternatives/winner.php" }, { goLinkHref: 'a[href^="/-/intercasino"]', popupUrl: "/wp-content/themes/modular/alternatives/intercasino.php" }, { goLinkHref: 'a[href^="/-/intercasino-live"]', popupUrl: "/wp-content/themes/modular/alternatives/intercasino-live.php" }, { goLinkHref: 'a[href^="/-/intercasino-mobile"]', popupUrl: "/wp-content/themes/modular/alternatives/intercasino-app.php" }, { goLinkHref: 'a[href^="/-/intercasino-bonus"]', popupUrl: "/wp-content/themes/modular/alternatives/intercasino-bonus.php" }, { goLinkHref: 'a[href^="/-/mongoose"], a[href^="/-/mongoose-bitcoin"], a[href^="/-/mongoose-bonus"]', popupUrl: "/wp-content/themes/modular/alternatives/mongoose.php" }, { goLinkHref: 'a[href^="/-/come-on"], a[href^="/-/come-on-sport"], a[href^="/-/come-on-roulette"], a[href^="/-/come-on-mobile"], a[href^="/-/come-on-live"], a[href^="/-/come-on-bonus"], a[href^="/-/come-on-bonus-review"], a[href^="/-/come-on-blackjack"]', popupUrl: "/wp-content/themes/modular/alternatives/come-on.php" }, { goLinkHref: 'a[href^="/-/winstar"]', popupUrl: "/wp-content/themes/modular/alternatives/winstar.php" }, { goLinkHref: 'a[href^="/-/canada/gowild"]', popupUrl: "/wp-content/themes/modular/alternatives/gowild-canada.php" }, { goLinkHref: 'a[href^="/-/new-zealand/gowild"]', popupUrl: "/wp-content/themes/modular/alternatives/gowild-nz.php" }, { goLinkHref: 'a[href^="/-/ireland/gowild"]', popupUrl: "/wp-content/themes/modular/alternatives/gowild-ireland.php" }, { goLinkHref: 'a[href^="/-/norway/piggy-bang"]', popupUrl: "/wp-content/themes/modular/alternatives/piggy-bang-norway.php" }, { goLinkHref: 'a[href^="/-/finland/piggy-bang"]', popupUrl: "/wp-content/themes/modular/alternatives/piggy-bang-finland.php" }, { goLinkHref: 'a[href^="/-/india/guts"]', popupUrl: "/wp-content/themes/modular/alternatives/guts-india.php" }, { goLinkHref: 'a[href^="/-/india/rizk"]', popupUrl: "/wp-content/themes/modular/alternatives/rizk-india.php" }],
    supportsPassive = !1;
try {
    var opts = Object.defineProperty({}, "passive", { get: function() { supportsPassive = !0 } });
    window.addEventListener("test", null, opts)
} catch (e) {}! function(e, t, n, a) {
    var o, i, s = e(t),
        r = e(n),
        l = (e("html"), t.devicePixelRatio, /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)),
        p = (t.navigator.userAgent.indexOf("MSIE "), function() { return -1 != navigator.appVersion.indexOf("MSIE") }),
        u = (navigator.appVersion, function() { var e = 999; return -1 != navigator.appVersion.indexOf("MSIE") && (e = parseFloat(navigator.appVersion.split("MSIE")[1])), e });
    e('[href^="/-/"]').on("click", (function() { e(".popup-alternative").remove() }));
    for (var d = 0; d < alternativePopups.length; d++) N(alternativePopups[d]);
    if (e("#video").length) {
        var c = n.createElement("script");
        var h = n.getElementsByTagName("script")[0];
        h.parentNode.insertBefore(c, h), addEventListener("load", (function(e) { i = new YT.Player("video", { events: { onReady: A } }), A() }))
    }
}
if (e(".player").each((function() {
        var t = e(this),
            n = t.find(".player-start"),
            a = t.find(".player-current"),
            o = t.find(".player-total"),
            i = t.find(".player-progress"),
            s = t.find(".player-progress span"),
            r = t.find("audio, video").get(0),
            l = "playing",
            p = !1,
            u = function() { a.text(Math.floor(r.currentTime / 60) + ":" + (Math.floor(r.currentTime % 60) / 100).toFixed(2).slice(-2)), s.outerWidth(Math.round(r.currentTime) / Math.round(r.duration) * 100 + "%") };
        r && r.addEventListener("canplaythrough", (function() { p || (p = !0, u(), o.text(Math.floor(r.duration / 60) + ":" + Math.floor(r.duration % 60)), r.addEventListener("timeupdate", (function() { u() })), r.addEventListener("ended", (function() { r.currentTime = 0, t.removeClass(l) })), i.on("click", (function(e) { r.currentTime = Math.floor(r.duration * ((e.clientX - i.offset().left) / i.outerWidth())) })), n.on("click", (function(e) { e.preventDefault(), r.pause(), t.toggleClass(l), t.hasClass(l) && r.play() }))) }))
    })), e(".christmas-toggle").on("click", (function() { e(".christmas-offers").toggleClass("opened") })), r.on("click", (function(t) { e(t.target).closest(".christmas-offers").length || e(".christmas-offers").removeClass("opened") })), e(".table-simple").each((function() {
        var t = e(this);
        t.find("th").each((function() {
            var n = e(this);
            t.find("td:nth-child(" + (n.index() + 1) + ")").attr("data-title", n.text())
        }))
    })), e(".intro-alt").length && e(".annonce").prependTo(".intro-alt .shell"), e(".annonce-trigger").on("click", (function() { e(this).closest(".annonce").toggleClass("annonce-open") })), e(".js-fader").length && e(".js-fader").each((function() { new Fader(e(this)) })), e(".dropdown-toggle").on("touchstart", (function() { e(this).closest(".affiliate-program").toggleClass("expanded") })), e(".slots-articles").on("click", (function(t) { e(t.target).is(".slots-articles") && e(this).removeClass("limited") })), e(".software-reviews .expand").on("click", (function() { e(this).closest(".software-reviews").addClass("expanded") })), e(".software-reviews").each((function() {
        var t = e(this);
        t.toggleClass("expanded", t.find("ul").children().length <= 12)
    })), "us" == elems.countrycode.toLowerCase()) {
    n.querySelectorAll('[href^="/-/"]');
    var f = elems.state.toLowerCase(),
        m = ["pa", "nj", "mi"].indexOf(f) > -1 ? ':not([href^="/-/usa/' + f + '"])' : "";
    ["/-/usa/social/slotomania", "/-/usa/social/house-of-fun", "/-/usa/social/caesarsgames"].forEach((function(e) { m += ':not([href^="' + e + '"])' })), e('[href^="/-/"]' + m).on("click", (function(t) {
            var a;
            switch (t.preventDefault(), f) {
                case "pa":
                    a = "/wp-content/themes/modular/alternatives/usa-pa.php";
                    break;
                case "nj":
                    a = "/wp-content/themes/modular/alternatives/usa-nj.php";
                    break;
                case "mi":
                    a = "/wp-content/themes/modular/alternatives/usa-mi.php";
                    break;
                default:
                    a = "/wp-content/themes/modular/alternatives/usa-alternatives.php"
            }
            s.on("resize", (function() {
                var t = e.options.itemsPerPage;
                e.options.itemsPerPage = s.outerWidth() > 1023 ? 24 : 16, t != e.options.itemsPerPage && e.$container.attr("data-items", e.options.itemsPerPage)
            }))
        })), e(".casino-reviews-list .toggle").on("click", (function() { e(this).closest(".casino-reviews-list").toggleClass("expanded") })), e(".list-procons").each((function() {
            var t = e(this);
            t.toggleClass("two-columns", t.children().length > 3)
        })), e(".t-top-sorting .text, .tabs-simple .text").on("click", (function() { e(this).parent().toggleClass("expanded") })), e(".t-top-sorting, .tabs-simple").length && (e(".t-top-sorting, .tabs-simple").each((function() { G(e(this).siblings("table:eq(0)"), e(this).find(".active").data("sort")) })), e(".t-top-sorting a, .tabs-simple a").on("click", (function(t) {
            t.preventDefault();
            var n = e(this),
                a = "active",
                o = n.parents(".t-top-sorting:eq(0)").siblings("table:eq(0)"),
                i = n.parent().data("sort"),
                s = e(n.parent().data("tab"));
            n.parent().hasClass(a) || n.is(["data-tab"]) || (G(o, i), n.parent().addClass(a).siblings().removeClass(a)), n.parent().add(s).addClass(a).siblings().removeClass(a)
        }))), e(".t-top .t-actions").on("click", (function(t) {
            var n = e(t.target);
            n.closest("a").length || n.closest("tr").toggleClass("expanded")
        })),
        function() {
            var a = e(".site-nav"),
                o = "nav-active";
            e(".nav-btn").on("click", (function() { a.addClass("opened").toggleClass("nav-visible"), e(".nav-active").removeClass(o) })), a.length && (e(".site-nav-dropdown").parent().addClass("has-dd"), e(".has-dd").on("click", (function(t) {
                var n = e(this);
                e(t.target).is("a") || n.add(n.parent()).toggleClass(o)
            })));
            a.find(".has-dd > a").on("touchstart", (function(n) {
                var a = e(this).parent(),
                    o = "dropdown-visible";
                e(t).outerWidth() > 1023 && !a.hasClass(o) && (n.preventDefault(), a.addClass(o).siblings().removeClass(o))
            }));
            var i = 0,
                s = e(t),
                r = a.find("> ul");
            addEventListener("touchstart", (function(e) { i = e.touches[0].clientY })), addEventListener("touchmove", (function(e) {
                if (s.width() < 1024 && a.hasClass("nav-visible")) {
                    var t = e.touches[0].clientY;
                    (t > i && r.scrollTop() <= 0 || t < i && r.prop("scrollHeight") - r.scrollTop() <= r.outerHeight()) && e.cancelable && e.preventDefault()
                }
                i = t
            }), !!supportsPassive && { passive: !1 }), e(n).on("click touchstart", (function(t) { e(t.target).closest(".site-nav").length || e(".dropdown-visible").removeClass("dropdown-visible") }))
        }(), e(".form-calculator").length && new WageringCalculator, e(".terms-altered:not(.table-primary,.terms-visible) .terms").each((function() { new DottedText(this, { rows: 1, showMoreText: "More" }) })), e(".intro > p").on("click", (function() { e(this).toggleClass("expanded") })), e(t).scroll((function(t) { e(this).scrollTop() >= $bodyPart ? $backToTop.fadeIn() : $backToTop.fadeOut(), e(this).scrollLeft() > 1 && (t.preventDefault(), e(this).scrollLeft(0)) })), $backToTop.click((function() { e("html,body").animate({ scrollTop: 0 }) })), e(".quicknavi-disclosure").append(' <span>This independent comparison website helps consumers choose the best available gambling product matching their needs. we offer high-quality advertising service by featuring only established brands of licensed operators in our reviews. For more information please visit our <a href="/how-we-rate/">How We Rate</a> page. Please note that although we endeavor to provide yo uwith up-to-date information, we do not compare all operators on the market. <small>We shall not be responsible for the enforcement of any additional restrictions related to the provision of the gambling services which we advertise such as age limitations as well as territory and residence limitations, wherefore we advise you to review the applicable restrictions for said operators.</small></span>'), e(".quicknavi-disclosure strong").on("click", (function(n) { "ontouchstart" in t && (n.preventDefault(), e(".quicknavi-disclosure").toggleClass("is-visible")) })), e(n).on("click touchstart", (function(t) { e(t.target).closest(".quicknavi-disclosure").length || e(".quicknavi-disclosure").removeClass("is-visible") })), e(".quicknavi-group").on("click", (function(t) { e(t.target).is("a") || e(this).toggleClass("expanded") })), e(".table-expand").on("click", (function() {
            var t = e(this),
                n = e(this).siblings("table").find("tbody tr"),
                a = "hidden";
            n.filter(".hidden").slice(0, 10).removeClass(a), n.filter(".hidden").length || t.addClass(a)
        })), e(".table-top-casinos th, .table-top th").each((function() {
            var t = e(this);
            t.closest(".table-top-casinos, .table-top").find("td:nth-child(" + (t.index() + 1) + ")").attr("data-title", t.text())
        })), e(".table-top-casinos:not(.terms-altered) .table-actions:not(.terms-added)").each((function() {
            var t = e(this).find("a").attr("href").substr(3),
                n = "";
            if (allTermsTexts[t] != a) n = allTermsTexts[t];
            else if (!(t.endsWith("sport") || t.endsWith("poker") || t.endsWith("lotto") || t.endsWith("bingo"))) {
                var o = Object.keys(allTermsTexts).filter((function(e) { if (t.indexOf(e) > -1) return e }));
                o[0] != a && (n = allTermsTexts[o[0]])
            }
            if ("" == n) return !0;
            e(this).addClass("terms-added").parents("tr").attr("data-terms", n).find(".table-actions, .table-bonus").append('<div class="terms">' + n + "</div>")
        })), r.on("click", ".table-top-casinos .terms", (function() { e(this).closest("tr").addClass("expanded") })), r.on("click", ".popup-alternative .terms", (function() { e(this).closest(".geopopup-offer").addClass("expanded") })), e(".blog-slider").length
    var w = n.createElement("link");
    w.rel = "stylesheet", w.href = "/wp-content/themes/modular/css/slick.css", n.head.appendChild(w);
    var b = n.createElement("script");
    b.src = "/wp-content/themes/modular/js/slick.min.js", n.body.appendChild(b)
}
e(".slots-box .holder"), 1 == l ? e("body").addClass("touch-device") : e("body").addClass("desktop-device");
var v = e(".sidebar");
if (v.length) {
    var y = t.innerWidth,
        k = v.offset().top - (y >= 1200 ? 20 : 80),
        C = !1;

    function x(t, n) {
        if (C && y >= 1024 && t.outerHeight() < t.parents(".content:eq(0)").outerHeight() - 70)
            if (t.toggleClass("stuck", n >= k), t.hasClass("stuck")) {
                var a = n + t.outerHeight() + (y >= 1200 ? 60 : 180) - (e(".content").outerHeight() + e(".content").offset().top);
                a > (y >= 1200 ? 20 : 80) ? (a = (y >= 1200 ? 40 : 160) - a, t.css({ top: a })) : t.attr("style", "")
            } else t.attr("style", "");
        else t.hasClass("stuck") && t.removeClass("stuck").attr("style", "")
    }
    s.on("load resize", (function() { e(".content").addClass("loaded"), v.attr("style", "").removeClass("stuck"), y = t.innerWidth, k = v.offset().top - (y >= 1200 ? 20 : 80), y < 1024 && v.hasClass("stuck") && v.removeClass("stuck"), "load" === event.type && (C = !0), x(v, s.scrollTop()) })), n.addEventListener("scroll", (function() {
        var e = s.scrollTop();
        x(v, e)
    }))
}
var T = e(".blog-slider");
T.length && addEventListener("load", (function(t) {
    T.each((function() {
        var t = e(this);
        t.find("img").each((function() {
            var t = e(this);
            t.parent().is("p") && t.unwrap()
        })), t.slick({ accessibility: !1, adaptiveHeight: !0, draggable: !1, mobileFirst: !0, speed: 500, prevArrow: '<span class="slick-prev"></span>', nextArrow: '<span class="slick-next"></span>' });
        var n = e('<div class="slick-pager" />').append("<span /> / <span />"),
            a = n.find("span:first"),
            o = n.find("span:last");
        a.text("1"), o.text(t.find(".slick-slide:not(.slick-cloned)").length), t.append(n), t.on("beforeChange", (function(e, t, n, o) { a.text(o + 1) }))
    }))
}));
var P = e(".three-boxes-v1 .box ul li .right");
if (P.length) {
    var L = null;
    H(P), s.on("resize", (function() { null !== L && (clearTimeout(L), L = null), L = setTimeout((function() { H(P), L = null }), 300) }))
}
var F = e(".blog-latest");
if (F.length) {
    L = null;
    H(F.find(".blog-preview")), s.on("resize", (function() { null !== L && (clearTimeout(L), L = null), L = setTimeout((function() { H(F.find(".blog-preview")), L = null }), 300) }))
}
if (null !== readCookie("isVoted") && e(".widget-poll").length && q(e(".widget-poll")), e(".widget-poll .wpp_submit").on("mousedown", (function(t) {
        var n = e(this).parents(".widget-poll:eq(0)"),
            a = n.find("input:radio:checked").parents("li:eq(0)").index();
        n.find("input:radio:checked").length && n.find(".wpp_result_list li:eq(" + a + ")").data("addOne", !0)
    })), p() && u() <= 9 && e("body").addClass("ie"), e(".field, textarea").focus((function() { this.title == this.value && (this.value = "") })).blur((function() { "" == this.value && (this.value = this.title) })), e(".cntctfrm_contact_form input.text, .cntctfrm_contact_form textarea").each((function() { "" == this.value ? e(this).removeClass("full") : e(this).addClass("full") })), e(".cntctfrm_contact_form input.text, .cntctfrm_contact_form textarea").blur((function() { "" == this.value ? e(this).removeClass("full") : e(this).addClass("full") })), e(".back-top").on("touchstart click", (function(t) { e("html, body").animate({ scrollTop: "0" }, 500), t.preventDefault() })), r.on("click", '[href^="#"]', (function(t) {
        t.preventDefault();
        var n = this.getAttribute("href");
        if ("#" != n) {
            var a = e(n),
                o = e(".site-header"),
                i = "fixed" == o.css("position") ? o.outerHeight() + 20 : 0;
            a.length && (e("body").addClass("scrolling"), e("html, body").animate({ scrollTop: a.offset().top - i }, { duration: 500, queue: !1 }))
        }
    })), e(".popup-link").length) {
    var S = n.createElement("link");
    S.rel = "stylesheet", S.href = "/wp-content/themes/modular/css/magnific-popup.css", n.head.appendChild(S);
    var B = n.createElement("script");
    B.src = "/wp-content/themes/modular/js/jquery.magnific-popup.min.js", n.body.appendChild(B), B.addEventListener("load", (function(t) { e(".popup-link").magnificPopup({ type: "image", closeOnContentClick: !0, fixedContentPos: !0, mainClass: "mfp-no-margins mfp-with-zoom", image: { verticalFit: !0 }, zoom: { enabled: !0, duration: 300 } }) }))
}
e(".js-alter-click").on("click", (function(t) { t.preventDefault(), e(this).closest("li").find(".popup-link").trigger("click") })), e(".nav > ul > li").each((function() { e(this).find(".nav-dd").length && e(this).addClass("drop-holder") })), e(".nav-dd-title").on("click", (function(n) { t.innerWidth < 1200 && e(this).parents(".nav-dd.opened:eq(0)").removeClass("opened") })), e(".sc-wp a.sc-icon").on("click", (function(n) { t.open(e(this).attr("href"), "Facebook", "width=640, height=480"), n.preventDefault() })), s.on("load", (function() {
                var t, n, a;
                e.fn.reverse = [].reverse, e(".slots-box").each((function() {
                        var t = e(this),
                            n = t.find(".slot-item"),
                            a = t.find(".view-more"),
                            o = t.find(".holder"),
                            i = t.find(".sort-btn"),
                            r = o.find("ul"),
                            l = "active",
                            p = "hidden",
                            u = 5,
                            d = Math.floor(t.outerWidth() / n.outerWidth()) * u,
                            c = d,
                            h = function() { n.slice(d - c, d).removeClass(p).each((function() { e(this).find(".manual-lazyload").attr("class", "lazyload") })), d > n.length && a.addClass(p) },
                            f = function(e) { d = 40, o.addClass("loading"), r.empty(), n.addClass("hidden"), "alphabetic" == e ? n.sort((function(t, n) { return t.getAttribute("data-" + e).toUpperCase().localeCompare(n.getAttribute("data-" + e).toUpperCase()) })).appendTo(r) : n.sort((function(t, n) { return t.getAttribute("data-" + e).toUpperCase().localeCompare(n.getAttribute("data-" + e).toUpperCase()) })).reverse().appendTo(r), h(), o.removeClass("loading") };
                        a.on("click", (function(e) { d += c, h() })), i.on("click", (function() {
                            var t = e(this);
                            t.hasClass(l) || (e(this).addClass(l).siblings().removeClass(l), f(t.attr("class").split(" ")[1]))
                        })), n.addClass("hidden"), h(), s.on("resize", (function() { n.addClass("hidden"), u = 5, d = Math.floor(t.outerWidth() / n.outerWidth()) * u, c = d, h() }))
                    })), e("p:empty").css({ padding: "0" }), O(), U(), $(),
                    function() {
                        if (e(".intro-table .rating").length) {
                            e(".intro-table .rating").each((function() {
                                var t = e(this).find(".stars .fill"),
                                    n = e(this).find(".label strong").html().split(".");
                                fill_width = parseInt(20 * n[0] + 1.6 * n[1].substring(0, 1)), t.animate({ width: fill_width }, 300)
                            }))
                        }
                    }(), t = e(".mobile-nav-btn"), n = e(".nav > ul"), t.on("touchstart click", (function(e) { t.toggleClass("opened"), n.toggleClass("opened"), e.preventDefault() })), e(".nav > ul > li.drop-holder").each((function() {
                        var t = e(this),
                            n = t.find(".icon-dd"),
                            a = t.find(".nav-dd");
                        n.on("click", (function(e) { t.toggleClass("opened"), n.toggleClass("clicked"), a.toggleClass("opened"), e.preventDefault() }))
                    })),
                    function() {
                        if (e(".view-more").length) {
                            var t = e(".intro").find(".view-more"),
                                n = e(".intro").find("p");
                            t.on("click", (function(e) { n.hasClass("small") ? (t.html("Read Less"), n.removeClass("small").addClass("big")) : (t.html("Read More"), n.removeClass("big").addClass("small")), e.preventDefault() }))
                        }
                    }(), a = ["I", "n", "s", "t", "a", "n", "t", " ", "p", "l", "a", "y"], e.each(a, (function(e, t) {
                        switch (e) {
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                                a[e] = "<b>" + t + "</b>";
                                break;
                            default:
                                a[e] = "<i>" + t + "</i>"
                        }
                    })), a = a.toString().replace(/,/g, ""), e(".embedded-game .game .play span").html(a), e(".embedded-game .game").on("click", (function() {
                                var t = e(this);
                                if (t.parent(".embedded-game").addClass("loading"), !(t.find("a").length > 0)) {
                                    var n = e(this).find(".play").attr("data");
                                    M(), e(n).on("click", ".geopopup-overlay", (function(t) {
                                        t.stopPropagation();
                                        var n = e(t.target);
                                        n.closest(".geopopup-overlay-noclose").length || (n.hasClass("popup-alternative") || (n.hasClass("geopopup-overlay") || n.hasClass("geopopup-overlay-inner")) && e(".popup-alternative").length) && (e(".geopopup-overlay").fadeOut(), e("html").removeClass("no-scroll"))
                                    })), t.addEventListener("resize", (function() { e(".nav .opened").removeClass("opened") })), e("html").on("touchstart", (function(t) { e(t.target).hasClass("touched-link") || e(".touched-link").removeClass("touched-link") })), I(), e(".nav-link").on("click", (function(n) {
                                        var a = e(this),
                                            o = I();
                                        a.parent().hasClass("drop-holder") && o && t.innerWidth > 1199 && !a.hasClass("touched-link") && (n.preventDefault(), a.addClass("touched-link"))
                                    }));
                                    y = t.innerWidth;

                                    function M() { e(".geopopup-overlay").length && (e(".geopopup-overlay").hasClass("closed") && e(".geopopup-overlay").is(":visible"), e('a[href^="/-/"]').on("click", (function(t) { e(this).parent().hasClass("geopopup-offer") || (t.preventDefault(), e("html").addClass("no-scroll"), e(".geopopup-overlay").fadeIn()) })), e(".geopopup-close").on("click", (function() { e(".geopopup-overlay").fadeOut(), e("html").removeClass("no-scroll") }))) }

                                    function O() {
                                        var n = e(t).scrollTop(),
                                            a = e(".back-top");
                                        n >= 400 ? a.addClass("show") : a.removeClass("show")
                                    }

                                    function U() {
                                        e(".four-boxes").each((function() {
                                            var t = 0,
                                                n = e(this).find(".box-cnt");
                                            n.each((function() {
                                                var n = e(this).outerHeight();
                                                n > t && (t = n)
                                            })), s.outerWidth() >= 600 ? n.outerHeight(t) : n.animate({ height: "auto" }, 300)
                                        }))
                                    }

                                    function $() {
                                        if (e(".home-table").length && 0 === e(".home-table").index()) {
                                            var a = e(".home-table"),
                                                o = a.height(),
                                                i = e(".content");
                                            (t.innerWidth || n.documentElement.clientWidth || n.body.clientWidth) >= 768 ? (i.css({ "margin-top": o }), a.css({ "margin-top": -(o + 25) })) : (i.css({ "margin-top": "0" }), a.css({ "margin-top": "-20px" }))
                                        }
                                    }

                                    function A(t) { e(".video-wrap .thumb").length && e(".video-wrap").find(".thumb").each((function() { e(this).on("click", (function() { e(this).fadeOut(), i.playVideo() })) })) }

                                    function H(t) {
                                        for (var n in function(t) {
                                                rowOffsets = {};
                                                t.each((function() {
                                                    var t = e(this),
                                                        n = Math.round(t.offset().top);
                                                    rowOffsets.hasOwnProperty(n) || (rowOffsets[n] = []), rowOffsets[n].push(t)
                                                }))
                                            }(t), t.attr("style", ""), rowOffsets) {
                                            var a = 0,
                                                o = e(rowOffsets[n]);
                                            if (o.each((function() {
                                                    var t = e(this);
                                                    t.outerHeight() > a && (a = t.outerHeight())
                                                })), a = Math.ceil(a), o.each((function() { e(this).css({ minHeight: a }) })), delete rowOffsets[n], Object.keys(rowOffsets).length) H(D(rowOffsets))
                                        }
                                    }

                                    function D(t) {
                                        var n = [];
                                        for (var a in t)
                                            for (var o = t[a], i = 0; i < o.length; i++) n.push(o[i]);
                                        return e(n)
                                    }

                                    function q(t) {
                                        t.addClass("voted");
                                        var n = t.find(".wpp_result_list li"),
                                            a = e('<div class="wpp_total"><span /> votes</div>'),
                                            o = 0,
                                            i = 0;
                                        n.each((function() {
                                                var t = e(this);
                                                t.find("> span:eq(0), > span:eq(2)").remove();
                                                t.find("> span:eq(0)");
                                                var n = t.find("> span:last"),
                                                    a = parseInt(n.text(), 10);
                                                void 0 !== t.data("addOne") && (a += 1), t.data("votes", a), n.remove(), a > i && (i = a), o += a
                                            })), a.find("span").text(o), t.find(".wpp_result_list").after(a),
                                            function(t, n, a) {
                                                t.each((function() {
                                                    var t = e(this),
                                                        o = t.data("votes"),
                                                        i = e('<span class="wpp_bar"><span /></span>'),
                                                        s = e('<span class="wpp_percentage" />');
                                                    t.prepend(i).prepend(s);
                                                    var r = 0 === n || 0 === a ? 0 : Math.round(100 / a * o),
                                                        l = 0 === n || 0 === a ? 0 : Math.round(o / n * 100);
                                                    setTimeout((function() { i.find("span").css({ width: l + "%" }) })), s.text(r + "%")
                                                }))
                                            }(n, i, o)
                                    }
                                    t.onresize = function() { y = t.innerWidth }, e.fn.setAllToMaxHeight = function() { return this.height(Math.max.apply(this, e.map(this, (function(t) { return e(t).innerHeight() })))) };
                                    var E = null,
                                        W = "ontouchstart" in t || navigator.msMaxTouchPoints > 0,
                                        R = !1;

                                    function I() {
                                        return null !== E || (W ? R || function() {
                                            R || (t.addEventListener("mousemove", V), t.addEventListener("touchstart", j));
                                            R = !0
                                        }() : E = !1), E
                                    }

                                    function V() { E = !1, z() }

                                    function j() { E = !0, z() }

                                    function z() { t.removeEventListener("mousemove", V), t.removeEventListener("touchstart", j) }

                                    function G(t, n) {
                                        for (var a = t.find("tbody"), o = function(t, n) { return t.sort((function(t, a) { return parseFloat(e(t).data(n), 10) > parseFloat(e(a).data(n), 10) ? -1 : 1 })) }(a.find("tr"), n), i = 0; i < o.length; i++) {
                                            var s = e("<div></div>");
                                            s.html(o[i]), e(".logo span", s).text(i + 1 + "."), a.append(o[i])
                                        }
                                    }

                                    function _(n) {
                                        var a = navigator.userAgent.toLowerCase(),
                                            o = n || "";
                                        a.indexOf("android") > -1 ? e('[href^="/-/' + o + '"]').each((function() {
                                            var t = e(this);
                                            t.attr("href", t.attr("href") + "-android")
                                        })) : /ipad|iphone|ipod|macintosh/.test(a) && "ontouchstart" in t && e('[href^="/-/' + o + '"]').each((function() {
                                            var t = e(this);
                                            t.attr("href", t.attr("href") + "-ios")
                                        }))
                                    }
                                    t.showPollResults = q, t.createCookie = createCookie, t.initGeoPopup = M
                                }
                            }