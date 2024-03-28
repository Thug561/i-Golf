 
import * as crapto from 'crypto-js';
 
 export function StaticData(e, callBack) {
 
 const data = {
    CourseScorecardDetails: {
      key: 'CourseScorecardDetails',
      body: {
        id_course: e.courseID,
        detailLevel: 2
      }
    }, 
    CourseTeeDetails: {
      key: 'CourseTeeDetails',
      body: {
        id_course: e.courseID,
        detailLevel: 2
      }
    }, 
    CourseGPSVectorDetails: {
      key: 'CourseGPSVectorDetails',
      body: {
        id_course: e.courseID,
      }
    }, 
    CourseElevationDataDetails: {
      key: 'CourseElevationDataDetails',
      body: {
        id_course: e.courseID,
      }
    }, 
    ProTipMessageList: {
      key: 'ProTipMessageList',
      body: {
        id_course: e.courseID,
      }
    },
  };

  Object.setPrototypeOf(this, {
    timestamp() {
      const o = new Date();
      const a = o.getTimezoneOffset();
      return String(o.getFullYear()).slice(-2) +
        this.pad2(o.getMonth() + 1) +
        this.pad2(o.getDate()) +
        this.pad2(o.getHours()) +
        this.pad2(o.getMinutes()) +
        this.pad2(o.getSeconds()) +
        (a > 0 ? "-" : "-") +
        this.pad2(Math.floor(Math.abs(a) / 60)) +
        this.pad2(Math.abs(a) % 60);
    },
    encode64(e) {
      return btoa(
        new Uint8Array(e).reduce((e, t) => {
          return e + String.fromCharCode(t);
        }, "")
      );
    },
    pad2(e) {
      return (e < 10 ? "0" : "") + e;
    },
    signature: (action, e) => { 
    if( e.platform === 'web' ){
    return (crypto || (crypto = window.crypto || window.msCrypto),
        crypto.subtle.importKey("raw", new TextEncoder("utf-8").encode(e.secretkey), {
          name: "HMAC",
          hash: {
            name: "SHA-256"
          }
        }, !1, ["sign", "verify"]).then((r) => {
          let API_VERSION = '1.1',
            SIG_VERSION = '2.0',
            APP_API_KEY = e.apikey,
            SIG_METHOD = 'HmacSHA256',
            timeStamp = this.timestamp();
          const i = `${action}/${APP_API_KEY}/${API_VERSION}/${SIG_VERSION}/${SIG_METHOD}/${timeStamp}/JSON`;
          return crypto.subtle.sign({
            name: "HMAC",
            hash: {
              name: "SHA-256"
            }
          }, r, new TextEncoder("utf-8").encode(i));
        }).catch((e) => {
          console.error(e);
        }).then((t) => {
          return this.encode64(t).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
        })
      );
    } else {
      let API_VERSION = '1.1',
          SIG_VERSION = '2.0',
          APP_API_KEY = e.apikey,
          SIG_METHOD = 'HmacSHA256',
          timeStamp = this.timestamp();
          const i = `${action}/${APP_API_KEY}/${API_VERSION}/${SIG_VERSION}/${SIG_METHOD}/${timeStamp}/JSON`;
      const sig = crapto.HmacSHA256(i, e.secretkey).toString(crapto.enc.Base64url).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
     return new Promise((e) => e(sig))
    }
    },
    fetchElevation:   (e) => {
      return fetch(e, {
        method: "GET"
      }).then((e) => {
        return e.status === 200 && e.json();
       }).then(async (e) => {
        return e;
      }).catch((e) => {
        console.error(e);
      });
    },
    Fetch: (e, t) => {
     return this.signature(t.key, e).then(signature => {
   
       let arr = [];
        let object = {
        action: t.key,
        apiKey: e.apikey,
        appVersion: '1.1',
        apiVersion: '2.0',
        signatureVersion: 'HmacSHA256',
        signatureMethod: signature,
        timestamp:  this.timestamp(),
        responseFormat: 'JSON'
      };
   
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          arr.push(object[key]);
        }
      }
      const url = arr.join('/');
      return (fetch(e.hostOrigin + 'rest/action/' + url, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: new Headers({
          accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(t.body),
      }).then( async response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return await response.json();
      }).then(async response => {
        return await response;
      }).catch(e => {
        console.log(e, 'error');
        // document.body.innerHTML = 'Error'
      }));
    });
  },

  init: async (e) => {
 
    try {
      for (let index = 0; index <  Object.keys(data).length; index++) {
        const key =  Object.keys(data)[index];
        const el = data[key];
        this[key] = await this.Fetch(e, el);
        this[key]['jsonFullUrl'] && (this.elevationData = await this.fetchElevation(this[key]['jsonFullUrl']));
      }
      callBack(this);
    } catch(error) {}
  },

  initOld: (e) => {
    return new Promise((finalResolve) => {
      const p = [];
      Object.keys(data).forEach(  key => {
        p.push(new Promise(async(resolve) => {
          const el = data[key]
          this[key] = await this.Fetch(e, el);
          resolve({[key]:this[key]});
        }))
      });
    
     (Promise.all([...p]).then((values) => {
      const data = {...values[0], ...values[1], ...values[2], ...values[3], ...values[4]};

      (data.CourseElevationDataDetails && data.CourseElevationDataDetails['jsonFullUrl']) && (new Promise(async (resolveElevaltion) => {
        data.elevationData = await this.fetchElevation(data.CourseElevationDataDetails['jsonFullUrl']);
        setTimeout(() => {resolveElevaltion({elevationData:this.elevationData})}, 300);
        setTimeout(() => { finalResolve(data) }, 400);
      }));

         
        }))
      })
    }
  });
  return  this.init(e);
  // return (this.initi(e), console.log(this['elevationData'], 'this'), callBack(this))
  //  return  (this.init(e).then(async (t) => {
  //   console.log(t);
  //     return await t && callBack(t)
  //  }))
}

