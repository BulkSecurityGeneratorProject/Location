(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('location-relationship-type', {
            parent: 'entity',
            url: '/location-relationship-type',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationRelationshipTypes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-relationship-type/location-relationship-types.html',
                    controller: 'LocationRelationshipTypeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('location-relationship-type-detail', {
            parent: 'location-relationship-type',
            url: '/location-relationship-type/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationRelationshipType'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-relationship-type/location-relationship-type-detail.html',
                    controller: 'LocationRelationshipTypeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LocationRelationshipType', function($stateParams, LocationRelationshipType) {
                    return LocationRelationshipType.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'location-relationship-type',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('location-relationship-type-detail.edit', {
            parent: 'location-relationship-type-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship-type/location-relationship-type-dialog.html',
                    controller: 'LocationRelationshipTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationRelationshipType', function(LocationRelationshipType) {
                            return LocationRelationshipType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-relationship-type.new', {
            parent: 'location-relationship-type',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship-type/location-relationship-type-dialog.html',
                    controller: 'LocationRelationshipTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                name: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('location-relationship-type', null, { reload: 'location-relationship-type' });
                }, function() {
                    $state.go('location-relationship-type');
                });
            }]
        })
        .state('location-relationship-type.edit', {
            parent: 'location-relationship-type',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship-type/location-relationship-type-dialog.html',
                    controller: 'LocationRelationshipTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationRelationshipType', function(LocationRelationshipType) {
                            return LocationRelationshipType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-relationship-type', null, { reload: 'location-relationship-type' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-relationship-type.delete', {
            parent: 'location-relationship-type',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship-type/location-relationship-type-delete-dialog.html',
                    controller: 'LocationRelationshipTypeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LocationRelationshipType', function(LocationRelationshipType) {
                            return LocationRelationshipType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-relationship-type', null, { reload: 'location-relationship-type' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
