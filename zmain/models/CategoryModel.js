const CategoryModel = {
    Initialize: function () {
        localStorage.setItem('categories', JSON.stringify(CATEGORIES));
    },
    UpdateAll: function (data) {
        localStorage.setItem('categories', JSON.stringify(data));
    },
    Remove: function (id, oldName) {
        let table = this.getAll();
        let result = table.filter((record) => record.id != id);
        ProductModel.updateCategoryProduct(oldName, 'NONE');
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
        return JSON.parse(localStorage.getItem('categories'));
    },
    getCategoryById: function (id) {
        let collection = this.getAll();
        let result = collection.filter((category) => category.id == id);
        return result[0];
    },
    updateNameCategory: function (id, newNameCategory, img, oldNameCategory) {
        if (Validate.isLength(newNameCategory, options.category.name)) {
            const collection = this.getAll();
            let found = false;
            for (const document of collection) {
                if (document.id == id) {
                    found = true;
                    if (
                        document.name == newNameCategory &&
                        document.img == img
                    ) {
                        return {
                            status: false,
                            message: lang.nothingChangeDocument,
                        };
                    } else {
                        if (document.img != img) {
                            document.name = newNameCategory;
                            document.img = img;
                            this.UpdateAll(collection);
                            ProductModel.updateCategoryProduct(
                                oldNameCategory,
                                newNameCategory
                            );
                            return {
                                status: true,
                                message: lang.updateSuccess,
                            };
                        }
                        if (isExistRecord('categories', newNameCategory)) {
                            return {
                                status: false,
                                message: lang.existDocument,
                            };
                        } else {
                            document.name = newNameCategory;
                            document.img = img;
                            this.UpdateAll(collection);
                            ProductModel.updateCategoryProduct(
                                oldNameCategory,
                                newNameCategory
                            );
                            return {
                                status: true,
                                message: lang.updateSuccess,
                            };
                        }
                    }
                }
            }
            if (found == false) {
                if (isExistRecord('categories', newNameCategory))
                    return { status: false, message: lang.existDocument };
                this.Insert({ id: id, name: newNameCategory, img: img });
                return { status: true, message: lang.createSuccess };
            }
        } else return { status: true, message: lang.nameCategoryNotValid };
    },
    getTotalPage: function () {
        return (totalPageUser =
            this.getAll().length % LIMIT == 0
                ? this.getAll().length / LIMIT
                : this.getAll().length / LIMIT + 1);
    },
    getDocumentsByPage: function (page) {
        return this.getAll().slice((page - 1) * LIMIT, page * LIMIT);
    },
    saveImage: function (id, img) {
        let collection = this.getAll();
        collection.forEach((document) => {
            if (document.id == id) {
                document.img = img;
                return;
            }
        });
        this.UpdateAll(collection);
    },
};
if (CategoryModel.getAll() == null) CategoryModel.Initialize();
