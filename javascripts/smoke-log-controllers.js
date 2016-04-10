(function(){
  $(document).ready(function(){
    $('.smoke-log-btn-smoked').click(function(){
      var logViewModel = SmokeLog.ViewModels.getLog();
      logViewModel.insertAfter('#SmokeLogTable .smoke-log-table-header');
      var scope = {
        jqs:{
          parent:logViewModel
        }
      }
      SmokeLog.Models.Stats.add(scope);
    });

    SmokeLog.Models.Place.scope.jqs = {root : $('#SmokeLogPlaceList'), nowPlace : $('.smoke-log-now-place')}

    SmokeLog.addModule('Controllers.Place',{
      select:function(ev){
        SmokeLog.Models.Place.setNowPlace($(this).text());
      },
      setPCPlace:function(ev){
        SmokeLog.Models.Place.setPlaceAs('pc',$(this).parent().parent().find('.smoke-log-place-title').text());
      },
      setMobilePlace:function(ev){
        SmokeLog.Models.Place.setPlaceAs('mobile',$(this).parent().parent().find('.smoke-log-place-title').text());
      },
      remove:function(ev){
        SmokeLog.Models.Place.removePlace($(this).text());
        SmokeLog.Models.Place.setNowPlace('Auto');
      }
    });

    $('.smoke-log-place-auto').click(SmokeLog.Controllers.Place.select);

    SmokeLog.Models.Place.init();
  });
})()
