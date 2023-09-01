const fs = require('fs');

const requestHandler = (req,res) => {
    const url =req.url;
    const method = req.method;
}
if (url === '/') {
    if (req.method === 'GET') {
      const messages = fs.readFileSync('messages.txt', 'utf8').split('\n').filter(Boolean);
      res.write('Content-Type','text/html');
      res.write(`<html><body><form id="messageForm" method="POST"><textarea name="message" placeholder="Type your message"></textarea>
              <button type="submit">Submit</button></form>
            <ul id="messageList">
              ${messages.map(message => `<li>${message}</li>`).join('')}
            </ul>
          </body>
        </html>
      `);
      res.end();
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const newMessage = new URLSearchParams(body).get('message');
if (newMessage) {
          const messages = fs.readFileSync('messages.txt', 'utf8').split('\n').filter(Boolean);
          messages.unshift(newMessage);
          fs.writeFileSync('messages.txt', messages.join('\n'));
          res.write(302, { Location: '/' });
          res.end();
        } else {
          res.write(400, { 'Content-Type': 'text/plain' });
          res.write('Bad Request: No message provided');
        }
      });
      res.end();
    }
  } else {
    res.writeHead('Content-Type','text/plain');
    res.end('Not Found');
  }
  module.exports= requestHandler;