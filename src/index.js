import "./styles.css";

var SECURITIES = [
  "AAPL.N",
  "AMZN.N",
  "QQQ.N",
  "NVDA.N",
  "TSLA.N",
  "FB.N",
  "MSFT.N",
  "TLT.N",
  "XIV.N",
  "YY.N",
  "CSCO.N",
  "GOOGL.N",
  "PCLN.N"
];

var CLIENTS = [
  "Homer",
  "Marge",
  "Bart",
  "Lisa",
  "Maggie",
  "Moe",
  "Lenny",
  "Carl",
  "Krusty"
];

// Create 5 random rows of data.
function newRows() {
  var rows = [];
  for (var x = 0; x < 5; x++) {
    rows.push({
      name: SECURITIES[Math.floor(Math.random() * SECURITIES.length)],
      client: CLIENTS[Math.floor(Math.random() * CLIENTS.length)],
      lastUpdate: new Date(),
      chg: Math.random() * 20 - 10,
      bid: Math.random() * 10 + 90,
      ask: Math.random() * 10 + 100,
      vol: Math.random() * 10 + 100
    });
  }
  return rows;
}

const elem = document.getElementsByTagName("perspective-viewer")[0];
//var worker = perspective.worker();
const perspective = window.perspective;

const worker = perspective.worker();

// Create a new Perspective table in our `worker`, and limit it it 500 rows.
const table = worker.table(newRows(), {
  limit: 500
});

elem.load(table);

// Add more rows every 50ms using the `update()` method on the `table` directly.
(function postRow() {
  table.update(newRows());
  setTimeout(postRow, 50);
})();
