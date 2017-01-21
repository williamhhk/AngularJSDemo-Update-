(function (gridApp) {
    gridApp.controller("rootController", rootController);
    rootController.$inject = ['$scope', 'CRUDService'];
    function rootController($scope, CRUDService) {
        var gridVm = this;

        gridVm.EmployeeData = {};

        gridVm.gridApi = {};
        gridVm.DisplayGrid = DisplayGrid;

        //  CRUD
        gridVm.Reload = Reload;
        gridVm.Delete = Delete;
        gridVm.Update = Update;
        gridVm.Create = Create;

        //  Others
        gridVm.Export = Export;

        // Error Handling
        gridVm.message = "";


        DisplayGrid();

        function DisplayGrid() {
            gridVm.gridOptions = {
                enableFiltering: false,
                onRegisterApi: function (gridApi) {
                    gridVm.gridApi = gridApi;
                }
            };
            Reload();
        }

        function Reload() {
            CRUDService.getAllEmployees()
                .then(function (result) {
                    gridVm.gridOptions.data = result.data;
                    console.log(gridVm.gridApi);
                }, function (error) {
                });
        }

        function Export() {
            var dataElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
            var type = "all";
            if (gridVm.gridApi.selection.getSelectedRows().length > 0) type = "selected";
            gridVm.gridApi.exporter.csvExport(type, "all", dataElement);
        }

        function Delete() {
            gridVm.gridApi.selection.getSelectedRows().forEach(function (item) {
                CRUDService.Delete(item.BusinessEntityID).then(function success(result) {
                    //gridVm.gridOptions.data.splice(gridVm.gridOptions.data.indexOf(item), 1);
                    //gridVm.gridApi.selection.clearSelectedRows();
                    Reload();
                    gridVm.message = "";
                }, function error(result) {
                    console.log("Error >>" + result);
                    gridVm.message = result.data;
                });
            })
        }

        function Update() {
            var data = angular.copy(gridVm.EmployeeData);
            gridVm.gridApi.selection.getSelectedRows().forEach(function (item) {
                //var index = gridVm.gridOptions.data.indexOf(item);
                //var mergeData = Helper.Merge(data, result.data);
                CRUDService.Update(mergedData)
                    .then(function (result) {
                        //gridVm.gridOptions.data[index] = mergedData;
                        Reload();
                        gridVm.message = "";

                }, function error(result) {
                    console.log("Error >>" + result);
                    gridVm.message = result.data;
                });
            })
        }

        function Create() {
            var data = angular.copy(gridVm.EmployeeData);
            CRUDService.Create(gridVm.EmployeeData).then(function (result) {
                //gridVm.gridOptions.data.push(Helper.Merge(data, result.data));
                Reload();
            }, function (error) {
                console.log("Error >> " + error);
            });
        }

    }
})(angular.module('myApp'));

