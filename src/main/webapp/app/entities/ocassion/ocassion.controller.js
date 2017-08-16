(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('OcassionController', OcassionController);

    OcassionController.$inject = ['Ocassion'];

    function OcassionController(Ocassion) {

        var vm = this;

        vm.ocassions = [];

        loadAll();

        function loadAll() {
            Ocassion.query(function(result) {
                vm.ocassions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
