import {app} from 'electron'
export async function getApplicationVersion(): Promise<string> {
    return app.getVersion().toString();
}