angular.module("hairselfy").controller('selectCtrl', function selectCtrl($location) {
    var vm = this;
    var free_datas = [
        {name: "first style", src:"img/select/template01.png"},
        {name: "seconde style", src:"img/select/template01.png"},
        {name: "third style", src:"img/select/template01.png"},
        {name: "fourth style", src:"img/select/template01.png"}
    ];
    var template_datas = [
        {name: "Twist", src:"img/select/twist.png"},
        {name: "French", src:"img/select/french.png"},
        {name: "Breid", src:"img/select/breid.png"}
    ];

    vm.init = function(mode) {
        vm.hair_datas = [];
        vm.select_datas = [];
        vm.max_select = 0;
        if(mode == "free") {
            vm.hair_datas = free_datas;
            vm.max_select = 4;
        } else {
            vm.hair_datas = template_datas;
            vm.max_select = 1;
        }
    };

    vm.selected = function(index) {
        //console.log(index);
        if(vm.max_select > vm.select_datas.length) {
            vm.select_datas.push(vm.hair_datas[index]);
        }
    };
});