const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // API lưu xác nhận RSVP và Lời chúc vào file text
  if (req.method === 'POST' && (reqUrl === '/api/rsvp' || reqUrl === '/api/wish')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const timeStr = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        
        if (reqUrl === '/api/rsvp') {
          const targetFile = path.join(__dirname, 'danh_sach_rsvp.txt');
          const prefix = !fs.existsSync(targetFile) ? '\uFEFF' : '';
          const line = `${prefix}[${timeStr}] Tên: ${data.name || 'Khách'} | Tham dự: ${data.attending === 'yes' ? 'Sẽ đến' : 'Bận'} | Phe: ${data.side || 'Khách'} | Số người: ${data.guestCount || 1}\r\n`;
          fs.appendFileSync(targetFile, line, 'utf8');
        } else {
          const targetFile = path.join(__dirname, 'danh_sach_loi_chuc.txt');
          const prefix = !fs.existsSync(targetFile) ? '\uFEFF' : '';
          const line = `${prefix}[${timeStr}] Tên: ${data.name || 'Khách'} | Phe: ${data.side || 'Khách'} | Lời chúc: "${data.message || ''}"\r\n`;
          fs.appendFileSync(targetFile, line, 'utf8');
        }

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, message: 'Đã lưu vào file text thành công' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : reqUrl);

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found: ' + reqUrl);
      } else {
        res.writeHead(500);
        res.end('500 Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✨ Server thiệp cưới đang chạy tại: http://localhost:${PORT}`);
  console.log(`💌 Thử cá nhân hóa tên khách mời: http://localhost:${PORT}?to=Anh+Tu%E1%BA%A5n+%26+Gia+%C4%90%C3%ACnh`);
});
