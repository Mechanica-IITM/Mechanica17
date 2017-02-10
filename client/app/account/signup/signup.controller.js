'use strict';

import angular from 'angular';

export default class SignupController {

  /*@ngInject*/
  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
    this.user = {reqAccom:false};
  }

  register(form) {
    this.errors = {};
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        college: this.user.college,
        rollNumber: this.user.rollNumber,
        reqAccom:this.user.reqAccom
      })
        .then(() => {
          // Account created, redirect to home
          this.$location.path('/');
        })
        .catch(err => {
          err = err.data;
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}
