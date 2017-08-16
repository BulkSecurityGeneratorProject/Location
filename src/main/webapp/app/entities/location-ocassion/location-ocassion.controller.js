(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationOcassionController', LocationOcassionController);

    LocationOcassionController.$inject = ['DataUtils', 'LocationOcassion'];

    function LocationOcassionController(DataUtils, LocationOcassion) {

        var vm = this;

        vm.locationOcassions = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            LocationOcassion.query(function(result) {
                vm.locationOcassions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
