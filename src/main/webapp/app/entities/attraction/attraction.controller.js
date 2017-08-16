(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('AttractionController', AttractionController);

    AttractionController.$inject = ['DataUtils', 'Attraction'];

    function AttractionController(DataUtils, Attraction) {

        var vm = this;

        vm.attractions = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Attraction.query(function(result) {
                vm.attractions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
