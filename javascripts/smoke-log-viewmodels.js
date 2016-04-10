(function(){
  SmokeLog.addModule('ViewModels',{
    getLog:function(){
      var root = $('<tr><td class="smoke-log-nth"></td><td class="smoke-log-time"><time datetime=""></time></td><td class="smoke-log-place"></td><td class="smoke-log-delete"></td></tr>');
      return root;
    },
    getPlace:function(){
      var root = $('<div class="row smoke-log-place"><div class="col-md-6 smoke-log-place-title"><button class="btn btn-default btn-block"></button></div><div class="col-md-2 smoke-log-place-pc"><button class="btn btn-default btn-block">💻</button></div><div class="col-md-2 smoke-log-place-mobile"><button class="btn btn-default btn-block">📱</button></div><div class="col-md-2 smoke-log-place-remove"><button class="btn btn-warning btn-block">✖</button></div></div>')
      return root;
    }
  });
})()
