(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('location-attraction', {
            parent: 'entity',
            url: '/location-attraction',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationAttractions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-attraction/location-attractions.html',
                    controller: 'LocationAttractionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('location-attraction-detail', {
            parent: 'location-attraction',
            url: '/location-attraction/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationAttraction'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-attraction/location-attraction-detail.html',
                    controller: 'LocationAttractionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LocationAttraction', function($stateParams, LocationAttraction) {
                    return LocationAttraction.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'location-attraction',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('location-attraction-detail.edit', {
            parent: 'location-attraction-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-attraction/location-attraction-dialog.html',
                    controller: 'LocationAttractionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationAttraction', function(LocationAttraction) {
                            return LocationAttraction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-attraction.new', {
            parent: 'location-attraction',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-attraction/location-attraction-dialog.html',
                    controller: 'LocationAttractionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                brief: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('location-attraction', null, { reload: 'location-attraction' });
                }, function() {
                    $state.go('location-attraction');
                });
            }]
        })
        .state('location-attraction.edit', {
            parent: 'location-attraction',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-attraction/location-attraction-dialog.html',
                    controller: 'LocationAttractionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationAttraction', function(LocationAttraction) {
                            return LocationAttraction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-attraction', null, { reload: 'location-attraction' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-attraction.delete', {
            parent: 'location-attraction',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-attraction/location-attraction-delete-dialog.html',
                    controller: 'LocationAttractionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LocationAttraction', function(LocationAttraction) {
                            return LocationAttraction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-attraction', null, { reload: 'location-attraction' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
