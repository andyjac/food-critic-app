'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', 'clearFields', function($scope, clearFields) {

    $scope.restaurant = {
      name: '',
      genres: [],
      price: 0,
      menuItem: '',
      address: {}
    };

    $scope.existingGenres = ['Pizza', 'Food Truck', 'Mexican', 'Thai'];

    $scope.setGenre = function(genre) {
      $scope.genre = genre;
    };

    $scope.addGenre = function(genre) {
      if (genre.trim() !== '') {
        $scope.restaurant.genres.push(genre);
        $scope.genre = '';
      }

      angular.element('#r_genre').focus();
    };

    $scope.removeGenre = function(index) {
      $scope.restaurant.genres.splice(index, 1);
    };

    $scope.setPrice = function(price) {
      $scope.restaurant.price = price;
      var priceNum = price;
      var dollars = '';

      while(priceNum--) {
        dollars += '$';
      }

      $scope.priceDollars = dollars;
    };

    $scope.isNotEmpty = function(obj) {
      return Object.keys(obj).length;
    };

    $scope.submitForm = function() {
      var restaurantInfo = $scope.restaurant;
      console.log(restaurantInfo);
      clearFields(restaurantInfo);
    };

    $scope.populateAddress = function() {
      _.forEach($scope.details.address_components, function(item) {
            if( _.includes(item.types, 'street_number')) {
                $scope.restaurant.address.number = item.short_name;
            }

            if( _.includes(item.types, 'route')) {
                $scope.restaurant.address.street = item.short_name;
            }

            if( _.includes(item.types, 'locality')) {
                $scope.restaurant.address.city = item.short_name;
            }

            if( _.includes(item.types, 'administrative_area_level_1')) {
                $scope.restaurant.address.state = item.short_name;
            }

            if( _.includes(item.types, 'postal_code')) {
                $scope.restaurant.address.zip = item.short_name;
            }
        });
    };

  }]);
};
