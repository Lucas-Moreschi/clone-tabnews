const { exec } = require("node:child_process")

let attemps = 0;

function checkPostgres() {
    exec("docker exec postgres-dev pg_isready --host localhost", handleReturn)
    
    function handleReturn(error, stdout) {
        if (stdout.search("accepting connections") === -1) {
            process.stdout.write(".");
            attemps++;
            checkPostgres();
            return;
        }
        console.log(`\n${attemps} tentativas malsucedidas antes da conexão estar disponível.\n`)
        console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
    }
}


process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();