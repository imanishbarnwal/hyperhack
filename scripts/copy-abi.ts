import * as fs from 'fs';
import * as path from 'path';

export default async function main() {
  const rootDir = path.join(__dirname, '..');
  const contractsSrcPath = path.join(rootDir, 'apps', 'contracts', 'src');
  const contractsOutPath = path.join(rootDir, 'apps', 'contracts', 'out');
  const frontendAbisPath = path.join(rootDir, 'apps', 'frontend', 'app', 'abis');

  // Step 4: Create a folder named "abis" inside apps/frontend/app folder if it does not exist
  if (!fs.existsSync(frontendAbisPath)) {
    fs.mkdirSync(frontendAbisPath, { recursive: true });
    console.log('Created folder:', frontendAbisPath);
  }

  // Step 1: Go into apps/contracts/src folder and list all the .sol files
  const contractFiles = fs.readdirSync(contractsSrcPath).filter(file => file.endsWith('.sol'));

  // Loop through each contract file
  for (const contractFile of contractFiles) {
    // Step 2: Under the apps/contracts/out/*.sol folder there is a .json file
    const jsonFilePath = path.join(contractsOutPath, contractFile, `${contractFile.substring(0, contractFile.lastIndexOf('.'))}.json`);

    // Check if the JSON file exists
    console.log('Checking for JSON file:', jsonFilePath)
    if (fs.existsSync(jsonFilePath)) {
      // Step 3: Read the JSON file, extract the value for the key "abi"
      const jsonFileContent = fs.readFileSync(jsonFilePath, 'utf-8');
      const jsonData = JSON.parse(jsonFileContent);
      const abi = jsonData.abi;

      // Step 5: Copy the ABI into this folder
      const abiFilePath = path.join(frontendAbisPath, `${path.basename(contractFile, '.sol')}.json`);
      fs.writeFileSync(abiFilePath, JSON.stringify(abi, null, 2));

      console.log(`ABI for ${contractFile} copied successfully!`);
    } else {
      console.log(`No JSON file found for ${contractFile}`);
    }
  }
}

main();
