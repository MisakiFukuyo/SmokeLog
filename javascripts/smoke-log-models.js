(function(){
  function SmokeLogModel(datetime,place){
    this.nth = 0;
    this.time = datetime.getTime() / 1000;
    this.timeZone = -datetime.getTimezoneOffset() / 60;
    this.place = place;
    this.onUpdateNth = []
    this.setNth = function(n){
      var old = this.nth;
      this.nth = n;
      this.onUpdateNth.forEach(function(uf){
        uf(n,old);
      });
    }
  }

  SmokeLog.addModule('Models.Smoke',{
    Log:SmokeLogModel
  });

  SmokeLog.addModule('Models.Place',{
    all:{Home:'Home',Outside:'Outside'},
    keys:{mobile:'Outside',pc:'Home'},
    getPlaceByUA:function(){
      if(SmokeLog.Utils.isMobile()){
        return this.all[this.keys.mobile];
      }else{
        return this.all[this.keys.pc];
      }
    },
    changeTo:function(newPlace){
      return this.all[newPlace];
    },
    onPlaceListUpdated:[],
    addNewPlace:function(newPlace){
      this.all[newPlace] = newPlace;
      this.onPlaceListUpdated.forEach(function(uf){
        uf(newPlace,this.all);
      });
    },
    removePlace:function(removePlace){
      delete this.all[removePlace];
      this.onPlaceListUpdated.forEach(function(uf){
        uf(removePlace,this.all);
      });
    },
    onPlaceAssociatingUpdate:[],
    setPlaceAs:function(isMobile,placeName){
      if(isMobile){
        var key = 'mobile';
      }else{
        var key = 'pc';
      }
      var old = this.keys[key];
      this.keys[key] = this.all[placeName];
      var newKey = this.keys[key];
      this.onPlaceAssociatingUpdate.forEach(function(uf){
        uf(newKey,old,key)
      })
    }
  });

  SmokeLog.addModule('Models.Stats',{
    logs:[],
    onUpdateNth:[],
    add:function(date,place){
      var needSort = false;
      if(date === undefined){
        date = new Date();
        needSort = true;
      }
      if(place === undefined){
        place = SmokeLog.Models.Place.getPlaceByUA()
      }
      var newLog = new SmokeLog.Models.Smoke(date, place);
      newLog.onUpdateNth = onUpdateNth.slice();
      this.logs.push(newLog);
      if(needSort){
        this.sortByTime();
        var n = 1;
        this.logs.forEach(function(l){
          l.setNth(n++);
        });
      }
    },
    sortByTime:function(){
      this.logs.sort(function(a,b){
        var at = a.time - a.timeZone * 3600;
        var bt = b.time - b.timeZone * 3600;
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
