(function(){
  $(document).ready(function(){
    SmokeLog.Models.Stats.onNthUpdated.push(function(scope,newVal){
      scope.jqs.parent.find('.smoke-log-nth').textContent = newVal;
    });

    SmokeLog.Models.Stats.onPlaceUpdated.push(function(scope,newVal){
      scope.jqs.parent.find('.smoke-log-place ').textContent = newVal;
    });

    SmokeLog.Models.Stats.onLogsUpdated.push(function(log){
      console.log(log);
      log.scope.jqs.parent.find('.smoke-log-nth').text(log.nth);
      log.scope.jqs.parent.find('.smoke-log-time time').text(log.formatedTime);
      log.scope.jqs.parent.find('.smoke-log-place').text(log.place);
    });

    SmokeLog.Models.Place.onNowPlaceUpdated.push(function(scope,now){
      console.log(now);
      scope.jqs.nowPlace.text(now);
    })

    SmokeLog.Models.Place.onPlaceListUpdated.push(function(scope,type,all,keys,opt){
      function updatePlacePCMobileDefault(selectorPCMobile,key){
        var seleceted = scope.jqs.root.find('.smoke-log-place>' + selectorPCMobile + '.smoke-log-place-selected')

        if(seleceted.parent().find('.smoke-log-place-title>.btn').text() !== key){
          seleceted.removeClass('smoke-log-place-selected');

          var placeTitles = scope.jqs.root.find('.smoke-log-place>.smoke-log-place-title>.btn')
          for(var i=0;i<placeTitles.length;i++){
            console.log(placeTitles.eq(i).text() + ' - ' + key);
            if(placeTitles.eq(i).text() === key){
              placeTitles.eq(i).parent().parent().find(selectorPCMobile).addClass('smoke-log-place-selected');
              break;
            }
          }
        }
      }

      var placesCount = scope.jqs.root.children('.smoke-log-place').length;
      if(type === 'key'){
        console.log(keys);
        updatePlacePCMobileDefault('.smoke-log-place-pc',keys.pc);
        updatePlacePCMobileDefault('.smoke-log-place-mobile',keys.mobile);
      }else if(type === 'remove'){
        var placeTitles = scope.jqs.root.find('.smoke-log-place>.smoke-log-place-title>.btn');
        for(var i=0;i<placeTitles.length;i++){
          if(placeTitles.eq(i).text() === opt.removed){
            scope.jqs.root.children('.smoke-log-place').eq(i).remove()
          }
        }
      }else if(type === 'add'){
        var place = SmokeLog.ViewModels.getPlace().appendTo(scope.jqs.root);
        place.find('.smoke-log-place-title>.btn').text(opt.added);
        place.find('.smoke-log-place-title>.btn').click(SmokeLog.Controllers.Place.select);
        place.find('.smoke-log-place-mobile>.btn').click(SmokeLog.Controllers.Place.setMobilePlace);
        place.find('.smoke-log-place-pc>.btn').click(SmokeLog.Controllers.Place.setPCPlace);
        place.find('.smoke-log-place-remove>.btn').click(SmokeLog.Controllers.Place.remove);
      }else if(type === 'init'){
        for(var a in all){
          var place = SmokeLog.ViewModels.getPlace().appendTo(scope.jqs.root);
          place.find('.smoke-log-place-title>.btn').text(a);
          place.find('.smoke-log-place-title>.btn').click(SmokeLog.Controllers.Place.select);
          place.find('.smoke-log-place-mobile>.btn').click(SmokeLog.Controllers.Place.setMobilePlace);
          place.find('.smoke-log-place-pc>.btn').click(SmokeLog.Controllers.Place.setPCPlace);
          place.find('.smoke-log-place-remove>.btn').click(SmokeLog.Controllers.Place.remove);
          if(a === keys.pc){
            place.find('.smoke-log-place-pc').addClass('smoke-log-place-selected')
          }
          if(a === keys.mobile){
            place.find('.smoke-log-place-mobile').addClass('smoke-log-place-selected')
          }
        }
      }
    });
  });
})()
