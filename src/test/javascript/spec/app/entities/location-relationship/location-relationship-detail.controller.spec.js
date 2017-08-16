'use strict';

describe('Controller Tests', function() {

    describe('LocationRelationship Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLocationRelationship, MockLocation, MockLocationRelationshipType;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLocationRelationship = jasmine.createSpy('MockLocationRelationship');
            MockLocation = jasmine.createSpy('MockLocation');
            MockLocationRelationshipType = jasmine.createSpy('MockLocationRelationshipType');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'LocationRelationship': MockLocationRelationship,
                'Location': MockLocation,
                'LocationRelationshipType': MockLocationRelationshipType
            };
            createController = function() {
                $injector.get('$controller')("LocationRelationshipDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'location2App:locationRelationshipUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
