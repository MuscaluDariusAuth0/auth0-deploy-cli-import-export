
import { dump, deploy } from 'auth0-deploy-cli';

const config = {
  AUTH0_DOMAIN: '',
  AUTH0_CLIENT_ID: '',
  AUTH0_CLIENT_SECRET: '',
};

function ask() {
  process.stdout.write("Import or Export? (import/export)");
}

process.stdin.on("data", function(data) {
  if (data.toString().trim() === "import")
    importConfig();
  else if (data.toString().trim() === "export")
    exportConfig();
  else
    ask();
});

function exportConfig() {
  dump({
    output_folder: './local',
    format: 'yaml',
    config
  }).then(() => {
    console.log('Auth0 configuration export successful');
  }).catch((err) => {
    console.log('Error during Auth0 configuration export:', err);
  });
}

function importConfig() {
  deploy({
    input_file: './local/tenant.yaml',
    config
  }).then(() => {
      console.log('Auth0 configuration applied to tenant successful');
  }).catch((err) => {
    console.log('Error when applying configuration to Auth0 tenant:', err);
  });
}

ask();


