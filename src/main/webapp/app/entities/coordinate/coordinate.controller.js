(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('CoordinateController', CoordinateController);

    CoordinateController.$inject = ['Coordinate'];

    function CoordinateController(Coordinate) {

        var vm = this;

        vm.coordinates = [];

        loadAll();

        function loadAll() {
            Coordinate.query(function(result) {
                vm.coordinates = result;
                vm.searchQuery = null;
            });
        }
    }
})();
