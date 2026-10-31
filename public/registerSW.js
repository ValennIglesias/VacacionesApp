// Registro del service worker. Lo piden también las páginas viejas que sirve un service worker anterior (es lo único
// que vuelven a buscar a la red), así que acá se arregla una app trabada: si tras cargar no arrancó (una versión vieja
// pide archivos que un deploy borró), fuera service worker y cachés y se recarga, una vez por minuto como mucho.
if ("serviceWorker" in navigator) {
  addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(function (r) { return r.update(); }).catch(function () {});
    var root = document.getElementById("root");
    if (!root) return;
    setTimeout(function () {
      if (root.childNodes.length) return;
      try {
        if (Date.now() - (+sessionStorage.getItem("sw-reset") || 0) < 60000) return;
        sessionStorage.setItem("sw-reset", Date.now());
      } catch (e) {}
      var reload = function () { location.reload(); };
      navigator.serviceWorker.getRegistrations()
        .then(function (l) { return Promise.all(l.map(function (g) { return g.unregister(); })); })
        .then(function () { return caches.keys(); })
        .then(function (k) { return Promise.all(k.map(function (n) { return caches.delete(n); })); })
        .then(reload, reload);
    }, 3000);
  });
}
