(function(window) {
  function Tracklet() {

    this.bootstrap = bootstrap;
    this.sendClickEvent = sendClickEvent;
    this.getCommonTags = getCommonTags;
    this.sendTrackingData = sendTrackingData;

    function bootstrap() {

      var pathArray = location.href.split('/');
      var protocol = pathArray[0];
      var host = pathArray[2].toLowerCase();
      var url = protocol + '//' + host;
      var urlToBeTracked = '';
      var scriptTag = document.querySelectorAll('script[data-etracker-code]');
      var secureCode = scriptTag[0].getAttribute('data-etracker-code');
      if(!secureCode || navigator.dotNotTrack === '1') {
        throw new Error('Etracker secure code not found: ' + secureCode);
      }
      $(document.createElement('script'))
        .attr('id', '_etLoader')
        .attr('type', 'text/javascript')
        .attr('charset', 'UTF-8')
        .attr('data-secure-code', secureCode)
        .attr('src', '//static.etracker.com/code/e.js')
        .appendTo('head');
    }

    function sendClickEvent(object, action) {

      if (!object) {
        throw new Error('No valid object given.');
      }
      if (!action) {
        throw new Error('No valid action given.');
      }
      var category = 'click';
      sendTrackingData(category, object, action);

    }

    function getCookie(c_name) {
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
            c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    }

    function getCommonTags() {
      var now = new Date();
      var userInfo = getCookie('trackedUser');
      var tags = {
          browserLanguage: navigator.language || navigator.userLanguage,
          browserPlatform: navigator.platform,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          date: now.toLocaleString(),
          user: userInfo
      };

      return tags;
    }

    function combineKeyAndValue(tagname, tagvalue) {
      var delimeter = '##';
      if (!String.prototype.trim) {
        String.prototype.trim = function() {
          if (typeof(this) == "string") {
            return this.replace(/^\s+|\s+$/g, '');
          }
          return this;
        };
      }
      return tagname.trim() + delimeter + tagvalue;
    }

    function objectMembersToString(tags) {
      var tagResults = [];
      for(var i in tags){
        if(tags[i] === null) {
          var objectMembers = getCommonETObject();
          return "ERROR: " + objectMembersToString(objectMembers);
        }
        tagResults.push(combineKeyAndValue(i, tags[i]));
      }
      return combineFields(tagResults);
    }

    function combineFields(fields) {
      return fields.join(';;');
    }

    function sendTrackingData(category, object, action){
      var tags = objectMembersToString(getCommonTags());
      ET_Event.eventStart(category, object, action, tags);
    }
  }

  window.Tracklet = Tracklet;

})(window);
