/*jslint node: true */
/*global angular */
/*global document */

(function () {
    "use strict";

    var mod = angular.module('alerts', []);

    mod.factory('alerts', ['$rootScope', '$compile', function ($rootScope, $compile) {
        return {
            newError: function (msg, err) {
                var scope = $rootScope.$new();
                scope.showError = false;
                scope.msg = msg;

                if (typeof err === 'string') {
                    scope.err = JSON.parse(err);
                } else {
                    scope.err = err;
                }

                var errorTemplate =
                    '<div class="alertBox alert_type_error" role="alert" style="margin-top:10px;">' +
                    '<div style="width: 90%; border-bottom: 1px solid">' +
                    '<span class="alertClose cursor-pointer" data-dismiss="alert" aria-label="Close" ng-click="close()"><span aria-hidden="true">&times;</span></span>' +
                    '<strong> {{ msg }}</strong>' +
                    '<span ng-show="!showError" ng-click="showError=true" style="float: right">Show error detail</span>' +
                    '<pre style="overflow: scroll;max-height: 500px;" ng-show="showError" >{{ err | json }}</pre>' +
                    '</div>' +
                    '<div>Please contact the site administrator to fix the problem. Sorry for inconvenience.</div>' +
                    '</div>';

                var errorAlert = angular.element(errorTemplate);
                $compile(errorAlert)(scope);
                angular.element('#alertsBox').append(errorAlert);

                scope.close = function () {
                    errorAlert.remove();
                };

            }
        }
    }]);

})();


