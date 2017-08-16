(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('facility', {
            parent: 'entity',
            url: '/facility',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Facilities'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/facility/facilities.html',
                    controller: 'FacilityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('facility-detail', {
            parent: 'facility',
            url: '/facility/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Facility'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/facility/facility-detail.html',
                    controller: 'FacilityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Facility', function($stateParams, Facility) {
                    return Facility.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'facility',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('facility-detail.edit', {
            parent: 'facility-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/facility/facility-dialog.html',
                    controller: 'FacilityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Facility', function(Facility) {
                            return Facility.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('facility.new', {
            parent: 'facility',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/facility/facility-dialog.html',
                    controller: 'FacilityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                name: null,
                                description: null,
                                order: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('facility', null, { reload: 'facility' });
                }, function() {
                    $state.go('facility');
                });
            }]
        })
        .state('facility.edit', {
            parent: 'facility',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/facility/facility-dialog.html',
                    controller: 'FacilityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Facility', function(Facility) {
                            return Facility.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('facility', null, { reload: 'facility' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('facility.delete', {
            parent: 'facility',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/facility/facility-delete-dialog.html',
                    controller: 'FacilityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Facility', function(Facility) {
                            return Facility.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('facility', null, { reload: 'facility' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
