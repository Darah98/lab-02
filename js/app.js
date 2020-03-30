'use strict'
let keywords= {};
function Item(value){
  this.image_url = value.image_url;
  this.description=value.description;
  this.title= value.title;
  this.keyword= value.keyword;
  this.horns= value.horns;
  keywords[value.keyword]=value.keyword;
}
Item.prototype.render = function(){
  let section = $('.photo-template').clone();
  section.removeClass('photo-template');
  section.find('h2').text(this.title);
  section.find('img').attr('src', this.image_url)
  section.find('p').text(this.description);
  section.attr('class',this.keyword);
  $('main').append(section);
}
function renderList(){
  for (let key in keywords){
    let selection = $('.slct').clone();
    selection.removeClass('slct');
    selection.text(key);
    selection.attr('value', key);
    $('select').append(selection);
  }
}
$.get('./data/page-1.json')
  .then(data => {
    data.forEach((value) => {
      let item = new Item(value);
      item.render();

    });
    renderList();
  });
$('.options').change(function(){
  $('.options option:selected').each(function(){
    console.log(this);
    if (this.value==='default'){
      $('section').show(); }
    else{
      $('section').hide();
      $(`.${this.value}`).show();
    }
  });
});
