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
                {src:'img/process/braid/braid1.png', text:'髪の毛を右側に寄せます', guide: "Gather", camera: "back"},
                {src:'img/process/braid/braid2.png', text:'寄せた髪を3束にわけます', guide: "Divide", camera: "right"},
                {src:'img/process/braid/braid3.png', text:'髪の毛を編みます', guide:"Braid", camera: "right"},
                {src:'img/process/braid/braid4.png', text:'髪の毛を結びます', guide:"Tie", camera: "right"}
            ],
        },
        'guide': {
            'Twist':{},
            'French':{},
            'Braid':{thickness: 1.0, heigh: 1.0, hardness: 1.0},
            'Gather':{direction:'right'},
            'Divide':{num:3},
            'Tie': {position: 'bottom'}
        },
        'camera': {
            'right': {rot:180, src: 'img/guide/face/face_right.png'},
            'back': {rot:100, src: 'img/guide/face/face_back.png'},
            'left': {rot:10, src: 'img/guide/face/face_left.png'},
            'front': {rot:0, src: 'img/guide/face/face_front.png'}
        },
        'img_path': {
            'Gather': {right: 'img/guide/gather/right.png', left: 'img/guide/gather/left.png'},
            'Divide': {hand: 'img/guide/divide/hand.png'},
            'Braid': {hand: ['img/guide/braid/hand1.png', 'img/guide/braid/hand2.png', 'img/guide/braid/hand3.png']},
            'Tie': {hand: 'img/guide/tie/hand.png'},
            'Finish': {src: 'img/guide/finish/finish.png'}
        }
    }
);