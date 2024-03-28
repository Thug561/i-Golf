 

  
  export function events() {
  Object.setPrototypeOf(this, {
      on: (e, c, d) => {
          ((typeof this[e] === 'undefined') && (this[e] = [])), (this[e].indexOf(c) === -1) && (( c && this[e].push(c)));
          if (!this[e].length) return;
          for (let index = 0; index < this[e].length; index++)  ((typeof this[e][index] === 'function' && d) && this[e][index](d));
          return true;
      },
      Trigger: (e, d) => { 
          this.on(e, null, d);
          return true;
      },
    })
  }