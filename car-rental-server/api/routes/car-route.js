/**
 * Sticky endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
    const carController = require('../controllers/car-controller');
    // Sticky Routes for search and create.
    app.route('/cars')
        .get(carController.list)
        .post(carController.post);
    
    app.route('/cars/:carId')
        .put(carController.put)
        .get(carController.find);

    
    
        
};        