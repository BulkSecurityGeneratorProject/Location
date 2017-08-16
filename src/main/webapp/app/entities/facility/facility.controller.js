(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('FacilityController', FacilityController);

    FacilityController.$inject = ['Facility'];

    function FacilityController(Facility) {

        var vm = this;

        vm.facilities = [];

        loadAll();

        function loadAll() {
            Facility.query(function(result) {
                vm.facilities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
