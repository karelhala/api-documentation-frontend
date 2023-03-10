import {Command} from "commander";

export const getCommand = () => {
    return new Command()
        .description(
            `Process the discovery.yml file to fetch all the openapi documents
            and writes a typescript file with bindings to access all the json documents.`
        )
        .requiredOption('-df, --discovery-file <discovery-file>', 'Discovery file to use.')
        .requiredOption('-o, --output-dir <output-dir>', 'Output directory')
        .option('--skip-api-fetch', 'Skip fetching the APIs and use whatever we have locally', false);
};
