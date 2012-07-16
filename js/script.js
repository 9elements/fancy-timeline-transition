(function() {

  window.rand = function rand(limit) {
    return Math.floor(Math.random() * limit) + 1;
  }
  window.addWaypoints = function addWaypoints() {
    $('.lifted .image img').load(function(){
      $(this).closest('.polaroid').show().waypoint(function(event, direction) {
        if (direction === 'down'){
          $(this).removeClass('lifted');
        }
      },
      {
        offset: $(window).height() - 100,
        triggerOnce: true
      });
    });
  }


  jQuery(function($) {
    // hide spinner
    // $('div.loading-more').hide();

    // set current loading status
    $('#main').attr('data-currently-loading', 'no');

    // waypoint function
    $('.reload-waypoint').waypoint(function(event, direction) {
      // endless list
      var list = $('#main');

      // if scroll direction is down and currently not loading
      if (direction === 'down' && list.attr('data-currently-loading') === 'no') {

        // show spinner
        // $('div.loading_more').show();

        // add six more polaroids
        list.append('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><img src="http://www.placekitten.com/g/400/310"><div class="avatar"><img src="http://www.placekitten.com/g/70/70"><div class="caption">This is a nice little kitteh...</div></div></div><div class="shadow"></div></div>');
        list.append('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><img src="http://www.placekitten.com/g/400/310"><div class="avatar"><img src="http://www.placekitten.com/g/70/70"><div class="caption">This is a nice little kitteh...</div></div></div><div class="shadow"></div></div>');
        list.append('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><img src="http://www.placekitten.com/g/400/310"><div class="avatar"><img src="http://www.placekitten.com/g/70/70"><div class="caption">This is a nice little kitteh...</div></div></div><div class="shadow"></div></div>');
        list.append('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><img src="http://www.placekitten.com/g/400/310"><div class="avatar"><img src="http://www.placekitten.com/g/70/70"><div class="caption">This is a nice little kitteh...</div></div></div><div class="shadow"></div></div>');
        list.append('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><img src="http://www.placekitten.com/g/400/310"><div class="avatar"><img src="http://www.placekitten.com/g/70/70"><div class="caption">This is a nice little kitteh...</div></div></div><div class="shadow"></div></div>');
        list.append('<div class="polaroid lifted rot'+rand(5)+'"><div class="image"><img src="http://www.placekitten.com/g/400/310"><div class="avatar"><img src="http://www.placekitten.com/g/70/70"><div class="caption">This is a nice little kitteh...</div></div></div><div class="shadow"></div></div>');

        $('#main .reload-waypoint').appendTo('#main');

        window.addWaypoints();

        // $('.lifted .image img').load(function(){
        //   $(this).closest('polaroid').waypoint(function(event, direction) {
        //     $(this).removeClass('lifted').addClass('reached');
        //     $.waypoints('refresh');
        //   },
        //   {
        //     offset: 'bottom-in-view',
        //     // offset: '100%'
        //     triggerOnce: true
        //   });
        // });

        $.waypoints('refresh');
      }
    },
    {
      offset: 'bottom-in-view'
    });

    window.addWaypoints();
    // // waypoint function
    // $('.lifted').waypoint(function(event, direction) {
    //   console.log('lifted');
    //   console.log(this);
    //   $(this).removeClass('lifted').addClass('reached');
    //   $.waypoints('refresh');
    //   // $(this).waypoint('destroy');
    // },
    // {
    //   triggerOnce: true,
    //   offset: 'bottom-in-view'
    //   // offset: '100%'
    // });
  });


}).call(this);

