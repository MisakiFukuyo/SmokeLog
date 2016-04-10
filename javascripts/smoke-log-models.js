(function(){
  function SmokeLogModel(scope,datetime){
    self = this;
    this.scope = scope;
    this.nth = 0;
    this.time = parseInt(datetime.getTime() / 1000);
    this.formatedTime = function(){
      var format = 'y.n.d h:m:s+f';
      var dt = new Date(self.time * 1000);
      function fix(n,m){
        for(var i = n.length;i<m;i++){
          n = '0' + n
        }
        return n;
      }

      var v = {
        y : dt.getFullYear(),
        n : fix((dt.getMonth()+1).toString(),2),
        d : fix(dt.getDate().toString(),2),
        w : fix(dt.getDay().toString(),2),
        h : fix(dt.getHours().toString(),2),
        m : fix(dt.getMinutes().toString(),2),
        s : fix(dt.getSeconds().toString(),2),
        f : parseInt(self.timeZone / -60).toString() + ':' + fix((self.timeZone % 60).toString(),2)
      }

      for(var k in v){
        console.log(fix(v[k].toString(),2));
        format = format.replace(k,v[k]);
      }
      return format;
    }
    this.timeZone = datetime.getTimezoneOffset()
    this.place = '';
    this.onNthUpdated = [];
    this.setNth = function(n){
      var old = this.nth;
      this.nth = n;
      this.onNthUpdated.forEach(function(uf){
        uf(self.scope,n,old);
      });
    }
    this.onPlaceUpdated = [];
    this.setPlace = function(newPlace){
      var old = this.place;
      this.place = newPlace;
      this.onPlaceUpdated.forEach(function(uf){
        uf(self.scope,newPlace,old);
      });
    }
    this.onUpdated = [];
    this.update = function(){
      this.onUpdated.forEach(function(uf){
        uf(self);
      })
    }
  }

  SmokeLog.addModule('Models.Smoke',{
    Log:SmokeLogModel
  });

  SmokeLog.addModule('Models.Place',{
    all:{Home:'Home',Outside:'Outside','Smoking Area':'Smoking Area'},
    keys:{mobile:'Outside',pc:'Home'},
    now:'Auto',
    scope:{},
    getPlaceByUA:function(){
      if(SmokeLog.Utils.isMobile()){
        return this.all[this.keys.mobile];
      }else{
        return this.all[this.keys.pc];
      }
    },
    setNowPlace:function(newPlace){
      this.now = newPlace;
      var all = this.all;
      var keys = this.keys;
      var scope = this.scope;
      this.onNowPlaceUpdated.forEach(function(uf) {
        uf(scope,newPlace)
      })
    },
    onNowPlaceUpdated:[],
    onPlaceListUpdated:[],
    addNewPlace:function(newPlace){
      this.all[newPlace] = newPlace;
      var all = this.all;
      var keys = this.keys
      var scope = this.scope;
      this.onPlaceListUpdated.forEach(function(uf){
        uf(scope,'add',all,keys,{added:newPlace});
      });
    },
    removePlace:function(removePlace){
      delete this.all[removePlace];
      var all = this.all;
      var keys = this.keys
      var scope = this.scope;
      this.onPlaceListUpdated.forEach(function(uf){
        uf(scope,'remove',all,keys,{remvoed:removePlace});
      });
    },
    setPlaceAs:function(device,placeName){
      if(device === 'mobile'){
        var key = 'mobile';
      }else{
        var key = 'pc';
      }
      if(this.keys['mobile'] !== this.all[placeName] && this.keys['pc'] !== this.all[placeName])
      this.keys[key] = this.all[placeName];
      var all = this.all;
      var keys = this.keys
      var scope = this.scope;
      this.onPlaceListUpdated.forEach(function(uf){
        uf(scope,'key',all,keys,{changed:key});
      });
    },
    init:function(){
      var all = this.all;
      var keys = this.keys;
      var scope = this.scope;
      this.onPlaceListUpdated.forEach(function(uf){
        uf(scope,'init',all,keys,{});
      });
    }
  });

  SmokeLog.addModule('Models.Stats',{
    logs:[],
    onNthUpdated:[],
    onPlaceUpdated:[],
    onLogsUpdated:[],
    add:function(scope,date,place){
      var needSort = false;
      if(date === undefined){
        date = new Date();
        needSort = true;
      }
      if(place === undefined){
        if(SmokeLog.Models.Place.now === 'Auto'){
          place = SmokeLog.Models.Place.getPlaceByUA();
        }else{
          place = SmokeLog.Models.Place.now;
        }
      }
      var newLog = new SmokeLog.Models.Smoke.Log(scope, date);
      newLog.onNthUpdated = this.onNthUpdated.slice();
      newLog.onPlaceUpdated = this.onPlaceUpdated.slice();
      newLog.onUpdated = this.onLogsUpdated.slice();

      this.logs.push(newLog);

      if(needSort){
        this.sortByTime();
        var n = 1;
        this.logs.forEach(function(l){
          l.setNth(n++);
        });
      }else{
        newLog.setNth(newLog.length);
      }
      newLog.setPlace(place);
      newLog.update();
      return newLog;
    },
    sortByTime:function(){
      this.logs.sort(function(a,b){
        var at = a.time + a.timeZone * 60;
        var bt = b.time + b.timeZone * 60;
        return at - bt;
      })
    }
  });

  SmokeLog.addModule('Utils',{
    isMobile:function() {
       if(navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
       ){
         return true;
       }else {
         return false;
       }
     }
  });
})()
