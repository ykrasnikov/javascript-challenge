// from data.js
var tableData = data;
var tbody=d3.select('tbody')
data.forEach(record => {
    var row=tbody.append('tr');
        Object.values(record).forEach(value => {
        let cell=row.append('td');
        cell.text(value)
    });
})

// YOUR CODE HERE!
