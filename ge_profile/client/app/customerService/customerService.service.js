'use strict';
const angular = require('angular');

/*@ngInject*/
export function customerServiceService() {
	// AngularJS will instantiate a singleton by calling "new" on this function

   var Customer = {
    add({
      email,
      name
    }, callback) {
      return $http.post('/api/customer', {
        email,
        name
      })
    }
   }
}

export default angular.module('geProfileApp.customerService', [])
  .service('customerService', customerServiceService)
  .name;
