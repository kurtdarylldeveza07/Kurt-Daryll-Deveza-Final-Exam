document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".qr-card").forEach(function (card) {
  var name = card.dataset.from;
  var link = document.querySelector('.socials a[aria-label="' + name + '"]');
  var box = card.querySelector(".qr");

  if (!link || typeof qrcode === "undefined") return;

  var qr = qrcode(0, "M");
  qr.addData(link.href);
  qr.make();
  box.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });

  card.style.cursor = "pointer";
  card.addEventListener("click", function () {
    window.open(link.href, "_blank", "noopener");
  });
});

var navLinks = document.querySelectorAll(".topbar ul a");
var sections = [];
navLinks.forEach(function (a) {
  var target = document.querySelector(a.getAttribute("href"));
  if (target) sections.push({ link: a, el: target });
});

function updateActiveLink() {
  var y = window.scrollY + 120;
  var atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
  var current = null;

  sections.forEach(function (s) {
    if (s.el.offsetTop <= y) current = s;
  });
  if (atBottom) current = sections[sections.length - 1];

  navLinks.forEach(function (a) { a.classList.remove("active"); });
  if (current) current.link.classList.add("active");
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();
