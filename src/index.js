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
      m("h1", "Right leg"),
      select("rights", state.rights),
      m("h1", "Left leg"),
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
    return m("ul", 
      filterBirds(
        state.birds, 
        state.selects["lefts"], 
        state.selects["rights"])
      .map(function(bird) {
      return m("li", bird.name);
    }));
  }
}

var Main = {
  view: function() {
    return m("div", [
      m(Search),
      m(Birds)
    ])
  }
}

m.mount(document.getElementById("app"), Main)