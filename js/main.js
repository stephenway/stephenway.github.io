var github = (function(){
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><p><a href="'+repos[i].html_url+'">'+repos[i].name+'</a>'+escapeHtml(repos[i].description||'')+'</p></li>';
    }
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      $.ajax({
        url: "https://api.github.com/users/stephenway/repos?sort=pushed&callback=?"
        , dataType: 'jsonp'
        , error: function (err) { $('#gh_repos' + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
      var repos = [];
      if (!data || !data.data) { return; }
      for (var i = 0; i < data.data.length; i++) {
        repos.push(data.data[i]);
      }
      repos.splice(8);
      render('#gh_repos', repos);
        }
      });
    }
  };
})();

jQuery(document).ready(function($) {
  'use strict';

  $( "html" ).removeClass( "loading" );

  $('.actionable').click(function() {
    $('body').toggleClass('navigation');
    return false;
  });

  $('.navigable__page--active').click(function(event) {
    event.preventDefault();
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('body').toggleClass('navigation');
    }
  });

  setTimeout(function(){
    $('body').addClass('loaded');
  }, 3000);

  $(window).scroll($.debounce( 50, true, function(){
    $('body').addClass('scrolling');
  }));

  $(window).scroll($.debounce( 50, function(){
    $('body').removeClass('scrolling');
  }));

  var salutations = [{
    h1: "Hello",
    h3: "My name is Stephen Way, I am a web designer and engineer."
  }, {
    h1: "Greetings",
    h3: "I am Stephen Way, engineer by day & designer by night."
  }, {
    h1: "Hi",
    h3: "I'm Stephen Way, I love making meaningful experiences on the web."
  }];

  var randomQuote = Math.floor(Math.random() * salutations.length)

  $('.main__headline').text(salutations[randomQuote].h1);
  $('.main__subheadline').text(salutations[randomQuote].h3);

  github.showRepos();

});

