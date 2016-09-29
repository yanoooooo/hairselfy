//ヘアアレンジの種類を決め、そのパラメータを次のページへと渡す
angular.module("hairselfy").controller('selectCtrl', function selectCtrl(common) {
    var vm = this;
    var free_datas = common.free_datas;
    var template_datas = common.template_datas;
    
    vm.init = function(mode) {
        vm.process_datas = common.process;
        vm.hair_datas = [];
        vm.select_datas = {select:[], process:[]};
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
        if(vm.max_select > vm.select_datas.select.length) {
            if(vm.hair_datas[index].name == "Braid") {
                vm.guide_datas = common.braid_guide;
            } else if(vm.hair_datas[index].name == "Twist") {
                vm.guide_datas = common.twist_guide;
            } else {
                vm.guide_datas = common.french_guide;
            }
            vm.select_datas.select.push(vm.hair_datas[index]);
            vm.select_datas.process.push(vm.process_datas[vm.hair_datas[index].name]);
            for(var i=0; i<vm.select_datas.process.length; i++) {
                for(var j=0; j<vm.select_datas.process[i].length; j++) {
                    vm.select_datas.process[i][j].parameter = vm.guide_datas[vm.select_datas.process[i][j].guide];
                }
            }
        }
        //console.log(vm.select_datas);
    };
});