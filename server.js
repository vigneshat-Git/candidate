import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.md':'text/markdown; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let name=decodeURIComponent(url.pathname);if(name==='/')name='/index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep))throw Object.assign(Error('Not found'),{status:404});const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body)}catch(e){res.writeHead(e.status||404,{'Content-Type':'text/plain'});res.end('Not found')}});
const port=Number(process.env.PORT||4173);server.listen(port,'127.0.0.1',()=>console.log(`Signal inbox available at http://127.0.0.1:${port}`));
