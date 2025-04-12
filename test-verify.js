const { verifyKey } = require('discord-interactions');
require('dotenv').config();

(async () => {
  const timestamp = '1744464145'; // explicitly real timestamp from your log
  const body = '{"app_permissions":"562949953601536","application_id":"1360558294053294192","attachment_size_limit":524288000,"authorizing_integration_owners":{},"entitlements":[],"id":"1360605981511520497","token":"aW50ZXJhY3Rpb246MTM2MDYwNTk4MTUxMTUyMDQ5NzpzcGJtbU5yanR5NTVtQUhQankzcldwMUU1d01iUXpRQWREVm9tdUZZeUlxd1RpZzhBbHJzS0h3Q2dMN2w0VVZHemNNRnFJVzhPanJTYXpKSTNIZWdjZWlQMjIzR01zQUQ4WTJxNkFSYzlvV3UyUnRZNWdFVUphUFVqV2JKNENqeA","type":1,"user":{"avatar":"c6a249645d46209f337279cd2ca998c7","avatar_decoration_data":null,"bot":true,"clan":null,"collectibles":null,"discriminator":"0000","global_name":"Discord","id":"643945264868098049","primary_guild":null,"public_flags":1,"system":true,"username":"discord"},"version":1}'; // explicitly exactly from your log
  const signature = '4661fa35a3f2d2fec0ce018859a4cbad01e08d499b8d14ff1873508eadc1218dbc2d436c2fe88bc8a4e4f91e32d8d16dc9febbe14ba274e89d60b8b386ae7907'; // explicitly exactly from your log

  const isValidRequest = await verifyKey(
    Buffer.from(body),
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY
  );

  console.log('Verification explicitly succeeds?', isValidRequest);
})();
