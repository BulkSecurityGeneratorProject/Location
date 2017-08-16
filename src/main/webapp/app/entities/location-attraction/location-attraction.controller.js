(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationAttractionController', LocationAttractionController);

    LocationAttractionController.$inject = ['LocationAttraction'];

    function LocationAttractionController(LocationAttraction) {

        var vm = this;

        vm.locationAttractions = [];

        loadAll();

        function loadAll() {
            LocationAttraction.query(function(result) {
                vm.locationAttractions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
