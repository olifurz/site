const { Client, Query, ID, TablesDB } = Appwrite;

export const apiClient = new Client();
apiClient
    .setEndpoint('https://api.olifurz.com/v1')
    .setProject('olifurz-com');


async function visitCheck() {
    if (!/^(http:\/\/localhost(:\d+)?|http:\/\/127\.0\.0\.1(:\d+)?)/.test(window.location.href)) {
        if (!site.getCookieByName("uniqueVisitorCheck")) {
            const ip = await getIpAddress();
            const tablesDB = new TablesDB(apiClient);

            const entry = await tablesDB.listRows({
                databaseId: '693f4106001ca02f7f4e',
                tableId: 'unique-visitors',
                queries: [Query.equal('ip', ip)]
            })

            if (entry.rows.length === 0) {
                await tablesDB.createRow({
                    databaseId: '693f4106001ca02f7f4e',
                    tableId: 'unique-visitors',
                    rowId: ID.unique(),
                    data: { ip: ip }
                });
            }

            document.cookie = "uniqueVisitorCheck=true";
        }

        // wtf is regex
        if (document.referrer != null &&
            !document.referrer.match(/^https?:\/\/([^\/]+\.)?olifurz\.com(\/|$)/i)) {
            const ip = await getIpAddress();
            const tablesDB = new TablesDB(apiClient);

            await tablesDB.createRow({
                databaseId: '693f4106001ca02f7f4e',
                tableId: 'visitors',
                rowId: ID.unique(),
                data: { ip: ip }
            });
        }
    }
}

async function getIpAddress() {
    return fetch("https://api.ipify.org/?format=json")
        .then(response => response.json())
        .then(data => {
            return data.ip;
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
            throw error;
        });
}

await visitCheck();