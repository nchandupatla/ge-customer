import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  
user = {
    name: '',
    email: '',
    phone: '',
    address:'',
    first:'',
    last:''
  };
  errors = {};
  submitted = false;
  awesomeThings = [];
  customers = [];
  newThing = '';

  /*@ngInject*/
constructor($http, $state) {
    this.$state = $state;
    this.$http = $http;
    this.$onInit()
  }

   add(form) {
    this.submitted = true;
    if(form.$valid) {
      console.log('this.form '+this.user)
       this.$http.post('/api/customer',  this.user);
        this.$onInit();
        this.submitted = false;
      this.user={};
    }
    
   }

   update(form, customer) {
    this.submitted = true;
    if(form.$valid) {
      console.log('this.form '+customer._id)
       this.$http.put(`/api/customer/${customer._id}`,  customer);
       this.submitted = false;
       this.useredit={};
    }
   }

  $onInit() {
    this.$http.get('/api/customer')
      .then(response => {
        this.customers = response.data;
        console.log('this.form '+JSON.stringify(this.customers));
        
      });
  }

  
  edit(customer) {
    this.useredit=customer;
  //  this.showadd=false;
    this.showedit=true;
    
  }  
  delete(customer) {
    this.$http.delete(`/api/customer/${customer._id}`);
    var index = this.customers.indexOf(customer);
    this.customers.splice(index, 1);     
  }
}

export default angular.module('geProfileApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'vm'
  })
  .name;
