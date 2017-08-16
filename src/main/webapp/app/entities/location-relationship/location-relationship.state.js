(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('location-relationship', {
            parent: 'entity',
            url: '/location-relationship',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationRelationships'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-relationship/location-relationships.html',
                    controller: 'LocationRelationshipController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('location-relationship-detail', {
            parent: 'location-relationship',
            url: '/location-relationship/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationRelationship'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-relationship/location-relationship-detail.html',
                    controller: 'LocationRelationshipDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LocationRelationship', function($stateParams, LocationRelationship) {
                    return LocationRelationship.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'location-relationship',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('location-relationship-detail.edit', {
            parent: 'location-relationship-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship/location-relationship-dialog.html',
                    controller: 'LocationRelationshipDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationRelationship', function(LocationRelationship) {
                            return LocationRelationship.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-relationship.new', {
            parent: 'location-relationship',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship/location-relationship-dialog.html',
                    controller: 'LocationRelationshipDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('location-relationship', null, { reload: 'location-relationship' });
                }, function() {
                    $state.go('location-relationship');
                });
            }]
        })
        .state('location-relationship.edit', {
            parent: 'location-relationship',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship/location-relationship-dialog.html',
                    controller: 'LocationRelationshipDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationRelationship', function(LocationRelationship) {
                            return LocationRelationship.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-relationship', null, { reload: 'location-relationship' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-relationship.delete', {
            parent: 'location-relationship',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-relationship/location-relationship-delete-dialog.html',
                    controller: 'LocationRelationshipDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LocationRelationship', function(LocationRelationship) {
                            return LocationRelationship.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-relationship', null, { reload: 'location-relationship' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
