'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './contactUs.routes';

export class ContactUsComponent {

  constructor() {
    this.cores = [
      {
        type:'Secretary',
        profile:[{name:'M Vidyadhar', email:'m.vidyadhar95@gmail.com', phone:'9952044531'},
        {name:'S Chandra vadan', email:'scvchandras@gmail.com', phone:'9884181579'}
      ]},
      {
        type:'Joint Secretary',
        profile:[{name:'Ankit Jain',email:'bhaiji.ankitjain1993@gmail.com',phone:'9043807215'}]
      },
      {
        type:'Events',
        profile:[{name:'K Akhil',email:'akhilkollu96@gmail.com',phone:'9176493264'},
        {name:'M V Suhaas',email:'suhaasmekala@gmail.com',phone:'8220154858'}]
      },
      {
        type:'Student Relations',
        profile:[{name:'Naveen Kanna M',email:'naveenkanna28@gmail.com',phone:'9087295757'},
        {name:'T Sumanth Kalyan',email:'sumanth.kalyan79@gmail.com',phone:'9790465204'}]
      },
      {
        type:'Sponsorship & Public Relations',
        profile:[{name:'Hitesh Malla',email:'hitesh.m95@gmail.com',phone:'9087863969'},
        {name:'Kartheek K',email:'kartheek301096@gmail.com',phone:'9677077500'}]
      },
      {
        type:'Web & Mobile Operations',
        profile:[{name:'K Venkat Teja',email:'teja.kunisetty@gmail.com',phone:'7200317939'}]
      },
      {
        type:'Design & Media',
        profile:[{name:'M Ravi Theja',email:'ravithejamavuri@gmail.com ',phone:'9790464008'}]
      },
      {
        type:'Finance',
        profile:[{name:'B Bhanu Mitra',email:'bhanumitrab@gmail.com',phone:'9087863231'},
        {name:'S Maneesha Devi',email:'rajsridevi598@gmail.com',phone:'9790469606'}]
      },
      {
        type:'Facilities & Requirements',
        profile:[{name:'Cesh J',email:'ceshcool@gmail.com',phone:'9940451199'}]
      },
      {
        type:'QMS',
        profile:[{name:'S Bharath',email:'rocky.bharath1997@gmail.com',phone:'9791336202'}]
      }

    ];
  }
}

export default angular.module('mechanicaApp.contactUs', [ngRoute])
  .config(routes)
  .component('contactUs', {
    template: require('./contactUs.html'),
    controller: ContactUsComponent,
    controllerAs: 'vm'
  })
  .name;
