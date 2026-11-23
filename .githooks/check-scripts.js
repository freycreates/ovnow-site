// Fails when an inline <script> in a page has a syntax error: one broken script stops the sign-up form.
const fs = require("fs");
let bad = 0;
for (const file of process.argv.slice(2)) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/type=["']?(application\/(ld\+)?json|text\/template)/i.test(m[1])) continue;
    try { new Function(m[2]); } catch (e) {
      const line = html.slice(0, m.index).split("\n").length;
      console.error(`${file}: script at line ${line}: ${e.message}`); bad++;
    }
  }
}
process.exit(bad ? 1 : 0);
