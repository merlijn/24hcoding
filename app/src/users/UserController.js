(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$http', '$mdToast',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $http, $mdToast) {
    var self = this;

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
        var borrower = self.selected
        $log.debug('inside borrowerSubmit. borrower=' + borrower.name)


///////////////////////////////////////////////
// Display the Toast message
        var last = {
              bottom: false,
              top: true,
              left: false,
              right: true
            };

        var toastPosition = angular.extend({},last);
        var getToastPosition = function() {
            sanitizePosition();
            return Object.keys(toastPosition)
              .filter(function(pos) { return toastPosition[pos]; })
              .join(' ');
          };
        function sanitizePosition() {
            var current = toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
          }
        var showSimpleToast = function() {
              var pinTo = getToastPosition();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Mary Borrower contract is created! Yay, we have found a lender!... Aggreement is done....')
                  .position(pinTo )
                  .hideDelay(3000)
              );
            };
////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////
// Send to blockchain
        var _email = borrower.email;
        var _credit_score = borrower.credit_score;
        var _amount = borrower.borrow_amount;
        var borrowerContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"_state_email","type":"bytes"},{"name":"_state_credit_score","type":"uint8"},{"name":"_state_amount","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_email","type":"bytes"},{"name":"_credit_score","type":"uint8"},{"name":"_amount","type":"uint256"}],"type":"constructor"}]);
        var borrower = borrowerContract.new(
          _email,
          _credit_score,
          _amount,
          {
            from: web3.eth.accounts[0],
            data: '60606040526040516102ba3803806102ba833981016040528080518201919060200180519060200190919080519060200190919050505b81600160006101000a81548160ff021916908302179055508260006000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009d57805160ff19168380011785556100ce565b828001600101855582156100ce579182015b828111156100cd5782518260005055916020019190600101906100af565b5b5090506100f991906100db565b808211156100f557600081815060009055506001016100db565b5090565b5050806002600050819055505b5050506101a3806101176000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631865c57d1461003957610037565b005b61004660048050506100c5565b60405180806020018460ff1681526020018381526020018281038252858181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156100b55780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b60206040519081016040528060008152602001506000600060006000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101765780601f1061014b57610100808354040283529160200191610176565b820191906000526020600020905b81548152906001019060200180831161015957829003601f168201915b505050505092508250600160009054906101000a900460ff1691508150600260005054905080505b90919256',
            gas: 3000000
          }, function(e, contract){
           console.log(e, contract);
           if (typeof contract.address != 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                showSimpleToast();
//                alert('Borrower is successfully created!');
           }
        })
///////////////////////////////////////////////////////


        // getAllLenders
        // match one lender to borrower
        // create agreement



    }

  }

})();
