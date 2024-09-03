const fs = require("fs");
const Asciidoctor = require("asciidoctor");
const asciidoctor = Asciidoctor();
const registry = asciidoctor.Extensions.create();
require("./queens.js")(registry);

function main() {
  const content = fs.readFileSync("./ccmq.adoc");
  asciidoctor.convert(content, {
    to_file: "ccmq.html",
    extension_registry: registry,
    //standalone: true
  });
}

main();