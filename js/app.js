'use strict';
let keywords = [];
let keywords2=[];
let itemArr= [];
let pg2Arr=[];
$.get('./data/page-1.json').then(data => {
  data.forEach(value => {
    new Item(value);
  });
  renderList();
  itemArr.forEach(item=>{
    let newWork= item.toHtml();
    $('#results').append(newWork);
  })
});
$.get('./data/page-2.json').then(data => {
  data.forEach(value =>{
    new Item2(value);
  });
});
function Item(value) {
  this.image_url = value.image_url;
  this.description = value.description;
  this.title = value.title;
  this.keyword = value.keyword;
  this.horns = value.horns;
  itemArr.push(this);
}
Item.prototype.toHtml = function() {
  let section = $('#templates').html();
  let template = Mustache.render(section,this);
  return template;
};
$('.btn1').on('click', function(){
  $('.slct').empty();
  renderList();
  $('#results2').empty();
  itemArr.forEach(value => {
    $('#results').append(value.toHtml());
  })
});
function renderList() {
  itemArr.forEach((value)=>{
    let key = value.keyword;
    if (!keywords.includes(key)){
      keywords.push(key);
    }
  });
  let section = $('#templates2').html();
  let template = Mustache.render(section,{keyword:'Filter By Keyword' , name:'default'});
  $('.slct').append(template);
  keywords.forEach(value =>{

    let section = $('#templates2').html();
    let template = Mustache.render(section,{keyword:value , name:value});
    $('.slct').append(template);
  })
}
function Item2(value) {
  this.image_url = value.image_url;
  this.description = value.description;
  this.title = value.title;
  this.keyword = value.keyword;
  this.horns = value.horns;
  pg2Arr.push(this);
}
Item2.prototype.toHtml2 = function() {
  let section = $('#templates').html();
  let template = Mustache.render(section,this);
  return template;
};
$('.btn2').on('click', function(){
  $('.slct').empty();
  renderList2();
  $('#results').empty();
  pg2Arr.forEach(value => {
    $('#results2').append(value.toHtml2());
  })
});
function renderList2() {
  console.log(pg2Arr);
  pg2Arr.forEach((value)=>{
    let key = value.keyword;
    if (!keywords2.includes(key)){
      keywords2.push(key);
      console.log('hello');
    }
  });
  let section = $('#templates2').html();
  let template = Mustache.render(section,{keyword:'Filter By Keyword' , name:'default'});
  $('.slct').append(template);

  keywords2.forEach(value=>{
    console.log(value)
    let section = $('#templates2').html();
    let template = Mustache.render(section,{keyword:value , name:value});
    $('.slct').append(template);
  })
}
$('.slct').change(function() {
  $('.slct option:selected').each(function() {
    if (this.value === 'default') {
      $('section').show();
    } else {
      $('.photo-template').hide();
      $(`section.${this.value}`).show();
    }
  });
});
let hornArray = [];
$('.sortSel').change(function(){
  $('.sortSel option:selected').each(function() {
    if(this.value === 'default'){
      $('section').show();
    }
    else if (this.value === 'horns'){
      $('.photo-template').hide();
      itemArr.forEach((value) => {
        hornArray.push(value.horns);
        $('#results').attr('class',value.horns);
      })
      itemArr.sort(function(a,b){
        return a.title>b.title;

      })
      console.log(itemArr.title);
      $(`section.${this.value}`).show();
    }
  });
})


// function sorting(){
//   itemArr.forEach((value) =>{
//     hornArray.push(value.horns);
//     console.log(hornArray);
//   });
//   hornArray.sort(function(a,b){
//     return a>b;
//   })
// }

// sorting();

console.log(hornArray);














