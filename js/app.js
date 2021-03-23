'use strict';

$('document').ready(getElement);

$('#selector').on('change', showPic);

const hornNum =[];
const dropDownList = [];

function Photo (title, image_url, description, keyword, horns){
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  hornNum.push(this);
  // console.log(hornNum);
  if (!dropDownList.includes(this.keyword)) {
    dropDownList.push(this.keyword);
    // console.log(dropDownList);
  }
}


Photo.prototype.render = function(){
  let photoSec = $('#photo-div').clone();
  $('main').append(photoSec);
  photoSec.find('h2').text(this.title);
  // console.log(this.title);
  photoSec.find('img').attr('src',this.image_url);
  // console.log(this.image_url);
  photoSec.find('img').attr('alt','broken img');
  photoSec.find('p').text(this.description);
  // console.log(this.description);
  photoSec.removeAttr('id');
  photoSec.attr('class', this.keyword);
};

function showPic(){
  $('section').hide();
  const selectKey = $('#selector').val();
  hornNum.forEach((element, index) => {
    if (hornNum[index].keyword === selectKey) {
      $('.' + selectKey).show();
    }
  });
  console.log(selectKey);
}

function getElement(){

  
  const ajaxSettings ={
    method : 'get',
    dataType : 'json'
  };



  $.ajax('../data/page-1.json', ajaxSettings).then(data=>{
    data.forEach(element => {
      let getObject = new Photo(element.title, element.image_url, element.description, element.keyword, element.horns);
      // console.log(getObject);
      getObject.render();  
    });
    changeOption();
  });
}

function changeOption() {
  dropDownList.forEach(element => {
    const newOption = $(`<option>${element}</option>`);
    $('select').append(newOption);
    // console.log(newOption);
  });
}

