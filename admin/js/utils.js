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
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  }

  table = model.getAll();
  if (table.length == 0) return 1;
  else {
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
  HandleEvent.SlideTdTable();
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

  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName('TR');
    let length = rows.length - 1;
    if (tableName == 'revenue') length = rows.length - 2;
    for (i = 1; i < length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];

      let contentX = x.innerHTML,
        contentY = y.innerHTML;
      if (!isNaN(contentX) || contentX.includes('$')) {
        contentX = +contentX.replace(/[^0-9]/g, '');
        contentY = +contentY.replace(/[^0-9]/g, '');
      } else {
        contentX = x.innerHTML.toLowerCase();
        contentY = y.innerHTML.toLowerCase();
      }
      if (dir == 'asc') {
        if (contentX > contentY) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (contentX < contentY) {
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
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
function sortTableByCategoryProduct(n) {
  HandleEvent.SlideTdTable();
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
  // Đổi thứ tự
  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName('TR');
    // Lặp từng cặp dòng i và i + 1
    for (i = 1; i < rows.length - 1; i++) {
      // để giá trị switch là false để đánh dấu
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      // lấy nội dung 2 dòng để kiểm tra
      let contentX = x.querySelector('select').value,
        contentY = y.querySelector('select').value;
      if (dir == 'asc') {
        if (contentX > contentY) {
          // đánh dấu để đổi dòng
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (contentX < contentY) {
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
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
