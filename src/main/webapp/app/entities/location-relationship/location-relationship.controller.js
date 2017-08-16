(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipController', LocationRelationshipController);

    LocationRelationshipController.$inject = ['LocationRelationship'];

    function LocationRelationshipController(LocationRelationship) {

        var vm = this;

        vm.locationRelationships = [];

        loadAll();

        function loadAll() {
            LocationRelationship.query(function(result) {
                vm.locationRelationships = result;
                vm.searchQuery = null;
            });
        }
    }
})();
