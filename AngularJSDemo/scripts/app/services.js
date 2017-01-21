﻿(function (gridApp) {
    'use strict';
    //angular
    //    .module("myApp")
    gridApp
        .factory('CRUDService', CRUDService);

    CRUDService.$inject = ['$http'];
    function CRUDService($http) {
        return {
            getAllEmployees: function () {
                return $http({
                    method: 'GET',
                    url: 'http://web-api-group01.azurewebsites.net/api/aw/v1/employees',
                });
            },
            getEmployeeById: function (param) {
                return $http({
                    method: 'GET',
                    url: 'http://web-api-group01.azurewebsites.net/api/aw/v1/employees/' + param.id,
                });
            },

            Delete: function (index) {
                return $http({
                    method: 'DELETE',
                    url: 'http://web-api-group01.azurewebsites.net/api/aw/v1/employees/' + index ,
                });
            },

            Update: function (param) {
                return $http({
                    method: 'PUT',
                    url: 'http://web-api-group01.azurewebsites.net/api/aw/v1/employees',
                    data: {'employee' : param }

                });
            },
            Create: function (param) {
                return $http({
                    method: 'POST',
                    url: 'http://web-api-group01.azurewebsites.net/api/aw/v1/employees',
                    data: { 'employee': param }

                });
            },

        };

        gridApp
            .service('Helper', Helper);
        function Helper() {
            return {
                Merge : function (target, source) {
                    for (var p in source) {
                        try {
                            // Property in destination object set; update its value.
                            if (source[p].constructor == Object) {
                                target[p] = MergeRecursive(target[p], source[p]);

                            } else {
                                target[p] = source[p];
                    }
                    } catch (e) {
                        // Property in destination object not set; create it and set its value.
                        target[p] = source[p];
                    }
                    }
                        return target;
                    }
            }
        }

    }
})(angular.module('myApp'));
