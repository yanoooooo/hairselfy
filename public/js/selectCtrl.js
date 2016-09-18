angular.module("hairselfy").controller('selectCtrl', function selectCtrl(common) {
    var vm = this;
    var free_datas = common.free_datas;
    var template_datas = common.template_datas;

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