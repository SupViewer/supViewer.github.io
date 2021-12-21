import Config from './config.js';
Config.Init();

class Details
{
    constructor(){
        view_btn_opensea.onclick = this.onClickOpenSea.bind(this);
    }
    onClickOpenSea()
    {
        let url = "https://opensea.io/assets/matic/" + Config.nft_contract_address+ "/" + this.index;
        window.open(url, '_blank');
    }
    async display(index)
    {
        this.index = index;
        view_img.style.display = "none";
        view_name.innerHTML = "";
        view_property.innerHTML = "";
        view_level.innerHTML = "";

        let response = await fetch(Config.baseURI + index + ".json");
        let data = await response.json();
        
        view_img.style.display = "block";
        
        view_name.innerHTML = data.name;

        var str = "";
        for(var i=0;i<data.attributes.length;i++){
            var attri = data.attributes[i];
            if(this.isValueType(attri.trait_type))
            {
                continue;
            }
            str += '<div class="col property-trait"><div class="property-type">' + attri.trait_type + '</div><div class="property-value">' + attri.value + '</div></div>';
        }
        view_property.innerHTML = str;

        str = "";
        for(var i=0;i<data.attributes.length;i++){
            var attri = data.attributes[i];
            if(this.isValueType(attri.trait_type) == false)
            {
                continue;
            }
            str += '<div class="numertrait-trait"><div class="numertrait-label">'+attri.trait_type+'</div><div class="progress numertrait-bar"><div class="progress-bar" role="progressbar" style="width: ' + (attri.value * 5) + '%;" aria-valuenow="' + (attri.value * 5) + '" aria-valuemin="0" aria-valuemax="100">' + attri.value + '%</div></div></div>'
        }
        view_level.innerHTML = str;
        view_img.onload = () => {
            loading_spin.style.display = "none";
        }
        view_img.src = data.image.replace("ipfs://","https://ipfs.io/ipfs/");
    }
    isValueType(str)
    {
        return (str == "STR" || str == "INT" || str == "DEX" || str == "CON" || str == "CHA")
    }
}


var getParam = function(key){
    var _parammap = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        _parammap[decode(arguments[1])] = decode(arguments[2]);
    });

    return _parammap[key];
};
let details = new Details();
let id = getParam("id");
details.display(id);