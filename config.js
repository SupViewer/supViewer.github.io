const config = {
    env: "",
    baseURI: "",
    nft_contract_address: "",
    Init() {
        let matic = {
            "env": "matic",
            "baseURI" : "https://ipfs.io/ipfs/QmR13ViGFa62jfgeCQAfkrF5tDrXHcisN1W4UqfPvxWPGn/",
            "nft_contract_address": "0xb2a2812402ad53bd79d8adc0b6de282bdbc25336"
        };
        let target = matic;
        for(var value in target)
        {
            this[value] = target[value];
        }
    }
};
export default config;