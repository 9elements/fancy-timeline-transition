(function() {

  var cardQueue = {

    _queue: new Array(),

    workIt: function() {
      var context = this;
      setTimeout(function(){
        var card = context._queue.shift();
        if (card){
          // destroy waypoint handler
          $(card).waypoint('destroy');
          // show card
          card.css('visibility', 'visible');
          setTimeout(function(){
            card.removeClass('lifted');
          }, 1);
          context.workIt();
        }
      },200);
    },

    push: function(object) {
      this._queue.push(object);
      if (this._queue.length === 1){
        this.workIt();
      }
    }
  }

  var rand = function rand(limit) {
    return Math.floor(Math.random() * limit) + 1;
  }

  var page = 1;
  var moarCardsPlz = function () {
    $('div.loading-indicator').show();
    $('#main').attr('data-currently-loading', 'yes');
    $.getJSON('http://img.ly/images.json?sort=views&page='+page+'&callback=?', function(data){
      console.log(data);
      for (var index=0; index<data.length; index++){
        var item = data[index];
        var message = item.message ? item.message : '';
        var newCard = $('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><div class="wrapper" style="background-image:url('+item.image+')"></div><div class="avatar"><img src="'+item.user_avatar_url+'"><div class="caption">'+message+'</div></div></div><div class="shadow"></div></div>');
        $('#main').append(newCard);
        newCard.find('img').eq(0).load(loadHandler);
        newCard.waypoint(waypointHandler, waypointOptions);
      }
      page += 1;
      $('div.loading-indicator').hide();
      $('#main').attr('data-currently-loading', 'no');
    });
  }

  var loadHandler = function(){
    var polaroid = $(this).closest('.polaroid');
    polaroid.attr('data-loaded', 'true');
    if (polaroid.data('waypoint-reached')){
      cardQueue.push(polaroid);
    }
  }

  var waypointHandler = function(event,direction){
    var polaroid = $(this).closest('.polaroid');
    polaroid.attr('data-waypoint-reached', 'true');
    if (polaroid.data('loaded')){
      cardQueue.push(polaroid);
    }
  }

  var waypointOptions = {
    offset: '100%'
  }

  $(function(){
    $('div.loading-indicator').hide();
    $('#main').attr('data-currently-loading', 'no');
    $('.reload-waypoint').waypoint(function(event, direction) {
      if (direction === 'down' && $('#main').attr('data-currently-loading') === 'no') {
        moarCardsPlz();
        $('#main .reload-waypoint').appendTo('#main');
        $.waypoints('refresh');
      }
    },
    {
      offset: 'bottom-in-view'
    });

  });


}).call(this);

