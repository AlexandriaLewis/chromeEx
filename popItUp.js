$(document).ready(function(){
  chromeExt.init();
});

var templates = {
  titleObj: [
    '<div class="title tObj"><h4>Title:</h4><p> <%= Title %> </p></div>',
    '<div class="year tObj"><h4>Year:</h4><p> <%= Year %> </p></div>',
    '<div class="rating tObj"><h4>Rated:</h4><p> <%= Rated %> </p></div>',
    '<div class="released tObj"><h4>Released:</h4><p> <%= Released %> </p></div>',
    '<div class="runtime tObj"><h4>Runtime:</h4><p> <%= Runtime %> </p></div>',
    '<div class="genre tObj"><h4>Genre:</h4><p> <%= Genre %> </p></div>',
    '<div class="plot tObj"><h4>Plot:</h4><p> <%= Plot %> </p></div>',
    '<div class="country tObj"><h4>Country:</h4><p> <%= Country %> </p></div>',
    '<div class="awards tObj"><h4>Awards:</h4><p> <%= Awards %> </p></div>',
    '<div class="imdbRating tObj"><h4>imdb Rating:</h4><p> <%= imdbRating %> </p></div>'
  ].join(''),
  searchObj: [
    '<div class="sObj">',
    '<div class="bitty"><h4>Title:</h4><p> <%= Title %> </p></div>',
    '<div class="bitty"><h4>Year:</h4><p> <%= Year %> </p></div>',
    '<div class="bitty"><h4>imbd ID:</h4>',
    '<a class="id" href="#"><p> <%= imdbID %> </p></a></div>',
    '</div>'
  ].join('')
}


var chromeExt = {
  url: "http://www.omdbapi.com/?",
  search: "s=",
  title: "t=",
  id: "i=",

  init: function(){
    // chromeExt.styling();
    // console.log("Init is working");
    chromeExt.events();
  },

  // styling: function(),

  events: function(){
    // console.log("Events is working");

    $('form').on('submit', function(event){
      event.preventDefault();
      // console.log("Submitted Fired");
      var keyword = $('input[name="search"]').val();
      // console.log(keyword);
      $('input[name="search"]').val('');
      chromeExt.getSearchResults(keyword);
    });

    $('a.id').on('click', function(event){ //http://www.omdbapi.com/?i=<%= imdbID %>
      event.preventDefault();
      var $this = $(this);
      console.log("Link Fired");
      console.log($this);
    });
  },

  getSearchResults: function(keyword){
    var newUrl = chromeExt.searchURL(keyword);
    // console.log(newUrl);
    chromeExt.getData(newUrl);
  },

  searchURL: function(keyword){
    return chromeExt.url + chromeExt.search + keyword;
  },

  titleURL: function(keyword){
    return chromeExt.url + chromeExt.title + keyword;
  },

  getData: function(newUrl){
    $.ajax({
      url: newUrl,
      method: 'GET',
      dataType: 'json',
      success: function (movieData){
        // console.log("response:", movieData);
        chromeExt.addToPage(movieData);
      },
      error: function(err){
        console.log("error", err);
      }
    })
  },

  addToPage: function(data){
    // console.log(data.Search);
    $('div.concat').html('');
    data.Search.forEach(function(movie){
      // console.log("title: " + movie.Title +" year: "+ movie.Year +" imdb ID: "+ movie.imdbID);
      var searchObj = '<div class="sObj">'+
      '<div class="bitty"><h4>Title:</h4><p>'+movie.Title+'</p></div>'+
      '<div class="bitty"><h4>Year:</h4><p>'+movie.Year+'</p></div>'+
      '<div class="bitty"><h4>imbd ID:</h4>'+
      '<a class="id" href="#"><p>'+movie.imdbID+'</p></a></div>'+
      '</div>'
      $('div.concat').append(searchObj);
    })
  }

}
