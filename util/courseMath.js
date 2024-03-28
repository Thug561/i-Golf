export function CourseMath(t) {
  this.options = t, this.initLocation = t.initLocation;

  Object.setPrototypeOf(this, {
    getLatMeters: (t) => {
      var i = t * this.DRAD();
      return (
        111132.92 -
        559.82 * Math.cos(2 * i) +
        1.175 * Math.cos(4 * i) -
        0.0023 * Math.cos(6 * i)
      );
    },
    getLngMeters: (t) => {
      var i = t * this.DRAD();
      return (
        111412.84 * Math.cos(i) - 93.5 * Math.cos(3 * i) + 0.118 * Math.cos(5 * i)
      );
    },
    DRAD: () => {
      return Math.PI / 180;
    },
    convertLatLonToLocal: (e) => {
      var t = this.initLocation.lat - e.lat,
        i = e.lng - this.initLocation.lng;
      return e.lng < 0 && this.initLocation.lng > 0 && (i += 360), {
        X: i * this.metersPerDegreeLng,
        Y: -t * this.metersPerDegreeLat
      };
    },
  });
  (this.metersPerDegreeLat = this.getLatMeters(this.initLocation.lat)),
  (this.metersPerDegreeLng = this.getLngMeters(this.initLocation.lat));

  return this
}
