/*jslint node: true */
/*global angular */
/*global document */

(function () {
    "use strict";

    var mod = angular.module('loading', []);

    mod.factory('loadingService', ['$timeout',function ($timeout) {
        var loadings = {};
        var flagsTimeOut = {};
        var loadingButton = false;
        return {
            isActive: function (zone) {
                if (loadings[zone]) return true;
                else return false;
            },
            enableButton: function(){
                $( ".buttonLoading" ).addClass( "onclic", 250);
                return true;
            },
            disableButton: function(){
                $timeout(function(){
                    $( ".buttonLoading" ).addClass('animated');
                    $( ".buttonLoading" ).addClass('fadeIn');
                    $( ".buttonLoading" ).removeClass( "onclic");
                    $timeout(function() {
                        $(".buttonLoading").removeClass('animated');
                        $(".buttonLoading").removeClass('fadeIn');
                    }, 100);
                }, 500);
                return false;
            },
            enable: function (zone, msg, float) {
                /*
                //flagsTimeOut[zone] = $timeout(function(){
                loadings[zone] = {};
                loadings[zone].msg = msg;
                if(float) loadings[zone].float = true;
                //}, 2000);
                */
            },
            disable: function (zone) {
                /*
                $timeout(function() {
                    $timeout.cancel(flagsTimeOut[zone]);
                    delete flagsTimeOut[zone];
                    delete loadings[zone];
                }, 200);
                */
            },
            getMessage: function (zone) {
                return loadings[zone].msg;
            },
            isFloating: function(zone){
                if(loadings[zone].float) return true;
                else return false;
            }
        };
    }]);

    /*
    mod.directive('loadingDir', ['loadingService', function (loadingService) {
        return {
            restrict: 'E',
            templateUrl: "templates/bookings/loading.html",
            scope: {
                zone: '='
            },
            link: function (scope, element, attrs) {
                scope.image = "/static/img/spin.svg";
                scope.$watch(function () {
                    return loadingService.isActive(attrs.zone);
                }, function (flag) {
                    if (flag) {
                        element.show();
                        if(loadingService.isFloating(attrs.zone)) {
                            element.addClass('loading-container');
                            element.find('#ajax_loader').addClass('loading-content');
                        }
                        scope.message = loadingService.getMessage(attrs.zone);
                    } else {
                        element.removeClass('loading-container');
                        element.find('#ajax_loader').removeClass('loading-content');
                        element.hide();
                    }
                });
            }
        };
    }]);
    */

})();


