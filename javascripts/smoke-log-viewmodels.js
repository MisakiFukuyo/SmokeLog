(function(){
  SmokeLog.addModule('ViewModel',{
    getLog:function(){
      var root = $('<tr><td class="smoke-log-nth"></td><td class="smoke-log-time"><time datetime=""></time></td><td class="smoke-log-place"></td></tr>');
      return root;
    }
  });
})()
