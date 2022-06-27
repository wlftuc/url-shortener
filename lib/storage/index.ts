class LocalFunctions {
  setLinks: any;

  constructor(setLinks: React.Dispatch<React.SetStateAction<any[]>>) {
    this.setLinks = setLinks;
  }

  fetchFromLocalStorage() {
    const allLinks = JSON.parse(localStorage.getItem("links") || "[]");

    return this.setLinks(allLinks);
  }

  openAndFetch(onOpen: Function) {
    this.fetchFromLocalStorage();
    onOpen();
  }

  clearLocalStorage() {
    localStorage.removeItem("links");
  }



  deleteLinkAtSlug(i: number) {
    const lc = JSON.parse(localStorage.getItem("links") || "[]");
    const t = lc.splice(i, 1);
    localStorage.setItem("links", JSON.stringify(lc));
    this.fetchFromLocalStorage();
  }

  revealIndividualLink(i: number) {
    console.log(i);
  }
}

export { LocalFunctions };
