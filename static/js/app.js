// from data.js
var tableData = data;
// table body where data will be displayed
let tbody = d3.select('tbody');
// select  form
let form = d3.selectAll("form");
// create event handler
form.on("submit",runFilter);
form.on("reset",clearFilter);
// render full table 
appendTable(tableData,tbody);

// **************************  Functions
// **************************  appendTable
/** renders table on index.html 
 * by appending rows and cells to table
 * @param {*} appendData  table data
 * @param {*} tbody d3.select for table body to append
 */
function appendTable(appendData,tbody){
    appendData.forEach(record => {
        var row=tbody.append('tr');
            Object.values(record).forEach(value => {
            let cell=row.append('td');
            cell.text(value);
        });
    });
    }
// **************************  clearFilter
/** Event handler associated to form.reset.
 * 
 *  Clear filter and reset table 
 */
function clearFilter(){
    console.log('RESET');
    d3.selectAll('tr').remove();
    appendTable(tableData,tbody);
}


// **************************  runFilter
/** Event handler associated to form.submit.
 * 
 * applies filter to data and renders table 
 */
function runFilter(event) {
    event.preventDefault();
    let filterObject=buildFilter();
    console.log('filterObject',filterObject);
    let filteredData=tableData.filter(record => {
        for (let key in filterObject){
            // partial string comparison - if tableData record value does not include filter value and filter is not Null - returns false , and data is filtered out
            if ((record[key].toString().toLowerCase().includes(filterObject[key].toLowerCase()))==false && filterObject[key]!=null){
                return false;
            }          
        }
        return true;
    });

    console.log('filtered data',filteredData);
    d3.selectAll('tr').remove();
    appendTable(filteredData,tbody);
}
// **************************  buildFilter
/** build filter based on forms entries
 * 
 */
function buildFilter(){
    let formFilter={
        datetime: "",
        city: "",
        state: "",
        country: "",
        shape: "",
        durationMinutes:"",
        comments:""
    }
    console.log(formFilter);
    Object.keys(formFilter).forEach(key => {
        formFilter[key]= d3.select('#'+key).property('value');
    });
    console.log("fullFilter",formFilter);
return formFilter;
}


