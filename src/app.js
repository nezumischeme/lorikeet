var m = require("mithril")

var state = {
  lefts: [],
  rights: [],
  birds: [],
  selects: {
    "lefts": "black",
    "rights": "black" 
  }
}

const select = function(name, items) {
  return m("select", {
    name: name, 
    id: name,
    onchange: function(e) { state.selects[name] = e.target.value },
    value: state.selects[name]
  }, items.map(function(x) {
    return m("option", {value: x}, x);
  }));
}

var Search = {
  oninit: function() {
    return m.request({
      method: "GET",
      url: "./data/colorindex.json"
    })
    .then(function(result) {
        state.lefts = result.lefts;
        state.rights = result.rights;
      })
  },
  view: function() {
    return m("div", [
      m("h3", "Right leg"),
      select("rights", state.rights),
      m("h3", "Left leg"),
      select("lefts", state.lefts),
    ]);
  }
}

const filterBirds = function (birds, left, right) {
  return birds.filter(function(bird) {
    return (bird.right == right) && (bird.left == left);
  });
}

var Birds = {
  oninit: function() {
    return m.request({
      method: "GET",
      url: "./data/data.json"
    })
    .then(function(result) {
        state.birds = result.birds;
    });
  },
  view: function() {

    var body = filterBirds(
      state.birds, 
      state.selects["lefts"], 
      state.selects["rights"])
    .map(function(bird) {
      return m("tr", [
        m("th", {scope: "row"}, bird.name),
        m("td", bird.hatchYear),
        m("td", bird.sex)
      ]);
    });
    
    return body;
  }
}

var Table = {
  view: function() {
    return m("table", [
      m("thead", [
        m("tr", [
          m("th", {scope: "col"}, "Name"),
          m("th", {scope: "col"}, "Year"),
          m("th", {scope: "col"}, "Gender")
        ])
      ]),
      m(Birds)
    ])
  }
}

var Main = {
  view: function() {
    return m("div", [
      m(Search),
      m(Table)
    ])
  }
}

m.mount(document.getElementById("app"), Main)
