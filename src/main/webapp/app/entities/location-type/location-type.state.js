(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('location-type', {
            parent: 'entity',
            url: '/location-type',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationTypes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-type/location-types.html',
                    controller: 'LocationTypeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('location-type-detail', {
            parent: 'location-type',
            url: '/location-type/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationType'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-type/location-type-detail.html',
                    controller: 'LocationTypeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LocationType', function($stateParams, LocationType) {
                    return LocationType.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'location-type',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('location-type-detail.edit', {
            parent: 'location-type-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-type/location-type-dialog.html',
                    controller: 'LocationTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationType', function(LocationType) {
                            return LocationType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-type.new', {
            parent: 'location-type',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-type/location-type-dialog.html',
                    controller: 'LocationTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                name: null,
                                description: null,
                                icon: null,
                                iconContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('location-type', null, { reload: 'location-type' });
                }, function() {
                    $state.go('location-type');
                });
            }]
        })
        .state('location-type.edit', {
            parent: 'location-type',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-type/location-type-dialog.html',
                    controller: 'LocationTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationType', function(LocationType) {
                            return LocationType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-type', null, { reload: 'location-type' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-type.delete', {
            parent: 'location-type',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-type/location-type-delete-dialog.html',
                    controller: 'LocationTypeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LocationType', function(LocationType) {
                            return LocationType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-type', null, { reload: 'location-type' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
