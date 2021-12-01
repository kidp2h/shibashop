const UserModel = {
  Initialize: function () {
    localStorage.setItem('users', JSON.stringify(USERS));
  },
  UpdateAll: function (data) {
    localStorage.setItem('users', JSON.stringify(data));
  },
  Remove: function (id) {
    let table = this.getAll();
    let result = table.filter((record) => record.id != id);
    this.UpdateAll(result);
    return result;
  },
  Insert: function (document) {
    result = this.getAll();
    result.push(document);
    this.UpdateAll(result);
    return result;
  },
  getAll: function () {
    return JSON.parse(localStorage.getItem('users'));
  },
  updateUser: function (id, user) {
    if (Validate.isLength(user.username, options.user.username)) {
      const collection = this.getAll();
      let found = false;
      user = { id: id, ...user };
      for (const document of collection) {
        if (document.id == id) {
          found = true;
          console.log(user, document);
          if (user.username == document.username && user.isAdmin == document.isAdmin)
            return {
              status: false,
              message: lang.nothingChangeDocument,
            };
          else {
            // modify but modify another not username
            if (user.username != document.username) {
              if (!isExistRecord('users', user.username)) {
                document.isAdmin = user.isAdmin;
                document.username = user.username;
                this.UpdateAll(collection);
                return {
                  status: true,
                  message: lang.updateSuccess,
                };
              } else {
                return {
                  status: false,
                  message: lang.existDocument,
                };
              }
            } else {
              document.isAdmin = user.isAdmin;
              document.username = user.username;
              this.UpdateAll(collection);
              return {
                status: true,
                message: lang.updateSuccess,
              };
            }
          }
        }
      }
      if (found == false) {
        if (isExistRecord('users', user.username))
          return { status: false, message: lang.existDocument };
        this.Insert({ id: id, ...user });
        return { status: true, message: lang.createSuccess };
      }
    } else return { status: true, message: lang.usernameNotValid };
  },
  getTotalPage: function () {
    return (totalPageUser =
      this.getAll().length % LIMIT == 0
        ? this.getAll().length / LIMIT
        : this.getAll().length / LIMIT + 1);
  },
  getDocumentsByPage: function (page) {
    return sortObjectByField(
      'username',
      this.getAll().slice((page - 1) * LIMIT, page * LIMIT),
      'asc'
    );
  },

  isExistUser(value) {
    let isExist = false;
    this.getAll().forEach((user) => {
      if (user.username == value) isExist = true;
    });
    return isExist;
  },

  setUserCurrent({ ...user }) {
    localStorage.setItem('userCurrent', JSON.stringify(user));
    localStorage.setItem('username', JSON.stringify(user.username));
  },

  changePass({ username, password, ...userCurrentTemp }, newPassword) {
    const users = this.getAll();
    users.forEach((user) => {
      if (user.username == username) {
        user.password = newPassword;
        password = newPassword;
      }
    });

    userCurrent = { username, password, ...userCurrentTemp };

    this.setUserCurrent({ username, password, ...userCurrentTemp });
    this.UpdateAll(users);
  },

  chaneInfo(infoNew, { username, ...userCurrentTemp }) {
    const users = this.getAll();
    users.forEach((user) => {
      if (user.username == username) {
        user.fullname = infoNew.fullname;
        user.address = infoNew.address;
        user.phone = infoNew.phone;

        userCurrentTemp.fullname = infoNew.fullname;
        userCurrentTemp.address = infoNew.address;
        userCurrentTemp.phone = infoNew.phone;
      }
    });

    userCurrent = { username, ...userCurrentTemp };

    this.setUserCurrent({ username, ...userCurrentTemp });
    this.UpdateAll(users);
  },

  updateWishList(userCurrent, productID, wish) {
    const users = this.getAll();
    if (wish) {
      userCurrent.wishList.push(productID);
      users.forEach((user) => {
        if (user.id == userCurrent.id) {
          user.wishList.push(productID);
        }
      });
    } else {
      let index = 0;
      users.forEach((user) => {
        if (user.id == userCurrent.id) {
          index = user.wishList.indexOf(productID);
          user.wishList.splice(index, 1);
          userCurrent.wishList.splice(index, 1);
        }
      });
    }

    this.UpdateAll(users);
    this.setUserCurrent(userCurrent);
  },

  getIdMax() {
    return Math.max(...this.getAll().map(user => user.id))
  }
};
if (UserModel.getAll() == null) UserModel.Initialize();
