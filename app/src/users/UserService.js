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
        name: 'Marry Borrows',
        avatar: 'svg-1',
        content: "I'd like to fulfil my dream and open a bakery."
      },
      {
        name: 'John Lender',
        avatar: 'svg-2',
        content: "I invest in people's happiness."
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
