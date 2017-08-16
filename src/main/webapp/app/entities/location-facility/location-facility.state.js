(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('location-facility', {
            parent: 'entity',
            url: '/location-facility',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationFacilities'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-facility/location-facilities.html',
                    controller: 'LocationFacilityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('location-facility-detail', {
            parent: 'location-facility',
            url: '/location-facility/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationFacility'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-facility/location-facility-detail.html',
                    controller: 'LocationFacilityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LocationFacility', function($stateParams, LocationFacility) {
                    return LocationFacility.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'location-facility',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('location-facility-detail.edit', {
            parent: 'location-facility-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-facility/location-facility-dialog.html',
                    controller: 'LocationFacilityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationFacility', function(LocationFacility) {
                            return LocationFacility.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-facility.new', {
            parent: 'location-facility',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-facility/location-facility-dialog.html',
                    controller: 'LocationFacilityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                descriprion: null,
                                icon: null,
                                iconContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('location-facility', null, { reload: 'location-facility' });
                }, function() {
                    $state.go('location-facility');
                });
            }]
        })
        .state('location-facility.edit', {
            parent: 'location-facility',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-facility/location-facility-dialog.html',
                    controller: 'LocationFacilityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationFacility', function(LocationFacility) {
                            return LocationFacility.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-facility', null, { reload: 'location-facility' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-facility.delete', {
            parent: 'location-facility',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-facility/location-facility-delete-dialog.html',
                    controller: 'LocationFacilityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LocationFacility', function(LocationFacility) {
                            return LocationFacility.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-facility', null, { reload: 'location-facility' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
