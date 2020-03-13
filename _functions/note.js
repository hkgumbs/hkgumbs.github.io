function decode(s) {
  try {
    return decodeURIComponent(s || "");
  } catch {
    return null;
  }
}

function html(body) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>${body}</body>
    </html>`;
}

exports.handler = (event, _, callback) => {
  const q = decode(event.queryStringParameters.q).replace(/[<>]/g, "");
  const body = q ? html(`<pre>${q}</pre>`) : html(`
    <textarea></textarea>
    <script type="text/javascript">
      document.querySelector("textarea").addEventListener("input", function(event) {
        window.history.replaceState(null, null, "?q=" + encodeURIComponent(event.target.value));
      });
    </script>`);
  callback(null, { statusCode: 200, body: body, headers: {} });
};