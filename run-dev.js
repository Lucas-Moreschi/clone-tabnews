const { spawn, execSync } = require("child_process");

console.log("\n=== INICIANDO AMBIENTE DE DESENVOLVIMENTO ===\n");

try {
  // 1. Sobe o Docker
  console.log("[1/4] Subindo infraestrutura (Docker)...");
  execSync("npm run services:up", { stdio: "inherit" });

  // 2. Espera o banco aceitar conexões
  console.log("\n[2/4] Aguardando o banco de dados ficar pronto...");
  execSync("npm run services:wait:database", { stdio: "inherit" });

  // 3. Roda as migrations
  console.log("\n[3/4] Rodando as migrations...");
  execSync("npm run migrations:up", { stdio: "inherit" });
} catch (erro) {
  console.log(
    "\n[ERRO CRÍTICO] Falha na preparação do ambiente. O Next.js não será iniciado.",
  );
  process.exit(1);
}

// 4. Se tudo deu certo lá em cima, inicia o Next.js
console.log("\n[4/4] Iniciando o Next.js...");
const devProcess = spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
});

// 5. Intercepta o Ctrl+C para fazer a limpeza
process.on("SIGINT", () => {
  console.log(
    "\n\n[Aviso] Ctrl+C detectado! Encerrando o Next.js e parando os serviços...",
  );

  try {
    // Roda o comando de parar os containers
    execSync("npm run services:stop", { stdio: "inherit" });
  } catch (erro) {
    console.log("[Aviso] Ocorreu um problema ao tentar parar os serviços.");
  }

  console.log("\n=== AMBIENTE ENCERRADO COM SUCESSO. ATÉ LOGO! ===\n");

  devProcess.kill("SIGINT");
  process.exit(0);
});
