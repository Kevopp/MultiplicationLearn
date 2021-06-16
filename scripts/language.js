class Language {
    constructor(text) {
        this.lang = text;
    }

    initialize(callback){
        if(typeof(this.lang) === "string"){
            const file = "lang/lang" + this.lang.toUpperCase() + ".json";
 
            $.getJSON(file, (jsonData) => {
                callback(jsonData);
            });
        }
        else{
            throw TypeError;
        }
    }

    getLanguage(){
        return this.lang;
    }
}


function changeLanguage(text, callback){
    const lang = new Language(text);

    try{
        lang.initialize(callback);
        localStorage.setItem("lang", text);
    }
    catch(err){
        console.log("Error: " + err.name);
    }
}