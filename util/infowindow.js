 

export function InfoWindow(t, e, i) {
  this.events = i.events
  Object.setPrototypeOf(this, {
    render: () => {
      var e = this,
        t = this.Tee.courseNumHoles ? this.Tee.courseNumHoles : 9,
        n =
        "back" == this.switch && t > 9 ?
        Array.from({
          length: 9
        }, function (e, t) {
          return t + 10;
        }) :
        Array.from({
          length: 9
        }, function (e, t) {
          return t + 1;
        }),
        r = [];
      this.Tee.teesList &&
        this.Tee.teesList.map(function (t) {
          var n = "back" == e.switch ? t.ydsHole.slice(9) : t.ydsHole.slice(0, 9);
          r.push(Object.assign({}, t, {
            ydsHole: n
          }));
        });
      console.log(r);
    },
    renderHeader: () => {
      var e = this;
      (this.header = document.createElement("div")), (this.header.className = "ContentHeader");
      var t = document.createElement("div");
      (t.style = `
      display: flex; background: #000;  color: #fff; height: 40px;
      `), this.header.appendChild(t);
      var n = document.createElement("div");
      (n.className = "font-bebas pl-15 pr-15 close-btn"),
      (n.textContent = "X"),
      n.style = `
      width: 50px;
      height: 100%;
      text-align: center;
      background: red;
      color: #fff;
      margin-right: 10px;
      cursor: pointer;
      user-select: none;display: inline-flex;
      align-items: center;
      justify-content: center;`

      t.appendChild(n),
        (this.close = n),
        this.close.addEventListener("click", () => {
          e.el.parentNode.removeChild(this.el), this.events.Trigger("closeInfoWindow", {
            closeInfoWindow: true
          });
        });
      var r = document.createElement("div");
      (r.className = ""), (r.textContent = "Course Information"), t.appendChild(r), this.el.appendChild(this.header);
      r.style = `display: inline-flex;align-items: center;`
    },
    renderContent: () => {
      (this.content = document.createElement("div")), (this.content.className = "_content"), this.el.appendChild(this.content), this.content.appendChild(this.renderTable());
      this.content.style = `
      height: calc(100% - 40px);
      overflow-y: auto;
      `
    },
    renderTable: () => {
      var e = this;
      (this.table = document.createElement("table")), (this.table.className = "_tableStriped");
      this.table.style = `
      caption-side: bottom;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1rem;
      `
      var t = this.table.appendChild(document.createElement("thead")).appendChild(document.createElement("tr")),
        n = ["hole", "par", "yards", "hdcp"];
      n.map((e, ind) => {
        var n = t.appendChild(document.createElement("th"));
        n.style = `
        padding: 10px;
        text-align: center;
        border-bottom: 2px solid #9b9b9b;
        background: #ccc;
        border-right: 1px solid rgb(183 183 183);
        font-family: "Bebas Neue";
        `;

        (ind === 0) && (n.style.color = '#333333');
        (ind === 1) && (n.style.color = '#E93737');
        (ind === 2) && (n.style.color = '#234271');
        (ind === 3) && (n.style.color = '#2E6F11');


        (n.className = " " + e), (n.textContent = e.toUpperCase());

      });
      for (
        var r = this.table.appendChild(document.createElement("tbody")),
          o = (t) => {
            var o = r.appendChild(document.createElement("tr"));
            n.map((n, ind) => {
              var r = o.appendChild(document.createElement("td"));
              (r.className = "" + n),
              r.style = `
              padding: 10px;
              text-align: center;
              border-bottom: solid 1px #ddd;
              border-right: solid 1px #ccc;
              font-size: 22px;    font-family: "Bebas Neue";
              `;
              (ind === 0) && (r.style.color = '#333333');
              (ind === 1) && (r.style.color = '#E93737');
              (ind === 2) && (r.style.color = '#234271');
              (ind === 3) && (r.style.color = '#2E6F11');
              (r.textContent = "hole" == n ? t + 1 : "par" == n ? e.Scorecard.menScorecardList[0].parHole[t] : "yards" == n ? e.Tee.teesList.length && e.Tee.teesList[0].ydsHole[t] : e.Scorecard.menScorecardList[0].hcpHole[t]);
            });
            (t % 2 === 0) && (o.childNodes.forEach((t) => t.style.backgroundColor = '#dfdfdf'))
          },



          a = 0; a < this.totalHoles; a++

      )
        o(a);
      return this.table;
    },
  });
  this.Scorecard = t.CourseScorecardDetails;
  this.Tee = t.CourseTeeDetails;
  this.totalHoles = t.CourseGPSVectorDetails.vectorGPSObject.HoleCount;
  this.el = document.createElement("div");
  this.el.className = "CourseInfo";
  this.el.style = `position: fixed; z-index: 99999; top: 0;  bottom: 0; left: 0; right: 0;  width: 100%;  height: 100%; background: #fff;`;
  this.render();
  this.renderHeader(), this.renderContent(), e.appendChild(this.el)

  return this;
}
