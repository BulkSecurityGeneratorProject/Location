(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationTypeController', LocationTypeController);

    LocationTypeController.$inject = ['DataUtils', 'LocationType'];

    function LocationTypeController(DataUtils, LocationType) {

        var vm = this;

        vm.locationTypes = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            LocationType.query(function(result) {
                vm.locationTypes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
