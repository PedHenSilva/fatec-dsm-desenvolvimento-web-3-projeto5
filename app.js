import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
};

function readFile(response, file) {
    fs.readFile(file, function (err, data) {
        if (err) {
            return erro404(response);
        }
        const extension = path.extname(file).toLowerCase();
        const contentTypeLocal = contentTypes[extension] || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': contentTypeLocal });
        response.end(data);
    });
}

function erro404(response) {
    const file = path.join(publicDir, 'erro404.html');
    fs.readFile(file, function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end('404 - Página Não Encontrada');
        }
        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(data);
    });
}

function calcularMedia(p1, p2) {
    return (p1 + p2) / 2;
}

function classificarSituacao(media) {
    if (media >= 6.0) {
        return {
            situacao: 'APROVADO',
            pagina: 'aprovado.html'
        };
    } else {
        return {
            situacao: 'REPROVADO',
            pagina: 'reprovado.html'
        };
    }
}

function mostrarResultado(response, pagina, nome, p1, p2, media, situacao) {
    const file = path.join(publicDir, pagina);
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            return erro404(response);
        }
        data = data.replace(/{nome}/g, nome);
        data = data.replace(/{p1}/g, p1.toFixed(1));
        data = data.replace(/{p2}/g, p2.toFixed(1));
        data = data.replace(/{media}/g, media.toFixed(1));
        data = data.replace(/{situacao}/g, situacao);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(data);
    });
}

function callback(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);

    if (pathname === '/') {
        return readFile(response, path.join(publicDir, 'index.html'));
    }

    if (pathname === '/media') {
        const nome = url.searchParams.get('nome') || 'Aluno(a)';
        const p1 = parseFloat(url.searchParams.get('p1'));
        const p2 = parseFloat(url.searchParams.get('p2'));

        // Validação: notas não informadas, valores inválidos ou fora do escopo escolar (0 a 10)
        if (isNaN(p1) || isNaN(p2) || p1 < 0 || p1 > 10 || p2 < 0 || p2 > 10) {
            response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end('Erro 400: Por favor, informe notas válidas para p1 e p2 entre 0.0 e 10.0 na URL.');
        }

        const media = calcularMedia(p1, p2);
        const resultado = classificarSituacao(media);
        
        return mostrarResultado(
            response,
            resultado.pagina,
            nome,
            p1,
            p2,
            media,
            resultado.situacao
        );
    }

    const file = path.join(publicDir, pathname);
    if (!file.startsWith(publicDir)) {
        return erro404(response);
    }
    readFile(response, file);
}

const server = http.createServer(callback);
const PORT = 3000;
server.listen(PORT, function () {
    console.log(`Servidor iniciado em http://localhost:${PORT}/`);
});
