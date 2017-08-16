(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('location-activity', {
            parent: 'entity',
            url: '/location-activity',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationActivities'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-activity/location-activities.html',
                    controller: 'LocationActivityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('location-activity-detail', {
            parent: 'location-activity',
            url: '/location-activity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LocationActivity'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location-activity/location-activity-detail.html',
                    controller: 'LocationActivityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LocationActivity', function($stateParams, LocationActivity) {
                    return LocationActivity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'location-activity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('location-activity-detail.edit', {
            parent: 'location-activity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-activity/location-activity-dialog.html',
                    controller: 'LocationActivityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationActivity', function(LocationActivity) {
                            return LocationActivity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-activity.new', {
            parent: 'location-activity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-activity/location-activity-dialog.html',
                    controller: 'LocationActivityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uuid: null,
                                description: null,
                                brief: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('location-activity', null, { reload: 'location-activity' });
                }, function() {
                    $state.go('location-activity');
                });
            }]
        })
        .state('location-activity.edit', {
            parent: 'location-activity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-activity/location-activity-dialog.html',
                    controller: 'LocationActivityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LocationActivity', function(LocationActivity) {
                            return LocationActivity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-activity', null, { reload: 'location-activity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('location-activity.delete', {
            parent: 'location-activity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location-activity/location-activity-delete-dialog.html',
                    controller: 'LocationActivityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LocationActivity', function(LocationActivity) {
                            return LocationActivity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('location-activity', null, { reload: 'location-activity' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
