(function() {
  'use strict';

  angular.module('users')
         .service('userService', ['$q', '$http', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q, $http){

    // initialized connection to ethereum node via json rpc
    var Web3 = require('web3');
    var web3 = new Web3();

    web3.setProvider(new web3.providers.HttpProvider("http://104.154.21.38:8545"));

    // web3.eth.defaultAccount = web3.eth.coinbase;


    var users = [
      {
        name: 'John Lender',
        avatar: 'svg-2',
        content: "I invest in people's happiness.",
        questions: [
          {no: 1, text: "How would your best friend describe you as a risk taker?", answers: [
            {answer: "A real gambler", score: 4},
            {answer: "Willing to take risks after completing adequate research", score: 3},
            {answer: "Cautious", score: 2},
            {answer: "A real risk avoider", score: 1}
          ]},
          {no: 2, text: "You are on a TV gameshow and you can choose one of the following. Which would you choose?", answers: [
            {answer: "$1000 in cash", score: 1},
            {answer: "A 50 percent chance at winning $5000", score: 2},
            {answer: "A 25 percent chance at winning $10.000", score: 3},
            {answer: "A 5 percent chance at winning $100.000", score: 4}
          ]},
          {no: 3, text: "You have just finished saving saving for a once-in-a-lifetime vacation, but you loose your job. What would you do?", answers: [
            {answer: "Cancel the vacation", score: 1},
            {answer: "Take a much more modest vacation", score: 2},
            {answer: "Go as scheduled. Reasoning that you need to to prepare for a job search", score: 3},
            {answer: "Extend your vacation because this might be the last time you travel first class", score: 4}
          ]},
          {no: 4, text: "How would you respond to the following statement? \"It’s hard for me to pass up a bargain.\"", answers: [
            {answer: "Very true", score: 1},
            {answer: "Sometimes true", score: 2},
            {answer: "Not at all true", score: 3},
          ]},
          {no: 5, text: "If you unexpectedly receive $20.000 to invest, what would you do?", answers: [
            {answer: "Deposit it in a bank account, money market account, or an insured CD", score: 1},
            {answer: "Invest in safe, high-quality bonds or bond mutual funds", score: 2},
            {answer: "Invest it in stocks or stock mutual funds", score: 3}
          ]},
          {no: 6, text: "In terms of experience, how comfortable are you investing in stocks or stock mutual funds?", answers: [
            {answer: "Not at all comfortable", score: 1},
            {answer: "Somewhat comfortable", score: 2},
            {answer: "Very comfortable", score: 3}
          ]},
          {no: 7, text: "Which situation would make you the happiest?", answers: [
            {answer: "You win $50.000 in a publisher’s contest", score: 2},
            {answer: "You inherit $50.000 from a rich relative", score: 1},
            {answer: "You earn $50.000 by risking $1000 in the options market", score: 3},
            {answer: "Any of the above—after all, you’re happy with the $50.000", score: 1}
          ]},
          {no: 8, text: "When you think of the word \"risk\", what is the first word that comes to mind?", answers: [
            {answer: "Loss", score: 1},
            {answer: "Uncertainty", score: 2},
            {answer: "Opportunity", score: 3},
            {answer: "Thrill", score: 4}
          ]},
          {no: 9, text: "You inherit a mortgage-free house worth $80.000. The house is in a nice neighborhood, and you believe that it should increase in value faster than inflation. Unfortunately, the house needs repairs. If rented today, the house would bring in $600 monthly, but if updates and repairs were made, the house would rent for $800 per month. To finance the repairs you’ll need to take out a mortgage on the property. You would:", answers: [
            {answer: "Sell the house", score: 1},
            {answer: "Rent the house as is", score: 2},
            {answer: "Remodel and update the house, and then rent it", score: 3}
          ]},
          {no: 10, text: "In your opinion, is it more important to be protected from rising consumer prices (inflation) or to maintain the safety of your money from loss or theft?", answers: [
            {answer: "Much more important to secure the safety of my money", score: 1},
            {answer: "Much more important to be protected from rising prices (inflation)", score: 3}
          ]},
          {no: 11, text: "You’ve just taken a job at a small fast growing company. After your first year you are offered the following bonus choices. Which one would you choose", answers: [
            {answer: "A five year employment contract", score: 1},
            {answer: "A $25.000 bonus", score: 2},
            {answer: "Stock in the company currently worth $25,000 with the hope of selling out later at a large profit", score: 3}
          ]},
          {no: 12, text: "Some experts are predicting prices of assets such as gold, jewels, collectibles, and real estate (hard assets) to increase in value; bond prices may fall, however, experts tend to agree that government bonds are relatively safe. Most of your investment assets are now in high interest government bonds. What would you do?", answers: [
            {answer: "Hold the bonds", score: 1},
            {answer: "Sell the bonds, put half the proceeds into money market accounts, and the other half into hard assets", score: 2},
            {answer: "Sell the bonds and put the total proceeds into hard assets", score: 3},
            {answer: "Sell the bonds, put all the money into hard assets, and borrow additional money to buy more", score: 4}
          ]},
          {no: 13, text: "Assume you are going to buy a home in the next few weeks. Your strategy would probably be:", answers: [
            {answer: "To buy an affordable house where you can make monthly payments comfortably", score: 1},
            {answer: "To stretch a bit financially to buy the house you really want", score: 2},
            {answer: "To buy the most expensive house you can qualify for", score: 3},
            {answer: "To borrow money from friends and relatives so you can qualify for a bigger mortgage", score: 4}
          ]},
          {no: 14, text: "Given these best- and worst-case returns. Which would you prefer?", answers: [
            {answer: "$200 gain best case; $0 gain/loss worst case", score: 1},
            {answer: "$800 gain best case; $200 loss worst case", score: 2},
            {answer: "$2600 gain best case; $800 loss worst case", score: 3},
            {answer: "$4800 gain best case; $2400 loss worst case", score: 4}
          ]},
          {no: 15, text: "Assume that you are applying for a mortgage. Interest rates have been coming down over the past few months. There’s the possibility that this trend will continue. But some economists are predicting rates to increase. You have the option of locking in your mortgage interest rate or letting it float. If you lock in, you will get the current rate, even if interest rates go up. If the rates go down, you’ll have to settle for the higher locked in rate. You plan to live in the house for at least three years. What would you do??", answers: [
            {answer: "Definitely lock in the interest rate", score: 1},
            {answer: "Probably lock in the interest rate", score: 2},
            {answer: "Probably let the interest rate float", score: 2},
            {answer: "Definitely let the interest rate float", score: 3}
          ]},
          {no: 16, text: "In addition to whatever you own, you have been given $1000. You are now asked to choose between:", answers: [
            {answer: "A sure gain of $500", score: 1},
            {answer: "A 50% chance to gain $1000 and a 50% chance to gain nothing", score: 3}
          ]},
          {no: 17, text: "In addition to whatever you own, you have been given $2000. You are now asked to choose between:", answers: [
            {answer: "A sure loss of $500", score: 1},
            {answer: "A 50% chance to lose $1,000 and a 50% chance to lose nothing", score: 3}
          ]},
          {no: 18, text: "Suppose a relative left you an inheritance of $100.000, stipulating in the will that you invest ALL the money in ONE of the following choices. Which one would you select?", answers: [
            {answer: "A savings account or money market mutual fund", score: 1},
            {answer: "A mutual fund that owns stocks and bonds", score: 2},
            {answer: "A portfolio of 15 common stocks", score: 3},
            {answer: "Commodities like gold, silver, and oil", score: 4}
          ]},
          {no: 19, text: "If you had to invest $20,000, which of the following investment choices would you find most appealing?", answers: [
            {answer: "60% in low-risk investments 30% in medium-risk investments 10% in high-risk investments", score: 1},
            {answer: "30% in low-risk investments 40% in medium-risk investments 30% in high-risk investments", score: 2},
            {answer: "10% in low-risk investments 40% in medium-risk investments 50% in high-risk investments", score: 3}
          ]},
          {no: 20, text: "Your trusted friend and neighbor, an experienced geologist, is putting together a group of investors to fund an exploratory gold mining venture. The venture could pay back 50 to 100 times the investment if successful. If the mine is a bust, the entire investment is worthless. Your friend estimates the chance of success is only 20%. If you had the money, how much would you invest?", answers: [
            {answer: "Nothing", score: 1},
            {answer: "One month’s salary", score: 2},
            {answer: "Three month’s salary", score: 3},
            {answer: "Six month’s salary", score: 4}
          ]}
        ]
      },
      {
        name: 'Marry Borrows',
        avatar: 'svg-1',
        content: "I'd like to renovate my kids' room and make them happy.",
        email: "marry@borrows.com",
        mortgate: 100000,
        other_loans: 1000,
        yearly_income: 40000,
        credit_score: 5,
        borrow_amount: 2000,
        spare_monthly: 150
      },
      {
        name: 'Inge Callman',
        avatar: 'svg-3',
        content: "I work in the call center of the bank."
      },
      {
        name: 'Lawrence Billman',
        avatar: 'svg-4',
        content: "I'm responsible for billing in the bank."
      }
    ];

    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      }
    };
  }

})();
