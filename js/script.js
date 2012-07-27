(function() {

  var cardQueue = {

    _queue: new Array(),

    workIt: function() {
      var context = this;
      setTimeout(function(){
        var card = context._queue.shift();
        if (card){
          $(card).waypoint('destroy');
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
    $.getJSON('http://img.ly/beautiful.json?page='+page+'&callback=?', function(data){
      for (var index=0; index<data.length; index++){
        var item = data[index];
        var message = item.message ? item.message : '';
        // since all images are displayed as background image
        // we need to create an temporary image object
        // which triggers the load handler
        var image = new Image;
        var newCard = $('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><div class="inner-shadow"></div><a href="'+item.full_url+'" target="_blank"><div class="wrapper" style="background-image:url('+item.image+')"></div></a><a href="http://img.ly/images/'+item.user.username+'" target="_blank"><div class="avatar" style="background-image:url('+item.user.profile_image+')"></div></a><div class="time-ago">tweeted<br>'+item.time_ago+' ago</div><a class="handle" href="http://img.ly/images/'+item.user.username+'" target="_blank">@'+item.user.username+'</a><div class="caption">'+message+'</div></div><div class="shadow"></div></div>');
        $(image).load(loadHandler);
        $(image).data({card: newCard});
        image.src = item.image;
        $('#main').append(newCard);
        newCard.waypoint(waypointHandler, waypointOptions);
      }
      page += 1;
      $('div.loading-indicator').hide();
      $('#main').attr('data-currently-loading', 'no');
    });
  }

  var loadHandler = function(){
    var polaroid = $(this).data('card');
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
      if (direction === 'down' && $('#main').data('currently-loading') === 'no') {
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

