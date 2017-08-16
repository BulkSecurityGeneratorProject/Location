'use strict';

describe('Controller Tests', function() {

    describe('LabelGroup Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLabelGroup, MockLocationType, MockLabel;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLabelGroup = jasmine.createSpy('MockLabelGroup');
            MockLocationType = jasmine.createSpy('MockLocationType');
            MockLabel = jasmine.createSpy('MockLabel');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'LabelGroup': MockLabelGroup,
                'LocationType': MockLocationType,
                'Label': MockLabel
            };
            createController = function() {
                $injector.get('$controller')("LabelGroupDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'location2App:labelGroupUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
