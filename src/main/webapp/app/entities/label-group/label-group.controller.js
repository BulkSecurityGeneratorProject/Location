(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LabelGroupController', LabelGroupController);

    LabelGroupController.$inject = ['DataUtils', 'LabelGroup'];

    function LabelGroupController(DataUtils, LabelGroup) {

        var vm = this;

        vm.labelGroups = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            LabelGroup.query(function(result) {
                vm.labelGroups = result;
                vm.searchQuery = null;
            });
        }
    }
})();
