(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('coordinate', {
            parent: 'entity',
            url: '/coordinate',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Coordinates'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/coordinate/coordinates.html',
                    controller: 'CoordinateController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('coordinate-detail', {
            parent: 'coordinate',
            url: '/coordinate/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Coordinate'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/coordinate/coordinate-detail.html',
                    controller: 'CoordinateDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Coordinate', function($stateParams, Coordinate) {
                    return Coordinate.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'coordinate',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('coordinate-detail.edit', {
            parent: 'coordinate-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/coordinate/coordinate-dialog.html',
                    controller: 'CoordinateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Coordinate', function(Coordinate) {
                            return Coordinate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('coordinate.new', {
            parent: 'coordinate',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/coordinate/coordinate-dialog.html',
                    controller: 'CoordinateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                longitude: null,
                                latitude: null,
                                altitude: null,
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('coordinate', null, { reload: 'coordinate' });
                }, function() {
                    $state.go('coordinate');
                });
            }]
        })
        .state('coordinate.edit', {
            parent: 'coordinate',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/coordinate/coordinate-dialog.html',
                    controller: 'CoordinateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Coordinate', function(Coordinate) {
                            return Coordinate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('coordinate', null, { reload: 'coordinate' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('coordinate.delete', {
            parent: 'coordinate',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/coordinate/coordinate-delete-dialog.html',
                    controller: 'CoordinateDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Coordinate', function(Coordinate) {
                            return Coordinate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('coordinate', null, { reload: 'coordinate' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
