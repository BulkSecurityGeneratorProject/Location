(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('location-ocassion', {
            parent: 'entity',
            url: '/location-ocassion',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationOcassions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-ocassion/location-ocassions.html',
                    controller: 'LocationOcassionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('location-ocassion-detail', {
            parent: 'location-ocassion',
            url: '/location-ocassion/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationOcassion'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-ocassion/location-ocassion-detail.html',
                    controller: 'LocationOcassionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LocationOcassion', function($stateParams, LocationOcassion) {
                    return LocationOcassion.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'location-ocassion',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('location-ocassion-detail.edit', {
            parent: 'location-ocassion-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-ocassion/location-ocassion-dialog.html',
                    controller: 'LocationOcassionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationOcassion', function(LocationOcassion) {
                            return LocationOcassion.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-ocassion.new', {
            parent: 'location-ocassion',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-ocassion/location-ocassion-dialog.html',
                    controller: 'LocationOcassionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                description: null,
                                icon: null,
                                iconContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('location-ocassion', null, { reload: 'location-ocassion' });
                }, function() {
                    $state.go('location-ocassion');
                });
            }]
        })
        .state('location-ocassion.edit', {
            parent: 'location-ocassion',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-ocassion/location-ocassion-dialog.html',
                    controller: 'LocationOcassionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationOcassion', function(LocationOcassion) {
                            return LocationOcassion.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-ocassion', null, { reload: 'location-ocassion' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-ocassion.delete', {
            parent: 'location-ocassion',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-ocassion/location-ocassion-delete-dialog.html',
                    controller: 'LocationOcassionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LocationOcassion', function(LocationOcassion) {
                            return LocationOcassion.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-ocassion', null, { reload: 'location-ocassion' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
