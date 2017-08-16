'use strict';

describe('Controller Tests', function() {

    describe('LocationFacility Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLocationFacility, MockLocation, MockFacility;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLocationFacility = jasmine.createSpy('MockLocationFacility');
            MockLocation = jasmine.createSpy('MockLocation');
            MockFacility = jasmine.createSpy('MockFacility');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'LocationFacility': MockLocationFacility,
                'Location': MockLocation,
                'Facility': MockFacility
            };
            createController = function() {
                $injector.get('$controller')("LocationFacilityDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'location2App:locationFacilityUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
