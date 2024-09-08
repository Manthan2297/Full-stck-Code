export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

var observer = {};
let instance = null;
var notifications = [];

class NotificationService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  postNotification = (notifName, data) => {
    let obs = observer[notifName];
    for (var x = 0; x < obs.length; x++) {
      var obj = obs[x];
      obj.callBack(data);
    }
  };
  removeObserver = (observer, notifName) => {
    var obs = observer[notifName];
    if (obs) {
      for (var x = 0; x < obs.length; x++) {
        if (observer === obs[x].observer) {
          obs.splice(x, 1);
          observer[notifName] = obs;
          break;
        }
      }
    }
  };
  addObserver = (notifName, observer, callBack) => {
    let newObserver = observer[notifName];
    if (!newObserver) {
      observer[notifName] = [];
    }
    let obj = { observer: observer, callBack: callBack };
    observer[notifName].push(obj);
  };
}

export default NotificationService;
