(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipTypeController', LocationRelationshipTypeController);

    LocationRelationshipTypeController.$inject = ['LocationRelationshipType'];

    function LocationRelationshipTypeController(LocationRelationshipType) {

        var vm = this;

        vm.locationRelationshipTypes = [];

        loadAll();

        function loadAll() {
            LocationRelationshipType.query(function(result) {
                vm.locationRelationshipTypes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
