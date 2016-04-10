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
    })
  });
})()
