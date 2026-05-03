import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  const dataBaseName = process.env.POSTGRES_DB;
  const databaseCurrentConnectionsResult = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [dataBaseName],
  });
  const databaseCurrentConnectionsValue = parseInt(
    databaseCurrentConnectionsResult.rows[0].count,
  );

  console.log(`Banco de dados selecionado: ${request.query.databaseName}`);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        current_connections: databaseCurrentConnectionsValue,
      },
    },
  });
}

export default status;
