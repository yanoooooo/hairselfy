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
            'Twist':[
                {src:'img/process/twist/twist1.png', text:'サイドの髪を取ります', guide: 'Divide', camera:'back', parameter:{}},
                {src:'img/process/twist/twist2.png', text:'両サイドの髪をねじります', guide: 'Twist', camera:'back', parameter:{}},
                {src:'img/process/twist/twist3.png', text:'後ろでまとめて結びます', guide: 'Tie', camera:'back', parameter:{}},
                //{src:'img/process/twist/twist4.png', text:'結び終わりました', guide: 'Pause', camera:'back', parameter:{}},
                {src:'img/process/twist/twist5.png', text:'毛束を上から通して、くるりんぱします', guide: 'Turn', camera:'back', parameter:{}},
                //{src:'img/process/twist/twist6.png', text:'くるりんぱしました', guide: 'Pause', camera:'back', parameter:{}}
            ],
            'French':[],
            'Braid':[
                {src:'img/process/braid/braid1.png', text:'髪の毛を右側に寄せます', guide: "Gather", camera: "back", parameter:{}},
                {src:'img/process/braid/braid2.png', text:'寄せた髪を3束にわけます', guide: "Divide", camera: "right", parameter:{}},
                {src:'img/process/braid/braid3.png', text:'髪の毛を編みます', guide:"Braid", camera: "right", parameter:{}},
                {src:'img/process/braid/braid4.png', text:'髪の毛を結びます', guide:"Tie", camera: "right", parameter:{}}
            ],
        },
        'braid_guide': {
            'Twist':{},
            'French':{},
            'Braid':{thickness: 1.0, heigh: 1.0, hardness: 1.0},
            'Gather':{direction:'right'},
            'Divide':{num:3, center:250, dist:0, thickness: 1.0},
            'Tie': {position: 'bottom', num:1}
        },
        'twist_guide': {
            'Twist':{num:2, center:85, dist:230, thickness:0.7},
            'French':{},
            'Braid':{thickness: 1.0, heigh: 1.0, hardness: 1.0},
            'Gather':{direction:'right'},
            'Divide':{num:2, center:85, dist:230, thickness: 0.7},
            'Tie': {position: 'above', num: 2},
            'Turn': {}
        },
        'camera': {
            'right': {rot:0, src: 'img/guide/face/face_right.png'},
            'back': {rot:80, src: 'img/guide/face/face_back.png'},
            'left': {rot:150, src: 'img/guide/face/face_left.png'},
            'front': {rot:0, src: 'img/guide/face/face_front.png'}
        },
        'img_path': {
            'Turn': {hand: 'img/guide/turn/hand.png', arrow:'img/guide/turn/arrow.png'},
            'Twist': {hand: 'img/guide/twist/hand2.png', arrow:'img/guide/twist/twist_arrow2.png'},
            'Gather': {right: 'img/guide/gather/right.png', left: 'img/guide/gather/left.png'},
            'Divide': {hand_many: 'img/guide/divide/hand_many.png', hand_less: 'img/guide/divide/hand_less.png'},
            'Braid': {hand: ['img/guide/braid/hand1.png', 'img/guide/braid/hand2.png', 'img/guide/braid/hand3.png']},
            'Tie': {hand: 'img/guide/tie/hand.png'},
            'Finish': {src: 'img/guide/finish/finish.png'}
        }
    }
);