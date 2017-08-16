'use strict';

describe('Controller Tests', function() {

    describe('LocationRelationshipType Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLocationRelationshipType, MockLocationRelationship;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLocationRelationshipType = jasmine.createSpy('MockLocationRelationshipType');
            MockLocationRelationship = jasmine.createSpy('MockLocationRelationship');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'LocationRelationshipType': MockLocationRelationshipType,
                'LocationRelationship': MockLocationRelationship
            };
            createController = function() {
                $injector.get('$controller')("LocationRelationshipTypeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'location2App:locationRelationshipTypeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
