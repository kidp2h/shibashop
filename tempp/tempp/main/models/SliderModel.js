const SliderModel = {
    Initialize: function () {
        localStorage.setItem("slider", JSON.stringify(SLIDER));
    },
    update: function (newData) {
        localStorage.setItem("slider", JSON.stringify(newData));
    },
    getAll: function () {
        return JSON.parse(localStorage.getItem("slider"));
    },
};
if(SliderModel.getAll() == null) SliderModel.Initialize();