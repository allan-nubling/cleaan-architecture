import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'

export class AzureKeyVault {
    static async getSecret(key: string): Promise<string> {
        if (process.env.NODE_ENV === 'development') {
            return process.env[key]
        }
        const { KEY_VAULT_NAME } = process.env
        const KVUri = `https://${KEY_VAULT_NAME}.vault.azure.net`
        const credential = new DefaultAzureCredential()
        const clientAzureKeyVault = new SecretClient(KVUri, credential)
        const secretValue = await clientAzureKeyVault.getSecret(key)
        return secretValue.value
    }
}
