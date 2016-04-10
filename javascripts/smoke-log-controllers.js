(function(){
  $(document).ready(function(){
    $('.smoke-log-btn-smoked').click(function(){
      var logViewModel = SmokeLog.ViewModel.getLog();
      logViewModel.insertAfter('.smoke-log-table-header');
      var scope = {
        jqs:{
          parent:logViewModel
        }
      }
      SmokeLog.Models.Stats.add(scope);
    })
  });
})()
