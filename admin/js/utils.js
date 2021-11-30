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
