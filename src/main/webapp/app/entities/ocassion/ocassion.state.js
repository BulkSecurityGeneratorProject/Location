(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('ocassion', {
            parent: 'entity',
            url: '/ocassion',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Ocassions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ocassion/ocassions.html',
                    controller: 'OcassionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('ocassion-detail', {
            parent: 'ocassion',
            url: '/ocassion/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Ocassion'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ocassion/ocassion-detail.html',
                    controller: 'OcassionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Ocassion', function($stateParams, Ocassion) {
                    return Ocassion.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'ocassion',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('ocassion-detail.edit', {
            parent: 'ocassion-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocassion/ocassion-dialog.html',
                    controller: 'OcassionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Ocassion', function(Ocassion) {
                            return Ocassion.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ocassion.new', {
            parent: 'ocassion',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocassion/ocassion-dialog.html',
                    controller: 'OcassionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                name: null,
                                start: null,
                                end: null,
                                cycle: null,
                                organizationID: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('ocassion', null, { reload: 'ocassion' });
                }, function() {
                    $state.go('ocassion');
                });
            }]
        })
        .state('ocassion.edit', {
            parent: 'ocassion',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocassion/ocassion-dialog.html',
                    controller: 'OcassionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Ocassion', function(Ocassion) {
                            return Ocassion.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ocassion', null, { reload: 'ocassion' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ocassion.delete', {
            parent: 'ocassion',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocassion/ocassion-delete-dialog.html',
                    controller: 'OcassionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Ocassion', function(Ocassion) {
                            return Ocassion.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ocassion', null, { reload: 'ocassion' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
