/*jslint node: true */
/*global angular */
/*global document */

(function () {
    "use strict";

    var mod = angular.module('modalsfunctions', []);

    mod.factory('modalsFunctions', ['$uibModal',function ($uibModal) {
        return {
            modalPaymentMethods: function (listPaymentMethods) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/bookings/payment_methods.html',
                    controller: 'BookingsPaymentMethodsCtrl',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            console.log(listPaymentMethods);
                            return ;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            },
            modalMailTemplate: function (listTemplates) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/docs/docs.html',
                    controller: 'DocsCtrl',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        itemsModal: function () {
                            return {
                                isModal: true
                            };
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            },
            modalForm: function (listForms) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/bookings/forms.html',
                    controller : 'ExpFormsCtrl',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            console.log(listForms);
                            return ;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            },
            modalCondition: function (listConditions) {

            },
            modalCategories: function (listCategories) {

            },
            modalPromotions: function (listPromotions) {

            },
            modalProductGroup: function (listProductsGroup) {

            }
        };
    }]);

})();


