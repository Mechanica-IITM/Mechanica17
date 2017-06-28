/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/datas', require('./api/data'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/eventCategorys', require('./api/eventCategory'));
  app.use('/api/houses', require('./api/house'));
  app.use('/api/meaEvents', require('./api/meaEvent'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);


  // Send excel file
  app.route('/excel/*').get((req, res)=>{
    global.appRoot = path.join(path.resolve(__dirname),'..');
    var file = req.url.split('excel/')[1];
    console.log('dfgh', file);
    res.sendFile(path.resolve(appRoot + '/' + file));
  })
  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      global.appRoot = path.join(path.resolve(__dirname),'..');
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
