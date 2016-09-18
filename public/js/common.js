angular.module("hairselfy", []).value(
    'common',{
        'free_datas': [
            {name: "first style", src:"img/select/template01.png"},
            {name: "seconde style", src:"img/select/template01.png"},
            {name: "third style", src:"img/select/template01.png"},
            {name: "fourth style", src:"img/select/template01.png"}
        ],
        'template_datas': [
            {name: "Twist", src:"img/select/twist.png"},
            {name: "French", src:"img/select/french.png"},
            {name: "Braid", src:"img/select/braid.png"}
        ],
        'process': {
            'Twist':[],
            'French':[],
            'Braid':[
                {src:'img/process/braid/braid1.png', text:'髪の毛を右側に寄せます', guide: "Braid", camera: "back"},
                {src:'img/process/braid/braid2.png', text:'寄せた髪を3束にわけます', guide: "French", camera: "right"},
                {src:'img/process/braid/braid3.png', text:'髪の毛を編みます', guide:"Braid", camera: "right"}
            ],
        },
        'guide': {
            'Twist':{},
            'French':{},
            'Braid':{thickness: 1.0, heigh: 1.0, hardness: 1.0}
        },
        'camera': {
            'right': {rot:10, src: 'img/guideline/face_right.png'},
            'back': {rot:10, src: 'img/guideline/face_back.png'},
            'left': {rot:10, src: 'img/guideline/face_left.png'},
        }
    }
);