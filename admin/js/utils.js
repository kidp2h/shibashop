// Shorthand Selector

function isExistRecord(tableName, name) {
  if (tableName == 'categories') {
    let table = CategoryModel.getAll();
    let result = table.filter((record) => record.name == name);
    return result.length == 0 ? false : true;
  } else if (tableName == 'users') {
    let table = UserModel.getAll();
    let result = table.filter((record) => record.username == name);
    return result.length == 0 ? false : true;
  } else {
    let table = ProductModel.getAll();
    let result = table.filter((record) => record.name == name);
    return result.length == 0 ? false : true;
  }
}
function isExist(model, document) {
  let collection = model.getAll();
  let result = collection.filter((item) => item == document);
  return result.length == 0 ? false : true;
}

function getNextId(model) {
  function compare(a, b) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }
  table = model.getAll();
  if (table.length == 0) {
    return 1;
  } else {
    table.sort(compare);
    return Number(table[0].id) + 1;
  }
}

function formatNumber(n, currency = '$') {
  return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function getCurrentSortTable(table) {
  let current = $(`.tmanager-${table} table input:checked`) || '';
  return current?.parentNode?.classList[1].split('sort')[1].toLowerCase();
}
function sortObjectByField(field, data, type = 'asc') {
  return type == 'asc'
    ? data.sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0))
    : data.sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0)).reverse();
}

function sortTable(n, tableName) {
  let table = $(`.tmanager-${tableName} table`);
  var rows,
    i,
    switching,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  //Set the sorting direction to ascending:
  dir = 'asc';
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('TR');
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    let length = rows.length - 1;
    if (tableName == 'revenue') length = rows.length - 2;
    for (i = 1; i < length; i++) {
      //Change i=0 if you have the header th a separate table.
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      let contentX = x.innerHTML,
        contentY = y.innerHTML;
      if (!isNaN(contentX) || contentX.includes('$')) {
        contentX = +contentX.replace(/[^0-9]/g, '');
        contentY = +contentY.replace(/[^0-9]/g, '');
      } else {
        contentX = x.innerHTML.toLowerCase();
        contentY = y.innerHTML.toLowerCase();
      }
      console.log(contentX, contentY);
      if (dir == 'asc') {
        if (contentX > contentY) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (contentX < contentY) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
function sortTableByCategoryProduct(n) {
  table = $(`.tmanager-product table`);
  var rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  //Set the sorting direction to ascending:
  dir = 'asc';
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('TR');
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //Change i=0 if you have the header th a separate table.
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      let contentX = x.querySelector('select').value,
        contentY = y.querySelector('select').value;
      if (dir == 'asc') {
        if (contentX > contentY) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (contentX < contentY) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
