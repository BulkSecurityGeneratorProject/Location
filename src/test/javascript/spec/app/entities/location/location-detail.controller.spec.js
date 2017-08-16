'use strict';

describe('Controller Tests', function() {

    describe('Location Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLocation, MockLocationFacility, MockLocationActivity, MockLocationOcassion, MockLocationAttraction, MockLocationRelationship, MockLabel, MockLocationType, MockCoordinate;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLocation = jasmine.createSpy('MockLocation');
            MockLocationFacility = jasmine.createSpy('MockLocationFacility');
            MockLocationActivity = jasmine.createSpy('MockLocationActivity');
            MockLocationOcassion = jasmine.createSpy('MockLocationOcassion');
            MockLocationAttraction = jasmine.createSpy('MockLocationAttraction');
            MockLocationRelationship = jasmine.createSpy('MockLocationRelationship');
            MockLabel = jasmine.createSpy('MockLabel');
            MockLocationType = jasmine.createSpy('MockLocationType');
            MockCoordinate = jasmine.createSpy('MockCoordinate');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Location': MockLocation,
                'LocationFacility': MockLocationFacility,
                'LocationActivity': MockLocationActivity,
                'LocationOcassion': MockLocationOcassion,
                'LocationAttraction': MockLocationAttraction,
                'LocationRelationship': MockLocationRelationship,
                'Label': MockLabel,
                'LocationType': MockLocationType,
                'Coordinate': MockCoordinate
            };
            createController = function() {
                $injector.get('$controller')("LocationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'location2App:locationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
