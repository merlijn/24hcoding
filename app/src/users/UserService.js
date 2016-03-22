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
            {answer: "A real risk avoider", score: 1},
            {answer: "Willing to take risks after completing adequate research", score: 2},
            {answer: "Cautious", score: 3},
            {answer: "A real gambler", score: 4}
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
          {no: 4, text: "If you unexpectedly receive $20.000 to invest, what would you do?", answers: [
            {answer: "", score: 1},
            {answer: "", score: 2},
            {answer: "", score: 3}
          ]},
          {no: 5, text: "?", answers: [
            {answer: "", score: 1},
            {answer: "", score: 2},
            {answer: "", score: 3},
            {answer: "", score: 4}
          ]},
          {no: 1, text: "?", answers: [
            {answer: "", score: 1},
            {answer: "", score: 2},
            {answer: "", score: 3},
            {answer: "", score: 4}
          ]},
          {no: 1, text: "?", answers: [
            {answer: "", score: 1},
            {answer: "", score: 2},
            {answer: "", score: 3},
            {answer: "", score: 4}
          ]},
          {no: 1, text: "?", answers: [
            {answer: "", score: 1},
            {answer: "", score: 2},
            {answer: "", score: 3},
            {answer: "", score: 4}
          ]}
        ]
      },
      {
        name: 'Marry Borrows',
        avatar: 'svg-1',
        content: "I'd like to renovate my kids' room and make them happy.",
        email: "marry@borrows.com",
        credit_score: 5
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
