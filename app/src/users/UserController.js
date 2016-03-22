(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$http', '$q',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $http) {
    var self = this;
//    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
//    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
//    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//    console.log($http.defaults.headers);

    var Web3 = require('web3');
    var web3 = new Web3();

    console.log(web3);

    web3.setProvider(new web3.providers.HttpProvider("http://104.154.21.38:8545"));
    web3.eth.defaultAccount = web3.eth.coinbase;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.makeContact  = makeContact;
    self.borrowerSubmit = borrowerSubmit;

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "cp",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

    function borrowerSubmit() {
        $log.debug('inside borrowerSubmit. selected=' + self.selected.name)


        var _id = 1;
        var _risk = 3;
        var _amount = 10000;
        var _email = 'john.lender@gmail.com';
        var lenderContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"_state_id","type":"uint256"},{"name":"_state_risk","type":"uint8"},{"name":"_state_amount","type":"uint256"},{"name":"_state_email","type":"bytes"}],"type":"function"},{"constant":false,"inputs":[{"name":"borrower","type":"address"},{"name":"_borrow_amount","type":"uint256"}],"name":"createLendingContract","outputs":[],"type":"function"},{"inputs":[{"name":"_id","type":"uint8"},{"name":"_risk","type":"uint8"},{"name":"_amount","type":"uint256"},{"name":"_email","type":"bytes"}],"type":"constructor"}]);
        var lender = lenderContract.new(
          _id,
          _risk,
          _amount,
          _email,
          {
            from: web3.eth.accounts[0],
            data: '6060604052604051610316380380610316833981016040528080519060200190919080519060200190919080519060200190919080518201919060200150505b8360ff1660006000508190555082600160006101000a81548160ff02191690830217905550816002600050819055508060036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100bd57805160ff19168380011785556100ee565b828001600101855582156100ee579182015b828111156100ed5782518260005055916020019190600101906100cf565b5b50905061011991906100fb565b8082111561011557600081815060009055506001016100fb565b5090565b50505b505050506101e88061012e6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631865c57d14610044578063291b505a146100d757610042565b005b61005160048050506100fd565b604051808581526020018460ff168152602001838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156100c65780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b6100f660048080359060200190919080359060200190919050506100f8565b005b5b5050565b600060006000602060405190810160405280600081526020015060006000505493508350600160009054906101000a900460ff16925082506002600050549150815060036000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101d85780601f106101ad576101008083540402835291602001916101d8565b820191906000526020600020905b8154815290600101906020018083116101bb57829003601f168201915b5050505050905080505b9091929356',
            gas: 3000000
          }, function(e, contract){
           console.log(e, contract);
           if (typeof contract.address != 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
           }
        })
    }

  }

})();
