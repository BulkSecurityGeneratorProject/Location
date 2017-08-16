'use strict';

describe('Controller Tests', function() {

    describe('LocationOcassion Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLocationOcassion, MockLocation, MockOcassion;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLocationOcassion = jasmine.createSpy('MockLocationOcassion');
            MockLocation = jasmine.createSpy('MockLocation');
            MockOcassion = jasmine.createSpy('MockOcassion');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'LocationOcassion': MockLocationOcassion,
                'Location': MockLocation,
                'Ocassion': MockOcassion
            };
            createController = function() {
                $injector.get('$controller')("LocationOcassionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'location2App:locationOcassionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
