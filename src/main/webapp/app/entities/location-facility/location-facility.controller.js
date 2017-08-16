(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationFacilityController', LocationFacilityController);

    LocationFacilityController.$inject = ['DataUtils', 'LocationFacility'];

    function LocationFacilityController(DataUtils, LocationFacility) {

        var vm = this;

        vm.locationFacilities = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            LocationFacility.query(function(result) {
                vm.locationFacilities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
