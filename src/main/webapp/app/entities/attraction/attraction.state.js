(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('attraction', {
            parent: 'entity',
            url: '/attraction',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Attractions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/attraction/attractions.html',
                    controller: 'AttractionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('attraction-detail', {
            parent: 'attraction',
            url: '/attraction/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Attraction'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/attraction/attraction-detail.html',
                    controller: 'AttractionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Attraction', function($stateParams, Attraction) {
                    return Attraction.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'attraction',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('attraction-detail.edit', {
            parent: 'attraction-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attraction/attraction-dialog.html',
                    controller: 'AttractionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Attraction', function(Attraction) {
                            return Attraction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('attraction.new', {
            parent: 'attraction',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attraction/attraction-dialog.html',
                    controller: 'AttractionDialogController',
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
                    $state.go('attraction', null, { reload: 'attraction' });
                }, function() {
                    $state.go('attraction');
                });
            }]
        })
        .state('attraction.edit', {
            parent: 'attraction',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attraction/attraction-dialog.html',
                    controller: 'AttractionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Attraction', function(Attraction) {
                            return Attraction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('attraction', null, { reload: 'attraction' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('attraction.delete', {
            parent: 'attraction',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attraction/attraction-delete-dialog.html',
                    controller: 'AttractionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Attraction', function(Attraction) {
                            return Attraction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('attraction', null, { reload: 'attraction' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
