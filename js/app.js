'use strict';

$('document').ready(getElement('./data/page-1.json'));

$('#page2').on('click', function () {

  getElement('./data/page-2.json');
});

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

function getElement(path){

  
  const ajaxSettings ={
    method : 'get',
    dataType : 'json'
  };



  $.ajax(path , ajaxSettings).then(data=>{
    data.forEach(element => {
      let getObject = new Photo(element.title, element.image_url, element.description, element.keyword, element.horns);
      // console.log(getObject);
      getObject.render();  
    });
    changeOption();
  });
}

function sortByTitle(a,b){
  let firstTitle= a.title.replace(/[^a-z]/gi, '');
  let secondTitle = b.title.replace(/[^a-z]/gi, '');
  if (firstTitle.toLowerCase() < secondTitle.toLowerCase()){
    return -1;
  }
  else{
    return 1;
  }
  return 0;
}


function sortByHorns(a, b){
  if(a.horns < b.horns){
    return -1
  }else{
    return 1;
  }
  return 0;
}

function changeOption() {
  dropDownList.forEach(element => {
    const newOption = $(`<option>${element}</option>`);
    $('select').append(newOption);
    // console.log(newOption);
  });
}

let sort = $('input:radio');
