(function(){
  var rootModuleName = 'SmokeLog'
  if(window[rootModuleName] === undefined){
    window[rootModuleName]= {};
    window[rootModuleName].addModule = function(entryPoint,moduleBody){
      if(typeof moduleBody !== 'object'){
        console.error('moduleBody is not object');
      }
      if(typeof entryPoint === 'string'){
        var epsArr = entryPoint.split('.');
        var target = window[rootModuleName];
        for(var i=0;i<epsArr.length-1;i++){
          if(typeof target[epsArr[i]] !== 'object'){
            target[epsArr[i]] = {}
          }
          target = target[epsArr[i]]
        }
        if(target[epsArr[epsArr.length-1]] === undefined){
          target[epsArr[epsArr.length-1]] = moduleBody
        }else if(typeof target[epsArr[epsArr.length-1]] === 'object'){
          target = target[epsArr[epsArr.length-1]]
          for(var k in moduleBody){
            target[k] = moduleBody[k];
          }
        }else{
          console.error('already exist anything but not object at entryPoint');
        }
      }else{
        console.error('entryPoint is not string.');
      }
    }
  }else{
    console.warn('already exist module into global window object');
  }
})();
