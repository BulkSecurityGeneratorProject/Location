(function() {
    'use strict';

    angular
        .module('location2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('label-group', {
            parent: 'entity',
            url: '/label-group',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LabelGroups'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/label-group/label-groups.html',
                    controller: 'LabelGroupController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('label-group-detail', {
            parent: 'label-group',
            url: '/label-group/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LabelGroup'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/label-group/label-group-detail.html',
                    controller: 'LabelGroupDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LabelGroup', function($stateParams, LabelGroup) {
                    return LabelGroup.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'label-group',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('label-group-detail.edit', {
            parent: 'label-group-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label-group/label-group-dialog.html',
                    controller: 'LabelGroupDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LabelGroup', function(LabelGroup) {
                            return LabelGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('label-group.new', {
            parent: 'label-group',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label-group/label-group-dialog.html',
                    controller: 'LabelGroupDialogController',
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
                    $state.go('label-group', null, { reload: 'label-group' });
                }, function() {
                    $state.go('label-group');
                });
            }]
        })
        .state('label-group.edit', {
            parent: 'label-group',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label-group/label-group-dialog.html',
                    controller: 'LabelGroupDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LabelGroup', function(LabelGroup) {
                            return LabelGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('label-group', null, { reload: 'label-group' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('label-group.delete', {
            parent: 'label-group',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/label-group/label-group-delete-dialog.html',
                    controller: 'LabelGroupDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LabelGroup', function(LabelGroup) {
                            return LabelGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('label-group', null, { reload: 'label-group' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
