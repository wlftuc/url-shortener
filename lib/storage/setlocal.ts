


export function storeInLocalStorage(item:string, keyAndValue:object) {
    if(localStorage.getItem(item) == null) {
        localStorage.setItem(item, JSON.stringify(keyAndValue));
        return;
    }

    let oldData = JSON.parse(localStorage.getItem(item) || "[]") 
    oldData.push(keyAndValue)
    return
}
