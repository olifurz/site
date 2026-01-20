const { Client, Query, ID, Databases, Account } = window.Appwrite;

export const apiClient = new Client();
apiClient
    .setEndpoint('https://api.olifurz.com/v1')
    .setProject('olifurz-com');

const account = new Account(apiClient);
const databases = new Databases(apiClient);
async function visitCheck() {
    // wtf is regex
    if (/^(http:\/\/localhost(:\d+)?|http:\/\/127\.0\.0\.1(:\d+)?)/.test(window.location.href)) return;

    try {
        const ip = await getIpAddress();
        const dbId = '693f4106001ca02f7f4e';

        if (!site.getCookieByName("uniqueVisitorCheck")) {
            const entry = await databases.listDocuments(dbId, 'unique-visitors', [
                Query.equal('ip', ip)
            ]);

            if (entry.total === 0) {
                await databases.createDocument(dbId, 'unique-visitors', ID.unique(), {
                    ip: ip
                });
            }
            document.cookie = "uniqueVisitorCheck=true; path=/; max-age=86400";
        }

        // wtf is regex again
        const isExternal = document.referrer &&
            !document.referrer.match(/^https?:\/\/([^\/]+\.)?olifurz\.com(\/|$)/i);

        if (isExternal) {
            await databases.createDocument(dbId, 'visitors', ID.unique(), {
                ip: ip
            });
        }
    } catch (error) {
        console.error("Appwrite Error:", error.message);
    }
}

async function getIpAddress() {
    try {
        const user = await account.get();
        const sessions = await account.listSessions();
        return sessions.sessions[0].ip;
    } catch (error) {
        const session = await account.createAnonymousSession();
        return session.ip;
    }
}

await visitCheck();