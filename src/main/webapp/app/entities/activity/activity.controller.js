(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('ActivityController', ActivityController);

    ActivityController.$inject = ['DataUtils', 'Activity'];

    function ActivityController(DataUtils, Activity) {

        var vm = this;

        vm.activities = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Activity.query(function(result) {
                vm.activities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
