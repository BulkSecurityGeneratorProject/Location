'use strict';

describe('Controller Tests', function() {

    describe('LocationAttraction Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLocationAttraction, MockLocation, MockAttraction;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLocationAttraction = jasmine.createSpy('MockLocationAttraction');
            MockLocation = jasmine.createSpy('MockLocation');
            MockAttraction = jasmine.createSpy('MockAttraction');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'LocationAttraction': MockLocationAttraction,
                'Location': MockLocation,
                'Attraction': MockAttraction
            };
            createController = function() {
                $injector.get('$controller')("LocationAttractionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'location2App:locationAttractionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
