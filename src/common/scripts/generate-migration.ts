// generate-migration.ts
import { exec } from 'child_process';

const migrationName: string | undefined = process.env.npm_config_name; // Get the name passed to the npm script
const command: string = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/${migrationName} -d src/data-source.ts`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error.message}`);
    return;
  }
  if (stdout) console.log(`stdout: ${stdout}`);
  if (stderr) console.error(`stderr: ${stderr}`);
});
