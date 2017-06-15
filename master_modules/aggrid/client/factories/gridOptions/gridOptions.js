/*jslint node: true */
/*global angular */
/*global document */

(function () {
    "use strict";

    var mod = angular.module('gridOptions',[]);

    mod.factory('gridOptions', ['gettextCatalog', 'clientConfig', function (gettextCatalog, clientConfig) {
        return {
            exportCsv: function(gridOptions){
                var SEP = ';', csvString = '', QUOTE = '"', LINESEP='\r\n', displayColNames = [], fileName = 'Data.csv';
                var displayedColumns = gridOptions.columnApi.getDisplayedColumns();

                for (var index = 0; index < displayedColumns.length; index++) {
                    if(displayedColumns[index].colId!='btnsAction'){
                        csvString += displayedColumns[index].colDef.headerName + SEP;
                        displayColNames.push(displayedColumns[index].colId);
                    }
                }

                csvString += LINESEP;
                var model = gridOptions.api.getModel();
                var vRowCount = model.getVirtualRowCount();

                for (var vRowIndex = 0; vRowIndex < vRowCount; vRowIndex++) {
                    var vRowValue = model.getVirtualRow(vRowIndex);
                    for(var property in displayColNames){
                        var value = vRowValue.data[displayColNames[property]];

                        if(displayColNames[property]=='Resultat' || displayColNames[property]=='result'){
                            if(value && clientConfig.constants && clientConfig.constants.result[value]){
                                value = clientConfig.constants.result[value];
                            }
                        }else if(displayColNames[property]=='Apertura' || displayColNames[property]=='openingType'){
                            if(value && clientConfig.constants && clientConfig.constants.apertura[value]){
                                value = clientConfig.constants.apertura[value];
                            }
                        }else if(displayColNames[property]=='direction' && value){
                            if(value==='E'){
                                value = 'Entrada';
                            }else if(value==='S'){
                                value = 'Salida';
                            }
                        }

                        if(!value || value===null || value ===-1){
                            value = '';
                        }
                        csvString += QUOTE + value + QUOTE + SEP;
                    }
                    csvString += LINESEP;
                }

                if (window.navigator.msSaveOrOpenBlob) {
                    // Internet Explorer
                    var fileData = [csvString];
                    var blobObject = new Blob(fileData);
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);
                } else {
                    // Chrome
                    var url = "data:attachment/csv;charset:utf-8,\uFEFF" + encodeURIComponent(csvString);
                    var downloadLink = document.createElement("a");
                    downloadLink.href = url;
                    downloadLink.download = fileName;
                    downloadLink.click();
                }
            },
            getAll: function (columnDefs, options) {
                var options = options || {};
                return {
                    columnDefs: columnDefs,
                    enableSorting: options.enableSorting === false ? false: true,
                    sortingOrder: ['desc','asc'],
                    groupHeaders: false,
                    showToolPanel: false,
                    rowData: null,
                    enableFilter: options.enableFilter === false ? false: true,

                    // poder seleccionar les files
                    rowSelection: options.rowSelection ? options.rowSelection : 'single',

                    rowDeselection: options.rowDeselection ? options.rowDeselection : false,

                    // per defecte es false per rendiment xo ho necesitem si volem angular a les columnes
                    angularCompileRows: true,
                    rowHeight: 34,

                    // permetre modificar amplada columnes
                    enableColResize: options.enableColResize === false ? false: true,

                    // No mostrar les sumes de valors
                    toolPanelSuppressValues: true,

                    // iconos
                    icons: {
                        menu: '<i class="fa fa-filter"></i>',
                        filter: '<i class="fa fa-filter"></i>',
                        sortAscending: '<i class="fa fa-sort-amount-asc"></i>',
                        sortDescending: '<i class="fa fa-sort-amount-desc"></i>',
                        sortUnSort: '',
                        groupExpanded: '<i class="fa fa-caret-right cursorPointer"></i>',
                        groupContracted: '<i class="fa fa-caret-down cursorPointer"></i>',
                        headerGroupOpened: '',
                        headerGroupClosed: '',
                        columnVisible: '<i class="glyphicon glyphicon-ok"></i>',
                        columnHidden: '<i class="glyphicon glyphicon-remove"></i>',
                        columnRemoveFromGroup: '<i class="glyphicon glyphicon-remove"></i>'
                    },

                    // traducciones
                    localeText: {
                        page: gettextCatalog.getString('Page'),
                        more: gettextCatalog.getString('More'),
                        to: gettextCatalog.getString('to'),
                        of: gettextCatalog.getString('of'),
                        next: gettextCatalog.getString('Next'),
                        last: gettextCatalog.getString('Last'),
                        first: gettextCatalog.getString('First'),
                        previous: gettextCatalog.getString('Previous'),
                        // for set filter
                        selectAll: gettextCatalog.getString('Select all'),
                        searchOoo: gettextCatalog.getString('Search...'),
                        blanks: gettextCatalog.getString('Blanc'),
                        // for number filter
                        equals: gettextCatalog.getString('Equals'),
                        lessThan: gettextCatalog.getString('Less than'),
                        greaterThan: gettextCatalog.getString('Greater than'),
                        filterOoo: gettextCatalog.getString('Filter...'),
                        // for text filter
                        contains: gettextCatalog.getString('Contains'),
                        startsWith: gettextCatalog.getString('Starts with'),
                        endsWith: gettextCatalog.getString('Ends with'),
                        // the header of the default group column
                        group: gettextCatalog.getString('Group'),
                        // tool panel
                        columns: gettextCatalog.getString('Columns'),
                        pivotedColumns: gettextCatalog.getString('Pivot cols'),
                        pivotedColumnsEmptyMessage: gettextCatalog.getString('please drag cols to here'),
                        valueColumns: gettextCatalog.getString('Value cols'),
                        valueColumnsEmptyMessage: gettextCatalog.getString('please drag cols to here')
                    },
                    onReady : function(){
                      // console.log(this)  ;
                    },
                    onAfterFilterChanged: function(){
                        this.totalRows = this.api.getModel().getVirtualRowCount();
                    }
                };
            }
        };
    }]);
})();
