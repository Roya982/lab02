'use strict';

function Photo (title, imgUrl, description, keyWord, horns){
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.keyWord = keyWord;
    this.horns = horns;
}

Photo.prototype.render = function(){
    let photoSec = $('#photo-div').clone();
    $('main').append(photoSec);
    photoSec.find('h2').text(this.title);
    photoSec.find('img').attr('src',this.imgUrl);
    photoSec.find('p').text(this.description);
    photoSec.removeAttr('id');
}

function getElement(){
    const ajaxSettings ={
        method : 'get',
        dataType : 'json'
    }
    $.ajax('path', ajaxSettings).then(data=>{
        data.forEach(element => {
            let getObject = new Photo(element.title, element.imgUrl, element.description)
            getObject.render();         
        });
    })
}

$('document').ready(getElement);