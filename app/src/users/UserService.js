(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$q', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q){
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
          {no: 16, text: "In addition to whatever you own, you have been given $1000. You are now asked to choose between:", answers: [
            {answer: "A sure gain of $500", score: 1},
            {answer: "A 50% chance to gain $1000 and a 50% chance to gain nothing", score: 3}
          ]},
          {no: 17, text: "In addition to whatever you own, you have been given $2000. You are now asked to choose between:", answers: [
            {answer: "A sure loss of $500", score: 1},
            {answer: "A 50% chance to lose $1,000 and a 50% chance to lose nothing", score: 3}
          ]},
          {no: 19, text: "If you had to invest $20,000, which of the following investment choices would you find most appealing?", answers: [
            {answer: "60% in low-risk investments 30% in medium-risk investments 10% in high-risk investments", score: 1},
            {answer: "30% in low-risk investments 40% in medium-risk investments 30% in high-risk investments", score: 2},
            {answer: "10% in low-risk investments 40% in medium-risk investments 50% in high-risk investments", score: 3}
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
        name: 'Inge Florist',
        avatar: 'svg-3',
        content: 'I send flowers to borrowers that pay off their debts.'
      },
      {
        name: 'Lawrence Billman',
        avatar: 'svg-4',
        content: "I'm responsible for billing in the bank.",
        fees: [{amount: 200, borrower: "Marry Borrows", lender: "John Lender"}]
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
